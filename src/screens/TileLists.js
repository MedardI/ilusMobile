import React, {useState} from 'react';
import { View, SafeAreaView, StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Image from "../components/Image";
import { FlatList } from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import { colors, verticalScale, scale, scaleFont, constants, fullHeight } from '../utils';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Env from "../env";
import {
    getMovies,
    initMovies
} from "../actions/movies";
import {
    getAnimations,
    initKids
} from "../actions/kids"
import {allGenres} from "../utils/Data";
import {
    getSeries,
    initSeries
} from "../actions/series";

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
                
            Nous n'avons actuellement aucun film de ce genre, veuillez vérifier à nouveau ultérieurement.</Text>
        </View>
    )
};

const TileLists = (props) => {
    const heading = props?.route?.params?.param1;
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(true);
    const type = props?.route?.params?.param3;
    const genre = props?.route?.params?.param2;

    const getGenre = () => {
        let genreName = '';
        if (props.misc.genre.list){
            const found = props.misc.genre.list.find(g => g.id === genre);
            if (found) {
                genreName = found.name;
                if (allGenres[genreName]) genreName = allGenres[genreName];
            }
        }
        return  genreName;
    }

    if (!loaded){

        setLoaded(true);
        if (type === 'movies'){
            if (genre === 'recent'){
                setData(props.movies.discover.recent);
                setFetch(false);
            } else {
                const movies = props.movies.discover.data;
                if (movies){
                    const filteredMovies = (props.movies.discover.data.filter(d => d.genreId == genre) || [])[0];
                    if (filteredMovies && filteredMovies.list.length){
                        setData(filteredMovies?.list || []);
                    } else {
                        setLoading(true);
                        const genreName = getGenre();
                        getMovies(genreName, 1).then((response) => {
                            let movies = response.data.movies;
                            if (movies.data.length){
                                setData(movies.data);
                                setFetch(movies.data.length === 50);
                            }
                            setLoading(false);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            }
        } else if (type === 'series'){
            if (genre === 'recent'){
                const series = props.series.discover.recent.map(series => ({
                    ...series,
                    id: series.series_id
                }));
                setData(series);
                setFetch(false);
            } else {
                const series = props.series.discover.data;
                if (series){
                    const filteredSeries = (props.series.discover.data.filter(d => d.genreId == genre) || [])[0];
                    if (filteredSeries && filteredSeries.list.length){
                        setData(filteredSeries?.list || []);
                    }else {
                        setLoading(true);
                        const genreName = getGenre();
                        getSeries(genreName, 1).then((response) => {
                            let series = response.data.series;
                            console.log(series);
                            if (series.data.length){
                                setData(series.data);
                                setFetch(series.data.length === 50);
                            }
                            setLoading(false);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                    
                }
            }
        } else if (type === 'kids') {
            if (genre === 'recent'){
                setData(props.kids.discover.recent);
                setFetch(false);
            } else {
                const movies = props.kids.discover.data;
                if (movies){
                    const filteredMovies = (props.kids.discover.data.filter(d => d.genreId == genre) || [])[0];
                    if (filteredMovies && filteredMovies.list.length){
                        setData(filteredMovies?.list || []);
                    }else {
                        setLoading(true);
                        const genreName = getGenre();
                        console.log(genreName);
                        getAnimations(genreName, 1).then((response) => {
                            let movies = response.data.kids.movies.data;
                            let series = response.data.kids.series.data;
                
                            if (movies.length || series.length){
                                setData([...movies, ...series]);
                                setFetch(movies.length === 50 || series.length === 50);

                                props.initKids([...movies, ...series], genre);
                            }

                            setLoading(false);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            }
        }
    }

    const getPosterURL = (image) => {
        return `${Env.cloudFront}/posters/${image}`;
    };

    const load = async () => {
        let genreName = getGenre();
        let page = 1;
        if (data.length >= 50) {
            page = Math.floor(data.length/50) + 1;
        }
        if (fetch){
            if (type === 'movies'){
                await getMovies(genreName, page).then((response) => {
                    let movies = response.data.movies;
                    if (page === 1){
                        setData(movies.data);
                    } else {
                        setData([...data, ...movies.data]);
                    }
                    if (page === 1){
                        props.initMovies(response, genre);
                    }
                    setFetch(movies.data.length === 50);
                }).catch((error) => {
                    console.log(error);
                });
            } else if (type === 'series'){
                await getSeries(genreName, page).then((response) => {
                    let series = response.data.series;
                    console.log(series);
                    if (page === 1){
                        setData(series.data);
                    } else {
                        setData([...data, ...series.data]);
                    }
                    if (page === 1){
                        props.initSeries(response, genre);
                    }
                    setFetch(series.data.length === 50);
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                await getAnimations(genreName, 1).then((response) => {
                    let movies = response.data.kids.movies.data;
                    let series = response.data.kids.series.data;
        
                    if (movies.length || series.length){
                        setData([...movies, ...series]);
                        setFetch(movies.length === 50 || series.length === 50);

                        props.initKids([...movies, ...series], genre);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.93)' }}>
            <SafeAreaView />
            <StatusBar barStyle={"light-content"} backgroundColor={colors.black} hidden={false} translucent={false}
            />
            <AppHeader heading={heading} navigation={() => props.navigation.goBack()} showicon={true} />

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
                        }} size="large" color={colors.green}/>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        contentContainerStyle={{ flexGrow: 1 }}
                        numColumns={3}
                        refreshing={loading}
                        ListEmptyComponent={<RenderEmptyComponent/>}
                        onEndReached={load}
                        style={{ alignSelf: 'center', marginHorizontal: scale(10), marginTop: verticalScale(10) }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("PlayerScreen", { param: type === 'movies'? {
                                    ...item, type: 'movie'
                                    }: item })} style={{ marginHorizontal: scale(10), marginVertical: verticalScale(10) }} >
                                    <Image source={{
                                        uri: getPosterURL(item.poster)
                                    }} style={{ height: verticalScale(120), width: scale(90), borderRadius: verticalScale(6) }} />
                                </TouchableOpacity>
                    )
                }}

            />
                )
            }
            

        </View>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        initMovies,
        initSeries,
        initKids
    }, dispatch);

const mapStateToProps = (state)  => {
    return {
        movies: state.movies,
        series: state.series,
        kids: state.kids,
        misc: state.misc
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TileLists);
