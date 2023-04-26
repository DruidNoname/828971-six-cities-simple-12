import {loadingData, setError, setWhatsLoading} from './loading-data.slice';
import {IsDataLoading} from '../../constants';
import {fetchFeedback, fetchNearby, fetchOffers, fetchProperty} from '../api-actions';
import {makeFakeFeedback, makeFakeOffer} from '../../services/mocks';
import {lorem} from 'faker';

const initialState = {
  offers: [],
  property: null,
  nearby: [],
  feedback: [],
  isDataLoading: IsDataLoading.NoLoading,
  error: null,
};

describe('Reducer: loadingData', () => {
  it('should return initial state of loading data', () => {
    expect(loadingData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState)
  });

  it('should load offers by load offers', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    expect(loadingData.reducer(initialState, {type: fetchOffers.fulfilled.type, payload: offers}))
      .toEqual({
        offers: offers,
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: null,
      });
  });

  it('should set error message if server is unavailable', () => {
    expect(loadingData.reducer(initialState, {type: fetchOffers.rejected.type}))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: 'We can\'t connect with the server, whats for my sake going on? Check connection please!',
      });
  });
  it('should load offers by load property', () => {
    const offer = makeFakeOffer();
    expect(loadingData.reducer(initialState, {type: fetchProperty.fulfilled.type, payload: offer}))
      .toEqual({
        offers: [],
        property: offer,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: null,
      });
  });

  it('should set error message if server is unavailable', () => {
    expect(loadingData.reducer(initialState, {type: fetchProperty.rejected.type}))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: 'We can\'t get property info',
      });
  });
  it('should load offers by load offers', () => {
    const nearby = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    expect(loadingData.reducer(initialState, {type: fetchNearby.fulfilled.type, payload: nearby}))
      .toEqual({
        offers: [],
        property: null,
        nearby: nearby,
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: null,
      });
  });

  it('should set error message if server is unavailable', () => {
    expect(loadingData.reducer(initialState, {type: fetchNearby.rejected.type}))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: 'There is no nearby properties',
      });
  });
  it('should load offers by load offers', () => {
    const feedbacks = [makeFakeFeedback(), makeFakeFeedback()];
    expect(loadingData.reducer(initialState, {type: fetchFeedback.fulfilled.type, payload: feedbacks}))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: feedbacks,
        isDataLoading: IsDataLoading.NoLoading,
        error: null,
      });
  });

  it('should set error message if server is unavailable', () => {
    expect(loadingData.reducer(initialState, {type: fetchFeedback.rejected.type}))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: 'There is no comments about this building',
      });
  });

  it('should return some error if it is', () => {
    const error = lorem.lines();
    expect(loadingData.reducer(initialState, setError(error)))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: IsDataLoading.NoLoading,
        error: error,
      })
  });


  it('should return what data is loading now', () => {
    const isLoading = IsDataLoading.Offers;

    expect(loadingData.reducer(initialState, setWhatsLoading(isLoading)))
      .toEqual({
        offers: [],
        property: null,
        nearby: [],
        feedback: [],
        isDataLoading: isLoading,
        error: null,
      })
  });
});
