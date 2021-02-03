package com.vsnamta.bookstore.web.api;

import java.util.List;
import java.util.stream.Collectors;

import com.vsnamta.bookstore.service.common.exception.DataNotFoundException;
import com.vsnamta.bookstore.service.common.exception.InvalidArgumentException;
import com.vsnamta.bookstore.service.common.exception.NotEnoughPermissionException;
import com.vsnamta.bookstore.service.common.model.ErrorResult;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResult> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<ErrorResult.FieldErrorResult> fieldErrorResults = createFieldErrorResults(exception.getBindingResult());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResult("입력값이 올바르지 않습니다.", fieldErrorResults));
    }

    private List<ErrorResult.FieldErrorResult> createFieldErrorResults(BindingResult bindingResult) {
        return bindingResult.getFieldErrors()
            .stream()
            .map(fieldError -> 
                new ErrorResult.FieldErrorResult(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
                )
            )
            .collect(Collectors.toList());
    }

    @ExceptionHandler(InvalidArgumentException.class)
    public ResponseEntity<ErrorResult> handleInvalidArgumentException(InvalidArgumentException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResult(exception.getMessage()));
    }

    @ExceptionHandler(NotEnoughPermissionException.class)
    public ResponseEntity<ErrorResult> handleNotEnoughPermissionException(NotEnoughPermissionException exception) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ErrorResult(exception.getMessage()));
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ErrorResult> handleDataNotFoundException(DataNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorResult(exception.getMessage()));
    }
}