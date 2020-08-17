import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Router>
          <Routes />
        </Router>
      </AppProvider>

      <GlobalStyles />
    </>
  );
};

export default App;
