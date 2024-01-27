package com.ssafy.koala.service;

import com.ssafy.koala.dto.Board.BoardWithoutCocktailDto;
import com.ssafy.koala.dto.Cocktail.CocktailWithBoardDto;
import com.ssafy.koala.dto.Drink.DrinkDto;
import com.ssafy.koala.dto.Drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.repository.DrinkRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DrinkService {
    private final DrinkRepository drinkRepository;


    public DrinkService(DrinkRepository drinkRepository) {
        this.drinkRepository = drinkRepository;
    }

    public DrinkDto getDrinkById(long id) {
        return drinkRepository.findById(id)
                .map(drinkModel -> {
                    DrinkDto drinkDto = new DrinkDto();
                    drinkDto.setId(drinkModel.getId());
                    drinkDto.setName(drinkModel.getName());
                    drinkDto.setCategory(drinkModel.getCategory());
                    drinkDto.setLabel(drinkModel.getLabel());
                    drinkDto.setImage(drinkModel.getImage());

                    List<CocktailWithBoardDto> cocktails = drinkModel.getCocktails().stream()
                            .map(temp -> {
                                CocktailWithBoardDto cocktailDto = new CocktailWithBoardDto();
                                cocktailDto.setId(temp.getId());
                                cocktailDto.setProportion(temp.getProportion());
                                cocktailDto.setUnit(temp.getUnit());

                                BoardWithoutCocktailDto insert = new BoardWithoutCocktailDto();
                                BeanUtils.copyProperties(temp.getBoard(),insert);
                                cocktailDto.setBoard(insert);

                                return cocktailDto;
                            })
                            .collect(Collectors.toList());

                    drinkDto.setCocktails(cocktails);
                    return drinkDto;
                })
                .orElse(null);
    }

    public DrinkModel getDrinkModelById(long id) {
        Optional<DrinkModel> drinkModel = drinkRepository.findById(id);
        if(drinkModel.isPresent()) {
            return drinkModel.get();
        }
        return null;
    }

    public DrinkModel createDrink(DrinkWithoutCocktailDto drinkDto) {
        DrinkModel drinkModel = new DrinkModel();
        BeanUtils.copyProperties(drinkDto, drinkModel);

        return drinkRepository.save(drinkModel);
    }


}
