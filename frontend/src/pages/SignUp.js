import React from 'react';
import Nav from 'components/Nav';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';


const SignUp = () => {
	// Yup 스키마 정의
	const schema = yup.object().shape({
		email: yup.string().email('올바른 이메일 주소를 입력하세요.').required('이메일을 입력하세요.'),
		password: yup.string().required('비밀번호를 입력하세요.'),
		confirmPassword: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호를 입력하세요.'),
		nickname: yup.string().required('닉네임을 입력하세요.'),
		birthRange : yup.string().required('연령대를 선택하세요.'),
		gender: yup.string().required('성별을 선택하세요.'),
	})

	// React Hook Form 사용
	const
			{ register,
				handleSubmit,
				formState: { errors },
			} = useForm({
		resolver: yupResolver(schema,)
	})

	// 폼 제출 처리 함수
	const onSubmit: SubmitHandler = (data) => {
		console.log('회원가입 데이터:', data)
	}


	return (
			<>
				<Nav/>
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label>이메일 : </label>
						<input type="text" {...register('email')}/>
						{errors.email && <Typography variant="caption" color="error">{errors.email.message}</Typography>}
					</div>

					<div>
						<label>비밀번호 : </label>
						<input type="password" {...register('password')}/>
						{errors.password && <Typography variant="caption" color="error">{errors.password.message}</Typography>}
					</div>

					<div>
						<label>비밀번호 확인 : </label>
						<input type="password" {...register('confirmPassword')}/>
						{errors.confirmPassword &&
								<Typography variant="caption" color="error">{errors.confirmPassword.message}</Typography>}
					</div>

					<div>
						<label>닉네임 : </label>
						<input type="text" {...register('nickname')}/>
						{errors.nickname && <Typography variant="caption" color="error">{errors.nickname.message}</Typography>}
					</div>


					<div>
						<label>연령대 : </label>
						<select {...register('birthRange')}>
							<option value="">연령대를 선택하세요</option>
							<option value="20">20대</option>
							<option value="30">30대</option>
							<option value="40">40대</option>
							<option value="50">50대</option>
							<option value="50">60대 이상</option>
						</select>
						{errors.birthRange && <Typography variant="caption" color="error">{errors.birthRange.message}</Typography>}
					</div>

					<div>
						<label>성별 : </label>
						<span>
							<label>
								<input type="radio" value="male" {...register('gender')} /> 남성
							</label>
							<label>
								<input type="radio" value="female" {...register('gender')} /> 여성
							</label>
						</span>
						{errors.birthRange && <Typography variant="caption" color="error">{errors.birthRange.message}</Typography>}
					</div>
					<button type="submit">가입하기</button>

				</form>
			</>
	)
}
export default SignUp