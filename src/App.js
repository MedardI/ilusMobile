import React from 'react';
import Routes from './navigation/Routes';
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import  store from "./appStore";

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>

    );
};

export default App;
