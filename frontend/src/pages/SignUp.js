import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from 'components/Nav';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
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
	Container, colors,
} from '@mui/material';

const SignUp = () => {
	const navigate = useNavigate();

	// Yup 스키마 정의
	const schema = yup.object().shape({
		email: yup.string().email('올바른 이메일 주소를 입력하세요.').required('이메일을 입력하세요.'),
		password: yup.string().
				required('비밀번호를 입력하세요.').
				min(8, '비밀번호는 최소 8자 이상이어야 합니다.').
				matches(
						/^(?=.*[a-z-A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
						'비밀번호에는 영문자, 숫자, 특수문자가 최소한 하나씩 포함되어야 합니다.',
				),
		confirmPassword: yup.string().
				oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').
				required('비밀번호를 입력하세요.'),
		nickname: yup.string().required('닉네임을 입력하세요.'),
		birthRange: yup.string().required('연령대를 선택하세요.'),
		gender: yup.string().required('성별을 선택하세요.'),
	});

	// React Hook Form 사용
	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '@gmail.com',
		},
	});

	// 폼 제출 처리 함수
	const onSubmit: SubmitHandler = (data) => {
		const {email, password, nickname, birthRange, gender} = data;
		console.log('회원가입 데이터:', data);

		axios.post('https://백엔드URL/api/signup', { email, password, nickname, birthRange, gender })
		.then(response => {
			console.log('회원가입 성공', response.data);
			// 성공했을 때의 처리를 여기에 추가
			navigate('/'); // 회원가입이 성공하면 '/'로 이동
		})
		.catch(error => {
			console.log('회원가입 실패 ', error);
			// 실패했을 때의 처리를 여기에 추가
		});
	};

	return (
			<>
				<Nav/>
				<Container component="main" maxWidth="xs">
					<Grid
							container
							spacing={2}
							direction="column"
							justifyContent="center"
							alignItems="center"
							style={{minHeight: '100vh'}}
					>
						<Avatar sx={{bgcolor: '#1a237e'}}/>
						<Grid item>
							<Typography variant="h4">Sign Up</Typography>
						</Grid>

						<Grid item>
							<form onSubmit={handleSubmit(onSubmit)}>
								<TextField
										label="이메일"
										variant="outlined"
										{...register('email')}
										error={!!errors.email}
										helperText={errors.email?.message}
										fullWidth
										margin="normal"
								/>

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
										error={!!errors.nickname}
										helperText={errors.nickname?.message}
										fullWidth
										margin="normal"
								/>

								<FormControl variant="outlined" fullWidth margin="normal">
									<InputLabel>연령대</InputLabel>
									<Select
											label="연령대를 선택하세요"
											{...register('birthRange')}
											error={!!errors.birthRange}
											displayEmpty
									>
										<MenuItem value="" disabled>
											연령대를 선택하세요
										</MenuItem>
										<MenuItem value="20">20대</MenuItem>
										<MenuItem value="30">30대</MenuItem>
										<MenuItem value="40">40대</MenuItem>
										<MenuItem value="50">50대</MenuItem>
									</Select>
									{errors.birthRange && (
											<Typography variant="caption" color="error">
												{errors.birthRange.message}
											</Typography>
									)}
								</FormControl>

								<FormControl component="fieldset" error={!!errors.gender}
								             fullWidth margin="normal">
									<RadioGroup row aria-label="gender">
										<FormControlLabel value="male"
										                  control={<Radio {...register('gender')}/>}
										                  label="남성"/>
										<FormControlLabel value="female"
										                  control={<Radio {...register('gender')}/>}
										                  label="여성"/>
									</RadioGroup>
									{errors.gender && (
											<Typography variant="caption" color="error">
												{errors.gender.message}
											</Typography>
									)}
								</FormControl>

								<Button
										type="submit"
										fullWidth
										variant="contained"
										sx={{mt: 3, mb: 2}}
										size="large"
								> 회원가입</Button>
							</form>
						</Grid>
					</Grid>
				</Container>
			</>
	);
};

export default SignUp;
