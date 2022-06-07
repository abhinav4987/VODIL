import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames';
import {Hero, Banner, Card} from '../components/home';
import { Navbar, Slider } from '../components/layout';
import styles from '../styles/Home.module.css'
import { 
  get_certification, 
  get_genre, 
  get_moviesByGenre,
  get_popularMovies,
  get_topRatedMovies,
  get_topRatedTV,
  get_popularTV,
  get_trendingMoviesByDay,
  get_trendingMovieByWeek,
  get_trendingTvByDay,
  get_trendingTvByWeek, 
} from '../lib/tmdb';
import { redirectUser } from '../helper';



const Home: NextPage = (props) => {

  const {
    topratedMovies,
    topRatedTv,
    popularMovies,
    popularTV,
    trendingMoviesByDay,
    trendingMoviesByWeek,
    trendingTvByDay,
    trendingTvByWeek,
  } = props;
  
  const bannerData = topratedMovies.data[Math.floor(Math.random()*topratedMovies.data.length)]
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Vidul - watch TV shows online, watch movies online</title>
      </Head>
      <Navbar/>
      <Banner 
        data={bannerData}
      />

      <div className={styles.catalog}>
        <Slider title={'Top Movies'} contentType="movie" baseURL={topratedMovies.baseURL} data={topratedMovies.data} isDisplayedAtTop={true}/>
        <Slider title={'Top TV Shows'} contentType="tv" baseURL={topRatedTv.baseURL} data={topRatedTv.data} />
        <Slider title={'Popular Movies'} contentType="movie" baseURL={popularMovies.baseURL} data={popularMovies.data} />
        <Slider title={'Popular TV Shows'} contentType="tv" baseURL={popularTV.baseURL} data={popularTV.data} />
        <Slider title={'Trending Movies today'} contentType="movie" baseURL={trendingMoviesByDay.baseURL} data={trendingMoviesByDay.data} />
        <Slider title={'Top TV Shows today'} contentType="tv" baseURL={trendingTvByDay.baseURL} data={trendingTvByDay.data} />
        <Slider title={'Top Movies this week'} contentType="movie" baseURL={trendingMoviesByWeek.baseURL} data={trendingMoviesByWeek.data} />
        <Slider title={'Top TV Shows this Week'} contentType="tv" baseURL={trendingTvByWeek.baseURL} data={trendingTvByWeek.data} />
      </div>
      

    </div>
  )
}


export async function getServerSideProps(context) {

  const {userId, token} = await redirectUser(context)
  console.log("my token", userId);
  if(!token)
    return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props:{},
  };
  const  topratedMovies = await get_topRatedMovies();
  const topRatedTv = await get_topRatedTV();
  const popularMovies = await get_popularMovies();
  const popularTV = await get_popularTV();
  const trendingMoviesByDay = await get_trendingMoviesByDay();
  const trendingMoviesByWeek = await get_trendingMovieByWeek();
  const trendingTvByDay = await get_trendingTvByDay();
  const trendingTvByWeek = await get_trendingTvByWeek();

  return {
    props : {
      topratedMovies,
      topRatedTv,
      popularMovies,
      popularTV,
      trendingMoviesByDay,
      trendingMoviesByWeek,
      trendingTvByDay,
      trendingTvByWeek,
    }
  }
}

export default Home
