import React, { FC, useEffect, useState, useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.scss';
import { api, getInfo } from '../../service/api/user';
import AppAsideLeft from '../../components/appAsideLeft/appAsideLeft';
import AppAsideRight from '../../components/appAsideRight/appAsideRight';
import Editor from '../../components/editor/editor';
import { reducer, ContextData, initData } from "../../useReducer" //引入useReducer文件


const App: FC<{}> = () => {

  // <!-- 获取是state和dispatch -->
  const [state, dispatch] = useReducer(reducer, initData);

  const send = () => {
    api({ name: 'wxb' }).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
      <Router>
        <Switch>
          <Route path='/edit'>
            <Editor />
          </Route>
          <Route path='/'>
            <div className={styles.app}>
              <aside className={styles.app_aside_left}>
                <AppAsideLeft />
              </aside>
              <main className={styles.app_main}>
                <Route path='/'>
                  2
                </Route>
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
