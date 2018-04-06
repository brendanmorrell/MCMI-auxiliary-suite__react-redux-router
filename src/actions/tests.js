import database from '../firebase/firebase';

export const addTest = (test = []) => ({
  type: 'ADD_TEST',
  test,
});

export const startAddTest = (testData = {}) => (dispatch) => {
  const {
    name,
    questions,
    scoreDate,
  } = testData;

  const test = { name, questions, scoreDate };

  database.ref('tests').push({ test })
    .then(ref => dispatch(addTest({
      id: ref.key,
      ...test,
    })));
};

export const removeTest = id => ({
  type: 'REMOVE_TEST',
  test: {
    id,
  },
});
export const startRemoveTest = id => (dispatch) => {
  database.ref(`tests/${id}`).remove()
    .then(() => dispatch(removeTest(id)));
};
export const editTest = (id, { name, scoreDate, questions }) => ({
  type: 'EDIT_TEST',
  test: {
    id,
    name,
    scoreDate,
    questions,
  },
});
export const startEditTest = ((id, testData) => (dispatch) => {
  database.ref(`tests/${id}`)
    .set({ ...testData })
    .then(() => dispatch(editTest(id, testData)));
});
