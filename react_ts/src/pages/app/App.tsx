import React, { FC, useEffect, useState, useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.scss';
import { message } from 'antd';
import { cateTags } from '../../service/api/articles';
import AppAsideLeft from '../../components/appAsideLeft/appAsideLeft';
import AppAsideRight from '../../components/appAsideRight/appAsideRight';
import AppCenter from '../../components/appCenter/appCenter';
import CatePages from '../../components/catePages/catePages';
import ArticleDisplay from '../../components/articleDisplay/articleDisplay';
import Editor from '../../components/editor/editor';
import { reducer, ContextData, initData } from "../../useReducer" //引入useReducer文件


const App: FC<{}> = () => {

  // <!-- 获取是state和dispatch -->
  const [state, dispatch] = useReducer(reducer, initData);

  useEffect(() => {
    initAllData();
  }, [])

  const initAllData = () => {
    cateTags({}).then((res: any) => {
      if (!res.success) {
        message.info(res.msg);
        return;
      }
      dispatch({
        type: 'saveState',
        payload: {
          categories: res.categories,
          tags: res.tags,
          articles: res.articles
        }
      })
    }).catch(err => console.log(err))
  }

  return (
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
      <Router>
        <Switch>
          <Route path='/edit' component={Editor}></Route>
          <Route path='/'>
            <div className={styles.app}>
              <aside className={styles.app_aside_left}>
                <AppAsideLeft />
              </aside>
              <main className={styles.app_main}>
                <Switch>
                  <Route path='/article/:id'>
                    <ArticleDisplay />
                  </Route>
                  <Route path='/categories'>
                    <CatePages />
                  </Route>
                  <Route path='/'>
                    <AppCenter />
                  </Route>
                </Switch>
              </main>
              <aside className={styles.app_aside_right}>
                <AppAsideRight />
              </aside>
            </div>
          </Route>
        </Switch>
      </Router>
    </ContextData.Provider>
  );
}

export default App;
