import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../redux/reducers';
import PokedexItem from '../pages/pokedex-components/PokedexItem';
import PokedexList from '../pages/pokedex-components/PokedexList';

describe('pokedex components', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })

    describe('snapshot matching', () => {

        it('Pokedex Item matches snapshot' , () => {
            const pokeItem = renderer.create(<Provider store={store}>
                <PokedexItem />
            </Provider>).toJSON();
            expect(pokeItem).toMatchSnapshot();
        });

        it('Pokedex List matches snapshot' , () => {
            const dummyPokemonList = [];

            const pokeList = renderer.create(<Provider store={store}>
                <PokedexList 
                pokemonCollection={dummyPokemonList}/>
            </Provider>).toJSON();
            expect(pokeList).toMatchSnapshot();
        });
    })

});