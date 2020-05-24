import React from 'react';
import { shallow } from 'enzyme';
import Board from '../pages/Board';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import NotFound from '../pages/NotFound';
import TeamSearch from '../pages/TeamSearch';
import Routes from '../router/Routes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Pokedex from '../pages/Pokedex';

//The following code includes examples for snapshot testing components.
//Please try following the naming convetions shown in these examples

//Docs : https://enzymejs.github.io/enzyme/


describe('pages', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })

    describe('snapshot tests', () => {
        it('displays error page', () => {
            const notFound = renderer.create(<Provider store={store}>
                <NotFound />
            </Provider>).toJSON();
            expect(notFound).toMatchSnapshot();
        })

        it('team search', () => {
            const team = renderer.create(<Provider store={store}>
                <TeamSearch />
            </Provider>).toJSON();
            expect(team).toMatchSnapshot();
        })
    })
})

describe('Snapshot pages tests', () => {
    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })



    // TODO: test router pages
    describe('Board', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));

            const wrapper = shallow(<Provider store={store}><Board /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })

    });

    describe('Login', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));


            const wrapper = shallow(<Provider store={store}><Login /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })
    });

    describe('Profile', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));


            const wrapper = shallow(<Provider store={store}><Profile /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })
    });

    describe('Pokedex', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));


            const wrapper = shallow(<Provider store={store}><Pokedex /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })
    });


    describe('Board', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));


            const wrapper = shallow(<Provider store={store}><Board /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })

    });

    describe('Incorrect Link', () => {

        //this tests if the component renders without errors
        it('should render without throwing an error', () => {
            jest.mock('react-router-dom', () => ({
                useHistory: () => ({
                    push: jest.fn(),
                }),
            }));

            const wrapper = shallow(<Provider store={store}><NotFound /></Provider>);


            expect(wrapper).toMatchSnapshot();

        })
    });

});

