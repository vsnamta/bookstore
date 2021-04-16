package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.Fixtures.aDeliveryInfo;
import static com.vsnamta.bookstore.Fixtures.aDiscountPolicy;
import static com.vsnamta.bookstore.Fixtures.aMember;
import static com.vsnamta.bookstore.Fixtures.aProduct;
import static com.vsnamta.bookstore.Fixtures.aStockInfo;
import static com.vsnamta.bookstore.Fixtures.anOrderStatusInfo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicyRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderRepository;
import com.vsnamta.bookstore.domain.order.OrderStatus;
import com.vsnamta.bookstore.domain.order.OrderStatusSettingService;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.service.order.OrderSavePayload;
import com.vsnamta.bookstore.service.order.OrderUpdatePayload;
import com.vsnamta.bookstore.web.WithCustomUser;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
@Transactional
public class OrderApiControllerTest {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductRepository productRepository; 

    @Autowired
    private DiscountPolicyRepository discountPolicyRepository; 

    @Autowired
    private OrderStatusSettingService orderStatusSettingService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void 주문() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").point(1000).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .name("Clean Code")
                .stockInfo(aStockInfo().stockQuantity(10).build())
                .build()
        );

        OrderSavePayload.OrderProduct orderProduct = new OrderSavePayload.OrderProduct();
        orderProduct.setProductId(product.getId());
        orderProduct.setQuantity(1);

        OrderSavePayload orderSavePayload = new OrderSavePayload();
        orderSavePayload.setOrderProducts(Arrays.asList(orderProduct));
        orderSavePayload.setUsedPoint(1000);
        orderSavePayload.setReceiverName("홍길동");
        orderSavePayload.setReceiverPhoneNumber("010-1234-5678");
        orderSavePayload.setDeliveryZipCode("123-456");
        orderSavePayload.setDeliveryAddress1("서울시 중구 명동 123번지");
        orderSavePayload.setDeliveryAddress2("456호");
        orderSavePayload.setDeliveryMessage("문 앞에 놓아주세요.");

        // when
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/orders")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(orderSavePayload))); 

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.orderLineResults[0].productName").value("Clean Code"))
            .andExpect(jsonPath("$.statusName").value("주문 완료"))
            .andDo(print());   
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void 주문취소() throws Exception {
        // given  
        Member member = memberRepository.save(aMember().id("test").name("홍길동").point(1000).build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product = productRepository.save(
            aProduct()
                .discountPolicy(discountPolicy)
                .name("Clean Code")
                .stockInfo(aStockInfo().stockQuantity(10).build())
                .build()
        );

        Order order = orderRepository.save(
            Order.createOrder(
                member,
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );
        orderStatusSettingService.ordered(order);

        OrderUpdatePayload orderUpdatePayload = new OrderUpdatePayload();
        orderUpdatePayload.setStatus(OrderStatus.CANCELED);

        // when
        ResultActions resultActions =
            mockMvc.perform(
                put("/api/orders/" + order.getId())
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(orderUpdatePayload)));     

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.orderLineResults[0].productName").value("Clean Code"))
            .andExpect(jsonPath("$.statusName").value("주문 취소"))
            .andDo(print());   
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void 회원아이디로_주문_조회() throws Exception {
         // given
         Member member = memberRepository.save(aMember().id("test").name("홍길동").build());

         DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());
 
         Product product = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());

        Order order = orderRepository.save(
            Order.createOrder(
                member, 
                Arrays.asList(
                    OrderLine.createOrderLine(product, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );
        order.updateStatusInfo(anOrderStatusInfo().status(OrderStatus.ORDERED).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/orders")
                    .param("searchCriteria.column", "memberId")
                    .param("searchCriteria.keyword", String.valueOf(member.getId()))
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));           

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect()
            .andDo(print());           
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void 주문번호로_주문_조회() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").build());

        DiscountPolicy discountPolicy = discountPolicyRepository.save(aDiscountPolicy().build());

        Product product1 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("Clean Code").build());
        Product product2 = productRepository.save(aProduct().discountPolicy(discountPolicy).name("리팩토링").build());

        Order order = orderRepository.save(
            Order.createOrder(
                member, 
                Arrays.asList(
                    OrderLine.createOrderLine(product1, 1),
                    OrderLine.createOrderLine(product2, 1)
                ), 
                0, 
                aDeliveryInfo().build()
            )
        );
        order.updateStatusInfo(anOrderStatusInfo().status(OrderStatus.ORDERED).build());

        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/orders/" + order.getId()));     

        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.orderLineResults[0].productName").value("Clean Code"))
            .andExpect(jsonPath("$.statusName").value("주문 완료"))
            .andDo(print());  
    }
}