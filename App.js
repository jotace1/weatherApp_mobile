import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes/AppStack';
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
