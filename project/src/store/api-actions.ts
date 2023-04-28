import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../constants';
import {dropToken, saveToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Feedback, FeedbackData} from '../types/feedback';
import {loadingData} from './loading-data/loading-data.slice';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'game/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(loadingData.actions.setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}): Promise<Offer[]> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchProperty = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProperty',
  async (id: string, {extra: api}): Promise<Offer> => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearby = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearby',
  async (id: string, {extra: api}): Promise<Offer[]> => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchFeedback = createAsyncThunk<Feedback[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFeedback',
  async (id: string, {extra: api}): Promise<Feedback[]> => {
    const {data} = await api.get<Feedback[]>(`${APIRoute.Feedback}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData['email'], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data.email;
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
  },
);

export const sendFeedbackAction = createAsyncThunk<void, [string, FeedbackData], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendFeedback',
  async ([id, {comment, rating}], {extra: api}) => {
    await api.post<Feedback>(`${APIRoute.Feedback}/${id}`, <FeedbackData>{comment, rating});
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

