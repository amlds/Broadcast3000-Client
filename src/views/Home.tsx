import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/views/home.scss';


const Home: React.FC = () => {
    return (
    <main className='home'>
      <header className='home__header container'>
        <img className='logo' src='./images/Logo_wagon_white.png' alt='Wagon Logo'></img>
        <div className="align-row">
          <Link to='/login' className='button button--primary'>Login</Link>
          <Link to='/device' className='button button--secondary'>Go to device</Link>
        </div>
      </header>
      <section className='explication  container'>
        <div className="explication__header">
          <div className='explication__header__text'>
            <h2>Un affichage dynamique, <span className='text--secondary'>vitesse 3000</span></h2>
            <p>Accédez à la meilleure application d'affichage dynamique construit par la crème des alumni de lyon (#légodutype).</p>
            <button className='button button--primary'>incrivez vous !</button>
          </div>
          <img className='explication__header__img' src='./images/backgroundLogin.png' alt='Un mew qui code bien concentrer'></img>
        </div>
        <ul>
          <li>
            <h3><span className='text--secondary'>10000</span></h3>
            <p>utilisateur fictif déjà inscrit</p>
          </li>
          <li>
            <h3><span className='text--secondary'>N°1</span></h3>
            <p>au sein du wagon Lyon</p>
          </li>
          <li>
            <h3><span className='text--secondary'>99%</span></h3>
            <p>utilisateur heureux après utilisations</p>
          </li>
          <li>
            <h3><span className='text--secondary'>4.98/5</span></h3>
            <p>noté par mes soins</p>
          </li>
        </ul>
      </section>
      <section className="technique">
        <div className="technique__header container">
          <h2>Broadcast3000 une application à la pointe de la <span className='text--secondary'>technologie</span></h2>
          <p>La technologie utilisé pour la réalisation de cette application est la suivante :</p>
        </div>
        <ul className='container'>
          <li>
            <h3>Ruby on rails</h3>
          </li>
          <li>
            <h3>React</h3>
          </li>
          <li>
            <h3>Typescript</h3>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
