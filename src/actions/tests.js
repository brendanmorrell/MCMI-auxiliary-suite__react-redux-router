import uuid from 'uuid';

export const addTest = ({ name, questions, scoreDate } = []) => ({
  type: 'ADD_TEST',
  test: {
    name,
    scoreDate,
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
export const editTest = (id, { name, scoreDate, questions }) => ({
  type: 'EDIT_TEST',
  test: {
    id,
    name,
    scoreDate,
    questions,
  },
});
