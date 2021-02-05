import React, { FC, useEffect } from 'react';
import axios from 'axios';

const App: FC<{}> = () => {
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3030/api',
      params: {
        name: 'wxb'
      }
    }).then(res => console.log(res)).catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      app
    </div>
  );
}

export default App;
