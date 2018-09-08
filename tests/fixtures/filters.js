import moment from 'moment';

const filtersDefault = {
  text: '',
  sortBy: '',
  startDate: undefined,
  endDate: undefined,
  sortReverse: false,
};


const filtersAlt = {
  text: 'e',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment().add(2, 'days'),
  sortReverse: true,
};

export { filtersDefault, filtersAlt };
