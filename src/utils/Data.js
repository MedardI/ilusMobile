import colors from "./colors"


export const genredata = [
    { "title": "ACTION", "color": colors.primary_red },
    { "title": "ADVENTURE", "color": colors.transactionAmountYellowColour },
    { "title": "COMEDY", "color": "blue" },
    { "title": "DRAMA", "color": "green" },
    { "title": "ROMANCE", "color": "pink" },
]

export const carouseldataMovie = [
    { "id": 1, "bannerredirecturl": "PlayerScreen", "ismovie": true, "url": require("../assets/images/movies/forrestgump.jpg"), "name": "Forrest Gump", "genre": "Drama, Romance", "language": "English", "duration": "2 h 22 min", "size": "712MB", "banner": require("../assets/images/movies/forrestgump1.jpeg"), "year": "1994" },
    { "id": 2, "bannerredirecturl": "PlayerScreen", "ismovie": true, "url": require("../assets/images/movies/Godfather.jpg"), "name": "The Godfather", "genre": "Crime, Drama", "language": "English", "duration": "2 h 55 min", "size": "236 Episodes", "banner": require("../assets/images/movies/Godfather1.jpg"), "year": "1972" },
    { "id": 3, "bannerredirecturl": "PlayerScreen", "ismovie": true, "url": require("../assets/images/movies/LifeOfPi.jpeg"), "name": "Life Of Pi", "genre": "Adventure Drama", "language": "English", "duration": "2 h 7 min", "size": "26 Episodes", "banner": require("../assets/images/movies/LifeOfPi1.jpeg"), "year": "2017" },
    { "id": 4, "bannerredirecturl": "PlayerScreen", "ismovie": true, "url": require("../assets/images/movies/Inception.jpeg"), "name": "Inception", "genre": "Action, Sci-fi", "language": "English", "duration": "2 h 28 min", "size": "729MB", "banner": require("../assets/images/movies/Inception1.jpeg"), "year": "2010" }
]

export const moviesdata = [
    { id: 1, "name": "Inception", "genre": "Action, Sci-fi", "language": "English", "duration": "2 h 28 min", "size": "729MB", "banner": require("../assets/images/movies/Inception1.jpeg"), "year": "2010", "ismovie": true, },
    { id: 2, "name": "The Godfather", "genre": "Crime, Drama", "language": "English", "duration": "2 h 55 min", "size": "837MB", "banner": require("../assets/images/movies/Godfather1.jpg"), "year": "1976", "ismovie": true, },
    { id: 3, "name": "Forrest Gump", "genre": "Drama, Romance", "language": "English", "duration": "2 h 22 min", "size": "712MB", "banner": require("../assets/images/movies/forrestgump1.jpeg"), "year": "1994", "ismovie": true, },
    { id: 4, "name": "Black Adam", "genre": "Action, Adventure", "language": "English", "duration": "2 h 10 min", "size": "918MB", "banner": require("../assets/images/movies/Blackadam1.jpeg"), "year": "2022", "ismovie": true, },
    { id: 5, "name": "Life Of Pi", "genre": "Adventure, Drama", "language": "English", "duration": "2 h 7 min ", "size": "668MB", "banner": require("../assets/images/movies/LifeOfPi1.jpeg"), "year": "2017", "ismovie": true, },
]

export const continuemovies = [
    { "name": "Inception", "genre": "Action, Sci-fi", "language": "English", "playduration": 100, "duration": "2 h 28 min", "size": "729MB", "banner": require("../assets/images/movies/Inception1.jpeg"), "url": require("../assets/images/movies/Inception.jpeg"), "year": "2010", "ismovie": true, },
    { "name": "The Godfather", "genre": "Crime, Drama", "language": "English", "playduration": 40, "duration": "2 h 55 min", "size": "837MB", "banner": require("../assets/images/movies/Godfather1.jpg"), "url": require("../assets/images/movies/Godfather.jpg"), "year": "1972", "ismovie": true, },
    { "name": "Forrest Gump", "genre": "Drama, Romance", "language": "English", "playduration": 70, "duration": "2 h 22 min", "size": "712MB", "banner": require("../assets/images/movies/forrestgump1.jpeg"), "url": require("../assets/images/movies/forrestgump.jpg"), "year": "1994", "ismovie": true, },
    { "name": "Black Adam", "genre": "Action, Adventure", "language": "English", "playduration": 50, "duration": "2 h 10 min", "size": "918MB", "banner": require("../assets/images/movies/Blackadam1.jpeg"), "url": require("../assets/images/movies/Blackadam1.jpeg"), "year": "2022", "ismovie": true, },
    { "name": "Life Of Pi", "genre": "Adventure, Drama", "language": "English", "playduration": 110, "duration": "2 h 7 min", "size": "668MB", "banner": require("../assets/images/movies/LifeOfPi1.jpeg"), "url": require("../assets/images/movies/LifeOfPi.jpeg"), "year": "2017", "ismovie": true, },
]

