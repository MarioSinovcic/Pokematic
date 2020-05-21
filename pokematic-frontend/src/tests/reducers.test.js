import rootReducers from '../reducers/index';
import { createStore } from 'redux';
import { togglePokemonLoad, addToCollection, addPokemonData, addPokemonNames, addPokemonTypes, setCollection, toggleCollection } from '../actions/actions';
import { POKEMONTYPES } from '../api/constants';

describe('pokemon reducers', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers);
    })


    it('check the initial store state', () => {
        const keys = Object.keys(store.getState());
        expect(keys.length).toBe(6);
        expect(keys).toEqual([
            "teamPokemon",
            "pokemonCollection",
            "pokemonURL",
            "pokemonTypes",
            "pokemonData",
            "isLoaded"]);
    });


    describe('team collections', () => {

        it('makes sure to load pokemon on first load', () => {
            expect(store.getState().isLoaded).toBe(false);
        });


        it('successfully toggles load for pokemon', () => {
            store.dispatch(togglePokemonLoad());
            expect(store.getState().isLoaded).toBe(true);
        })

        it('adds pokemon to the team\'s collection', () => {
            const pokemon1 = ["bulbasaur", "3", "URL"];
            const pokemon2 = ["squirtle", "2", "URL"];

            store.dispatch(addToCollection(pokemon1));
            store.dispatch(addToCollection(pokemon2));
            expect(store.getState().teamPokemon).toEqual([
                ["bulbasaur", "3", "URL"],
                ["squirtle", "2", "URL"],
            ]);
        })

        it('change team collections', () => {
            const oldCollection = [
                ["bulbasaur", "3", "URL"],
                ["squirtle", "2", "URL"],
            ];

            store.dispatch(setCollection(oldCollection));

            const newCollection = [
                ["mario", "1", "URL"],
                ["sean", "2", "URL"],
            ];


            store.dispatch(setCollection(newCollection));
            expect(store.getState().teamPokemon).toEqual([
                ["mario", "1", "URL"],
                ["sean", "2", "URL"],
            ]);
        });

        it('has a pokemon cache that gets changed', () => {
            expect(store.getState().pokemonCollection).toEqual([]);

            const newCollection = [
                ["mario", "1", "URL"],
                ["sean", "2", "URL"],
            ];

            store.dispatch(toggleCollection(newCollection));
            expect(store.getState().pokemonCollection).toEqual([
                ["mario", "1", "URL"],
                ["sean", "2", "URL"],
            ]);
        });
    });

    describe('pokemon database', () => {

        it('adds the name and URL of the pokemon to store', () => {
            expect(store.getState().pokemonURL).toEqual([]);
            const pokemon1 = ['bulbasaur', 'https://pokeapi.co/api/v2/bulbasaur'];
            const pokemon2 = [['squirtle', 'https://pokeapi.co/api/v2/squirtle']];

            store.dispatch(addPokemonNames(pokemon1));
            store.dispatch(addPokemonNames(pokemon2));

            expect(store.getState().pokemonURL).toEqual([
                ['squirtle', 'https://pokeapi.co/api/v2/squirtle'],
            ]);
        })

        it('adds the name and data of the pokemon', () => {
            expect(store.getState().pokemonData).toEqual([]);
            const pokemon = [[1, 'bulbasaur', 'https://pokeapi.co/api/v2/bulbasaur'], [2, 'squirtle', 'https://pokeapi.co/api/v2/squirtle']];


            store.dispatch(addPokemonData(pokemon));


            expect(store.getState().pokemonData).toEqual([
                [1, 'bulbasaur', 'https://pokeapi.co/api/v2/bulbasaur'],
                 [2, 'squirtle', 'https://pokeapi.co/api/v2/squirtle'],
            ]);
        })

        it('appends the name and type of the pokemon to store', () => {
            expect(store.getState().pokemonTypes).toEqual([]);
            const pokemon1 = ['bulbasaur', POKEMONTYPES.GRASS];
            const pokemon2 = ['squirtle', POKEMONTYPES.WATER];

            store.dispatch(addPokemonTypes('bulbasaur', POKEMONTYPES.GRASS));
            store.dispatch(addPokemonTypes('squirtle', POKEMONTYPES.WATER));

            expect(store.getState().pokemonTypes).toEqual([
                ['bulbasaur', POKEMONTYPES.GRASS],
                ['squirtle', POKEMONTYPES.WATER]
            ]);
        })
       
    });

});
