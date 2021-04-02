package com.vsnamta.bookstore.web.api;

import javax.validation.Valid;

import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.review.ReviewResult;
import com.vsnamta.bookstore.service.review.ReviewSavePayload;
import com.vsnamta.bookstore.service.review.ReviewService;
import com.vsnamta.bookstore.service.review.ReviewUpdatePayload;
import com.vsnamta.bookstore.web.securiry.AuthUser;
import com.vsnamta.bookstore.web.securiry.CustomUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RestController
public class ReviewApiController {
    private ReviewService reviewService;

    @Autowired
    public ReviewApiController(ReviewService reviewService) {
        this.reviewService = reviewService;
    } 

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/reviews")
    public ReviewResult save(@Valid @RequestBody ReviewSavePayload reviewSavePayload, @AuthUser CustomUser customUser) {
        reviewSavePayload.setMemberId(customUser.getId());

        return reviewService.save(reviewSavePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/api/reviews/{id}")
    public ReviewResult update(@PathVariable Long id, @Valid @RequestBody ReviewUpdatePayload reviewUpdatePayload, @AuthUser CustomUser customUser) {
        return reviewService.update(customUser.getId(), id, reviewUpdatePayload);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/api/reviews/{id}")
    public void remove(@PathVariable Long id, @AuthUser CustomUser customUser) {
        reviewService.remove(customUser.getId(), id);
    }

    @GetMapping("/api/reviews")
    public Page<ReviewResult> findAll(@Valid FindPayload findPayload) {
        return reviewService.findAll(findPayload);
    }
}