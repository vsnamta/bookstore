package com.vsnamta.bookstore.web.api;

import static com.vsnamta.bookstore.Fixtures.aMember;
import static com.vsnamta.bookstore.Fixtures.aProduct;
import static com.vsnamta.bookstore.Fixtures.aReview;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.review.ReviewSavePayload;
import com.vsnamta.bookstore.service.review.ReviewUpdatePayload;
import com.vsnamta.bookstore.web.WithCustomUser;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
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
public class ReviewApiControllerTest {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProductRepository productRepository;

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
    public void ??????_??????() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        ReviewSavePayload reviewSavePayload = new ReviewSavePayload();
        reviewSavePayload.setProductId(product.getId());
        reviewSavePayload.setRating(4);
        reviewSavePayload.setContents("?????????.");

        // when
        ResultActions resultActions =
            mockMvc.perform(
                post("/api/reviews")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(reviewSavePayload)));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.rating").value(4))
            .andExpect(jsonPath("$.contents").value("?????????."))
            .andDo(print());  
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void ??????_??????() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Review review = reviewRepository.save(
            Review.createReview(member, product, 4, "?????????.")
        );

        ReviewUpdatePayload reviewUpdatePayload = new ReviewUpdatePayload();
        reviewUpdatePayload.setRating(5);
        reviewUpdatePayload.setContents("?????? ?????????.");

        // when
        ResultActions resultActions =
            mockMvc.perform(
                put("/api/reviews/" + review.getId())
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .content(objectMapper.writeValueAsString(reviewUpdatePayload)));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.rating").value(5))
            .andExpect(jsonPath("$.contents").value("?????? ?????????."))
            .andDo(print());
    }

    @WithCustomUser(id = "test", role = MemberRole.USER)
    @Test
    public void ??????_??????() throws Exception {
        // given
        Member member = memberRepository.save(aMember().id("test").name("?????????").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Review review = reviewRepository.save(
            Review.createReview(member, product, 4, "?????????.")
        );

        // when
        ResultActions resultActions =
            mockMvc.perform(
                delete("/api/reviews/" + review.getId()));
                    
        // then
        resultActions
            .andExpect(status().isOk())
            .andDo(print());   
    }

    @WithAnonymousUser
    @Test
    public void ???????????????_??????_??????() throws Exception {
         // given
         Member member = memberRepository.save(aMember().id("test").name("?????????").build());
         Product product = productRepository.save(aProduct().name("Clean Code").build());
 
         reviewRepository.save(aReview().member(member).product(product).rating(5).contents("?????? ?????????.").build());
 
        // when
        ResultActions resultActions =
            mockMvc.perform(
                get("/api/reviews")
                    .param("searchCriteria.column", "productId")
                    .param("searchCriteria.keyword", String.valueOf(product.getId()))
                    .param("pageCriteria.page", String.valueOf(1))    
                    .param("pageCriteria.size", String.valueOf(10)));

        // then
        resultActions
            .andExpect(status().isOk())
            // .andExpect()
            .andDo(print());            
    }
}