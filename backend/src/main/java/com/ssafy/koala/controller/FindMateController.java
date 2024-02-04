package com.ssafy.koala.controller.user;

import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/findmate")
@Tag(name="findmate", description="findmate controller")
public class FindMateController {
    private final UserService userService;
    private final AuthService authService;

    // 친구 찾기 페이지를 접속할 때 자신의 위치 정보 갱신
    @PutMapping("/save-location")
    public ResponseEntity<?> saveLocation(@RequestBody double latitude, @RequestBody double longitude, HttpServletRequest request) {
        System.out.println("들어오니??");
        try {
            String accessToken = authService.getAccessToken(request);
            System.out.println("debug: " + accessToken);
            UserDto dto = authService.extractUserFromToken(accessToken);
            System.out.println("debug: " + dto.getId());

            userService.saveLocation(dto.getId(), latitude, longitude);
            return new ResponseEntity<>("save location success.", HttpStatus.OK);
        } catch(EmptyResultDataAccessException e) {
            return new ResponseEntity<>("user not found.", HttpStatus.NOT_FOUND);
        } catch(Exception e) {
            return new ResponseEntity<>("error save location", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
