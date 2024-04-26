package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.ResponseText;
import com.hollywood.fptu_cinema.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor

public class Response {
    private String status;
    private String responseText;
    private Object data;

    public static ResponseEntity<?> error(Exception e) {
        Response error = new Response(Status.INTERNAL_ERROR.name(), ResponseText.INTERNAL_ERROR + e.getMessage(), null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    public static ResponseEntity<?> success(Object data) {
        Response response = new Response(Status.SUCCESS.name(), ResponseText.SUCCESS.toString(), data);
        return ResponseEntity.ok(response);
    }

    public static ResponseEntity<?> validationError(BindingResult bindingResult) {
        Map<String, String> validationErrors = new LinkedHashMap<>();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        String detailedErrorMessage = validationErrors.entrySet().stream()
                .map(entry -> entry.getKey() + " error: " + entry.getValue())
                .collect(Collectors.joining("; "));

        Response errorResponse = new Response(Status.FAILURE.name(), detailedErrorMessage, null);
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
