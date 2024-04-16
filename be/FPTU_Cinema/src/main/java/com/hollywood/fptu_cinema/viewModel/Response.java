package com.hollywood.fptu_cinema.viewModel;

import com.hollywood.fptu_cinema.enums.ResponseText;
import com.hollywood.fptu_cinema.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor

public class Response {
    private String status;
    private String responseText;
    private Object data;
    public static ResponseEntity<?> error(Exception e) {
        Response error = new Response(Status.INTERNAL_ERROR.name(), ResponseText.INTERNAL_ERROR + e.getMessage(), null);
        return ResponseEntity.badRequest().body(error);
    }

    public static ResponseEntity<?> success(Object data) {
        Response response = new Response(Status.SUCCESS.name(), ResponseText.SUCCESS.toString(), data);
        return ResponseEntity.ok(response);
    }
}
