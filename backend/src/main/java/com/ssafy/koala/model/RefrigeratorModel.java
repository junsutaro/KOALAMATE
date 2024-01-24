package com.ssafy.koala.model;

import com.ssafy.koala.model.user.UserModel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class RefrigeratorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refrigerator_id")
    private Long id;

    @OneToOne(mappedBy = "refrigerator")
    private UserModel user;

    private int refrigeratorType;
    private String color;

    @OneToMany(mappedBy = "refrigerator")
    private List<RefrigeratorCustomobjModel> refrigeratorCustomobjs;



}
