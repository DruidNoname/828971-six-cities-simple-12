import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {checkAuthAction} from './api-actions';
import {APIRoute} from '../constants';

describe('Async Actions', () => {
  const testApi = createAPI();
  const mockAPI = new MockAdapter(testApi);
  const middlewares = [thunk.withExtraArgument(testApi)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof testApi, Action>
    >(middlewares);

  it('should return email if auth', async () => {
    const email = fakerStatic.internet.email();
    const testStore = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, {email: email});

    expect(testStore.getActions()).toEqual([]);

    await testStore.dispatch(checkAuthAction());

    const actions = testStore.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });
});
