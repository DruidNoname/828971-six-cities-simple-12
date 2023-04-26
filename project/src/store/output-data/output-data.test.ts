import {outputData, setCityAction, setSortTypeAction, setActiveOfferAction} from './output-data.slice';
import {DEFAULT_CITY, DEFAULT_OPTION} from '../../constants';
import {makeFakeOffer} from '../../services/mocks';

describe('Reducer: outputData', () => {
  it('should return initial state of output data', () => {
    expect(outputData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: DEFAULT_CITY,
        sortType: DEFAULT_OPTION.sortType,
        activeOffer: null,
      })
  });

  it('should return some city when city changes', () => {
    const testCity = 'Some city';
    const state = {
      city: DEFAULT_CITY,
      sortType: DEFAULT_OPTION.sortType,
      activeOffer: null,
    };
    expect(outputData.reducer(state, setCityAction(testCity)))
      .toEqual({
        city: 'Some city',
        sortType: DEFAULT_OPTION.sortType,
        activeOffer: null,
      })
  });
  it('should return some sort type when sort type changes', () => {
    const testSorting = 'Low-rated first';
    const state = {
      city: DEFAULT_CITY,
      sortType: DEFAULT_OPTION.sortType,
      activeOffer: null,
    };
    expect(outputData.reducer(state, setSortTypeAction(testSorting)))
      .toEqual({
        city: DEFAULT_CITY,
        sortType: 'Low-rated first',
        activeOffer: null,
      })
  });
  it('should return some active offer when active offer changes', () => {
    const testActive = makeFakeOffer();
    const state = {
      city: DEFAULT_CITY,
      sortType: DEFAULT_OPTION.sortType,
      activeOffer: null,
    };
    expect(outputData.reducer(state, setActiveOfferAction(testActive)))
      .toEqual({
        city: DEFAULT_CITY,
        sortType: DEFAULT_OPTION.sortType,
        activeOffer: testActive,
      })
  });
});
