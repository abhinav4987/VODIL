import axios from 'axios';
import {
    BASE_URL,
    CERTIFICATION_ENDPOINT,
    GENRES_ENDPOINT,
    TOP_RATED_MOVIES_ENDPOINT,
    POPULAR_MOVIES_ENDOINT,
    TRENDING,
    DISCOVER_MOVIES,
    DISCOVER_TV,
    SIMILAR_TV_ENDPOINTS,
    MOVIES_GENRE_ENDPOINT,
    TV_GENRE_ENDPOINT,
    TOP_RATED_TV_ENDPOINT,
    POPULAR_TV_ENDPOINT,
    TV_DETAIL_ENDPOINT,
    MOVIE_DETAIL_ENDPOINT
} from '../constants/TMDB';
import { get_myListVideos } from './hasura_db';

const params = new URLSearchParams();
params.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 ? process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 : '');
const tmdb_api = axios.create({
    baseURL: BASE_URL,
    params: params
    
});

export const get_certification = async () => {

    const res = await tmdb_api.get(CERTIFICATION_ENDPOINT);
    return res;
}

export const get_genre = async () => {
    const res = await tmdb_api.get(GENRES_ENDPOINT);
    return res;
};


export const get_topRatedMovies = async () => {
    const res = await tmdb_api.get(TOP_RATED_MOVIES_ENDPOINT);
    
    
    const {
        config: {baseURL},
        data: {results}
    } = res;

    return {
        baseURL, data: results
    };
}

export const get_popularMovies = async () => {

    const res = await tmdb_api.get(POPULAR_MOVIES_ENDOINT);
    

    const {
        config: {baseURL},
        data: {results}
    } = res;

    return {
        baseURL, data: results
    };
};

export const get_topRatedTV = async () => {

    const res = await tmdb_api.get(POPULAR_TV_ENDPOINT);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
};

export const get_popularTV = async () => {
    const res = await tmdb_api.get(POPULAR_TV_ENDPOINT);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
};


export const get_moviesByGenre = async () => {
    const geners_data = await get_genre();
    
    const { data: {genres}} = geners_data;
   
    const moviesByGenre: {
        [key: string]: {}
    } = {};

    await Promise.all(genres.slice(0,10).map(async (genre:{id: number, name: string}) => {
        const params = new URLSearchParams();
        params.append("with_genres", String(genre.id));
        // params.append("sort_by","popularity.dcs");
        params.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 ? process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 : '');

        const res = await tmdb_api.get(DISCOVER_MOVIES,{
            params: params
        });
        const {
            config: {baseURL},
            data: {results}
        } = res;
        
        moviesByGenre[genre.name] = {
            baseURL, data: results
        }
    }));
    return moviesByGenre;

};

export const get_tvByGenre = async () => {

    const geners_data = await tmdb_api.get(TV_GENRE_ENDPOINT);
    const { data: {genres}} = geners_data;

    const moviesByGenre: {
        [key: string]: {}
    } = {};

    await Promise.all(genres.slice(0,10).map(async (genre:{id: number, name: string}) => {
        const params = new URLSearchParams();
        params.append("with_genres", String(genre.id));
        // params.append("sort_by","popularity.dcs");
        params.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 ? process.env.NEXT_PUBLIC_TMDB_API_KEY_V3 : '');

        const res = await tmdb_api.get(DISCOVER_TV,{
            params: params
        })
        const {
            config: {baseURL},
            data: {results}
        } = res;

        moviesByGenre[genre.name] = {
            baseURL, data: results
        }
    }));

    return moviesByGenre;

};


export const get_trendingMoviesByDay = async () => {

    const res = await tmdb_api.get(`${TRENDING}/movie/day`);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
};

export const get_trendingMovieByWeek = async () => {
    const res = await tmdb_api.get(`${TRENDING}/movie/week`);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
}

export const get_trendingTvByDay = async () => {
    const res = await tmdb_api.get(`${TRENDING}/tv/day`);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
}

export const get_trendingTvByWeek = async () => {
    const res = await tmdb_api.get(`${TRENDING}/tv/week`);
    
    const {
        config: {baseURL},
        data: {results}
    } = res;
    return {
        baseURL, data: results
    };
}


export const get_dataByTvId = async (id:string) => {
    try {
        const res = await tmdb_api.get(`${TV_DETAIL_ENDPOINT}/${id}`);
    
        
        const {
            config: {baseURL},
            data
        } = res;
        return {
            baseURL, data: data
        };
    } catch(error) {
        console.log(error);
        return null;
    }
};

export const  get_dataByMovieId = async (id:string) =>{

    try {
        const res = await tmdb_api.get(`${MOVIE_DETAIL_ENDPOINT}/${id}`);
    
        
        const {
            config: {baseURL},
            data
        } = res;
        return {
            baseURL, data: data
        };
    } catch (error) {
        console.log(error);
        return null
    }
}


export const getMyList = async (userId, token) => {
  const videos: Array<{
      video_id: string,
      video_type: string,
  }> = await get_myListVideos(userId, token);
  console.log("hefeed => ", videos)
  const data:Array<{
      content_type: "movie" | "tv",
      data: []
  }> = [];

  if(videos.length) {
      await Promise.all(videos.map(async (video) => {
        let vidData;
        if(video.video_type === "movie") {
            vidData = await get_dataByMovieId(video.video_id);
            console.log("vide0 movie=> ", video.video_id);
            if(vidData)
            data.push({
                content_type: "movie",
                data: vidData,
            })
        } else {
            vidData = await get_dataByTvId(video.video_id);
            console.log("vide0 tv => ", video.video_id);
            if(vidData)
            data.push({
                content_type: "tv",
                data: vidData,
            })
        }
      }))

      return data;
  } else return [];
  return videos;
};
