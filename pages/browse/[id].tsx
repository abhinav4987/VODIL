import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import {Hero, Banner, Card} from '../../components/home';
import { Navbar, Slider } from '../../components/layout'; 
import { redirectUser } from '../../helper';
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
  get_tvByGenre, 
} from '../../lib/tmdb';
import styles from '../../styles/Home.module.css'

const Browse:NextPage = (props) => {
  
  const {
    popular, 
    trending, 
    genreSpecificContent
  } = props;
  
  const bannerData = popular.data[Math.floor(Math.random()*popular.data.length)]
  const {query: {id}} = useRouter();

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
        <Slider title={'Popular'}  contentType={id === "movie" ? "movie" : "tv"} baseURL={popular.baseURL} data={popular.data} isDisplayedAtTop={true}/>
        <Slider title={'Trending'} contentType={id === "movie" ? "movie" : "tv"} baseURL={popular.baseURL} data={trending.data}/>
        {
          Object.keys(genreSpecificContent).map(genre => {
            const {baseURL, data} = genreSpecificContent[genre];
            return (
              <Slider key={genre} title={genre} contentType={id === "movie" ? "movie" : "tv"} baseURL={baseURL} data={data}/>
            )
          })
        }

      </div>
      

    </div>
  )
}


export async function getServerSideProps(context) {
  
  const {userId, token} = await redirectUser(context)
  if(!token)
    return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props:{},
  };
  
  const { query : {id} } = context;
  let popular;
  if(id === 'movie') {popular = await get_popularMovies()}
  else popular = await get_popularTV();

  let trending;
  if(id === 'movie') {trending = await get_trendingMovieByWeek()}
  else trending = await get_trendingTvByWeek();

  let genreSpecificContent;
  if(id === 'movie') {genreSpecificContent = await get_moviesByGenre()}
  else genreSpecificContent = await get_tvByGenre();

  
  return {
    props: {
      popular,
      trending,
      genreSpecificContent
    }
  }
}

export default Browse