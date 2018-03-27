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
  const createdAtMoment = moment(test.createdAt);
  const textMatch = text ? test.name.toLowerCase().includes(text.toLowerCase()) : true;
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

  return textMatch && startDateMatch && endDateMatch;
}).sort((a, b) => {
  if (sortBy === 'scoreDate') {
    return rvsFilter ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
  }
  return rvsFilter ? a.testingDate - b.testingDate : b.testingDate - a.testingDate;
});
