import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './appAsideLeft.scss';
import { Input } from 'antd';

const { Search } = Input;

const AppAsideLeft: FC<{}> = () => {

    return (
        <div className={styles.aside_left_container}>
            <div className={styles.aside_left_userInfo}>
                <i className={styles.user_avatar}></i>
                <p className={styles.user_nickname_wrap}>
                    <Link to='/about' className={styles.user_nickname_text}>会飞的猪</Link>
                </p>
                <p className={styles.user_desc}>愿世上再无bug！</p>
                <p className={styles.user_desc}>浙江 杭州</p>
                <Search placeholder="搜索" style={{ width: 230 }} onClick={() => console.log(11)} />
            </div>
        </div>
    );
}

export default AppAsideLeft;
