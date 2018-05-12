import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import workoutApp from '../rootReducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  workoutApp,
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    sagaMiddleware,
    createLogger(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
