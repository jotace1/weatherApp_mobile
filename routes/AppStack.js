import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchCity from '../pages/SearchCity';
import Dashboard from '../pages/Dashboard';


const App = createStackNavigator();

const AppRoutes = () => (
    <App.Navigator>

    <App.Screen name="SearchCity" component={SearchCity} options={{ title: 'Search' }} />
    <App.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />

  </App.Navigator>
);

export default AppRoutes;