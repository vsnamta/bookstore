package com.vsnamta.bookstore.service.review;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private MemberRepository memberRepository;
    private ProductRepository productRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MemberRepository memberRepository,
            ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
    }   

    @Transactional
    public Long save(ReviewSavePayload reviewSavePayload) {
        Member member = memberRepository.findById(reviewSavePayload.getMemberId()).get();

        Product product = productRepository.findById(reviewSavePayload.getProductId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        Review review = Review.createReview(member, product, reviewSavePayload.getRating(), reviewSavePayload.getContents());
        
        return reviewRepository.save(review).getId();
    }

    @Transactional
    public Long update(Long id, ReviewUpdatePayload reviewUpdatePayload) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        review.update(reviewUpdatePayload.getRating(), reviewUpdatePayload.getContents());

        return id;
    }

    @Transactional
    public void remove(Long id) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));
        
        review.remove();
    }
}