export const MoviesData = [
    {
        "title": "MOVIES YOU MAY LIKE",
        "data":
            [
                { id: 1, "name": "Inception", "genre": "Action, Sci-fi", "language": "English", "duration": "2 h 28 min", "size": "729MB", "banner": require("../assets/images/movies/Inception1.jpeg"), "year": "2010", "ismovie": true, },
                { id: 2, "name": "The Godfather", "genre": "Crime, Drama", "language": "English", "duration": "2 h 55 min", "size": "837MB", "banner": require("../assets/images/movies/Godfather1.jpg"), "year": "1976", "ismovie": true, },
                { id: 3, "name": "Forrest Gump", "genre": "Drama, Romance", "language": "English", "duration": "2 h 22 min", "size": "712MB", "banner": require("../assets/images/movies/forrestgump1.jpeg"), "year": "1994", "ismovie": true, },
                { id: 4, "name": "Black Adam", "genre": "Action, Adventure", "language": "English", "duration": "2 h 10 min", "size": "918MB", "banner": require("../assets/images/movies/Blackadam1.jpeg"), "year": "2022", "ismovie": true, },
                { id: 5, "name": "Life Of Pi", "genre": "Adventure, Drama", "language": "English", "duration": "2 h 7 min ", "size": "668MB", "banner": require("../assets/images/movies/LifeOfPi1.jpeg"), "year": "2017", "ismovie": true, },
            ],
    },
    {
        "title": "RECENTLY ADDED",
        "data": [
            { "name": "Uncharted", "genre": "Adventure, Action", "language": "English", "duration": "1 h 56 min", "size": "729MB", "banner": require("../assets/images/movies/uncharted1.jpeg"), "year": "2022", "ismovie": true, },
            { "name": "Morbius", "genre": "Action, Fantasy", "language": "English", "duration": "1 h 44 min", "size": "729MB", "banner": require("../assets/images/movies/morbius1.jpeg"), "year": "2022", "ismovie": true, },
            { "name": "Joker", "genre": "Thriller, Crime", "language": "English", "duration": "2 h 2 min", "size": "729MB", "banner": require("../assets/images/movies/joker1.jpeg"), "year": "2019", "ismovie": true, },
            { "name": "Mortal Kombat", "genre": "Action, Fantasy", "language": "English", "duration": "1 h 50 min", "size": "729MB", "banner": require("../assets/images/movies/mortalkombat1.jpg"), "year": "2021", "ismovie": true, },
            { "name": "Free Guy", "genre": "Comedy, Action", "language": "English", "duration": "1 h 55 min", "size": "729MB", "banner": require("../assets/images/movies/freeguy1.jpeg"), "year": "2021", "ismovie": true, },
        ]

    },
    {
        "title": "TOP PICKS FOR YOU",
        "data": [
            { "name": "The Gray Man", "genre": "Action, Thriller", "language": "English", "duration": "2 h 2 min", "size": "729MB", "banner": require("../assets/images/movies/grayman1.jpg"), "year": "2022", "ismovie": true, },
            { "name": "Day Shift", "genre": "Comedy, Fantasy", "language": "English", "duration": "1 h 54 min", "size": "729MB", "banner": require("../assets/images/movies/dayshift1.jpg"), "year": "2022", "ismovie": true, },
            { "name": "Beast", "genre": "Thriller, Adventure", "language": "English", "duration": "1 h 33 min", "size": "729MB", "banner": require("../assets/images/movies/beast1.jpeg"), "year": "2022", "ismovie": true, },
            { "name": "RRR", "genre": "Action, Drama", "language": "Hindi", "duration": "3 h 2 min", "size": "729MB", "banner": require("../assets/images/movies/RRR1.jpeg"), "year": "2022", "ismovie": true, },
            { "name": "Alpha", "genre": "Drama, History", "language": "English", "duration": "1 h 36 min", "size": "729MB", "banner": require("../assets/images/movies/alpha1.jpeg"), "year": "2018", "ismovie": true, },
        ]

    }

]

