import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './appCenter.scss';
import { withRouter } from 'react-router-dom';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faFolder, faTag, faEye, faCalculator } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface Props {
    history: any;
}

const AppCenter: FC<Props> = (props) => {
    const { history } = props;
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
                            <h1
                                className={styles.lists_item_title}
                                onClick={() => history.push(`/article/${item.articleId}`)}
                            >
                                {item.articleTitle}
                            </h1>
                            <ul className={styles.lists_item_footer}>
                                <li className={styles.lists_item_footer_item}>
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                    {moment(item.createdDate).format('YYYY-MM-DD')}
                                </li>
                                <li className={styles.lists_item_footer_item}>
                                    <FontAwesomeIcon icon={faFolder} />
                                    <span className={styles.categoryName}>
                                        {item.categories[0].categoryName}
                                    </span>
                                </li>
                                <li className={styles.lists_item_footer_item}>
                                    <FontAwesomeIcon icon={faTag} />
                                    {item.tags.map((tagItem: any) => {
                                        return (<span
                                            key={tagItem.tagId}
                                            className={styles.tag_item}>{tagItem.tagName}</span>)
                                    })}
                                </li>
                                <li className={styles.lists_item_footer_item}>
                                    <FontAwesomeIcon icon={faCalculator} />
                                    字数统计: {item.articleLenght}(字)
                                    </li>
                                <li className={styles.lists_item_footer_item}>
                                    <FontAwesomeIcon icon={faEye} />
                                    阅读数量: {item.readCount}
                                </li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default withRouter(AppCenter);