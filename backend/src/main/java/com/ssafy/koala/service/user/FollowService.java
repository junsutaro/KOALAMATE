package com.ssafy.koala.service.user;

import com.ssafy.koala.model.user.FollowModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.FollowRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FollowService {
    private FollowRepository followRepository;

    // 해당 uid의 유저를 팔로우하는 유저 리스트
    public Optional<List<UserModel>> findFollowerById(long userId) {
        // 유저를(userId) 팔로우하는 유저들의 리스트를 가져옴
        List<FollowModel> followers = followRepository.findFollowerByFollowee_Id(userId);
        // 각각의 FollowModel에서 follower를 추출하여 List<UserModel>으로 변환
        List<UserModel> followerUsers = followers.stream()
                .map(FollowModel::getFollower)
                .collect(Collectors.toList());
        return (followerUsers != null) ? Optional.of(followerUsers) : Optional.empty();
    }

    // 해당 uid의 유저가 팔로우 하는 유저 리스트
    public Optional<List<UserModel>> findFolloweeById(Long userId) {
        // 유저가(userId) 팔로우하는 유저들의 리스트를 가져옴
        List<FollowModel> followees = followRepository.findFolloweeByFollower_Id(userId);
        // 각각의 FollowModel에서 followee를 추출하여 List<UserModel>으로 변환
        List<UserModel> followeeUsers = followees.stream()
                .map(FollowModel::getFollowee)
                .collect(Collectors.toList());
        return (followeeUsers != null) ? Optional.of(followeeUsers) : Optional.empty();
    }

    // 해당 uid의 유저 팔로워 수
    public Long countByFollower_Id(Long userId) {
        return followRepository.countByFollowee_Id(userId);
    }

    // 해당 uid의 유저가 팔로우 하는 수
    public Long countByFollowee_Id(Long userId) {
        return followRepository.countByFollower_Id(userId);
    }

    // 유저 팔로우하기
    public void followUser(Long myId, Long userId) {
        FollowModel follow = new FollowModel();

        UserModel follower = new UserModel();
        follower.setId(myId);
        UserModel followee = new UserModel();
        followee.setId(userId);

        follow.setFollowee(followee);
        follow.setFollower(follower);
        followRepository.save(follow);
    }

    // 유저 언팔로우하기
    @Transactional
    public void unfollowUser(Long myId, Long userId) {
        FollowModel follow = new FollowModel();

        UserModel follower = new UserModel();
        follower.setId(myId);
        UserModel followee = new UserModel();
        followee.setId(userId);

        follow.setFollowee(followee);
        follow.setFollower(follower);
        followRepository.deleteByFollowerAndFollowee(follower, followee);
    }

}
