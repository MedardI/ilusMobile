// import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from "react-native-vector-icons/FontAwesome";


import SplashScreen from '../screens/SplashScreen';
import OnboardingStories from '../screens/OnboardingStories';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpVerification from '../screens/OtpVerification';
import SocialSignIn from '../screens/SocialSignIn';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import WishList from '../screens/WishList';
import Search from '../screens/Search';
import EditProfile from '../screens/EditProfile';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import PaymentMethod from '../screens/PaymentMethod';
import Support from '../screens/Support';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import PlayerScreen from '../screens/PlayerScreen';
import ReviewPage from '../screens/ReviewPage';
import TileLists from '../screens/TileLists';
import Downloads from '../screens/Downloads';
import VideoPlayer from '../screens/VideoPlayer';
import Settings from '../screens/Settings';

import { colors, verticalScale, scale, scaleFont } from "../utils"


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();



const BottomTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Dashboard'
            tabBarColor={colors.black}
            shifting={true}
            activeColor={colors.green}
            inactiveColor={colors.greyColour}
            barStyle={{ backgroundColor: colors.black }}
            screenOptions={styles.tabStyle} >
            <Tab.Screen name="Dashboard" component={Dashboard} options={styles.Dashboard} />
            <Tab.Screen name="Download" component={Downloads} options={styles.Download} />
            <Tab.Screen name="Wishlist" component={WishList} options={styles.WishList} />
            <Tab.Screen name="Profile" component={Profile} options={styles.Profile} />
        </Tab.Navigator>
    );
};


const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName="SplashScreen"
            screenOptions={{ animation: 'slide_from_right', }} >
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false, animation: "fade_from_bottom" }} />
            <Stack.Screen name="OnboardingStories" component={OnboardingStories} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
            <Stack.Screen name="Socialsignin" component={SocialSignIn} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{ headerShown: false }} />
            <Stack.Screen name="Support" component={Support} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
            <Stack.Screen name="PlayerScreen" component={PlayerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ReviewPage" component={ReviewPage} options={{ headerShown: false }} />
            <Stack.Screen name="TileList" component={TileLists} options={{ headerShown: false }} />
            <Stack.Screen name="search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
    );

};
export default AppStack;

const styles = StyleSheet.create({

    tabStyle: {
        borderTopWidth: 0,
        headerShown: false,
    },
    Dashboard: {
        tabBarLabel: 'Découvrir',
        color: colors.black,
        tabBarLabelStyle: {
            paddingBottom: 0,

        },
        tabBarStyle: { borderTopWidth: 0, height: (Platform.OS === 'ios') ? verticalScale(84) : verticalScale(54), },
        tabBarIcon: ({ focused }) => {
            return (
                <FontAwesome name="home" color={focused ? colors.green : colors.greyColour} size={verticalScale(20)} />
            )
        }
    },
    Search: {

        tabBarLabel: 'Search',
        color: colors.black,
        tabBarLabelStyle: {
            paddingBottom: 0
        },
        tabBarStyle: { borderTopWidth: 0, height: (Platform.OS === 'ios') ? verticalScale(84) : verticalScale(54), },
        tabBarIcon: ({ focused }) => {
            return (
                <FontAwesome name="search" color={focused ? colors.green : colors.greyColour} size={verticalScale(20)} />
            )
        }

    },
    Download: {
        tabBarLabel: 'Téléchargements',
        color: colors.black,
        tabBarLabelStyle: {
            paddingBottom: 0
        },
        tabBarStyle: { borderTopWidth: 0, height: (Platform.OS === 'ios') ? verticalScale(84) : verticalScale(54), },
        tabBarIcon: ({ focused }) => {
            return (
                <FontAwesome name="download" color={focused ? colors.green : colors.greyColour} size={verticalScale(20)} />
            )
        }

    },
    WishList: {

        tabBarLabel: 'Favoris',
        color: colors.black,
        tabBarLabelStyle: {
            paddingBottom: 0
        },
        tabBarStyle: { borderTopWidth: 0, height: (Platform.OS === 'ios') ? verticalScale(84) : verticalScale(54), },
        tabBarIcon: ({ focused }) => {
            return (
                <FontAwesome name="heart" color={focused ? colors.green : colors.greyColour} size={verticalScale(18)} />
            )
        }

    },
    Profile: {
        tabBarLabel: 'Profile',
        tabBarStyle: { borderTopWidth: 0, height: (Platform.OS === 'ios') ? verticalScale(84) : verticalScale(54), },
        tabBarIcon: ({ focused }) => {
            return (
                <FontAwesome name="user" color={focused ? colors.green : colors.greyColour} size={verticalScale(20)} />
            )
        }

    }

})
