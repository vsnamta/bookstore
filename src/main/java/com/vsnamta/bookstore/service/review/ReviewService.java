package com.vsnamta.bookstore.service.review;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.domain.common.model.PageRequest;
import com.vsnamta.bookstore.domain.common.model.SearchRequest;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRepository;
import com.vsnamta.bookstore.domain.product.Product;
import com.vsnamta.bookstore.domain.product.ProductRepository;
import com.vsnamta.bookstore.domain.review.Review;
import com.vsnamta.bookstore.domain.review.ReviewRepository;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;

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
    public ReviewResult save(ReviewSavePayload reviewSavePayload) {
        Member member = memberRepository.findById(reviewSavePayload.getMemberId()).get();

        Product product = productRepository.findById(reviewSavePayload.getProductId())
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        Review review = Review.createReview(
            member, 
            product, 
            reviewSavePayload.getRating(), 
            reviewSavePayload.getContents()
        );
        
        reviewRepository.save(review);

        return new ReviewResult(review);
    }

    @Transactional
    public ReviewResult update(String memberId, Long id, ReviewUpdatePayload reviewUpdatePayload) {
        Member member = memberRepository.findById(memberId).get();

        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        if (!member.getId().equals(review.getMember().getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }

        review.update(
            reviewUpdatePayload.getRating(), 
            reviewUpdatePayload.getContents()
        );

        return new ReviewResult(review);
    }

    @Transactional
    public void remove(String memberId, Long id) {
        Member member = memberRepository.findById(memberId).get();

        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new InvalidArgumentException("잘못된 요청값에 의해 처리 실패하였습니다."));

        if (!member.getId().equals(review.getMember().getId())) {
            throw new NotEnoughPermissionException("요청 권한이 없습니다.");
        }
        
        review.remove();
    }

    @Transactional(readOnly = true)
    public Page<ReviewResult> findAll(FindPayload findPayload) {
        SearchRequest searchRequest = findPayload.getSearchCriteria().toRequest();
        PageRequest pageRequest = findPayload.getPageCriteria().toRequest();

        List<ReviewResult> reviewResult = 
            reviewRepository.findAll(searchRequest, pageRequest)
                .stream()
                .map(ReviewResult::new)
                .collect(Collectors.toList());

        long totalCount = reviewRepository.findTotalCount(searchRequest);
    
        return new Page<ReviewResult>(reviewResult, totalCount);
    }
}