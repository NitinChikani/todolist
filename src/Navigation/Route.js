import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';

const Stack = createStackNavigator();

const Route = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Route;
