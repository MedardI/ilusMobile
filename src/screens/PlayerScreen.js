import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator, Modal, ProgressBarAndroid, Button } from 'react-native';
import AppHeader from '../components/AppHeader';
import {colors, scale, scaleFont, verticalScale, constants, fullHeight, fullWidth} from '../utils';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import Env from "../env";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initMovie as getMovieAction, initWatchMovie} from "../actions/movies";
import {initSerie as getSerieAction} from "../actions/series";
import {initPostLike} from "../actions/misc";
import {getDatastore, isDownloaded, isVideoDownloaded, removeFile, saveDownload} from "../api/helper";
import { download as downloadHandler, directories, checkForExistingDownloads} from 'react-native-background-downloader'
import { allGenres } from '../utils/Data';


const RenderYoutubeModal = (play, id, onStateChange, togglePlaying) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={play}
        onRequestClose={() => togglePlaying()}
      >
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'rgba(255,255,255,0.8)',
            position: 'relative'
        }}>
            <TouchableOpacity
            onPress={() => togglePlaying()}
            style={{ flexDirection: 'row',
                backgroundColor: colors.greyColour,
                width: 35,
                height: 35,
                borderRadius: 35,
                position: "absolute",
                top: 15,
                right: 10,
                justifyContent: 'center',
                alignItems: 'center' }}>
                <MaterialIcons name="close" color={colors.black} size={verticalScale(20)} />
            </TouchableOpacity>

             <View style={{
                // flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
                width: fullWidth
            }}>
                <View>
                    <YoutubePlayer
                        height={300}
                        play={play}
                        videoId={id}
                        onChangeState={onStateChange}
                    />
                </View>
            </View>
        </View>
      </Modal>
    )
};

const RenderButtons = (props, data, title, episode, selectedId, toggleTrailer) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: "row"
        }}>
            <TouchableOpacity onPress={() => props.navigation.navigate("VideoPlayer", { param1: data, param2: {
                    episodeId: episode ? episode.id: '',
                    season: selectedId
                } })} style={{ flexDirection: 'row',
                backgroundColor: colors.statementGreenColour,
                maxWidth: 100,
                width: scale(150),
                height: verticalScale(40),
                borderRadius: verticalScale(12),
                justifyContent: 'center',
                alignItems: 'center' }}>
                <MaterialIcons name="play-arrow" color={colors.white} size={verticalScale(20)} />
                <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_BOLD }}> {title} </Text>
            </TouchableOpacity>
            {
                data && data.trailer ?
                    (
                        <TouchableOpacity onPress={() => toggleTrailer()} style={{ flexDirection: 'row',
                            backgroundColor: colors.green,
                            maxWidth: 150,
                            width: scale(150),
                            height: verticalScale(40),
                            borderRadius: verticalScale(12),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10}}>
                            <MaterialIcons name="play-arrow" color={colors.white} size={verticalScale(20)} />
                            <Text style={{ color: colors.white, fontSize: scaleFont(12), fontFamily: constants.OPENSANS_FONT_BOLD }}> Bande annonce </Text>
                        </TouchableOpacity>
                    ) : null
            }
        </View>

    )
};

