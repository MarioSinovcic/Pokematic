import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../redux/reducers';
import LevelUpModalContent from '../pages/board-components/Modals/LevelUpModalContent';
import NewGoalModalContent from '../pages/board-components/Modals/NewGoalModalContent';
import TaskModalContent from '../pages/board-components/Modals/TaskModalContent';
import NewTaskModalContent from '../pages/board-components/Modals/NewTaskModalContent';

// TODO: cannot read property 'style' of null
xdescribe('modals', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })

    describe('snapshot matching', () => {

        it('LevelUpModalContent matches snapshot' , () => {
            const level = renderer.create(<Provider store={store}>
                <LevelUpModalContent />
            </Provider>).toJSON();
            expect(level).toMatchSnapshot();
        });

        it('NewGoalModalContent matches snapshot' , () => {
            const goal = renderer.create(<Provider store={store}>
                <NewGoalModalContent />
            </Provider>).toJSON();
            expect(goal).toMatchSnapshot();
        });

        it('NewTaskModalContent matches snapshot' , () => {
            const newTask = renderer.create(<Provider store={store}>
                <NewTaskModalContent />
            </Provider>).toJSON();
            expect(newTask).toMatchSnapshot();
        });
       

        it('TaskModalContent matches snapshot' , () => {
            const task = renderer.create(<Provider store={store}>
                <TaskModalContent />
            </Provider>).toJSON();
            expect(task).toMatchSnapshot();
        });

    })

});