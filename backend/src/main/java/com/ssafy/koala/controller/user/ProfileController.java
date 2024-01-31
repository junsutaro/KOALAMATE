package com.ssafy.koala.controller.user;

import com.ssafy.koala.dto.user.ProfileDto;
import com.ssafy.koala.dto.user.ProfileModifyDto;
import com.ssafy.koala.service.user.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileDto> getProfileByUserId(@PathVariable Long userId) {
        return profileService.getProfileDtoByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}/modify")
    public ResponseEntity<String> modifyProfile(@PathVariable Long userId, @RequestBody ProfileModifyDto modifiedProfile) {
        boolean result = profileService.modifyProfile(userId, modifiedProfile);
        if (result) {
            return ResponseEntity.ok("프로필이 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 수정에 실패했습니다.");
        }
    }

    @PostMapping("/{userId}/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        // 여기에 파일 업로드 및 경로 저장 로직 추가
        String ProfileImageUploadDir = "ProfileFileUploads"; // 파일 저장 경로
        boolean result = profileService.uploadProfileImage(userId, file, ProfileImageUploadDir);

        if (result) {
            return ResponseEntity.ok("프로필 이미지가 성공적으로 업로드되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 업로드에 실패했습니다.");
        }
    }
}