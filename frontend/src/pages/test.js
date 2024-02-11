import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Avatar,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Grid,
    Container, Box
} from '@mui/material';

const SignUp = () => {
    const navigate = useNavigate();
    const [isEmailAvailable, setIsEmailAvailable] = useState(true);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [message, setMessage] = useState('');

    const schema = yup.object().shape({
        email: yup.string().email('올바른 이메일 주소를 입력하세요.').required('이메일을 입력하세요.'),
        password: yup.string().required('비밀번호를 입력하세요.').min(8, '비밀번호는 최소 8자 이상이어야 합니다.').matches(
            /^(?=.*[a-z-A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            '비밀번호에는 영문자, 숫자, 특수문자가 최소한 하나씩 포함되어야 합니다.',
        ),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호를 입력하세요.'),
        nickname: yup.string().required('닉네임을 입력하세요.').max(20, '닉네임은 최대 20자까지 입력 가능합니다.'),
        birthRange: yup.number().required('연령대를 선택하세요.'),
        gender: yup.string().required('성별을 선택하세요.'),
    });

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '@gmail.com',
        },
    });

    const checkEmailAvailability = async (email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/checkEmail`, { email });
            setIsEmailAvailable(response.data.available);
        } catch (error) {
            console.error('이메일 가용성 확인 중 오류 발생', error);
        }
    };

    const checkNicknameAvailability = async (nickname) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/checkNickname`, { nickname });
            setIsNicknameAvailable(response.data.available);
        } catch (error) {
            console.error('닉네임 가용성 확인 중 오류 발생', error);
        }
    };

    const handleEmailCheck = async (email) => {
        if (email) {
            try {
                await checkEmailAvailability(email);
                setIsEmailChecked(true);
                setMessage('이메일 중복 확인 완료');
            } catch (error) {
                console.error('이메일 중복 확인 중 오류 발생', error);
            }
        }
    };

    const handleNicknameCheck = async (nickname) => {
        if (nickname) {
            try {
                await checkNicknameAvailability(nickname);
                setIsNicknameChecked(true);
                setMessage('닉네임 중복 확인 완료');
            } catch (error) {
                console.error('닉네임 중복 확인 중 오류 발생', error);
            }
        }
    };

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setMessage('현재 위치 등록 완료');
            },
            error => {
                console.error('위치 정보를 가져오는 중 오류 발생', error);
            }
        );
    };

    const onSubmit = (data) => {
        const { email, password, nickname, birthRange, gender } = data;

        if (true /* Add your condition here */) {
            axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, { email, password, nickname, birthRange, gender, latitude, longitude })
                .then(response => {
                    console.log('회원가입 성공', response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.log('회원가입 실패 ', error);
                });
        } else {
            console.log('이메일 또는 닉네임 중복 확인을 해주세요.');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Avatar sx={{ bgcolor: '#1a237e', mt: 3 }} />
                </Grid>
                <Grid item>
                    <Typography variant="h3">Sign Up</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="이메일"
                            variant="outlined"
                            {...register('email')}
                            error={!!errors.email || !isEmailAvailable}
                            helperText={isEmailAvailable ? errors.email?.message : '이미 사용 중인 이메일입니다.'}
                            fullWidth
                            margin="normal"
                        />
                        <Grid container justifyContent="flex-end">
                            <Button variant="outlined" onClick={() => handleEmailCheck(getValues('email'))}>중복 확인</Button>
                        </Grid>
                        <TextField
                            type="password"
                            label="비밀번호"
                            variant="outlined"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="비밀번호 확인"
                            variant="outlined"
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="닉네임"
                            variant="outlined"
                            {...register('nickname')}
                            error={!!errors.nickname || !isNicknameAvailable}
                            helperText={isNicknameAvailable ? errors.nickname?.message : '이미 사용 중인 닉네임입니다.'}
                            fullWidth
                            margin="normal"
                        />
                        <Grid container justifyContent="flex-end">
                            <Button variant="outlined" onClick={() => handleNicknameCheck(getValues('nickname'))}>중복 확인</Button>
                        </Grid>

                        <Button variant="contained" onClick={getCurrentPosition}>현재 위치 등록</Button>
                        {message && (
                            <Typography variant="body2" color="textSecondary" mt={1}>
                                {message}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            회원가입
                        </Button>

                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUp;

