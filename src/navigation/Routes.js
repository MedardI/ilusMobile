import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

import AppStack from './AppStack';
import AuthStack from './AuthStack';


const Routes = (props) => {


    return (
        <NavigationContainer>
            {true ? <AppStack /> : <AuthStack />}
            <FlashMessage position="bottom" />
        </NavigationContainer>


    );
}

export default Routes;