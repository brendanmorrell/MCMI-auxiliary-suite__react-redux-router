export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});
export const sortByScoreDate = () => ({
  type: 'SORT_BY_SCORE_DATE',
});
export const sortByFirstName = () => ({
  type: 'SORT_BY_FIRST_NAME',
});
export const sortByLastName = () => ({
  type: 'SORT_BY_LAST_NAME',
});
export const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate,
});
export const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate,
});
export const setRvsFilter = () => ({
  type: 'SET_RVS_FILTER',
});
export const clearAllFilters = () => ({
  type: 'CLEAR_ALL_FILTERS',
});
