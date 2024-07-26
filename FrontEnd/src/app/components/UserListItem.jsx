import React from 'react';

const UserListItem = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.cpf}</td>
        </tr>
    );
};

export default UserListItem;
