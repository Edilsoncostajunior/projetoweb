import React from 'react';
import UserListItem from './UserListItem';
import './UserList.module.css';

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            {users.map((user, index) => (
                <UserListItem key={index} user={user} />
            ))}
        </div>
    );
};

export default UserList;
