package com.ssafy.koala.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BoardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
}
