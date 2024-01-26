package com.ssafy.koala.repository;

import com.ssafy.koala.model.CocktailModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocktailRepository extends JpaRepository<CocktailModel,Long> {
    public List<CocktailModel> findByDrinkId(long id);
    public List<CocktailModel> findByRecipeId(long id);
}
