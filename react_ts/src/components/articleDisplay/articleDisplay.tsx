import React, { FC, useRef, useEffect, useState, useContext } from 'react';
import styles from './articleDisplay.scss';
import { withRouter } from 'react-router-dom';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { getArticlePreNext } from '../../service/api/articles';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
    match: any;
    history: any;
}

const ArticleDisplay: FC<Props> = (props) => {
    const { match, history } = props;
    const [articleInfo, setArticleInfo] = useState<any>({});
    const [prevNext, setPrevNext] = useState<any[]>([]);

    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);

    const articleWrap = useRef<HTMLElement>(null);

    useEffect(() => {
        getArticlePreNext({ articleId: match.params.id }).then((res) => {
            if (res.success) {
                setPrevNext([res.prevInfo, res.nextInfo])
            }
        }).catch(err => console.log(err));
    }, [match.params.id])

    useEffect(() => {
        if (state.articles.length > 0) {
            state.articles.forEach((item: any) => {
                if (item.articleId === match.params.id) {
                    setArticleInfo(item);
                }
            })
        }
    }, [state, match.params.id])

    useEffect(() => {
        articleWrap.current!.innerHTML = articleInfo.articleContent;
    }, [articleInfo])

    return (
        <div className={styles.article_wrap}>
            <h1 className={styles.article_title}>{articleInfo && articleInfo.articleTitle}</h1>
            <p className={styles.article_date}>发表于 {articleInfo && moment(articleInfo.createdDate).format('YYYY-MM-DD HH:mm:ss')}</p>
            <main ref={articleWrap}></main>
            <ul className={styles.article_prevNext}>
                {
                    prevNext.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={styles.article_prevNext_item}
                                onClick={() => history.push(`/article/${item.articleId}`)}
                            >
                                {index === 0 && item ? <FontAwesomeIcon icon={faChevronLeft} /> : ''}
                                <span className={styles.article_prevNext_item_text}>
                                    {
                                        index === 0
                                            ? item ? `上一篇：${item.title}` : ''
                                            : item ? `下一篇：${item.title}` : ''
                                    }

                                </span>
                                {index === 1 && item ? <FontAwesomeIcon icon={faChevronRight} /> : ''}
                            </li>
                        )
                    })
                }
                {/* {
                    prevNext.prev
                        ? (
                            <li className={styles.article_prevNext_item}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <span className={styles.article_prevNext_item_text}>
                                    上一篇：{prevNext.prev.title}
                                </span>
                            </li>
                        )
                        : ''
                }
                {
                    prevNext.next
                        ? (
                            <li className={styles.article_prevNext_item}>
                                <span className={styles.article_prevNext_item_text}>
                                    下一篇：{prevNext.next.title}
                                </span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </li>
                        )
                        : ''
                } */}
            </ul>
        </div>
    )
}

export default withRouter(ArticleDisplay);