export const topPicksMovies = [
    { "name": "The Gray Man", "genre": "Action, Thriller", "language": "English", "duration": "2 h 2 min", "size": "729MB", "banner": require("../assets/images/movies/grayman1.jpg"), "year": "2022", "ismovie": true, },
    { "name": "Day Shift", "genre": "Comedy, Fantasy", "language": "English", "duration": "1 h 54 min", "size": "729MB", "banner": require("../assets/images/movies/dayshift1.jpg"), "year": "2022", "ismovie": true, },
    { "name": "Beast", "genre": "Thriller, Adventure", "language": "English", "duration": "1 h 33 min", "size": "729MB", "banner": require("../assets/images/movies/beast1.jpeg"), "year": "2022", "ismovie": true, },
    { "name": "RRR", "genre": "Action, Drama", "language": "Hindi", "duration": "3 h 2 min", "size": "729MB", "banner": require("../assets/images/movies/RRR1.jpeg"), "year": "2022", "ismovie": true, },
    { "name": "Alpha", "genre": "Drama, History", "language": "English", "duration": "1 h 36 min", "size": "729MB", "banner": require("../assets/images/movies/alpha1.jpeg"), "year": "2018", "ismovie": true, },
]



export const carouseldataSeries = [
    { "id": 1, "bannerredirecturl": "PlayerScreen", "ismovie": false, "url": require("../assets/images/series/daredevil.jpeg"), "name": "DareDevil", "genre": "Action, Crime", "language": "English", "duration": "3 Season", "size": "39 Episodes", "banner": require("../assets/images/series/daredevil1.jpg"), "year": "2015" },
    { "id": 2, "bannerredirecturl": "PlayerScreen", "ismovie": false, "url": require("../assets/images/series/friends.jpeg"), "name": "Friends", "genre": "Comedy, Sitcom", "language": "English", "duration": "10 Season", "size": "236 Episodes", "banner": require("../assets/images/series/friends1.jpeg"), "year": "1994" },
    { "id": 3, "bannerredirecturl": "PlayerScreen", "ismovie": false, "url": require("../assets/images/series/arrow.jpg"), "name": "Arrow", "genre": "Superhero, Drama", "language": "English", "duration": "8 Seasons", "size": "170 Episodes", "banner": require("../assets/images/series/arrow1.jpg"), "year": "2012" },
    { "id": 4, "bannerredirecturl": "PlayerScreen", "ismovie": false, "url": require("../assets/images/series/got.jpeg"), "name": "Game Of Thrones", "genre": "Action, Adventure", "language": "English", "duration": "8 Season", "size": "73 Episodes", "banner": require("../assets/images/series/got1.jpeg"), "year": "2011" }
]


export const seriesdata = [
    { "name": "Game Of Thrones", "genre": "Action, Adventure", "language": "English", "duration": "8 Season", "size": "73 Episodes", "banner": require("../assets/images/series/got1.jpeg"), "year": "2011" },
    { "name": "Friends", "genre": "Comedy, Sitcom", "language": "English", "duration": "10 Season", "size": "236 Episodes", "banner": require("../assets/images/series/friends1.jpeg"), "year": "1994" },
    { "name": "Dark", "genre": "Mystery, Thriller", "language": "English", "duration": "3 Season", "size": "26 Episodes", "banner": require("../assets/images/series/dark1.jpg"), "year": "2017" },
    { "name": "DareDevil", "genre": "Action, Crime", "language": "English", "duration": "3 Season", "size": "39 Episdoes", "banner": require("../assets/images/series/daredevil1.jpg"), "year": "2015" },
    { "name": "Arrow", "genre": "Superhero, Drama", "language": "English", "duration": "8 Season", "size": "170 Episodes", "banner": require("../assets/images/series/arrow1.jpg"), "year": "2012" },
]


