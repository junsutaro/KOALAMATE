package com.ssafy.koala.service;

import com.ssafy.koala.dto.Cocktail.CocktailDto;
import com.ssafy.koala.dto.Cocktail.CocktailWithDrinkDto;
import com.ssafy.koala.dto.Recipe.RecipeDto;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.model.RecipeModel;
import com.ssafy.koala.repository.CocktailRepository;
import com.ssafy.koala.repository.RecipeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final CocktailRepository cocktailRepository;

    public RecipeService(RecipeRepository recipeRepository, CocktailRepository cocktailRepository) {
        this.recipeRepository = recipeRepository;
        this.cocktailRepository = cocktailRepository;
    }

    public List<RecipeModel> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<RecipeModel> getRecipeById(long id) {
        return recipeRepository.findById(id);
    }

    public Optional<List<RecipeModel>> getRecipeByNameContaining(String name) {
        return recipeRepository.findByNameContaining(name);
    }

    public RecipeModel createRecipe(RecipeModel recipeModel) {
        return recipeRepository.save(recipeModel);
    }

    private RecipeDto convertToDto(RecipeModel recipeModel) {
        RecipeDto recipeDto = new RecipeDto();

        recipeDto.setId(recipeModel.getId());
        recipeDto.setName(recipeModel.getName());
        recipeDto.setImage(recipeModel.getImage());
        recipeDto.setManufacturer(recipeModel.getManufacturer());


        return recipeDto;
    }
    private RecipeModel convertToRecipe(RecipeDto recipeDto) {
        RecipeModel recipeModel = new RecipeModel();

        recipeModel.setId(recipeDto.getId());
        recipeModel.setName(recipeDto.getName());
        recipeModel.setImage(recipeDto.getImage());
        recipeModel.setManufacturer(recipeDto.getManufacturer());


        return recipeModel;
    }
}
