package com.vsnamta.bookstore.web.api;

import com.vsnamta.bookstore.service.common.model.FindPayload;
import com.vsnamta.bookstore.service.common.model.Page;
import com.vsnamta.bookstore.service.review.ReviewResult;
import com.vsnamta.bookstore.service.review.ReviewSavePayload;
import com.vsnamta.bookstore.service.review.ReviewService;
import com.vsnamta.bookstore.service.review.ReviewUpdatePayload;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/api/reviews")
    public Long save(@RequestBody ReviewSavePayload reviewSavePayload) {
        return reviewService.save(reviewSavePayload);
    }

    @PutMapping("/api/reviews/{id}")
    public Long update(@PathVariable Long id, @RequestBody ReviewUpdatePayload reviewUpdatePayload) {
        return reviewService.update(id, reviewUpdatePayload);
    }

    @DeleteMapping("/api/reviews/{id}")
    public void remove(@PathVariable Long id) {
        reviewService.remove(id);
    }

    @GetMapping("/api/reviews")
    public Page<ReviewResult> findAll(FindPayload findPayload) {
        return reviewService.findAll(findPayload);
    }
}