export const continueseries = [
    { "name": "Money Heist", "genre": "Heist, Drama", "language": "English", "duration": "5 Season", "playduration": 90, "banner": require("../assets/images/series/moneyheist1.png"), "url": require("../assets/images/series/moneyheist.jpeg"), "year": "2017" },
    { "name": "Stranger Things", "genre": "Mystery, Horror", "language": "English", "duration": "4 Season", "playduration": 20, "banner": require("../assets/images/series/strangerthings1.jpeg"), "url": require("../assets/images/series/strangerthings.jpeg"), "year": "2016" },
    { "name": "Breaking Bad", "genre": "Crime, Drama", "language": "English", "duration": "5 Seasons", "playduration": 50, "size": "62 Episdoes", "banner": require("../assets/images/series/breakingbad1.jpeg"), "url": require("../assets/images/series/breakingbad.jpeg"), "year": "2008" },
    { "name": "Mirzapur", "genre": "Crime, Drama", "language": "Hindi", "duration": "2 Seasons", "playduration": 30, "size": "19 Episodes", "banner": require("../assets/images/series/mirzapur1.jpeg"), "url": require("../assets/images/series/mirzapur.jpeg"), "year": "2018" },
]



export const SeriesData = [
    {
        "title": "SERIES YOU MAY LIKE",
        "data":
            [
                { "name": "Game Of Thrones", "genre": "Action, Adventure", "language": "English", "duration": "8 Season", "size": "73 Episodes", "banner": require("../assets/images/series/got1.jpeg"), "year": "2011" },
                { "name": "Friends", "genre": "Comedy, Sitcom", "language": "English", "duration": "10 Season", "size": "236 Episodes", "banner": require("../assets/images/series/friends1.jpeg"), "year": "1994" },
                { "name": "Dark", "genre": "Mystery, Thriller", "language": "English", "duration": "3 Season", "size": "26 Episodes", "banner": require("../assets/images/series/dark1.jpg"), "year": "2017" },
                { "name": "DareDevil", "genre": "Action, Crime", "language": "English", "duration": "3 Season", "size": "39 Episdoes", "banner": require("../assets/images/series/daredevil1.jpg"), "year": "2015" },
                { "name": "Arrow", "genre": "Superhero, Drama", "language": "English", "duration": "8 Season", "size": "170 Episodes", "banner": require("../assets/images/series/arrow1.jpg"), "year": "2012" },
            ],
    },
    {
        "title": "TOP PICKS FOR YOU",
        "data": [
            { "name": "Peaky Blinders", "genre": "Crime, Drama", "language": "English", "duration": "6 Seasons", "size": "36 Episodes", "banner": require("../assets/images/series/peakyblinders1.jpg"), "year": "2013" },
            { "name": "Spartacus", "genre": "Historical, Action", "language": "English", "duration": "3 Seasons", "size": "39 Episodes", "banner": require("../assets/images/series/spartacus1.jpeg"), "year": "2010" },
            { "name": "Stranger Things", "genre": "Mystery, Horror", "language": "English", "duration": "4 Season", "size": "34 Episodes", "banner": require("../assets/images/series/strangerthings1.jpeg"), "year": "2016" },
            { "name": "Delhi Crime", "genre": "Crime, Drama", "language": "Hindi", "duration": "2 Season", "size": "12 Episdoes", "banner": require("../assets/images/series/delhicrime1.jpg"), "year": "2019" },
            { "name": "Money Heist", "genre": "Heist, Drama", "language": "English", "duration": "5 Season", "size": "41 Episodes", "banner": require("../assets/images/series/moneyheist1.png"), "year": '2017' },
        ]

    },
    {
        "title": "RECENTLY ADDED SERIES",
        "data": [
            { "name": "Squid Games", "genre": "Drama, Mystery", "language": "English", "duration": "1 Season", "size": "9 Episodes", "banner": require("../assets/images/series/squidgame1.jpeg"), "year": "2021" },
            { "name": "Lucifier", "genre": "Mystery, Comedy", "language": "English", "duration": "6 Seasons", "size": "93 Episodes", "banner": require("../assets/images/series/lucifier1.jpeg"), "year": "2016" },
            { "name": "Mirzapur", "genre": "Crime, Drama", "language": "Hindi", "duration": "2 Seasons", "size": "19 Episodes", "banner": require("../assets/images/series/mirzapur1.jpeg"), "year": "2018" },
            { "name": "Breaking Bad", "genre": "Crime, Drama", "language": "English", "duration": "5 Seasons", "size": "62 Episdoes", "banner": require("../assets/images/series/breakingbad1.jpeg"), "year": "2008" },
            { "name": "Office", "genre": "Comedy, Sitcom", "language": "English", "duration": "9 Seasons", "size": "201 Episodes", "banner": require("../assets/images/series/office1.jpeg"), "year": "2005" },
        ]

    }

]



