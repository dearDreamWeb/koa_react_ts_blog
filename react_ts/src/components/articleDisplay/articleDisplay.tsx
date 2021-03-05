import React, { FC, useRef, useEffect, useState, useContext } from 'react';
import styles from './articleDisplay.scss';
import { withRouter } from 'react-router-dom';
import { ContextData } from "../../useReducer" //引入useReducer文件
import { getArticlePreNext, getArticleInfo } from '../../service/api/articles';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
    match: any;
    history: any;
    location: any;
}

const ArticleDisplay: FC<Props> = (props) => {
    const { match, history, location } = props;
    const [articleInfo, setArticleInfo] = useState<any>({});
    const [prevNext, setPrevNext] = useState<any[]>([]);

    // <!-- 获取是state和dispatch -->
    const { state, dispatch } = useContext<any>(ContextData);

    const articleWrap = useRef<HTMLElement>(null);

    useEffect(() => {
        console.log(location.state)
        getPreN(match.params.id, location.state ? location.state.type : null, location.state ? location.state.typeId : null);
        getArtInfo(match.params.id);
    }, [match.params.id, location.state])

    // 获取上一篇和下一篇
    const getPreN = (id: number, type: string | null, typeId: number | null) => {
        getArticlePreNext({ articleId: id, type, typeId }).then((res) => {
            if (res.success) {
                setPrevNext([res.prevInfo, res.nextInfo])
            }
        }).catch(err => console.log(err));
    }

    // 获取文章的信息
    const getArtInfo = (id: number) => {
        getArticleInfo({ articleId: id }).then((res) => {
            if (res.success) {
                setArticleInfo(res.info);
            }
        }).catch(err => console.log(err));
    }

    // 把文章填充进去
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
                                onClick={() => history.push({
                                    pathname: `/article/${item.articleId}`,
                                    state: {
                                        type: location.state ? location.state.type : null,
                                        typeId: location.state ? location.state.typeId : null
                                    }
                                })}
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
            </ul>
        </div>
    )
}

export default withRouter(ArticleDisplay);