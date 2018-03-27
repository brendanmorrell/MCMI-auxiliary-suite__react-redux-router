import uuid from 'uuid';
import moment from 'moment';

export const addTest = ({ name, questions, testingDate } = []) => ({
  type: 'ADD_TEST',
  test: {
    name,
    createdAt: moment().valueOf(),
    testingDate,
    id: uuid(),
    questions,
  },
});
export const removeTest = id => ({
  type: 'REMOVE_TEST',
  test: {
    id,
  },
});
export const editTest = (id, { name, testingDate, questions }) => ({
  type: 'EDIT_TEST',
  test: {
    id,
    name,
    testingDate,
    questions,
  },
});
