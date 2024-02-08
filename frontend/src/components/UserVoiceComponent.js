import React from 'react';
import Avatar from '@mui/material/Avatar';

const UserVoiceComponent = ({ user, isCurrent, stream }) => {
    return (
        <div style={{
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: `2px solid ${isCurrent ? 'blue' : 'grey'}`,
            borderRadius: '10px',
            padding: '10px'
        }}>
            {stream ? (
                <div id={`stream-${user.nickname}`} style={{ width: '100px', height: '100px' }}>
                    {/* Stream video will be attached here */}
                </div>
            ) : (
                <Avatar src={user.profile || 'default_profile_picture_url'} style={{ width: '100px', height: '100px' }} />
            )}
            <div style={{ marginTop: '5px' }}>{user.nickname}</div>
        </div>
    );
};

export default UserVoiceComponent;