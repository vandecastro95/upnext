const axios = require('axios')

const {
        GraphQLObjectType,
        GraphQLString, 
        GraphQLList,
        GraphQLSchema
     } = require('graphql');

const MoviesType = new GraphQLObjectType({
    name: 'movies',
    fields: () => ({
        Title: { type: GraphQLString },
        Year: { type: GraphQLString },
        Rated: { type: GraphQLString },
        Released: { type: GraphQLString }, 
        Genre: { type: GraphQLString },
        Director: { type: GraphQLString },
        Writer: { type: GraphQLString },
        Actors: { type: GraphQLString },
        Plot: { type: GraphQLString },
        Language: { type: GraphQLString },
        Country: { type: GraphQLString },
        Awards: { type: GraphQLString },
        Poster: { type: GraphQLString },
        Ratings: { type: new GraphQLList(RatingsType) },
        Metascore: { type: GraphQLString },
        imdbRating: { type: GraphQLString },
        imdbVotes: { type: GraphQLString },
        imdbID: { type: GraphQLString },
        Type: { type: GraphQLString },
        DVD: { type: GraphQLString },
        BoxOffice: { type: GraphQLString },
        Production: { type: GraphQLString },
        Website: { type: GraphQLString },
        Responses: { type: GraphQLString },
    })
});

const RatingsType = new GraphQLObjectType({
    name: 'ratings',
    fields: () => ({
        Source: {type: GraphQLString },
        Value: {type: GraphQLString }
    })
})

const moviesTitleType = new GraphQLObjectType({
    name: 'moviesTitle',
    fields: () => ({
        Title: { type: GraphQLString },
        Year: { type: GraphQLString },
        Poster: { type: GraphQLString },
        imdbID: { type: GraphQLString },
        Type: { type: GraphQLString },
    })
})

const SearchType = new GraphQLObjectType({
    name: 'search',
    fields: () => ({
        Search: { type: new GraphQLList( moviesTitleType) }
    })
})

//ROot Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: MoviesType,
            args: {
                title: { type: GraphQLString },
                year: { type: GraphQLString }
                },
                resolve(parent, args) {
                    return axios
                    .get(`http://www.omdbapi.com/?t=${args.title}&y=${args.year}&apikey=d72c202a`)
                    .then(res => res.data)
                }
        },
        moviesTitle: {
            type: SearchType,
            args: {
                title: { type: GraphQLString }
                },
                resolve(parent, args) {
                    return axios
                    .get(`http://www.omdbapi.com/?s=${args.title}&apikey=d72c202a`)
                    .then(res => res.data)
                }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery });