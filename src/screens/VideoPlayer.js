import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import {colors, constants, fullHeight, fullWidth, scale, scaleFont, verticalScale} from '../utils';
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
import Env from "../env";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { diffInDays } from '../api/helper';
import Image from '../components/Image';

const VideoPlayer = (props) => {

    const hasUserPaid = () => {
        const {user} = props.auth || {};
        const diff = diffInDays(new Date(), user?.period_end? new Date(user.period_end): null);
        return diff >= 0;
    }

    const data = props?.route?.params.param1;
    const seriesData = props?.route?.params.param2 || {};
    let ismovie = false;
    if (data?.category_type){
        ismovie = data?.category_type === 'movie';
    } else {
        ismovie = data?.type === 'movie';
    }
    const [playing, setPlaying] = useState(null);
    const [download, setdownload] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [poster, setPoster] = useState(null);
    const [player, setPlayer] = useState(null);
    const [episode, setEpisode] = useState(null);
    const [hasPaid, setHasPaid] = useState();
    const [currentTime, setCurrentTime] = useState(null);
    const seasoncount = 0;
    var seasonitem = [];
    for (let i = 0; i < seasoncount; i++) {
        seasonitem.push(1)
    }

    const payment = hasUserPaid();
    if (payment !== hasPaid){
        setHasPaid(payment);
    }
    
    useEffect(() => {
        if (ismovie){
            if (!data.downloaded){
                initWatchMovie(data.id)
                    .then(response => {
                        setCurrentTime(response.data.current_movie.current_movie);
                        setPoster(response.data.current_movie.poster);
                        if (response.data?.playlist?.playlist){
                            setPlaying(response.data?.playlist.playlist[0]);
                        }
                        setFetching(false);
                        setLoading(true);
                    }).catch(() => {
                    setFetching(false);
                });
            }
        } else {
            if (!data.downloaded){
                initWatchSerie(data.id, seriesData.episodeId)
                .then(response => {
                    setCurrentTime(response.data.current_episode.current_time);
                    if (response.data?.playlist?.playlist){
                        setPoster(response.data.current_episode.backdrop);
                        const episode = (response.data.current_season.filter(e => e.id === seriesData.episodeId) || [])[0];
                        if (episode){
                            setEpisode(episode);
                            const playing = ((response.data?.playlist?.playlist || []).filter(v => v.VideoNumber === episode.episode_number) || [])[0];
                            if (playing){
                                setPlaying(playing);
                            }

                        }

                        setFetching(false);
                        setLoading(true);
                    }
                    setFetching(false);
                }).catch(() => {
                setFetching(false);
            });
          }
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
        if (data.downloaded) return data.url;
        return playing.sources[0].file;
    };

    const onPlayerReady = () => {
        if (data.current_time || currentTime){
            player.seek(parseInt(currentTime || data.current_time));
        }
        setLoading(false);
    };

    const onProgress = (progress) => {
        if (Math.floor(progress.currentTime)){
            if (ismovie){
                props.initUpdateRecentAction(data.id, data.duration_time ? data.duration_time : Math.floor(progress.seekableDuration), Math.floor(progress.currentTime), data._id);
            } else {
                props.initUpdateSerieRecentAction(data.id, data.episodeId? data.episodeId : seriesData.episodeId, Math.floor(progress.seekableDuration), Math.floor(progress.currentTime), data._id);
            }
        }
    };

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"dark-content"} backgroundColor={"black"} hidden={true} translucent={false}
            />
            {
                (fetching && !data.downloaded) || loading? (
                    <View style={{
                        flex: 1,
                        alignSelf: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        height: fullHeight,
                        position: 'absolute',
                        width: fullWidth,
                        backgroundColor: 'rgba(0,0,0,.7)',
                        justifyContent: "center",
                        zIndex: 1000
                    }}>
                        <ActivityIndicator style={{
                            marginLeft: 15
                        }} size="large" color={colors.primary}/>
                    </View>
                ): null
            }
            <View style={{
                flex: 1,
                justifyContent: "center"
            }} >
                {
                    (playing || data.downloaded) && hasPaid ? <Video source={{ uri: getVideoURL() }}   // Can be a URL or a local file.
                                     controls={true}
                                     fullscreenOrientation={"landscape"}
                                     fullscreen={true}
                                     fullscreenAutorotate={true}
                                     onLoad={onPlayerReady}
                                     onProgress={onProgress}
                                     ref={ref => setPlayer(ref)}
                                     progressUpdateInterval={20000}
                                     style={{ flex: 1}} />: null
                }
                {
                     (playing || data.downloaded) && !hasPaid ? (<View>
                        <View style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,.7)",
                            position: "absolute",
                            zIndex: 1000,
                            height: fullHeight,
                            width: fullWidth
                        }}>
                            <View style={{ position: 'absolute', zIndex: 1, top: verticalScale(40) }}>
                                <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
                            </View>
                            <Text
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                    padding: 10,
                                    color: colors.black,
                                    borderRadius: 5,
                                    marginBottom: 15
                                }}>
                                    Veuillez noter que votre abonnement actuel a expiré. Si vous avez déjà effectué un paiement, il sera attribué sous peu.
                                    Sinon, vous pouvez vous réabonner en cliquant sur le bouton ci-dessous.
                            </Text>
            
                            <TouchableOpacity onPress={() => props.navigation.navigate("SubscriptionScreen", { })} style={{ flexDirection: 'row',
                            backgroundColor: colors.statementGreenColour,
                            maxWidth: 100,
                            width: scale(150),
                            height: verticalScale(40),
                            borderRadius: verticalScale(12),
                            justifyContent: 'center',
                            alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_BOLD }}> Se Réabonner </Text>
                        </TouchableOpacity>
                        
                        </View>
                        <Image source={{
                                    uri: poster
                                }} style={{
                                    height: fullHeight,
                                    width: fullWidth,
                                    borderRadius: verticalScale(6)
                                }}/>
                     </View>): null
                }
            </View>
            <View style={{ position: 'absolute', zIndex: 1001, top: verticalScale(40) }}>
                <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initUpdateRecentAction,
        initUpdateSerieRecentAction
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
