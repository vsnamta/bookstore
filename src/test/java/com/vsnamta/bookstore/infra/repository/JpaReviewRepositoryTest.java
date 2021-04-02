package com.vsnamta.bookstore.infra.repository;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aPageRequest;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static com.vsnamta.bookstore.DomainBuilder.aReview;
import static com.vsnamta.bookstore.DomainBuilder.aSearchRequest;
import static org.junit.Assert.assertEquals;

import java.util.List;

import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class JpaReviewRepositoryTest {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void 상품번호로_리뷰_조회() {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        reviewRepository.save(aReview().member(member).product(product).rating(5).contents("아주 좋아요.").build());

        // when
        List<Review> reviews = reviewRepository.findAll(
            aSearchRequest()
                .column("productId")
                .keyword(String.valueOf(product.getId()))
                .build(),
            aPageRequest().build()           
        );
        
        // then
        assertEquals(1, reviews.size());       
    }

    @Test
    public void 회원번호로_리뷰_조회() {
        // given
        Member member = memberRepository.save(aMember().id("test").name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        reviewRepository.save(aReview().member(member).product(product).rating(5).contents("아주 좋아요.").build());

        // when
        List<Review> reviews = reviewRepository.findAll(
            aSearchRequest()
                .column("memberId")
                .keyword(String.valueOf(member.getId()))
                .build(),
            aPageRequest().build()           
        );
        
        // then
        assertEquals(1, reviews.size());       
    }
}