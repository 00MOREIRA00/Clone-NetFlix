import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './componentes/MovieRow';
import './App.css';
import FeaturedMovie from './componentes/FeaturedMovie';
import Header from './componentes/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);


      //Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(choseInfo);
    }

    loadAll();

  }, []);

    //Criando modificação de estilo topo
  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 600) {
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&
          <FeaturedMovie item={featuredData} />
      }

       <section className='lists'>
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
       </section>

       <footer>
        Feito por Roberto Neto<br/>
        Direitos de Imagem para Netflix<br/>
        Dados pegos do site Themomiedb.org

       </footer>
    </div>
  );
}
