import moment from 'moment';

export default (
  tests,
  {
    text,
    sortBy,
    startDate,
    endDate,
    rvsFilter,
  },
) => tests.filter((test) => {
  const textMatch = text ? test.name.toLowerCase().includes(text.toLowerCase()) : true;
  const startDateMatch = startDate ? moment(startDate).isSameOrBefore(moment(test.scoreDate), 'day') : true;
  const endDateMatch = endDate ? moment(endDate).isSameOrAfter(moment(test.scoreDate), 'day') : true;

  return textMatch && startDateMatch && endDateMatch;
}).sort((a, b) => {
  if (sortBy === 'scoreDate') {
    return rvsFilter ? a.scoreDate - b.scoreDate : b.scoreDate - a.scoreDate;
  }
  if (sortBy === 'firstName') {
    if (rvsFilter) {
      if (a.name > b.name) return -1;
      else if (a.name < b.name) return 1;
      return 0;
    }
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    return 0;
  }
  return undefined;
});
