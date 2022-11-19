import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { colors, scaleFont, verticalScale, constants } from '../utils'
import Icon from "react-native-vector-icons/Ionicons";
import {bindActionCreators} from "redux";
import {
    initTokenLogin as initTokenLoginCreator
} from "../actions/login";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SplashScreen = (props) => {

    useEffect( () => {
        async function tokenLogin() {
            const token = await AsyncStorage.getItem('apiToken');
            if (token){
                // props.initTokenLoginCreator(token);
            }
        }
        if (!props.auth.loggedIn){
            tokenLogin();
        }
        setTimeout(() => {
            props.navigation.navigate("OnboardingStories")
        }, 3000)
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.black, justifyContent: 'center', alignItems: 'center' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="play-circle" size={verticalScale(70)} color={colors.green} />
                <Text style={{ color: colors.green, fontSize: scaleFont(50), fontFamily: constants.OPENSANS_FONT_BOLD }}>Ilus</Text>
            </View>
            <View style={{position: "absolute", bottom: 0}}>
                <ActivityIndicator size="large" color={colors.green}  />
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({initTokenLoginCreator}, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