const RenderCasts = (casts) => {
    return (
        <View style={{
            marginBottom: 25
        }}>
            <FlatList
                style={{marginTop: verticalScale(10), marginHorizontal: scale(18)}}
                data={casts}
                horizontal
                renderItem={({item}) => {
                    return (
                        <View style={{
                            width: 90,
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <TouchableOpacity activeOpacity={0.8}
                                //onPress={() => changeMovie(item.id)}
                                              style={{marginHorizontal: scale(6)}}>
                                <Image source={{
                                    uri: `https://www.ilus-cinema.com/${item.image}`
                                }} style={{
                                    height: verticalScale(70),
                                    width: scale(70),
                                    borderRadius: verticalScale(50)
                                }}/>
                            </TouchableOpacity>
                            <Text
                                numberLines={2}
                                style={{
                                    color: colors.white,
                                    textAlign: "center",
                                    fontSize: scaleFont(11),
                                    fontFamily: constants.OPENSANS_FONT_MEDIUM,
                                    marginHorizontal: scale(6) }}>
                                {item.name}
                            </Text>
                        </View>
                    )
                }}
            />

        </View>
    )
};

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
    const [playTrailer, setPlayTrailer] = useState(false);
    const [downloadId, setDownloadId] = useState(null);
    const [downloadProgress, setDownloadProgress] = useState(null);
    const [download, setdownload] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
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
    const [downloadedVideo, setDownloadedVideo] = useState(null);
    const [downloadTask, setDownloadTask] = useState(null);
    const [checkExistingDownload, setCheckExistingDownload] = useState(true);

    if (!id){
        setId(data.id);
        setWishList(data.is_like? true: false);
    }

    if (checkExistingDownload && !download && id){
        checkForExistingDownloads().then((tasks) => {
            if (tasks && tasks.length){
                for (let task of tasks) {
                    if (task.id === id){
                        setdownload(true);
                        setDownloadId(task.id);
                        setDownloadTask(task);
                        task.progress(percent => {
                            onDownloadProgress(percent);
                        }).done(() => {
                            console.log('Downlaod is done!')
                        }).error(error => {
                            console.log('Download canceled due to error: ', error)
                        })
                    }
                }
            }
        });
        setCheckExistingDownload(false);
    }


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

    const checkIfAlreadyDownloaded = (id) => {
        getDatastore().then((db) => {
            db.findOne({id}, (error, record) => {
                if (record){
                    isVideoDownloaded(id).then((status) => {
                        console.log("Current file status");
                        console.log(status);
                        setDownloaded(status);
                        setDownloadedVideo({
                            ...record,
                            downloaded: true,
                            url: `${directories.documents}/${id}`
                        });
                    })
                } else {
                    setDownloaded(false);
                }
            });
        });
    };

    if (loading){
        if (ismovie){
            if (!props.movies.all.fetching){
                if (!props.movies.all.error){
                    const movie = getMovie();
                    if (movie){
                        setWishList(movie.movie.is_like);
                        setDetails(movie);
                        checkIfAlreadyDownloaded(id);
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
                        setWishList(serie.is_like);
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
                        checkIfAlreadyDownloaded(e.id);
                    }
                });
            }
            if (!episode){
                setEpisode(details.season[key][0]);
                checkIfAlreadyDownloaded(details.season[key][0].id);
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
            setWishList(movie.movie.is_like);
            setDetails(movie);
            getDatastore().then((db) => {
                db.findOne({id: movieId}, (error, record) => {
                    const status = record ? isVideoDownloaded(id) : false;
                    setDownloaded(status);
                });
            });
        }
    };

    const onYoutubeStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlayTrailer(false);
        }
      }, []);

    const togglePlayingTrailer = () => {
        setPlayTrailer(!playTrailer);
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
                    getDatastore().then((db) => {
                        db.findOne({id}, (error, record) => {
                            const status = record ? isVideoDownloaded(id) : false;
                            setDownloaded(status);
                        });
                    });
                    setWishList(movie.movie.is_like);
                    setDetails(movie);
                }
            } else {
                const serie = getSerie();
                if (!serie){
                    setLoading(true);
                    props.getSerieAction(id);
                } else {
                    setWishList(serie.is_like);
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
            (details.season[season]||[]).forEach(e => {
                if (e.id === data.currentEpisode){
                    setEpisode(e);
                    getDatastore().then((db) => {
                        db.findOne({id: e.id}, (error, record) => {
                            const status = record ? isVideoDownloaded(id) : false;
                            setDownloaded(status);
                        });
                    });
                }
            });
        }
    };

    const wishlist = () => {
        const data = getData();
        props.initPostLike(!WishList, data.id, ismovie? "movie": "series", getGenreIds(), true);
        setWishList(!WishList);
        WishList ?
            showMessage({
                backgroundColor: colors.primary_red,
                message: `${ismovie? "Film supprimé de la liste de souhaits": "Serie supprimée de la liste de souhaits"}`,
                type: "danger"
            }) : showMessage({
                backgroundColor: colors.green,
                message: `${ismovie? "Film ajouté à la liste de souhaits": "Serie ajoutée à la liste de souhaits"}`,
                type: "danger"
            })

    };

    const cancelDownload = () => {
        if (downloadTask){
            downloadTask.stop();
            setDownloadTask(null);
        }
        showMessage({
            backgroundColor: colors.primary_red,
            message: "Téléchargement arrêté",
            type: "info",
        })
    };

    const downloaditem = async () => {
        setdownload(!download);
        initDownload(!download).catch();
    };

    const onDownloadProgress = (progress) => {
        setDownloadProgress(progress);
    };

    const initDownload = async (download) => {
        const data = getData();
        const saveFile = (url, id) => {
            saveDownload(data).catch();
            showMessage({
                backgroundColor: colors.green,
                message: "Téléchargement commencé",
                type: "info",
            });
            let task = downloadHandler({
                id: id,
                url: url,
                destination: `${directories.documents}/${id}`,
                metadata: {}
            }).begin(({ expectedBytes, headers }) => {
                
            }).progress(percent => onDownloadProgress(percent)).done(() => {
                setDownloaded(true);
                // if (Platforms.OS === 'ios')
                //     completeHandler(jobId)
            }).error(error => {
                console.log('Download canceled due to error: ', error);
            });
            setDownloadTask(task);
        };
        if (download) {
            if (ismovie){
                initWatchMovie(data.id)
                    .then(response => {
                        if (response.data?.playlist?.playlist){
                            const url = response.data?.playlist.playlist[0].sources[0].file;
                            if (url){
                               saveFile(url, data.id);
                            } else {
                                showMessage({
                                    backgroundColor: colors.primary_red,
                                    message: "Impossible de télécharger maintenant, veuillez réessayer plus tard",
                                    type: "info",
                                })
                            }
                        }
                    }).catch(() => {
                    showMessage({
                        backgroundColor: colors.primary_red,
                        message: "Impossible de télécharger maintenant, veuillez réessayer plus tard",
                        type: "info",
                    })
                });
            }
        } else {
            cancelDownload();
        }
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

    const getData = () => {
        const localData = downloadedVideo ? downloadedVideo : {};
        if (ismovie) return {
            ...details.movie,
            ...localData,
            type: 'movie'
        };
        else return details.serie ? details.serie : data;
    };

    const getGenreIds = () => {
        const data = getData();
        const genres = props.misc.genre.list;
        const genreNames = data.genre ? data.genre.split(','): [];
        const genreIds = [];
        const kind = ismovie? "movie": "series";
        genreNames.forEach(n => {
            const actualN = Object.keys(allGenres).find(k => {
                return allGenres[k] === n
            });
            if (actualN){
                const found = genres.find(g => g.kind === kind && g.name === actualN);
                if (found) genreIds.push(found.id);
            }

        })
        return genreIds;
    }

    const getProgressPercent = () => {
        if (downloadProgress === null) return 0;
        return Math.floor(downloadProgress * 100);
    };

    const getYoutubeId = () => {
        const data = details ? details[type]: null;
        if (data && data.trailer) {
            const splits = data.trailer.split("/");
            if (splits && splits.length){
                return splits[splits.length - 1].replace("watch?v=",'');
            }
            
        }
        return '';
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <SafeAreaView />
            {
                !loading && details && details[type].trailer ?
                RenderYoutubeModal(playTrailer, getYoutubeId(), onYoutubeStateChange, togglePlayingTrailer): null
            }
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
                                <MaterialIcons name="stop-circle" color={colors.green} size={verticalScale(8)} />

                                <Text style={{ color: colors.white, fontSize: scaleFont(13), fontFamily: constants.OPENSANS_FONT_MEDIUM, marginHorizontal: scale(6) }}>{details[type].age}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                            {
                                ismovie || details && details.season ? (
                                    RenderButtons(props, getData(), getPlayTitle(), episode, selectedId, togglePlayingTrailer)
                                ): (
                                    <Text style={{ color: colors.green, fontSize: scaleFont(18), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                        Bientôt
                                    </Text>
                                )
                            }
                            <TouchableOpacity onPress={() => wishlist()} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(20) }} >
                                <FontAwesome name="heart" color={WishList ? colors.green : colors.greyColour} size={verticalScale(26)} />
                            </TouchableOpacity>

                            {
                                ismovie? (downloaded && !download)? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(15) }} >
                                    <MaterialIcons name="cloud-download" color={colors.green} size={verticalScale(30)} />
                                </TouchableOpacity> : <TouchableOpacity onPress={() => downloaditem()} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scale(15) }} >
                                    <MaterialIcons name="file-download" color={download ? colors.primary_red : colors.greyColour} size={verticalScale(30)} />
                                </TouchableOpacity> : null
                            }

                        </View>

                        {
                            download ? (
                                <View style={{
                                    marginTop: 5,
                                    paddingHorizontal: 10,
                                    flex: 1,
                                    justifyContent: "center",
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                                }}>
                                    <ProgressBarAndroid
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={downloadProgress}
                                    />
                                    <Text style={{
                                        textAlign: "center",
                                        color: colors.green,
                                    }}> {`Téléchargement en cours: ${getProgressPercent()}%`} </Text>
                                </View>
                            ): null
                        }

                        <View style={{ marginHorizontal: scale(20), marginTop: verticalScale(10) }}>
                            <Text style={{ color: colors.aeps_borderColor, fontSize: scaleFont(14), fontFamily: constants.OPENSANS_FONT_MEDIUM }}>
                                { details[type].overview }
                            </Text>
                        </View>


                        {
                            ismovie && details.casts && details.casts.length ? (
                                <View style={{ flexDirection: 'row', marginTop: verticalScale(15), }}>
                                    <TouchableOpacity onPress={() => { setSeasons(true) }} style={{ marginLeft: scale(20) }}>
                                        <Text style={{ color: Clips ? colors.green : colors.greyColour, fontSize: scaleFont(16), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }} >Acteurs principaux </Text>
                                    </TouchableOpacity>
                                </View>
                            ): null
                        }

                        {
                            ismovie && details.casts && details.casts.length?
                                (RenderCasts(details.casts)) : null
                        }

                        {
                            ismovie &&  details.similar?.length ? (
                                <View style={{ flexDirection: 'row', marginTop: details.casts && details.casts.length? verticalScale(1) : verticalScale(15) }}>
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
                                                    }} style={{ height: verticalScale(110), width: scale(130), borderRadius: verticalScale(6) }} />
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        position: 'absolute',
                                                        width: scale(130),
                                                        backgroundColor: "rgba(255,255,255,.7)",
                                                        bottom: verticalScale(5) }}>
                                                        <MaterialIcons name="play-arrow" color={colors.black} size={verticalScale(22)} />
                                                        <View>
                                                            <Text style={{
                                                                color: colors.black, 
                                                                fontSize: scaleFont(12), 
                                                                fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                                S{selectedId} E{item.episode_number}
                                                            </Text>
                                                            {/* <Text
                                                                style={{ paddingHorizontal: scale(6), color: colors.white, fontSize: scaleFont(10), fontFamily: constants.OPENSANS_FONT_SEMI_BOLD }}>
                                                                {item.overview}
                                                            </Text> */}
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
        getSerieAction,
        initPostLike
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
