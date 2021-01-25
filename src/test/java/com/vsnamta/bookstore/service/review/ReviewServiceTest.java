package com.vsnamta.bookstore.service.review;

import static com.vsnamta.bookstore.DomainBuilder.aMember;
import static com.vsnamta.bookstore.DomainBuilder.aProduct;
import static org.junit.Assert.assertEquals;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.member.MemoryMemberRepository;
import com.vsnamta.bookstore.service.product.MemoryProductRepository;

import org.junit.Before;
import org.junit.Test;

public class ReviewServiceTest {
    private ReviewRepository reviewRepository;
    private MemberRepository memberRepository;
    private ProductRepository productRepository;
    private ReviewService reviewService;

    @Before
    public void setUp() {
        reviewRepository = new MemoryReviewRepository();
        memberRepository = new MemoryMemberRepository();
        productRepository = new MemoryProductRepository();
        
        reviewService = new ReviewService(reviewRepository, memberRepository, productRepository);
    }

    @Test
    public void 리뷰_저장() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        ReviewSavePayload reviewSavePayload = new ReviewSavePayload();
        reviewSavePayload.setMemberId(member.getId());
        reviewSavePayload.setProductId(product.getId());
        reviewSavePayload.setRating(4);
        reviewSavePayload.setContents("좋아요.");

        // when
        Long reviewId = reviewService.save(reviewSavePayload);

        // then
        Review review = reviewRepository.findById(reviewId).get();
        product = productRepository.findById(product.getId()).get();

        assertEquals(4, review.getRating());
        assertEquals("좋아요.", review.getContents());
        assertEquals(Double.valueOf("4"), product.getReviewInfo().getRating());
    }

    @Test
    public void 리뷰_수정() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Review review = reviewRepository.save(
            Review.createReview(member, product, 4, "좋아요.")
        );

        ReviewUpdatePayload reviewUpdatePayload = new ReviewUpdatePayload();
        reviewUpdatePayload.setRating(5);
        reviewUpdatePayload.setContents("아주 좋아요.");

        // when
        reviewService.update(review.getId(), reviewUpdatePayload);

        // then
        review = reviewRepository.findById(review.getId()).get();
        product = productRepository.findById(product.getId()).get();

        assertEquals(5, review.getRating());
        assertEquals("아주 좋아요.", review.getContents());
        assertEquals(Double.valueOf("5"), product.getReviewInfo().getRating());
    }

    @Test
    public void 리뷰_삭제() {
        // given
        Member member = memberRepository.save(aMember().name("홍길동").build());
        Product product = productRepository.save(aProduct().name("Clean Code").build());

        Review review = reviewRepository.save(
            Review.createReview(member, product, 4, "좋아요.")
        );

        // when
        reviewService.remove(review.getId());

        //then
        review = reviewRepository.findById(review.getId()).get();
        product = productRepository.findById(product.getId()).get();

        assertEquals(true, review.isRemoved());
        assertEquals(null, product.getReviewInfo().getRating());
    }
}