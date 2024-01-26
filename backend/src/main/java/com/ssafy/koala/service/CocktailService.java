package com.ssafy.koala.service;

import com.ssafy.koala.dto.Cocktail.CocktailDto;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.repository.CocktailRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CocktailService {
    private final CocktailRepository cocktailRepository;

    public CocktailService ( CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    public void saveAllCocktails(List<CocktailModel> cocktails) {
        cocktailRepository.saveAll(cocktails);
    }
}
