package com.hollywood.fptu_cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    @Column(name = "image_name")
    private String imageName;

    @Size(max = 255)
    @Column(name = "path")
    private String path;

}