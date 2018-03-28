const filtersReducerDefaultState = {
  text: '',
  startDate: undefined,
  endDate: undefined,
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
    case 'SORT_BY_FIRST_NAME':
      return {
        ...state,
        sortBy: 'firstName',
      };
    case 'SORT_BY_LAST_NAME':
      return {
        ...state,
        sortBy: 'lastName',
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
    case 'CLEAR_ALL_FILTERS':
      return {
        ...state,
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'scoreDate',
        rvsFilter: false,
      };
    default:
      return state;
  }
};
