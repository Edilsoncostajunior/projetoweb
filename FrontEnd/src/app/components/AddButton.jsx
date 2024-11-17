import React from 'react';
import { useRouter } from 'next/navigation';
import style from './AddButton.module.css';

const AddButton = ({ route, text }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <button className={`${style.add_button}`} onClick={handleClick}>
            {text}
        </button>
    );
};

export default AddButton;
