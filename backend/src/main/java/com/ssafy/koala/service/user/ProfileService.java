package com.ssafy.koala.service.user;

import com.ssafy.koala.dto.user.ProfileDto;
import com.ssafy.koala.dto.user.ProfileModifyDto;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<ProfileDto> getProfileDtoByUserId(Long userId) {
        Optional<UserModel> userOptional = userRepository.findById(userId);
        return userOptional.map(this::convertToDto);
    }

    private ProfileDto convertToDto(UserModel user) {
        ProfileDto profileDto = new ProfileDto();
        BeanUtils.copyProperties(user, profileDto);
        return profileDto;
    }

    public boolean modifyProfile(Long userId, ProfileModifyDto modifiedProfile) {
        Optional<UserModel> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();

            // modifiedProfile에서 필요한 정보를 가져와서 UserModel을 업데이트한다.
            user.setNickname(modifiedProfile.getNickname());
            user.setBirthRange(modifiedProfile.getBirthRange());
            user.setGender(modifiedProfile.getGender());
            user.setProfile(modifiedProfile.getProfile());
            user.setIntroduction(modifiedProfile.getIntroduction());
            user.setAlcoholLimitBottle(modifiedProfile.getAlcoholLimitBottle());
            user.setAlcoholLimitGlass(modifiedProfile.getAlcoholLimitGlass());
            user.setTags(modifiedProfile.getTags());

            // UserRepository를 사용하여 업데이트된 사용자 정보를 저장한다.
            userRepository.save(user);

            return true;
        }

        return false;
    }

    public boolean uploadProfileImage(Long userId, MultipartFile file, String filePath) {
        Optional<UserModel> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent() && !file.isEmpty()) {
            UserModel user = userOptional.get();

            System.out.println("호출 !");

            try {
                // 업로드된 프로필 이미지를 저장할 디렉토리 경로 설정
                String fileDir = filePath + "/" + userId;
                File directory = new File(fileDir);

                System.out.println("directory = " + directory);

                // 상위 디렉토리가 없으면 생성
                createDirectory(directory);

                // 업로드된 파일의 실제 경로 설정
                String uploadedFilePath = fileDir + "/" + file.getOriginalFilename();
                System.out.println("filePath = " + uploadedFilePath);

                // 파일 저장
                Files.copy(file.getInputStream(), Paths.get(uploadedFilePath), StandardCopyOption.REPLACE_EXISTING);

                // 업로드된 프로필 이미지 경로를 UserModel에 설정
                user.setProfile(uploadedFilePath);

                // UserRepository를 사용하여 업데이트된 사용자 정보를 저장
                userRepository.save(user);

                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    private void createDirectory(File directory) {
        if (!directory.exists()) {
            System.out.println("디렉토리 없으면~?");
            if (directory.mkdirs()) {
                System.out.println("디렉토리 생성: " + directory.getAbsolutePath());
            } else {
                throw new RuntimeException("디렉토리 생성 실패: " + directory.getAbsolutePath());
            }
        }
    }

}
