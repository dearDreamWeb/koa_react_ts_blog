import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './appAsideLeft.scss';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faHome, faSearch, faTags, faFolder, faArchive } from '@fortawesome/free-solid-svg-icons';

const AppAsideLeft: FC<{}> = () => {

    const lists = [
        {
            key: '0',
            icon: faHome,
            text: '首页',
            path: '/'
        },
        {
            key: '1',
            icon: faArchive,
            text: '归档',
            path: '/archive'
        },
        {
            key: '2',
            icon: faFolder,
            text: '分类',
            path: '/categories'
        },
        {
            key: '3',
            icon: faTags,
            text: '标签',
            path: '/tags'
        },
        {
            key: '4',
            icon: faSearch,
            text: '搜索',
            path: '/'
        }
    ]

    return (
        <div className={styles.aside_left_container}>
            <div className={styles.aside_left_userInfo}>
                <i className={styles.user_avatar}></i>
                <p className={styles.user_nickname_wrap}>
                    <Link to='/about' className={styles.user_nickname_text}>会飞的猪</Link>
                </p>
                <p className={styles.user_desc}>愿世上再无bug！</p>
                <p className={styles.user_desc}>
                    <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.user_desc_icon} />
                    浙江 杭州
                </p>
            </div>
            <ul className={styles.nav_wrap}>
                {
                    lists.map((item) => {
                        return (
                            <li key={item.key} className={styles.nav_item}>
                                <Link key={item.key} to={item.path} className={styles.nav_item_wrap}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className={styles.nav_item_text}>{item.text}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default AppAsideLeft;
