import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import {colors, scale, scaleFont, verticalScale, constants, fullHeight, fullWidth} from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import Env from "../env";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initMovie as getMovieAction} from "../actions/movies";
import {initSerie as getSerieAction} from "../actions/series";

const PlayerScreen = (props) => {
    const data = props.route.params.param;
    let ismovie = false;
    if (data.type){
        ismovie = data.type === 'movie';
    }
    if (data.category_type){
        ismovie = data.category_type === 'movie';
    }

    const [WishList, setWishList] = useState(false);
    const [download, setdownload] = useState(false);
    const [Clips, setClips] = useState(true);
    const [Seasons, setSeasons] = useState(true);
    const [selectedId, setSelectedId] = useState("1");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const [id, setId] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [episode, setEpisode] = useState(null);
    const [episodeInitialised, setEpisodeInitialised] = useState(false);
    const [error, setError] = useState("");

    if (!id){ setId(data.id)}

    const getMovie = (movieId) => {
        const dataId = movieId ? movieId : id;
        if (props.movies?.all?.list?.length){
            return props.movies?.all?.list.find(l => l.movie?.id === dataId);
        }
    };

    const getSerie = (serieId) => {
        const dataId = serieId ? serieId : id;
        if (props.series?.all?.list?.length){
            return props.series?.all?.list.find(l => l.series?.id === dataId);
        }
    };

    if (loading){
        if (ismovie){
            if (!props.movies.all.fetching){
                if (!props.movies.all.error){
                    const movie = getMovie();
                    if (movie){
                        setDetails(movie);
                    }
                } else {
                    setError(props.movies.all.error);
                }
                setLoading(false);
            }
        } else {
            if (!props.series.all.fetching){
                if (!props.series.all.error){
                    const serie = getSerie();
                    if (serie){
                        setDetails(serie);
                    }
                } else {
                    setError(props.series.all.error);
                }
                setLoading(false);
            }

        }
    }

    if (!ismovie && !episodeInitialised){
        if (details && details.season && Object.keys(details.season).length){
            const key = Object.keys(details.season)[0];
            setEpisodes(details.season[key]);
            if (data.currentEpisode){
                (details.season[key]||[]).forEach(e => {
                    if (e.id === data.currentEpisode){
                        setEpisode(e);
                    }
                });
            }
            if (!episode){
                setEpisode(details.season[key][0]);
            }
            setSelectedId(key);
            setEpisodeInitialised(true);

        }
    }

    const changeMovie = (movieId) => {
        setId(movieId);
        const movie = getMovie(movieId);
        if (!movie){
            setLoading(true);
            props.getMovieAction(movieId);
        } else {
            setDetails(movie);
        }
    };

    useEffect( () => {
        if (!loading){
            setError("");
            if (ismovie){
                const movie = getMovie();
                if (!movie){
                    setLoading(true);
                    props.getMovieAction(id);
                } else {
                    setDetails(movie);
                }
            } else {
                const serie = getSerie();
                if (!serie){
                    setLoading(true);
                    props.getSerieAction(id);
                } else {
                    setDetails(serie);
                }
            }
        }
    }, []);


    const changeSeason = (season) => {
        setEpisodes(details.season[season]);
        setEpisode(details.season[season][0]);
        setSelectedId(season);
        if (data.currentEpisode){
            (details.season[key]||[]).forEach(e => {
                if (e.id === data.currentEpisode){
                    setEpisode(e)
                }
            });
        }
    };

    const wishlist = () => {
        setWishList(!WishList);
        WishList ?
            showMessage({
                backgroundColor: colors.primary_red,
                message: "File Removed from WishList",
                type: "danger"
            }) : showMessage({
                backgroundColor: colors.green,
                message: "File Added to WishList",
                type: "danger"
            })

    };

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


    const Item = ({ index, onPress, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[{ paddingHorizontal: scale(10) }]}>
            <Text style={[{ fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, fontSize: scaleFont(14) }, textColor]}>Saison {index}</Text>
        </TouchableOpacity >
    );



    const renderItem = ({ item }) => {
        const color = item === selectedId ? colors.white : colors.greyColour;
        return (
            <Item
                index={item}
                onPress={() => changeSeason(item)}
                textColor={{ color }}
            />
        );
    };


    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    const getBackDropURL = (image) => {
        return `${Env.cloudFront}/backdrops/${image}`;
    };

    const convertRunTime = (time) => {
        const hours = Math.floor(time / 60);
        const min = Math.floor(time) - (hours * 60);

        return `${hours}h ${min}'`;
    };

    const type = ismovie?  "movie": "series";

    const getPlayTitle = () => {
        if (!ismovie && episode) return `JOUER S${episode.season_number} E${episode.episode_number}`;
        return "JOUER";
    };

    console.log(episodes);
    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} hidden={false} translucent={false}
            />
            {
                !loading && error ? (
                    <View>
                        <View style={{}}>
                            <Image source={{
                                uri: data.poster ? getPosterURL(data.poster): ""
                            }} style={{ height: fullHeight, width: scale(360) }} />
                        </View>
                        <View style={{ position: 'absolute', }}>
                            <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                top: 250,
                                width: fullWidth,
                                alignItems: "center"
                            }}>
                            <Text
                                style={{
                                    backgroundColor: "#000000",
                                    color: "#ffffff",
                                    padding: 25,
                                    fontSize: 16,
                                    borderRadius: 4
                                }}> {error} </Text>
                        </View>
                    </View>
                ): null
            }
            {
                loading? (
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
            {
                !loading && details ? (
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{}}>
                            <Image source={{
                                uri: getPosterURL(details[type].poster)
                            }} style={{ height: verticalScale(440), width: scale(360) }} />
                        </View>
                        <View style={{ position: 'absolute', }}>
                            <AppHeader heading="" navigation={() => props.navigation.goBack()} showicon={true} />
                        </View>


                        <View style={{ paddingLeft: scale(10), width: scale(360), justifyContent: 'center', marginTop: verticalScale(-46), backgroundColor: 'rgba(0,0,0,0.7)', borderTopLeftRadius: verticalScale(6), borderTopRightRadius: verticalScale(6) }}>
                            <Text style={{ color: colors.white, fontSize: scaleFont(22), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>{details[type].name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: colors.white, fontSize: scaleFont(13), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginRight: scale(6) }}>{ismovie ? convertRunTime(details[type].runtime): `${details.season? Object.keys(details.season).length: 0} Saison(s)` }</Text>
                                <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                                <Text style={{ color: colors.white, fontSize: scaleFont(13), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginHorizontal: scale(6) }}>{details[type].genre}</Text>
                                <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                                <Text style={{ color: colors.white, fontSize: scaleFont(13), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginHorizontal: scale(6) }}>{details[type].year}</Text>
                                <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                                <Text style={{ color: colors.white, fontSize: scaleFont(13), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginHorizontal: scale(6) }}>{details[type].rate}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                            {
                                ismovie || details && details.season ? (
                                    <TouchableOpacity onPress={() => props.navigation.navigate("VideoPlayer", { param1: data, param2: {
                                            episodeId: episode ? episode.id: '',
                                            season: selectedId
                                        } })} style={{ flexDirection: 'row', backgroundColor: colors.green, width: scale(180), height: verticalScale(40), borderRadius: verticalScale(12), justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialIcons name="play-arrow" color={colors.white} size={verticalScale(20)} />
                                        <Text style={{ color: colors.white, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_BOLD }}> {getPlayTitle()} </Text>
                                    </TouchableOpacity>
                                ): (
                                    <Text style={{ color: colors.green, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                        Bientôt
                                    </Text>
                                )
                            }
                            <TouchableOpacity onPress={() => wishlist()} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(30) }} >
                                <FontAwesome name="heart" color={WishList ? colors.green : colors.greyColour} size={verticalScale(26)} />
                            </TouchableOpacity>

                            {
                                ismovie? <TouchableOpacity onPress={() => downloaditem()} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(30) }} >
                                    <MaterialIcons name="file-download" color={download ? colors.green : colors.greyColour} size={verticalScale(30)} />
                                </TouchableOpacity> : null
                            }

                        </View>

                        <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                            <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                { details[type].overview }
                            </Text>
                        </View>



                        {
                            ismovie &&  details.similar?.length ? (
                                <View style={{ flexDirection: 'row', marginTop: verticalScale(15), }}>
                                    <TouchableOpacity onPress={() => { setSeasons(true) }} style={{ marginLeft: scale(20) }}>
                                        <Text style={{ color: Clips ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Similaire(s)</Text>
                                    </TouchableOpacity>
                                </View>
                            ): null
                        }

                        {
                            !ismovie && episodes.length ? (
                                <View style={{ flexDirection: 'row', marginTop: verticalScale(15), }}>
                                    <TouchableOpacity onPress={() => { setClips(true) }} style={{ marginLeft: scale(20) }}>
                                        <Text style={{ color: Clips ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Saison(s)</Text>
                                    </TouchableOpacity>
                                </View>
                            ): null
                        }
                        {

                            ismovie && details.similar?.length? (

                                <View style={{
                                    marginBottom: 25
                                }}>
                                    <FlatList
                                        style={{marginTop: verticalScale(10), marginHorizontal: scale(18)}}
                                        data={details.similar}
                                        horizontal
                                        renderItem={({item}) => {
                                            return (
                                                <TouchableOpacity activeOpacity={0.8}
                                                                  onPress={() => changeMovie(item.id)}
                                                                  style={{marginHorizontal: scale(6)}}>
                                                    <Image source={{
                                                        uri: getPosterURL(item.poster)
                                                    }} style={{
                                                        height: verticalScale(100),
                                                        width: scale(80),
                                                        borderRadius: verticalScale(6)
                                                    }}/>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />

                                </View>

                            ): null
                        }


                        { !ismovie && episodes.length? (
                                <View>
                                    <FlatList
                                        style={{ marginHorizontal: scale(15), marginTop: verticalScale(15) }}
                                        horizontal
                                        data={Object.keys(details.season)}
                                        renderItem={renderItem}
                                    />

                                    <FlatList
                                        horizontal
                                        style={{ marginTop: verticalScale(15) }}
                                        data={episodes}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.navigate("VideoPlayer", { param1: data, param2: {
                                                    episodeId: item.id,
                                                    season: selectedId
                                                    } })} style={{ marginHorizontal: scale(6) }} >
                                                    <Image source={{
                                                        uri: getBackDropURL(item.backdrop)
                                                    }} style={{ height: verticalScale(110), width: scale(130), borderRadius: verticalScale(6), opacity: 0.5 }} />
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: verticalScale(5) }}>
                                                        <MaterialIcons name="play-arrow" color={colors.white} size={verticalScale(22)} />
                                                        <View>
                                                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                                S{selectedId} E{item.episode_number} </Text>
                                                            <Text
                                                                style={{ paddingHorizontal: scale(6), color: colors.white, fontSize: scaleFont(10), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                                {item.overview}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            ): null

                        }

                    </ScrollView >
                ): null
            }

        </View >
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getMovieAction,
        getSerieAction
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        movies: state.movies,
        series: state.series,
        kids: state.kids,
        misc: state.misc
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
