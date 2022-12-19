import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import Image from '../components/Image';
import { colors, scaleFont, scale, verticalScale, constants, fullHeight } from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {initPostLike, initRemoveFromWishlist} from "../actions/misc";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import {
    initGetLikes
} from "../actions/misc";
import Env from "../env";

const RenderEmptyComponent = (type) => {
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
                Vous n'avez pas encore de(s) série(s) ou film(s) préféré(e)(s). </Text>
        </View>
    )
};

const ListData = (data, getPosterURL, convertRunTime, unlike, type = "movies") => {
    return (
        <View style={{ alignSelf: 'center', marginTop: verticalScale(10), flex: 1 }}>
        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<RenderEmptyComponent/>}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }) => {
                return (
                    <GestureHandlerRootView style={{ backgroundColor: colors.black, height: verticalScale(110), marginVertical: verticalScale(7), borderRadius: verticalScale(12) }}>
                        <Swipeable
                            ref={ref => item = ref}
                            renderRightActions={() => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        unlike(item, index)
                                    }}
                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary_red, width: scale(90), height: verticalScale(110), borderRadius: verticalScale(12), }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                unlike(item, index)
                                            }
                                            }
                                            style={{ color: colors.white }}>
                                            <Text style={{ color: colors.white, marginLeft: scale(0), fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>Supprimer</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }}
                        >
                            <View style={{ width: scale(340), backgroundColor: "#36454f", flexDirection: 'row', borderRadius: verticalScale(12) }}>
                                <View style={{ borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }}>
                                    <Image source={{
                                        uri: getPosterURL(item.movie? item.movie.m_poster: item.serie.t_poster)
                                    }} style={{ width: scale(100), height: verticalScale(110), borderTopLeftRadius: verticalScale(12), borderBottomLeftRadius: verticalScale(12) }} />
                                </View>
                                <View style={{ justifyContent: 'space-between' }}>
                                    <View style={{ marginLeft: scale(10) }}>
                                        <Text style={{ color: colors.white, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginTop: verticalScale(5) }}>
                                            {item.movie? item.movie.m_name: item.serie.t_name}
                                        </Text>
                                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                        {item.movie? item.movie.m_genre: item.serie.t_genre}
                                        </Text>
                                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                        {item.movie? item.movie.m_age: item.serie.t_age}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginLeft: scale(10), marginBottom: verticalScale(5) }}>
                                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, }}>
                                            {item.movie? convertRunTime(item.movie.m_runtime): convertRunTime(item.serie.t_runtime)}
                                        </Text>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(10) }}>
                                            <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />
                                        </View>
                                        <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD, marginLeft: scale(6) }}>
                                            {item.movie? item.movie.m_year: item.serie.t_year}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    </GestureHandlerRootView>

                )
            }}
        />

    </View>
    )
}

const WishList = (props) => {

    const [moviesTab, setmoviesTab] = useState(true);
    const [fetchingMovies, setFetchingMovies] = useState(false);
    const [fetchingSeries, setFetchingSeries] = useState(false);
    const [fetchingKids, setFetchingKids] = useState(false);
    const [seriesTab, setseriesTab] = useState(false);
    const [animationTab, setanimationTab] = useState(false);
    const [onswipe, setonswipe] = useState(false)
    const swipeableRef = useRef();

    // const [leftbackground, setleftbackground] = useState(true)

    useEffect(() => {
       getLikes();
    }, []);

    
    useFocusEffect(
        useCallback(() => {
            let updated = false;
            if (!updated){
                if (!fetchingMovies && props.misc.likes.movies.refresh){
                    setFetchingMovies(true);
                    props.initGetLikes("movies");
                }
            
                if (!fetchingSeries && props.misc.likes.series.refresh){
                    setFetchingSeries(true);
                    props.initGetLikes("series");
                }
            
                if (!fetchingKids && props.misc.likes.kids.refresh){
                    setFetchingKids(true);
                    props.initGetLikes("kids");
                }
            }
            return () => {
                updated = true;
            };
        }, [])
    );

    if (fetchingMovies && !props.misc.likes.movies.fetching){
        setFetchingMovies(false);
    }

    if (fetchingSeries && !props.misc.likes.series.fetching){
        setFetchingSeries(false);
    }

    if (fetchingKids && !props.misc.likes.kids.fetching){
        setFetchingKids(false);
    }

    const getType = () => {
        let type = "movies";
        if (seriesTab) type = "series"
        else if(animationTab) type = "kids";
        return type;
    }

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    const convertRunTime = (time) => {
        const hours = Math.floor(time / 60);
        const min = Math.floor(time) - (hours * 60);

        return `${hours}h ${min}'`;
    };

    const getLikes = (refresh = false, newType = null) => {
        let type = newType ? newType : getType();

        console.log("Fetching for type");
        console.log(type);

        if (type === 'movies' && !fetchingMovies){
            if (!props.misc.likes[type].list.length || refresh){
                setFetchingMovies(true);
                props.initGetLikes(type);
            }
        }
    
        if (type === 'kids' && !fetchingKids){
            if (!props.misc.likes[type].list.length || refresh){
                setFetchingKids(true);
                props.initGetLikes(type);
            }
        }

        if (type === 'series' && !fetchingSeries){
            if (!props.misc.likes[type].list.length || refresh){
                setFetchingSeries(true);
                props.initGetLikes(type);
            }
        }
    }

    const unlike = (item, index) => {
        item.close();
        showMessage({
            backgroundColor: colors.primary_red,
            message: "Supprimé de la liste de souhaits",
            type: "danger",
        });

        let type = getType();
        let file;
        let uuid;
        if (moviesTab){
            file = props.misc.likes.movies.list[index];
            uuid = file.movie_id;
        } else if(seriesTab){
            file = props.misc.series.kids.list[index];
            uuid = file.series_id;
        } else {
            file = props.misc.likes.kids.list[index];
            if (file.movie) {
                type = "movies";
                uuid = file.movie_id;
            }
            else{
                type = "series";
                uuid = series_id;
            }
        }

        if (file) {
            props.initRemoveFromWishlist(file.id, type);
            props.initPostLike(false, uuid, type === 'movies' ? 'movie': type);
        }
    }

    const switchTabs = (type) => {
        setmoviesTab(type === "movies");
        setseriesTab(type === "series");
        setanimationTab(type === "kids");
        getLikes(false, type);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />

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
            >Favoris</Text>


            <FlashMessage position={'bottom'} />


            <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                <TouchableOpacity onPress={() => switchTabs("movies")} style={{ marginLeft: scale(20) }}>
                    <Text style={{ color: moviesTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Films</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchTabs("series")} style={{ marginLeft: scale(10) }}>
                    <Text style={{ color: seriesTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Séries</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchTabs("kids")} style={{ marginLeft: scale(10) }}>
                    <Text style={{ color: animationTab ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Jeunesse</Text>
                </TouchableOpacity>
            </View>
            {/* #282C35  */}
            {/* #36454f */}

            {
                fetchingMovies || fetchingKids || fetchingSeries? (
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
                moviesTab && !fetchingMovies? (
                   ListData(props.misc.likes.movies.list, getPosterURL, convertRunTime, unlike)
                ): null
            }

            {
                seriesTab && !fetchingSeries? (
                   ListData(props.misc.likes.series.list, getPosterURL, convertRunTime, unlike)
                ): null
            }

            {
                animationTab && !fetchingKids? (
                   ListData(props.misc.likes.kids.list, getPosterURL, convertRunTime, unlike)
                ): null
            }
        </View>
    );
}


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initGetLikes,
        initPostLike,
        initRemoveFromWishlist
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        misc: state.misc
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
