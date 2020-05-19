import React from 'react';
import { shallow } from 'enzyme';
import Board from '../pages/Board';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import NotFound from '../pages/NotFound';
import TeamSearch from '../pages/TeamSearch';

//The following code includes examples for snapshot testing components.
//Please try following the naming convetions shown in these examples

//Docs : https://enzymejs.github.io/enzyme/


describe('pages', () => {
    
    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })

    describe('snapshot tests', () => {
        it ('displays error page', () => {
            const notFound = renderer.create(<Provider store={store}>
                <NotFound />
            </Provider>).toJSON();
            expect(notFound).toMatchSnapshot();
        })

        it ('team search', () => {
            const team = renderer.create(<Provider store={store}>
                <TeamSearch />
            </Provider>).toJSON();
            expect(team).toMatchSnapshot();
        })
    })
})


// TODO: test router pages
xdescribe('Board', () => {

    //this tests if the component renders without errors
    it('should render without throwing an error', () => {
        jest.mock('react-router-dom', () => ({
            useHistory: () => ({
              push: jest.fn(),
            }),
          }));
          
        const store = createStore(
            rootReducers,
        );
        const result = renderer.create(
            <Provider store={store}>
        
            <Board />
            </Provider>
          ).toJSON();
          expect(result).toMatchSnapshot();
    })

    // //this tests if the Board component renders only one div with the classname Board (hence div.Board)
    // it('should render an encapsilating div', () => {
    //     expect(shallow(<Board />).find('div.Board').length).toEqual(1)
    // });

    // //this tests if the component renders correctly without props
    // it('should render correctly in with no props', () => {
    // //   const component = shallow(<Board/>);
    
    // //   expect(component).toMatchSnapshot();
    //     expect(this)

    // });

    // //this tests if the component renders correctly with props
    // it('should render correctly in with props', () => {
    //     const inputProps = ['one', 'two'];

    //     const component = shallow(<Board list={inputProps}/>);
          
    //     expect(component).toMatchSnapshot();
    // });
});
