package com.ssafy.koala.service;

import com.ssafy.koala.dto.RefrigeratorCustomobjDTO;
import com.ssafy.koala.dto.RefrigeratorDTO;
import com.ssafy.koala.dto.RefrigeratorDrinkDTO;
import com.ssafy.koala.model.*;
import com.ssafy.koala.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.koala.dto.RefrigeratorDTO.mapToDTO;

@Service
public class RefrigeratorService {

    private final RefrigeratorRepository refrigeratorRepository;
    private final CustomobjRepository customobjRepository;
    private final RefrigeratorCustomobjRepository refrigeratorCustomobjRepository;
    private final DrinkRepository drinkRepository;
    private final RefrigeratorDrinkRepository refrigeratorDrinkRepository;

    @Autowired
    public RefrigeratorService(RefrigeratorRepository refrigeratorRepository,
                               CustomobjRepository customobjRepository,
                               RefrigeratorCustomobjRepository refrigeratorCustomobjRepository,
                               DrinkRepository drinkRepository,
                               RefrigeratorDrinkRepository refrigeratorDrinkRepository) {
        this.refrigeratorRepository = refrigeratorRepository;
        this.customobjRepository = customobjRepository;
        this.refrigeratorCustomobjRepository = refrigeratorCustomobjRepository;
        this.drinkRepository = drinkRepository;  // 추가
        this.refrigeratorDrinkRepository = refrigeratorDrinkRepository;
    }


    public RefrigeratorModel saveRefrigerator(RefrigeratorModel refrigerator) {
        return refrigeratorRepository.save(refrigerator);
    }

    public Optional<RefrigeratorDTO> getRefrigeratorByUserId(Long userId) {
        return refrigeratorRepository.findByUserId(userId)
                .map(RefrigeratorDTO::fromEntity);
    }

    public RefrigeratorDTO modifyRefrigeratorByUserId(Long userId, RefrigeratorDTO updatedRefrigeratorDTO) {
        Optional<RefrigeratorModel> refrigeratorOptional = refrigeratorRepository.findByUserId(userId);
        if (refrigeratorOptional.isPresent()) {
            RefrigeratorModel refrigerator = refrigeratorOptional.get();

            // 냉장고 정보 업데이트
            refrigerator.setRefrigeratorType(updatedRefrigeratorDTO.getRefrigeratorType());
            refrigerator.setColor(updatedRefrigeratorDTO.getColor());

            refrigeratorRepository.save(refrigerator); // 업데이트된 엔터티 저장

            return RefrigeratorDTO.fromEntity(refrigerator);
        }
        return null; // 해당 유저의 냉장고가 존재하지 않을 경우
    }

    public List<RefrigeratorCustomobjDTO> getRefrigeratorContentsByUserId(Long userId) {
        Optional<RefrigeratorModel> refrigeratorOptional = refrigeratorRepository.findByUserId(userId);
        if (refrigeratorOptional.isPresent()) {
            RefrigeratorModel refrigerator = refrigeratorOptional.get();
            List<RefrigeratorCustomobjModel> customobjs = refrigerator.getRefrigeratorCustomobjs(); // 수정: 속성명 변경

            // Customobj를 DTO로 변환하여 리턴하는 부분을 구현
            List<RefrigeratorCustomobjDTO> customobjDTOs = customobjs.stream()
                    .map(RefrigeratorCustomobjDTO::fromEntity)
                    .collect(Collectors.toList());
            return customobjDTOs;
        }
        return Collections.emptyList(); // 해당 유저의 냉장고가 존재하지 않을 경우
    }

    public List<RefrigeratorCustomobjDTO> modifyRefrigeratorContentsByUserId(Long userId, List<RefrigeratorCustomobjDTO> updatedContentsDTO) {
        Optional<RefrigeratorModel> refrigeratorOptional = refrigeratorRepository.findByUserId(userId);
        if (refrigeratorOptional.isPresent()) {
            RefrigeratorModel refrigerator = refrigeratorOptional.get();
            List<RefrigeratorCustomobjModel> customobjs = refrigerator.getRefrigeratorCustomobjs(); // 수정: 속성명 변경

            // updatedContentsDTO에 따라 customobjs를 업데이트

            refrigeratorRepository.save(refrigerator); // 업데이트된 엔터티 저장

            // Customobj를 DTO로 변환하여 리턴하는 부분을 구현
            List<RefrigeratorCustomobjDTO> customobjDTOs = customobjs.stream()
                    .map(RefrigeratorCustomobjDTO::fromEntity)
                    .collect(Collectors.toList());
            return customobjDTOs;
        }
        return Collections.emptyList(); // 해당 유저의 냉장고가 존재하지 않을 경우
    }


