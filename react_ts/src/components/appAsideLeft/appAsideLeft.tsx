import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './appAsideLeft.scss';

const AppAsideLeft: FC<{}> = () => {

    return (
        <div className="aside_left_container">
            <div className='aside_left_userInfo'>
                <i className='user_avatar'></i>
                <p className='user_nickname_wrap'>
                    <Link to='/about' className='user_nickname_text'>会飞的猪</Link>
                </p>
                <p className='user_desc'>愿世上再无bug！</p>
                <p className='user_desc'>浙江 杭州</p>
            </div>
        </div>
    );
}

export default AppAsideLeft;
