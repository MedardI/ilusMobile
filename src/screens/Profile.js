import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { colors, verticalScale, scale, scaleFont, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { initLogout } from "../actions/login";

const Profile = (props) => {

    const Logo = require("../assets/images/LoginImage.jpeg")

    const handlelogout = () => {
        showModal()
    }

    const logOut = () => {
        props.initLogout();

        props.navigation.reset({
            index: 0,
            routes: [{ name: 'OnboardingStories' }],
        });
    }

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, }} onPress={hideModal} >

                <SafeAreaView />
                <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
                />


                {visible && (
                    <View style={{ flex: 1, position: 'absolute', left: scale(25), top: verticalScale(300), zIndex: 1, }}>
                        <View style={{ backgroundColor: colors.green, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, paddingVertical: verticalScale(8) }}>
                                Se déconnecter
                            </Text>
                        </View>
                        <View style={{ backgroundColor: colors.white, height: verticalScale(120), width: scale(320), alignSelf: 'center', borderBottomLeftRadius: verticalScale(6), borderBottomRightRadius: verticalScale(6), justifyContent: 'center', paddingHorizontal: scale(15) }}>
                            <Text style={{ textAlign: 'center', color: colors.text_primary, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                Êtes-vous sûr de vouloir vous déconnecter ?</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: scale(220), justifyContent: "flex-end", marginTop: verticalScale(5) }}>
                                <TouchableOpacity onPress={hideModal} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6) }}>
                                    <Text style={{ alignSelf: 'center', color: colors.green, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, marginRight: scale(15) }}>
                                        Non</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => logOut()} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(6) }}>
                                    <Text style={{ alignSelf: 'center', color: colors.primary_red, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_BOLD, }}>
                                        Oui</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                )}


                <Text
                    style={{
                        color: colors.white,
                        fontSize: scaleFont(22),
                        letterSpacing: 0.5,
                        height: verticalScale(48),
                        textAlignVertical: 'center',
                        marginLeft: scale(20),
                        fontFamily: constants.OPENSANS_FONT_SEMI_BOLD
                    }}
                >Profile</Text>
                <View style={{ width: scale(320), alignSelf: 'center', marginTop: verticalScale(10) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require("../assets/images/avatar.jpeg")} style={{ height: verticalScale(65), width: verticalScale(65), borderRadius: verticalScale(50), alignSelf: 'center', }} />
                        <View style={{ marginLeft: scale(30), height: verticalScale(50), justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>{props.auth?.user?.name}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("EditProfile")} style={{ flexDirection: 'row', marginTop: verticalScale(50) }}>
                        <MaterialIcons name="person" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Mon Profile</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={() => props.navigation.navigate("Settings")} style={{ flexDirection: 'row', marginTop: verticalScale(30) }}>*/}
                    {/*    <MaterialIcons name="settings" color={colors.green} size={verticalScale(22)} />*/}
                    {/*    <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Settings</Text>*/}
                    {/*</TouchableOpacity>*/}


                    <TouchableOpacity onPress={() => props.navigation.navigate("Download")} style={{ flexDirection: 'row', marginTop: verticalScale(30) }}>
                        <MaterialIcons name="cloud-download" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Téléchargements</Text>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={() => props.navigation.navigate("PrivacyPolicy")} style={{ flexDirection: 'row', marginTop: verticalScale(30) }}>*/}
                    {/*    <MaterialIcons name="policy" color={colors.green} size={verticalScale(22)} />*/}
                    {/*    <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Privacy Policy</Text>*/}
                    {/*</TouchableOpacity>*/}


                    <TouchableOpacity onPress={() => props.navigation.navigate("Support")} style={{ flexDirection: 'row', marginTop: verticalScale(30) }}>
                        <MaterialIcons name="mail" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Aide</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => handlelogout()} style={{ flexDirection: 'row', marginTop: verticalScale(30) }}>
                        <MaterialIcons name="logout" color={colors.green} size={verticalScale(22)} />
                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(20) }}>Se déconnecter</Text>
                    </TouchableOpacity>



                </View>

            </TouchableOpacity>
        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initLogout
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);