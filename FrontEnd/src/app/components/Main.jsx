import React from 'react';
import style from './Main.module.css';

const Main = (props) => {
    return (
        <React.StrictMode>
            <main className={`content mx-1 max-w-screen-2xl ${style.main_content}`}>
                <div className={`${style.local_div}`}>
                    <div className={style.content}>
                        {props.children}
                    </div>
                </div>
            </main>
        </React.StrictMode>
    );
};

export default Main;
