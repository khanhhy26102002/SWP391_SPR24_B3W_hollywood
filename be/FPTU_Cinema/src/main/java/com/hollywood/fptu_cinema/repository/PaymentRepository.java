package com.hollywood.fptu_cinema.repository;

import com.hollywood.fptu_cinema.model.Payment;
import com.hollywood.fptu_cinema.viewModel.PaymentInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Autowired
    PaymentRepository paymentRepository = null; // Assume PaymentRepository has been created

    public default PaymentInfoDTO preparePaymentInfo(int ticketId) {
        // Prepare payment information as usual

        // Create a Payment entity with the necessary data
        Payment payment = new Payment();
        payment.setTicketId(ticketId);
        Object totalPrice = null;
        payment.setTicketPrice(totalPrice);
        // Set other fields as needed

        // Save the payment entity to the database
        paymentRepository.save(payment);

        // Return the PaymentInfoDTO
        return new PaymentInfoDTO(/*pass relevant data*/);
    }

}
