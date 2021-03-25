package com.vsnamta.bookstore.domain.review;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.product.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Review {
    @Id
    @SequenceGenerator(name = "REVIEW_SEQ_GENERATOR", sequenceName = "REVIEW_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REVIEW_SEQ_GENERATOR")
    @Column(name = "REVIEW_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    private int rating;
    private String contents;
    private boolean removed;
    private LocalDateTime createdDate;

    @Builder
    public Review(Member member, Product product, int rating, String contents, boolean removed,
            LocalDateTime createdDate) {
        this.member = member;
        this.product = product;
        this.rating = rating;
        this.contents = contents;
        this.removed = removed;
        this.createdDate = createdDate;
    }
    
    public static Review createReview(Member member, Product product, int rating, String contents) {
        Review review = Review.builder()
            .member(member)
            .product(product)
            .rating(rating)
            .contents(contents)
            .removed(false)
            .createdDate(LocalDateTime.now())
            .build(); 

        product.plusRatingBySaveReview(rating);    

        return review;
    }

    public void update(int rating, String contents) {
        int increasedRating = calculateIncreasedRating(rating, this.rating);

        this.rating = rating;
        this.contents = contents;

        product.plusRatingByUpdateReview(increasedRating);
    }
    
    private int calculateIncreasedRating(int updatingRating, int currentRating) {
        return updatingRating - currentRating;
    }

    public void remove() {        
        this.removed = true;
        product.minusRatingByRemoveReview(rating);
    }
}