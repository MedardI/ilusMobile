import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';

// 
const Stack = createNativeStackNavigator();

const AuthStack = () => {



    return (
        <Stack.Navigator
            screenOptions={{ animation: 'slide_from_right' }} >
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AuthStack;
