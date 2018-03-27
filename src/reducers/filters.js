import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  sortBy: 'scoreDate',
  rvsFilter: false,
};
export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_SCORE_DATE':
      return {
        ...state,
        sortBy: 'scoreDate',
      };
    case 'SORT_BY_TEST_DATE':
      return {
        ...state,
        sortBy: 'testDate',
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    case 'SET_RVS_FILTER':
      return {
        ...state,
        rvsFilter: !state.rvsFilter,
      };
    default:
      return state;
  }
};
