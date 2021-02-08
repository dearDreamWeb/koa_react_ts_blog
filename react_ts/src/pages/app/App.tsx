import React, { FC, useEffect } from 'react';
import { api, getInfo } from '../../service/api/user';

const App: FC<{}> = () => {
  const send = () => {
    api({ name: 'wxb' }).then(res => console.log(res)).catch(err => console.log(err))
  }

  const _getInfo = () => {
    getInfo({ name: 'wxb' }).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button onClick={send}>发送</button>
      <button onClick={_getInfo}>接收</button>
    </div>
  );
}

export default App;
