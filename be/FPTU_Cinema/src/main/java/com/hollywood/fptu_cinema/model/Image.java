package com.hollywood.fptu_cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Image {
    @Id
    @Column(name = "image_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "image_name", nullable = false)
    private String imageName;

    @Size(max = 255)
    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

}