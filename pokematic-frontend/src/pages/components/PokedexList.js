import React from 'react';
import PokedexItem from './PokedexItem'
import './PokedexList.css'

function PokedexList() {
  return (
    <div className="PokedexList">
      <div class="grid-container">
        <div class="grid-item"><PokedexItem/></div>
        <div class="grid-item"><PokedexItem/></div>
        <div class="grid-item"><PokedexItem/></div>
        <div class="grid-item"><PokedexItem/></div>
        <div class="grid-item"><PokedexItem/></div>
        
        
      </div>
    </div>
  );
}

export default PokedexList;
