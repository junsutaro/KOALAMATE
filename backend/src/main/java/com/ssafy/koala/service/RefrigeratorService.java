package com.ssafy.koala.service;

import com.ssafy.koala.dto.RefrigeratorCustomobjDTO;
import com.ssafy.koala.dto.RefrigeratorDTO;
import com.ssafy.koala.model.RefrigeratorCustomobjModel;
import com.ssafy.koala.model.RefrigeratorModel;
import com.ssafy.koala.repository.RefrigeratorRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RefrigeratorService {

    private final RefrigeratorRepository refrigeratorRepository;

    public RefrigeratorService(RefrigeratorRepository refrigeratorRepository) {
        this.refrigeratorRepository = refrigeratorRepository;
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

}
