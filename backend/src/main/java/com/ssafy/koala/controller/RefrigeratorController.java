package com.ssafy.koala.controller;

import com.ssafy.koala.dto.RefrigeratorCustomobjDTO;
import com.ssafy.koala.dto.RefrigeratorDTO;
import com.ssafy.koala.service.RefrigeratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    // 냉장고 내용물 확인
    @GetMapping("/{userId}/open")
    public ResponseEntity<List<RefrigeratorCustomobjDTO>> getRefrigeratorContents(@PathVariable Long userId) {
        List<RefrigeratorCustomobjDTO> customobjDTOs = refrigeratorService.getRefrigeratorContentsByUserId(userId);
        return ResponseEntity.ok(customobjDTOs);
    }

    // 냉장고 내용물 수정
    @PutMapping("/{userId}/open/modify")
    public ResponseEntity<List<RefrigeratorCustomobjDTO>> modifyRefrigeratorContents(@PathVariable Long userId, @RequestBody List<RefrigeratorCustomobjDTO> updatedContentsDTO) {
        List<RefrigeratorCustomobjDTO> modifiedContents = refrigeratorService.modifyRefrigeratorContentsByUserId(userId, updatedContentsDTO);
        return ResponseEntity.ok(modifiedContents);
    }


}
