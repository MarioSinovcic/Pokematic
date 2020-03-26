import React from 'react';
import PokedexList from './components/PokedexList'
import Header from '../shared/Header'

function Pokedex() {
  return (
    <div className="pokedex-page">
      <div>
        <Header/>
      </div>
      <div>
        <PokedexList/>
      </div>
      <div>
        Team Status
      </div>
    </div>
  );
}

export default Pokedex;
