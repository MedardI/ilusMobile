import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import {colors, constants, fullHeight, scale, scaleFont, verticalScale} from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";
import Video from 'react-native-video';
import {
    initWatchMovie,
    initUpdateRecent as initUpdateRecentAction} from '../actions/movies';
import {
    initWatchSerie,
    initUpdateRecent as initUpdateSerieRecentAction
} from "../actions/series";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const VideoPlayer = (props) => {


    const data = props?.route?.params.param1;
    const seriesData = props?.route?.params.param2;
    const ismovie = data?.category_type === 'movie' || data?.type === 'movie';
    const [playing, setPlaying] = useState(null);
    const [download, setdownload] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [player, setPlayer] = useState(null);
    const [episode, setEpisode] = useState(null);
    const seasoncount = 0;
    var seasonitem = [];
    for (let i = 0; i < seasoncount; i++) {
        seasonitem.push(1)
    }

    console.log("logging data");
    console.log(data, ismovie);
    console.log(seriesData);

    useEffect(() => {
        if (ismovie){
            initWatchMovie(data.id)
                .then(response => {
                    if (response.data?.playlist?.playlist){
                        console.log(response.data?.playlist.playlist[0]);
                        setPlaying(response.data?.playlist.playlist[0]);
                    }
                    setFetching(false);
                }).catch(() => {
                    setFetching(false);
            });
        } else {
            console.log("Fetching seeries data");
            initWatchSerie(data.id, seriesData.episodeId)
                .then(response => {
                    console.log("Series response");
                    console.log(response);
                    if (response.data?.playlist?.playlist){
                        console.log(response.data.current_season);
                        const episode = (response.data.current_season.filter(e => e.id === seriesData.episodeId) || [])[0];
                        if (episode){
                            setEpisode(episode);
                            console.log(response.data?.playlist.playlist);
                            const playing = ((response.data?.playlist?.playlist || []).filter(v => v.VideoNumber === episode.episode_number) || [])[0];
                            console.log("playing this episode");
                            console.log(playing);
                            if (playing){
                                setPlaying(playing);
                            }

                        }

                        setFetching(false);
                    }
                    setFetching(false);
                }).catch(() => {
                setFetching(false);
            });
        }
    }, []);

    const downloaditem = () => {
        setdownload(!download);
        download ?
            showMessage({
                backgroundColor: colors.primary_red,
                message: "Download Stopped",
                type: "info",
            }) : showMessage({
                backgroundColor: colors.green,
                message: "Download Started",
                type: "info",
            })

    };

    const getVideoURL = () => {
        return playing.sources[0].file;
    };

    const onPlayerReady = () => {
        if (data.current_time){
            player.seek(parseInt(data.current_time));
        }
    };

    const onProgress = (progress) => {
        if (Math.floor(progress.currentTime)){
            if (ismovie){
                props.initUpdateRecentAction(data.id, data.duration_time, Math.floor(progress.currentTime));
            } else {
                props.initUpdateSerieRecentAction(data.id, seriesData.episodeId, Math.floor(progress.seekableDuration), Math.floor(progress.currentTime));
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} hidden={false} translucent={false}
            />
            {
                fetching? (
                    <View style={{
                        flex: 1,
                        alignSelf: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        height: fullHeight
                    }}>
                        <ActivityIndicator style={{
                            marginLeft: 15
                        }} size="large" color={colors.primary}/>
                    </View>
                ): null
            }
            <View style={{}} >
                {
                    playing ? <Video source={{ uri: getVideoURL() }}   // Can be a URL or a local file.
                                     controls={true}
                                     fullscreenOrientation={"landscape"}
                                     fullscreen={false}
                                     fullscreenAutorotate={true}
                                     onLoad={onPlayerReady}
                                     onProgress={onProgress}
                                     ref={ref => setPlayer(ref)}
                                     progressUpdateInterval={60000}
                                     style={{ width: scale(360), height: verticalScale(200), }} />: null
                }
            </View>
            <View style={{ position: 'absolute', zIndex: 1, top: verticalScale(40) }}>
                <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
            </View>

            <View style={{ alignSelf: 'center', flex: 1 }}>
                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} style={{}}>

                    <View style={{ width: scale(340), justifyContent: 'center', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(5) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(22), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>{data.name}</Text>
                            <TouchableOpacity onPress={() => downloaditem()} style={{ justifyContent: 'center', alignItems: 'center', marginRight: scale(10) }} >
                                <MaterialIcons name="file-download" color={download ? colors.green : colors.greyColour} size={verticalScale(26)} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginRight: scale(6) }}>{data.duration}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.genre}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.year}</Text>
                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginHorizontal: scale(6) }}>{data.language}</Text>


                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(20), marginTop: verticalScale(10) }}>

                    </View>

                    <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                            {data.overview}
                        </Text>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initUpdateRecentAction,
        initUpdateSerieRecentAction
    }, dispatch);

const mapStateToProps = ()  => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
