package com.hollywood.fptu_cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "User", schema = "Movie_Booking_Ticket")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "user_name", nullable = false)
    private String userName;

    @Size(max = 255)
    @Column(name = "avatar")
    private String avatar;

    @Size(max = 255)
    @NotNull
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 255)
    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 255)
    @Column(name = "address")
    private String address;

    @Size(max = 255)
    @Column(name = "gender")
    private String gender;

    @Past
    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Size(max = 255)
    @Column(name = "phone")
    private String phone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @Size(max = 255)
    @Column(name = "token")
    private String token;

}