package com.ssafy.koala.service.user;

import com.ssafy.koala.dto.user.ProfileDto;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

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

    public boolean modifyProfile(Long userId, ProfileDto modifiedProfile) {
        Optional<UserModel> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();

            // modifiedProfile에서 필요한 정보를 가져와서 UserModel을 업데이트한다.
            user.setNickname(modifiedProfile.getNickname());
            user.setBirthRange(modifiedProfile.getBirthRange());
            user.setGender(modifiedProfile.getGender());
            user.setProfile(modifiedProfile.getProfile());
            user.setIntroduction(modifiedProfile.getIntroduction());
            user.setAlcoholLimit(modifiedProfile.getAlcoholLimit());
            user.setMannersScore(modifiedProfile.getMannersScore());
            user.setTags(modifiedProfile.getTags());

            // UserRepository를 사용하여 업데이트된 사용자 정보를 저장한다.
            userRepository.save(user);

            return true;
        }

        return false;
    }
}
