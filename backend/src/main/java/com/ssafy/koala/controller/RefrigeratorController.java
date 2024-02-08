package com.ssafy.koala.controller;

import com.ssafy.koala.dto.RefrigeratorCustomobjDTO;
import com.ssafy.koala.dto.RefrigeratorDTO;
import com.ssafy.koala.dto.RefrigeratorDrinkDTO;
import com.ssafy.koala.service.RefrigeratorService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/refrigerator")
public class RefrigeratorController {

    private final RefrigeratorService refrigeratorService;

    @Autowired
    public RefrigeratorController(RefrigeratorService refrigeratorService) {
        this.refrigeratorService = refrigeratorService;
    }


    // 냉장고 외부 조회
    @GetMapping("/{userId}")
    public ResponseEntity<RefrigeratorDTO> getRefrigerator(@PathVariable Long userId) {
        Optional<RefrigeratorDTO> refrigeratorDTO = refrigeratorService.getRefrigeratorByUserId(userId);
        return refrigeratorDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 냉장고 외부 수정
    @PutMapping("/{userId}/modify")
    public ResponseEntity<RefrigeratorDTO> modifyRefrigerator(@PathVariable Long userId, @RequestBody RefrigeratorDTO updatedRefrigeratorDTO) {
        RefrigeratorDTO modifiedRefrigerator = refrigeratorService.modifyRefrigeratorByUserId(userId, updatedRefrigeratorDTO);
        return modifiedRefrigerator != null ? ResponseEntity.ok(modifiedRefrigerator) : ResponseEntity.notFound().build();
    }

    // 냉장고 내용물(Drinks) 확인
    @GetMapping("/{userId}/open")
    public ResponseEntity<List<RefrigeratorCustomobjDTO>> getRefrigeratorContents(@PathVariable Long userId) {
        List<RefrigeratorCustomobjDTO> customobjDTOs = refrigeratorService.getRefrigeratorContentsByUserId(userId);
        return ResponseEntity.ok(customobjDTOs);
    }

    // 냉장고 자석 수정
    @PutMapping("/{userId}/modifyCustoms")
    public ResponseEntity<List<RefrigeratorCustomobjDTO>> modifyRefrigeratorContents(@PathVariable Long userId, @RequestBody List<RefrigeratorCustomobjDTO> updatedContentsDTO) {
        List<RefrigeratorCustomobjDTO> modifiedContents = refrigeratorService.modifyRefrigeratorContentsByUserId(userId, updatedContentsDTO);
        return ResponseEntity.ok(modifiedContents);
    }


    @PutMapping("/{userId}/addCustomobjs")
    public ResponseEntity<List<RefrigeratorCustomobjDTO>> addCustomobjsToRefrigerator(
            @PathVariable Long userId,
            @RequestBody List<RefrigeratorCustomobjDTO> customobjDTOs) {
        System.out.println(userId);
        List<RefrigeratorCustomobjDTO> modifiedRefrigeratorContents = refrigeratorService.addCustomobjsToRefrigerator(userId, customobjDTOs);
        System.out.println(userId);
        return ResponseEntity.ok(modifiedRefrigeratorContents);
    }


    @Transactional
    @PutMapping("/{userId}/addDrinks")
    public ResponseEntity<List<RefrigeratorDrinkDTO>> addDrinksToRefrigerator(
            @PathVariable Long userId,
            @RequestBody List<Long> drinkIds) {


        List<RefrigeratorDrinkDTO> modifiedRefrigeratorContents = refrigeratorService.addDrinksToRefrigerator(userId, drinkIds);
        System.out.println(userId);
        return ResponseEntity.ok(modifiedRefrigeratorContents);
    }

}
