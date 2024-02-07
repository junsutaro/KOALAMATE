import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import axios from "axios";

const FollowBtn = ({ targetUserId }) => {
    const [ isFollow, setIsFollow ] = useState(false)

    // 인증 헤더를 가져오는 함수
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? { Authorization: authHeader } : {};
    };

    // 사용자의 팔로우 상태를 확인하는 함수
    const checkFollowStatus = async () => {
        try {
            // 현재 사용자가 targetUserId를 팔로우하고 있는지 여부를 반환
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/followCheck`, {
                params: { userId: targetUserId },
                headers: getAuthHeader(),
            });
            setIsFollow(response.data.isFollow);
        } catch (error) {
            console.error('팔로우 상태 확인 에러', error);
        }
    };


    const toggleFollow = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/follow`, {
                userId: targetUserId,
            }, {
                headers: getAuthHeader(),
            })

            // 요청 성공 후 상태 업데이트
            setIsFollow(response.data.isFollow)
        } catch (error) {
            console.error('팔로우/언팔로우 요청 에러', error);
        }
    }


    useEffect(() => {
        checkFollowStatus();
    }, [targetUserId]);

    return (
        <>
            <Button variant="contained" onClick={toggleFollow}>
                {isFollow ? '언팔로우' : '팔로우'}
            </Button>
        </>
    )
}
export default FollowBtn