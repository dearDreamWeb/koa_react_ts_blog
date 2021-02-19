import React, { FC, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';
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
          <div className="App">
            <aside className='app_aside_left'>
              <AppAsideLeft />
            </aside>
            <main className='app_main'>
              <div className='app_main_wrap'>
                2
            </div>
            </main>
            <aside className='app_aside_right'>3</aside>
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
