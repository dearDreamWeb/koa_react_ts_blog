import React, { FC, useEffect, useState, useContext } from 'react';
import styles from './catePages.scss';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { queryAllCategory } from '../../service/api/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

interface Props {
    history: any;
    location: any;
}

const CatePages: FC<Props> = (props) => {
    const { location, history } = props;
    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);

    const [cateData, setCateData] = useState<any>({});

    const initData = (id?: number) => {
        queryAllCategory({ id }).then((res) => {
            if (res.success) {
                setCateData(res.data);
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        initData(location.state ? location.state.id : null);
    }, [location.state])

    return (
        <div className={styles.catePages_wrap}>
            <h1 className={styles.header}>分类</h1>
            <p className={styles.header_text}>共 {cateData.total} 个分类</p>
            <ul className={styles.cate_title_wrap}>
                <li
                    className={styles.cate_title_item}
                    onClick={() => initData()}
                >全部</li>
                {
                    cateData.cateLists && cateData.cateLists.map((item: any) => {
                        return (
                            <li
                                key={item.categoryId}
                                className={styles.cate_title_item}
                                onClick={() => initData(item.categoryId)}
                            >
                                {item.categoryName}
                            </li>
                        )
                    })
                }
            </ul>
            <ul className={styles.cate_wrap}>
                {
                    cateData.cateLists && cateData.cateLists.map((item: any, index: number) => {
                        return (
                            <li
                                key={item.categoryId}
                                className={styles.cate_item}
                            >
                                <h2 className={styles.cate_item_title}>
                                    <FontAwesomeIcon icon={faFolder} />
                                    <span className={styles.cate_item_title_name}>{item.categoryName}</span>
                                    <span className={styles.cate_item_total}>({item.total}篇)</span>
                                </h2>
                                <ul className={styles.cate_item_lists_wrap}>
                                    {
                                        item.lists.map((list: any) => {
                                            return (
                                                <li
                                                    key={list.articleId}
                                                    className={styles.cate_item_list}
                                                    onClick={() => history.push({
                                                        pathname: `/article/${list.articleId}`,
                                                        state: { type: 'category', typeId: item.categoryId }
                                                    })}
                                                >
                                                    <span>{moment(list.createdDate).format('YYYY-MM-DD')}</span>
                                                    <span>{list.articleTitle}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default withRouter(CatePages);