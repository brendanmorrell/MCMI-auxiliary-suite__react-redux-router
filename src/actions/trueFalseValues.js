import database from '../firebase/firebase';

export const setTrue = trueValue => ({
  type: 'SET_TRUE',
  trueValue,
});
export const startSetTrue = trueValue => (dispatch) => {
  return database.ref('trueFalseValues')
    .update({ trueValue })
    .then(() => dispatch(setTrue(trueValue)));
};

export const setFalse = falseValue => ({
  type: 'SET_FALSE',
  falseValue,
});

export const startSetFalse = falseValue => (dispatch) => {
  return database.ref('trueFalseValues')
    .update({ falseValue })
    .then(() => dispatch(setFalse(falseValue)));
};

export const getTrueFalseValues = () => {
  return (dispatch) => {
    return database.ref('trueFalseValues')
      .once('value')
      .then((snapshot) => {
        const { trueValue, falseValue } = snapshot.val();
        dispatch(startSetTrue(trueValue));
        dispatch(startSetFalse(falseValue));
      });
  };
};
