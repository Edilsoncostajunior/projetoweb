import React from 'react';
import style from './AddButton.module.css';

const AddButton = ({ onClick }) => {
    return (
        <button className={`${style.add_button}`} onClick={onClick}>
            + Add User
        </button>
    );
};

export default AddButton;
