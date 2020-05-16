import React from 'react';
import { shallow } from 'enzyme';
import Board from '../pages/Board';
import Login from '../pages/Login';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import TeamCard from '../shared-components/TeamCard';

//The following code includes examples for snapshot testing components.
//Please try following the naming convetions shown in these examples

//Docs : https://enzymejs.github.io/enzyme/


