import React, { useState, useRef, createRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import Image from "../components/Image";
import { colors, scaleFont, scale, verticalScale, constants } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useFocusEffect } from '@react-navigation/native';

import FlashMessage, { showMessage } from "react-native-flash-message";
import AppHeader from '../components/AppHeader';
import {getDatastore, getValidVideos, removeStored} from "../api/helper";
import Env from "../env";



const RenderEmptyComponent = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"}}>
            <Text style={{
                color: colors.white,
                textAlign: "center",
                paddingHorizontal: 15,
                fontSize: scaleFont(14)
            }}>
                Vous n'avez actuellement aucun téléchargement. Une fois que vous avez trouvé un film ou une série que vous aimez, téléchargez-le pour le visionner ultérieurement hors ligne.</Text>
        </View>
    )
};

const Downloads = (props) => {

    const [downloads, setDownloads] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            let updated = false;
            if (!updated){
                getDatastore().then( async (db) => {
                    await db.find({}, function (err, docs) {
                        getValidVideos(docs).then((videos) => {
                            setDownloads(videos);
                        });
                    });
                });
            }
            return () => {
                updated = true;
            };
        }, [])
    );

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    const deleteitem = (item, pos) => {
        item.close();
        showMessage({
            backgroundColor: colors.primary_red,
            message: "Le téléchargement a été supprimé",
            type: "info",
        });
        const removed = downloads[pos];
        removeStored({ _id: removed._id }, removed.id);
        const data = downloads.filter(d => d.id !== removed.id);
        setDownloads(data);
    };

    const convertRunTime = (time) => {
        if (!time) return '';
        const hours = Math.floor(time / 60);
        const min = Math.floor(time) - (hours * 60);

        return `${hours}h ${min}'`;
    };

    const play = (index) => {
        const data = downloads[index];
        delete data.createdAt;
        props.navigation.navigate("VideoPlayer", { param1: downloads[index]});
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <FlashMessage position={'bottom'} />

            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading="Téléchargements" navigation={() => props.navigation.goBack()} showicon={true} />

            <View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={downloads}
                    ListEmptyComponent={<RenderEmptyComponent/>}
                    renderItem={({ item, index }) => {
                        return (
                            <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                                <Swipeable
                                    ref={ref => item = ref}
                                    renderRightActions={() => {
                                        return (
                                            <TouchableOpacity onPress={() => play(index)}
                                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.green, width: scale(80), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                <TouchableOpacity
                                                    onPress={() => play(index)}
                                                    style={{ color: colors.white }}>
                                                    <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>JOUER</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    renderLeftActions={() => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                deleteitem(item, index)


                                            }}
                                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(80), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        deleteitem(item, index)
                                                    }
                                                    }
                                                    style={{ color: colors.white }}>
                                                    <Text style={{ color: colors.white, marginLeft: scale(6), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Supprimer</Text>
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    }}

                                >
                                    <TouchableOpacity onPress={() => play(index)} style={{ width: scale(340), backgroundColor: "#36454f", flexDirection: 'row', borderRadius: verticalScale(12) }}>
                                        <View style={{ borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }}>
                                            <Image source={
                                                {
                                                    uri: getPosterURL(item.poster)
                                                }
                                            } style={{ width: scale(100), height: verticalScale(110), borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }} />
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flex:1
                                        }}>
                                            <View style={{ justifyContent: 'space-between' }}>
                                                <View style={{ marginLeft: scale(10) }}>
                                                    <Text style={{ color: colors.white, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(5) }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                                        {item.genre}
                                                    </Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', marginLeft: scale(10) }}>
                                                    <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, }}>
                                                        {convertRunTime(item.runtime)}
                                                    </Text>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(10) }}>
                                                        <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />
                                                    </View>
                                                    <Text
                                                        style={{
                                                            color: colors.primary_red,
                                                            paddingLeft: 10,
                                                            paddingTop: 2,
                                                            fontSize: scaleFont(12),
                                                            fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, }}>
                                                        {`- ${item.daysLeft} jours!`}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Swipeable>
                            </GestureHandlerRootView>
                        )
                    }}
                />

            </View>

        </View>
    );
}

export default Downloads;
