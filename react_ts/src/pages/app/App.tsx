import React, { FC, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.scss';
import { api, getInfo } from '../../service/api/user';
import AppAsideLeft from '../../components/appAsideLeft/appAsideLeft';
import AppAsideRight from '../../components/appAsideRight/appAsideRight';
import Editor from '../../components/editor/editor';

const App: FC<{}> = () => {
  const send = () => {
    api({ name: 'wxb' }).then(res => console.log(res)).catch(err => console.log(err))
  }

  const _getInfo = () => {
    getInfo({ name: 'wxb' }).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
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

  );
}

export default App;
