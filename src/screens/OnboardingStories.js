import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors, scale, scaleFont, verticalScale, constants } from '../utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {bindActionCreators} from "redux";
import {initTokenLogin as initTokenLoginCreator} from "../actions/login";
import {connect} from "react-redux";


const slides = [
    {
        key: 1,
        title: 'Télécharger à tout moment!',
        text: 'Regardez des films et des séries en ligne ou téléchargez-les pour les visionner hors ligne',
        image: require('../assets/images/story1.jpeg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Regarder du contenu exclusif!',
        text: 'Des films classiques aux dernières séries, tous les meilleurs spectacles sur une platforme.',
        image: require('../assets/images/SecondStory.jpeg'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Diffusez sur n\'importe quel appareil Android!',
        text: 'Regardez sur n\'importe quel appareil Android',
        image: require('../assets/images/slides-logo.jpeg'),
        backgroundColor: '#22bcb5',
    }
];


const OnboardingStories = (props) => {

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: colors.black }}>
                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />
                <View style={{ marginTop: verticalScale(200), justifyContent: 'center', alignItems: 'center' }}>
                    {
                        item.key === 1 ?
                            <MaterialCommunityIcons name="download" color={colors.green} size={verticalScale(180)} />
                            :
                            item.key === 2 ?
                                <MaterialCommunityIcons name="motion-play" color={colors.green} size={verticalScale(180)} />
                                :
                                <MaterialCommunityIcons name="devices" color={colors.green} size={verticalScale(180)} />
                    }
                    <Text style={{ color: colors.green, fontSize: scaleFont(24), fontFamily: constants.OPENSANS_FONT_BOLD, alignSelf: "center", marginTop: verticalScale(10) }}>{item.title}</Text>
                    <Text style={{ color: colors.white, fontSize: scaleFont(14), width: scale(260), alignSelf: 'center', fontFamily: constants.OPENSANS_FONT_MEDIUM, textAlign: 'center', marginTop: verticalScale(10) }}>{item.text}</Text>

                </View>
            </View>
        );
    };

    const onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        if (props.auth.loggedIn){
            props.navigation.navigate("BottomTab");
        } else {
            props.navigation.navigate("LoginScreen");
        }

    };



    return <AppIntroSlider
        renderItem={(item) => renderItem(item)}
        data={slides}
        onDone={() => onDone()}
        dotStyle={{ backgroundColor: "white" }}
        activeDotStyle={{ backgroundColor: "green" }}
        showSkipButton={true}
        onSkip={() => onDone()}
        skipLabel="Connexion"
        doneLabel="Fini"
        nextLabel="Suivant"
        prevLabel="Précédent"
    />

};

const mapDispatchToProps = dispatch =>
    bindActionCreators({initTokenLoginCreator}, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStories);

