import React from 'react';
import PokedexList from './pokedex-components/PokedexList'
import Header from '../shared-components/Header'
import TeamCard from '../shared-components/TeamCard';
import './Pokedex.css'

function Pokedex() {
  return (
    <div className="Pokedex">
      
      <div>
        <Header/>
      </div>
      <div className="TeamCard"> 
        <TeamCard />
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
