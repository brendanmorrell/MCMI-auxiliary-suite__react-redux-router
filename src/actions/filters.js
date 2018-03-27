export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});
export const sortByScoreDate = () => ({
  type: 'SORT_BY_SCORE_DATE',
});
export const sortByTestDate = () => ({
  type: 'SORT_BY_TEST_DATE',
});
export const setStartDate = (startDate = null) => ({
  type: 'SET_START_DATE',
  startDate,
});
export const setEndDate = (endDate = null) => ({
  type: 'SET_END_DATE',
  endDate,
});
export const setRvsFilter = () => ({
  type: 'SET_RVS_FILTER',
});
