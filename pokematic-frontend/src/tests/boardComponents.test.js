import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../redux/reducers';
import Goal from '../pages/board-components/Goal';
import GoalSideBar from '../pages/board-components/GoalSideBar';
import StatusCard from '../pages/board-components/StatusCard';
import StatusDropdown from '../pages/board-components/StatusDropdown';
import TaskCard from '../pages/board-components/TaskCard';



describe('board components', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })

    describe('snapshot matching', () => {

        it('Goal matches snapshot' , () => {
            const goal = renderer.create(<Provider store={store}>
                <Goal />
            </Provider>).toJSON();
            expect(goal).toMatchSnapshot();
        });

        it('Goal Side Bar matches snapshot' , () => {
            const goalSidebar = renderer.create(<Provider store={store}>
                <GoalSideBar />
            </Provider>).toJSON();
            expect(goalSidebar).toMatchSnapshot();
        });

        it('Status Card matches snapshot' , () => {
            const statusCard = renderer.create(<Provider store={store}>
                <StatusCard />
            </Provider>).toJSON();
            expect(statusCard).toMatchSnapshot();
        });

        it('Status DropDown matches snapshot' , () => {
            const status = `In Progress`;

            const dropdown = renderer.create(<Provider store={store}>
                <StatusDropdown currentStatus={status}/>
            </Provider>).toJSON();
            expect(dropdown).toMatchSnapshot();
        });

        it('Taskcard matches snapshot' , () => {
            const task = renderer.create(<Provider store={store}>
                <TaskCard />
            </Provider>).toJSON();
            expect(task).toMatchSnapshot();
        });

    })

});