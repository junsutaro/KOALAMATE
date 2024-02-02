import React from 'react'
import {Avatar, Chip, Typography} from '@mui/material';

const FollowItem = ({id, nickname, birthRange, gender, imgSrc}) => {
	return (
			<>
				<Avatar src={imgSrc} alt="프로필 이미지"/>
				<Typography sx={{fontWeight: "bold"}}>{nickname}</Typography>
				<Chip>{birthRange}대</Chip>
				<Chip>{gender}</Chip>
			</>

	)
}
export default FollowItem