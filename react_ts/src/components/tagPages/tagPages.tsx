import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './tagPages.scss';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

interface Props {
    history: any;
    location: any;
}

const TagPages: FC<Props> = (props) => {
    const { location, history } = props;
    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);

    const [tagsData, setTagsData] = useState<any[]>([]);

    const initData = (id?: number) => {

    }

    useEffect(() => {
        console.log(state)
    }, [state])

    return (
        <div className={styles.catePages_wrap}>
            <h1 className={styles.header}>标签</h1>
            <p className={styles.header_text}>共 {tagsData.length} 个标签</p>
            <ul className={styles.cate_title_wrap}>
                <li
                    className={styles.cate_title_item}
                >全部</li>
            </ul>
        </div>
    )
}

export default withRouter(TagPages);