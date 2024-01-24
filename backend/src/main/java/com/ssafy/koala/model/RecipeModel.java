package com.ssafy.koala.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class RecipeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private BoardModel board;
}
