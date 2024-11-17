import React from 'react';
import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className={`header ${style.header}`}>
            <div className={style.header_content}>
                <div className={style.header_text}>
                    <h1 className="mt-3">
                        <i className={`fa fa-${props.icon}`}></i> {props.title}
                    </h1>
                    <p className='text-gray-500 ml-0'>{props.subtitle}</p>
                </div>
                <div className={style.header_actions}>
                    {props.SearchBar && <props.SearchBar />}
                    {props.AddButton && <props.AddButton route ={`${props.addButtonRoute}`} text={`${props.text}`} />}
                </div>
            </div>
            <hr className={style.divider} />
        </header>
    );
};

export default Header;
