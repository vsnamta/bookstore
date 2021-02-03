package com.vsnamta.bookstore.service.stock;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.vsnamta.bookstore.domain.stock.StockStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StockSavePayload {
    @NotNull(message = "상품을 선택해주세요.")
    private Long productId;

    @Min(value = 1, message = "수량을 1개 이상 입력해주세요.")
    private int quantity;

    @NotBlank(message = "내용을 입력해주세요.")
    private String contents;

    @NotNull(message = "상태를 선택해주세요.")
    private StockStatus status;
}