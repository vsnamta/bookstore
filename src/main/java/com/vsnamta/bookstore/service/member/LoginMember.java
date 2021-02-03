package com.vsnamta.bookstore.service.member;

import com.vsnamta.bookstore.domain.cart.Cart;
import com.vsnamta.bookstore.domain.member.Member;
import com.vsnamta.bookstore.domain.member.MemberRole;
import com.vsnamta.bookstore.domain.order.Order;
import com.vsnamta.bookstore.domain.review.Review;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginMember {
    private Long id;
    private String email;
    private String name;
    private MemberRole role;

    public LoginMember(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.role = member.getRole();
    }

    public boolean checkMyCart(Cart cart) {
        return checkMe(cart.getMember());
    }

    public boolean checkMyOrder(Order order) {
        return checkMe(order.getMember());
    }

    public boolean checkMyReview(Review review) {
        return checkMe(review.getMember());
    }

    private boolean checkMe(Member member) {
        return id.equals(member.getId());
    }

    public boolean hasUserRole() {
        return role.equals(MemberRole.USER);
    }
}