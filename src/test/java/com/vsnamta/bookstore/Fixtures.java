package com.vsnamta.bookstore;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.cart.Cart.CartBuilder;
import com.vsnamta.bookstore.domain.category.Category;
import com.vsnamta.bookstore.domain.category.Category.CategoryBuilder;
import com.vsnamta.bookstore.domain.common.model.Address;
import com.vsnamta.bookstore.domain.common.model.Address.AddressBuilder;
import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.PageRequest.PageRequestBuilder;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest.SearchRequestBuilder;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy;
import com.vsnamta.bookstore.domain.discount.DiscountPolicy.DiscountPolicyBuilder;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.Member.MemberBuilder;
import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.domain.order.DeliveryInfo;
import com.vsnamta.bookstore.domain.order.DeliveryInfo.DeliveryInfoBuilder;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.order.Order.OrderBuilder;
import com.vsnamta.bookstore.domain.order.OrderLine;
import com.vsnamta.bookstore.domain.order.OrderLine.OrderLineBuilder;
import com.vsnamta.bookstore.domain.order.OrderStatusHistory;
import com.vsnamta.bookstore.domain.order.OrderStatusHistory.OrderStatusHistoryBuilder;
import com.vsnamta.bookstore.domain.order.OrderStatusInfo;
import com.vsnamta.bookstore.domain.order.OrderStatusInfo.OrderStatusInfoBuilder;
import com.vsnamta.bookstore.domain.order.PaymentInfo;
import com.vsnamta.bookstore.domain.order.PaymentInfo.PaymentInfoBuilder;
import com.vsnamta.bookstore.domain.order.Receiver;
import com.vsnamta.bookstore.domain.order.Receiver.ReceiverBuilder;
import com.vsnamta.bookstore.domain.point.PointHistory;
import com.vsnamta.bookstore.domain.point.PointHistory.PointHistoryBuilder;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.Product.ProductBuilder;
import com.vsnamta.bookstore.domain.product.ReviewInfo;
import com.vsnamta.bookstore.domain.product.ReviewInfo.ReviewInfoBuilder;
import com.vsnamta.bookstore.domain.product.StockInfo;
import com.vsnamta.bookstore.domain.product.StockInfo.StockInfoBuilder;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.Review.ReviewBuilder;
import com.vsnamta.bookstore.domain.stock.Stock;
import com.vsnamta.bookstore.domain.stock.Stock.StockBuilder;

public class Fixtures {
    public static MemberBuilder aMember() {
        return Member.builder()
            .name("?????????")
            .password("password")
            .phoneNumber("010-1234-5678")
            .address(anAddress().build())
            .point(0)
            .role(MemberRole.USER);
    }

    public static DiscountPolicyBuilder aDiscountPolicy() {
        return DiscountPolicy.builder()
            .name("??????")
            .discountPercent(10)
            .depositPercent(5);
    }

    public static CategoryBuilder aCategory() {
        return Category.builder()
            .name("?????????/IT")
            .parent(null);
    }

    public static ProductBuilder aProduct() {
        return Product.builder()
            .name("Clean Code")
            .author("????????? C. ??????")
            .publisher("????????????")
            .publishedDate(LocalDate.of(2013, 12, 24))
            .totalPage("584")
            .isbn("9788966260959")
            .regularPrice(33000)
            .imageFileName("test.jpg")
            .authorIntroduction("?????? ??????...")
            .bookIntroduction("??? ??????...")
            .tableOfContents("??????...")
            .stockInfo(aStockInfo().build())
            .reviewInfo(aReviewInfo().build());
    }

    public static StockInfoBuilder aStockInfo() {
        return StockInfo.builder()
            .stockQuantity(0)
            .salesQuantity(0);
    }

    public static ReviewInfoBuilder aReviewInfo() {
        return ReviewInfo.builder()
            .totalRating(0)
            .reviewCount(0);
    }

    public static StockBuilder aStock() {
        return Stock.builder();
    }

    public static CartBuilder aCart() {
        return Cart.builder();
    }

    public static OrderBuilder anOrder() {
        return Order.builder();
    }

    public static OrderLineBuilder anOrderLine() {
        return OrderLine.builder();
    }

    public static OrderStatusHistoryBuilder anOrderStatusHistory() {
        return OrderStatusHistory.builder();
    }

    public static PaymentInfoBuilder aPaymentInfo() {
        return PaymentInfo.builder();
    }

    public static DeliveryInfoBuilder aDeliveryInfo() {
        return DeliveryInfo.builder()
            .receiver(aReceiver().build())
            .address(anAddress().build())
            .message("??? ?????? ???????????????.");
    }
    
    public static ReceiverBuilder aReceiver() {
        return Receiver.builder()
            .name("?????????")
            .phoneNumber("010-1234-5678");
    }

    public static AddressBuilder anAddress() {
        return Address.builder()
            .zipCode("123-456")
            .address1("????????? ?????? ?????? 123??????")
            .address2("456???");
    }

    public static OrderStatusInfoBuilder anOrderStatusInfo() {
        return OrderStatusInfo.builder()
            .updatedDate(LocalDateTime.now());
    }

    public static PointHistoryBuilder aPointHistory() {
        return PointHistory.builder();
    }

    public static ReviewBuilder aReview() {
        return Review.builder();
    }
    
    public static PageRequestBuilder aPageRequest() {
        return PageRequest.builder()
            .page(1)
            .size(10);
    }

    public static SearchRequestBuilder aSearchRequest() {
        return SearchRequest.builder()
            .column(null)
            .keyword(null);
    }
}