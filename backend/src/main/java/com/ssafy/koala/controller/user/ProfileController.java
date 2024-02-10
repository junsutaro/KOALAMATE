package com.ssafy.koala.controller.user;

import com.ssafy.koala.dto.user.ProfileDto;
import com.ssafy.koala.dto.user.ProfileModifyDto;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.user.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final AuthService authService;

    public ProfileController(AuthService authService, ProfileService profileService) {
        this.profileService = profileService;
        this.authService = authService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ProfileDto> getProfileByUserId(@PathVariable Long userId) {
        return profileService.getProfileDtoByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/modify")
    public ResponseEntity<String> modifyProfile(
            HttpServletRequest request,
            @RequestBody ProfileModifyDto modifiedProfile) {

        System.out.println("Controller의 modifyProfile 메서드 호출 확인");

        String accessToken = authService.getAccessToken(request);
        UserDto userDto = authService.extractUserFromToken(accessToken);
        Long userId = userDto.getId(); // UserDto에서 id를 가져와야 함

        boolean result = profileService.modifyProfile(userId, modifiedProfile);
        System.out.println("프로필 서비스의 modifyProfile 메서드 실행 !");
        if (result) {
            return ResponseEntity.ok("프로필이 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 수정에 실패했습니다.");
        }
    }


    @PutMapping("/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file) {

        String accessToken = authService.getAccessToken(request);
        UserDto userDto = authService.extractUserFromToken(accessToken);
        Long userId = userDto.getId(); // UserDto에서 id를 가져와야 함

        // 여기에 파일 업로드 및 경로 저장 로직 추가
        String ProfileImageUploadDir = "frontend/public/ProfileFileUploads"; // 파일 저장 경로
        String ProfileImgUrl = "ProfileFileUploads"; // 불러올 이미지 url 경로
        boolean result = profileService.uploadProfileImage(userId, file, ProfileImageUploadDir, ProfileImgUrl);

        if (result) {
            return ResponseEntity.ok("프로필 이미지가 성공적으로 업로드되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 업로드에 실패했습니다.");
        }
    }
}