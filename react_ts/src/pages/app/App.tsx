import React, { FC, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.scss';
import { api, getInfo } from '../../service/api/user';
import AppAsideLeft from '../../components/appAsideLeft/appAsideLeft';

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
        <Route path='/'>
          <div className={styles.app}>
            <aside className={styles.app_aside_left}>
              <AppAsideLeft />
            </aside>
            <main className={styles.app_main}>
              <div>
                <Route path='/'>
                  2
                </Route>
              </div>
            </main>
            <aside className={styles.app_aside_right}>3</aside>
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
