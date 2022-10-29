import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, } from 'react-native';
import { colors, scaleFont, verticalScale, constants } from '../utils'
import Icon from "react-native-vector-icons/Ionicons";



const SplashScreen = (props) => {

    useEffect(() => {
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

        </View>
    );
};

export default SplashScreen;
