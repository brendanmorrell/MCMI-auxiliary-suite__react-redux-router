import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: moment(0).valueOf(),
  }, {
    id: '2',
    description: 'REnt',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(2, 'days').valueOf(),
  }, {
    id: '3',
    description: 'credit card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(2, 'days').valueOf(),
  }];
