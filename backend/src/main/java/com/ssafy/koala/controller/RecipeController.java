package com.ssafy.koala.controller;

import com.ssafy.koala.dto.Recipe.RecipeDto;
import com.ssafy.koala.model.RecipeModel;
import com.ssafy.koala.service.RecipeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipe")
@Tag(name="recipe", description="recipe controller")
public class RecipeController {
    private final RecipeService recipeService;
    public RecipeController (RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/search/{recipe_id}")
    public ResponseEntity<RecipeModel> searchRecipesByNameContaining(@PathVariable long recipe_id) {
        Optional<RecipeModel> recipe = recipeService.getRecipeById(recipe_id);
        if(recipe.isPresent()) {
            return new ResponseEntity<>(recipe.get(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