    public List<RefrigeratorDrinkDTO> addDrinksToRefrigerator(Long userId, List<Long> drinkIds) {
        Optional<RefrigeratorModel> refrigeratorOptional = refrigeratorRepository.findByUserId(userId);

        if (refrigeratorOptional.isPresent()) {
            RefrigeratorModel refrigerator = refrigeratorOptional.get();

            // 기존 음료 다 날리고 업데이트 할거에요~ 날리는 단계입니다~
            refrigeratorDrinkRepository.deleteByRefrigeratorId(refrigerator.getId());

            List<RefrigeratorDrinkModel> refrigeratorDrinkModels = new ArrayList<>();

            for (Long drinkId : drinkIds) {
                Optional<DrinkModel> drinkOptional = drinkRepository.findById(drinkId);
                if (drinkOptional.isPresent()) {
                    DrinkModel drink = drinkOptional.get();

                    RefrigeratorDrinkModel refrigeratorDrinkModel = new RefrigeratorDrinkModel();
                    refrigeratorDrinkModel.setRefrigerator(refrigerator);
                    refrigeratorDrinkModel.setDrink(drink);

                    // 음료 추가 시 posIdx 재설정 필요 없으므로, 0 또는 1부터 시작하도록 설정
                    // 이전 음료가 삭제되었으므로, 여기서는 간단하게 리스트의 크기를 사용
                    int posIdx = refrigeratorDrinkModels.size() + 1;
                    // setPosIdx를 여기서 하면 여러 개 올릴 때 idx가 같은값으로 여러개가 올라감
                    // 그냥 사용자가 냉장고 + 버튼 눌러서 지정하도록 합시다~
                    refrigeratorDrinkModel.setPosIdx(posIdx);

                    refrigeratorDrinkModels.add(refrigeratorDrinkModel);
                }
            }

            refrigeratorDrinkRepository.saveAll(refrigeratorDrinkModels);

            // Drink를 DTO로 변환하여 리턴
            List<RefrigeratorDrinkDTO> modifiedContents = refrigeratorDrinkModels.stream()
                    .map(RefrigeratorDrinkDTO::fromEntity)
                    .collect(Collectors.toList());

            return modifiedContents;
        }

        return Collections.emptyList(); // 해당 유저의 냉장고나 Drink가 존재하지 않을 경우
    }


    // 메서드 이름 변경
    public List<RefrigeratorCustomobjDTO> addCustomobjsToRefrigerator(Long userId, List<RefrigeratorCustomobjDTO> customobjDTOs) {
        Optional<RefrigeratorModel> refrigeratorOptional = refrigeratorRepository.findByUserId(userId);

        if (refrigeratorOptional.isPresent()) {
            RefrigeratorModel refrigerator = refrigeratorOptional.get();
            List<RefrigeratorCustomobjModel> newCustomobjs = new ArrayList<>();

            // 여러 개의 DTO를 처리하기 위한 반복문
            for (RefrigeratorCustomobjDTO customobjDTO : customobjDTOs) {
                Optional<CustomobjModel> customobjOptional = customobjRepository.findById(customobjDTO.getCustomobjId());

                if (customobjOptional.isPresent()) {
                    CustomobjModel customobj = customobjOptional.get();

                    RefrigeratorCustomobjModel refrigeratorCustomobj = new RefrigeratorCustomobjModel();
                    refrigeratorCustomobj.setRefrigerator(refrigerator);
                    refrigeratorCustomobj.setCustomobj(customobj);
                    refrigeratorCustomobj.setPosX(customobjDTO.getPosX());
                    refrigeratorCustomobj.setPosY(customobjDTO.getPosY());

                    newCustomobjs.add(refrigeratorCustomobj);
                }
            }

            // saveAll을 통해 여러 개의 엔터티를 한 번에 저장
            refrigeratorCustomobjRepository.saveAll(newCustomobjs);

            // Customobjs를 DTO로 변환하여 리턴
            List<RefrigeratorCustomobjDTO> modifiedContents = refrigerator.getRefrigeratorCustomobjs().stream()
                    .map(RefrigeratorCustomobjDTO::fromEntity)
                    .collect(Collectors.toList());

            return modifiedContents;
        }

        return Collections.emptyList(); // 해당 유저의 냉장고나 Customobjs가 존재하지 않을 경우
    }
}
