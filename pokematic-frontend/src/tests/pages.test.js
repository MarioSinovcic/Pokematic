import React from 'react';
import { shallow } from 'enzyme';
import Board from '../pages/Board';

//The following code includes examples for snapshot testing components.
//Please try following the naming convetions shown in these examples

//Docs : https://enzymejs.github.io/enzyme/

describe('Board', () => {

    //this tests if the component renders without errors
    it('should render without throwing an error', () => {
        expect(shallow(<Board />).find('div').exists()).toBe(true)
    })

    //this tests if the Board component renders only one div with the classname Board (hence div.Board)
    it('should render an encapsilating div', () => {
        expect(shallow(<Board />).find('div.Board').length).toEqual(1)
    });

    //this tests if the component renders correctly without props
    it('should render correctly in with no props', () => {
      const component = shallow(<Board/>);
    
      expect(component).toMatchSnapshot();
    });

    //this tests if the component renders correctly with props
    it('should render correctly in with props', () => {
        const inputProps = ['one', 'two'];

        const component = shallow(<Board list={inputProps}/>);
          
        expect(component).toMatchSnapshot();
    });
});
