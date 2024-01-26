package com.ssafy.koala.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.koala.model.user.UserModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class BoardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	private String content;
	private Date date;
	private int views;
	private String nickname;
	private String image;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="recipe_id")
	private RecipeModel recipe;

	//Like
//	@OneToMany
//	private List<UserModel> users = new ArrayList<>();

	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "board", cascade = CascadeType.ALL)
	private List<CommentModel> comments;
}
