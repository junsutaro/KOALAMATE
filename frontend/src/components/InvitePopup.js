import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// 초대 팝업창 컴포넌트
const InvitePopup = ({ open, onClose, users, onInvite }) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>초대하기</DialogTitle>
            <List>
                {users.map((user) => (
                    <ListItem button onClick={() => onInvite(user)} key={user.id}>
                        <ListItemText primary={user.nickname} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default InvitePopup;