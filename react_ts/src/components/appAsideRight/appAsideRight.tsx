import React, { FC, useEffect, useState } from 'react';
import styles from './appAsideRight.scss';
import { goldArticles, githubArticles } from '../../service/api/resources';
import moment from 'moment';

const AppAsideRight: FC<{}> = () => {

    const [goldArt, setGoldArt] = useState<any[]>([]);
    const [githubArt, setGithubArt] = useState<any[]>([]);

    useEffect(() => {

        goldArticles({}).then((res) => {
            setGoldArt(res.data)
        }).catch(err => console.log(err))

        githubArticles({}).then((res) => {
            setGithubArt(res.data.slice(0, 5))
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className={styles.right_wrap}>
            <ul className={styles.cate_lists}>
                <li className={styles.gold_lists_wrap}>
                    <h1 className={styles.gold_desc}>Gitub本周热门</h1>
                    <ul className={styles.gold_lists}>
                        {githubArt.map((item) => {
                            return (
                                <li key={item.id} className={styles.gold_lists_item}>
                                    <a href={item.url} target='_blank'>
                                        <h2
                                            className={styles.gold_lists_item_title}
                                            title={item.reponame}
                                        >{item.reponame}</h2>
                                        <p className={styles.gold_lists_item_footer}>
                                            {item.username}&nbsp;&nbsp;{item.starCount}stars
                                        </p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </li>
                <li className={styles.gold_lists_wrap}>
                    <h1 className={styles.gold_desc}>掘金热门</h1>
                    <ul className={styles.gold_lists}>
                        {goldArt.map((item) => {
                            return (
                                <li key={item.id} className={styles.gold_lists_item}>
                                    <a href={item.url} target='_blank'>
                                        <h2
                                            className={styles.gold_lists_item_title}
                                            title={item.title}
                                        >{item.title}</h2>
                                        <p className={styles.gold_lists_item_footer}>
                                            {moment(item.date.iso).format('YYYY-MM-DD')}
                                            &nbsp;&nbsp;{item.user.username}
                                        </p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default AppAsideRight;