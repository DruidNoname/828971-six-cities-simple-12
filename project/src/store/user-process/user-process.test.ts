import {AuthorizationStatus} from '../../constants';
import {
  checkAuthAction, loginAction, logoutAction,
} from '../api-actions';
import {userProcess} from './user-process.slice';
import {internet} from 'faker';


const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSending: false,
  email: '',
};

describe('Reducer: userProcess', () => {
  it('should return initial state of loading data', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState)
  });

  it('should load mail if autentification is passed', () => {
    const mail = internet.email();

    expect(userProcess.reducer(initialState, {type: checkAuthAction.fulfilled.type, payload: mail}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isSending: false,
        email: mail,
      });
  });

  it('should set no auth if autentification is not passed', () => {
    expect(userProcess.reducer(initialState, {type: checkAuthAction.rejected.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isSending: false,
        email: '',
      });
  });

  it('should set auth if login is succeed', () => {
     expect(userProcess.reducer(initialState, {type: loginAction.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isSending: false,
        email: '',
      });
  });

  it('should set no auth if login is not succeed', () => {
    expect(userProcess.reducer(initialState, {type: loginAction.rejected.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isSending: false,
        email: '',
      });
  });

  it('should set no auth if logout is succeed', () => {
    expect(userProcess.reducer(initialState, {type: logoutAction.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isSending: false,
        email: '',
      });
  });
});
