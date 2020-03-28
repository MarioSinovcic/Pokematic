import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import './Pokedex.css'

function Pokedex() {
  return (
    <div className="Pokedex">
      
      <div>
        <Header/>
      </div>
      <div>          
        <PokedexList/>
      </div>
      <div>
        {/* Team Status */}
      </div>
    </div>
  );
}

export default Pokedex;
