import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './appCenter.scss';
import { reducer, ContextData, initData } from "../../useReducer" //引入useReducer文件

const AppCenter: FC<{}> = () => {
    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);
    return (
        <div className={styles.appCenter_wrap}>
            <ul className={styles.lists_wrap}>
                {state.articles.map((item: any) => {
                    return (
                        <li
                            key={item.articleId}
                            className={styles.lists_item}
                        >
                            <h1 className={styles.lists_item_title}>{item.articleTitle}</h1>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AppCenter;