export const episdoesdummy = [{}, {}, {}, {}, {}]

export const popularsearches = [
    { "title": "ANIMATED" }, { "title": "BOLLYWOOD" }, { "title": "COMEDY MOVIE" }, { "title": "COMEDIES" }, { "title": "AWARD WINNING" }, { "title": "FANTASY" }, { "title": "INTERNATIONAL" }, { "title": "CHILDRENS" }, { "title": "MYSTERY" },
]

export const ratingList = [
    { "name": "John Doe", "date": "10 Aug 2022", "stars": "5", "photo": require("../assets/images/avatar1.jpeg"), "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus odio sit amet justo tempus malesuada. Nulla dignissim libero dolor, sed facilisis lectus auctor eu. Quisque mattis leo id euismod aliquam." },
    { "name": "Emma Watson", "date": "20 Jul 2022", "stars": "5", "photo": require("../assets/images/avatar4.jpeg"), "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus odio sit amet justo tempus malesuada. Nulla dignissim libero dolor, sed facilisis lectus auctor eu. Quisque mattis leo id euismod aliquam." },
    { "name": "Mark Jhonson", "date": "17 Jul 2022", "stars": "3", "photo": require("../assets/images/avatar2.jpeg"), "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus odio sit amet justo tempus malesuada. Nulla dignissim libero dolor, sed facilisis lectus auctor eu. Quisque mattis leo id euismod aliquam." },
    { "name": "Mini Singh", "date": "24 Jun 2022", "stars": "4", "photo": require("../assets/images/avatar3.jpeg"), "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus odio sit amet justo tempus malesuada. Nulla dignissim libero dolor, sed facilisis lectus auctor eu. Quisque mattis leo id euismod aliquam." },

]

export const recentsearches = [
    { "title": "Inceptiom" },
    { "title": "Game Of Thrones" },
    { "title": "Friends" },
    { "title": "Forrest Gump" },
]

export const downloads = [
    { id: 1, "name": "Inception", "genre": "Action, Sci-fi", "language": "English", "duration": "2 h 28 min", "size": "729MB", "banner": require("../assets/images/movies/Inception1.jpeg"), "year": "2010" },
    { "name": "Game Of Thrones", "genre": "Action, Adventure", "language": "English", "duration": "8 Season", "size": "73 Episodes", "banner": require("../assets/images/series/got1.jpeg"), "year": "2011" },
    { id: 2, "name": "The Godfather", "genre": "Crime, Drama", "language": "English", "duration": "2 h 55 min", "size": "837MB", "banner": require("../assets/images/movies/Godfather1.jpg"), "year": "1976" },
    { "name": "Friends", "genre": "Comedy, Sitcom", "language": "English", "duration": "10 Season", "size": "236 Episodes", "banner": require("../assets/images/series/friends1.jpeg"), "year": "1994" },
    { id: 3, "name": "Forrest Gump", "genre": "Drama, Romance", "language": "English", "duration": "2 h 22 min", "size": "712MB", "banner": require("../assets/images/movies/forrestgump1.jpeg"), "year": "1994" },
    { "name": "Dark", "genre": "Mystery, Thriller", "language": "English", "duration": "3 Season", "size": "26 Episodes", "banner": require("../assets/images/series/dark1.jpg"), "year": "2017" },
    { id: 4, "name": "Black Adam", "genre": "Action, Adventure", "language": "English", "duration": "2 h 10 min", "size": "918MB", "banner": require("../assets/images/movies/Blackadam1.jpeg"), "year": "2022" },
    { "name": "DareDevil", "genre": "Action, Crime", "language": "English", "duration": "3 Season", "size": "39 Episdoes", "banner": require("../assets/images/series/daredevil1.jpg"), "year": "2015" },
    { id: 5, "name": "Life Of Pi", "genre": "Adventure, Drama", "language": "English", "duration": "2 h 7 min ", "size": "668MB", "banner": require("../assets/images/movies/LifeOfPi1.jpeg"), "year": "2017" },
    { "name": "Arrow", "genre": "Superhero, Drama", "language": "English", "duration": "8 Season", "size": "170 Episodes", "banner": require("../assets/images/series/arrow1.jpg"), "year": "2012" },

]
