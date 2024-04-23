package com.hollywood.fptu_cinema.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.hollywood.fptu_cinema.model.Ticket;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;


@Service
public class QRCodeService {

    private final ObjectMapper mapper;

    public QRCodeService() {
        this.mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
    }

    public String convertTicketInfoToJSON(Ticket ticket) throws JsonProcessingException {
        ObjectNode ticketInfo = mapper.createObjectNode();

        ticketInfo.put("movieName", ticket.getScreening().getMovie().getName());
        ticketInfo.put("startTime", ticket.getScreening().getStartTime().toString());
        ticketInfo.put("date", ticket.getScreening().getDate().toString());
        ticketInfo.put("roomNumber", ticket.getScreening().getRoom().getRoomNumber());
        ticketInfo.put("genre", ticket.getScreening().getMovie().getGenre());
        ticketInfo.put("rated", ticket.getScreening().getMovie().getRated());
        ticketInfo.put("totalPrice", ticket.getTotalPrice());

        return mapper.writeValueAsString(ticketInfo);
    }

    public void generateQRCodeImage(String text, int width, int height, String directoryPath) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);

        Path directory = Paths.get(directoryPath);
        if (!directory.toFile().exists() && !directory.toFile().mkdirs()) {
            throw new IOException("Unable to create directory: " + directory.toAbsolutePath());
        }

        String fileName = "qr_code_" + System.currentTimeMillis() + ".png";
        Path filePath = directory.resolve(fileName);

        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", filePath);
    }
}
