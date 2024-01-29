package com.ssafy.koala.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class DrinkModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private int category;
    private String image;
    private String label;


    @OneToMany(mappedBy = "drink", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CocktailModel> cocktails = new ArrayList<>();
}
