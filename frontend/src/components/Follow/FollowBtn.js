import React, {useState} from 'react'
import {Button, Box, Chip, Typography} from '@mui/material';
import axios from "axios";
const FollowBtn = ({ userId, targetUserId }) => {
    const [ isFollow, setIsFollow ] = useState(false)

    // 인증 헤더를 가져오는 함수
    const getAuthHeader = () => {
        const authHeader = localStorage.getItem('authHeader');
        return authHeader ? { Authorization: authHeader } : {};
    };


    const checkFollowStatus = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/`)
            setIsFollow(response.data.isFollow)
        } catch(error) {
            console.error('팔로우 상태 확인 중 에러 발생:', error)
        }
    }

    const toggleFollow = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/follow`, {
                userId: targetUserId,
                refreshToken: refreshToken,
            }, {
                headers: getAuthHeader(),
            })

            // 요청 성공 후 상태 업데이트
            setIsFollow(!isFollow);
        } catch (error) {
            console.error('팔로우/언팔로우 요청 에러', error);
        }
    }

    // 컴포넌트 마운트 시 팔로우 상태 확인
    useEffect(() => {
        checkFollowStatus();
    }, [userId, targetUserId]);

    return (
        <>
            <Button variant="contained" onClick={toggleFollow}> {isFollow ? '언팔로우' : '팔로우'}</Button>
        </>
    )
}
export default FollowBtn