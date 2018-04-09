import database from '../firebase/firebase';

export const setTrue = trueValue => ({
  type: 'SET_TRUE',
  trueValue,
});
export const startSetTrue = trueValue => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database.ref(`users/${uid}/trueFalseValues`)
    .update({ trueValue })
    .then(() => dispatch(setTrue(trueValue)));
};

export const setFalse = falseValue => ({
  type: 'SET_FALSE',
  falseValue,
});

export const startSetFalse = falseValue => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database.ref(`users/${uid}/trueFalseValues`)
    .update({ falseValue })
    .then(() => dispatch(setFalse(falseValue)));
};

export const getTrueFalseValues = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database.ref(`users/${uid}/trueFalseValues`)
      .once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
        const trueValue = snapshot.val() && snapshot.val().trueValue ? snapshot.val().trueValue : 't';
        const falseValue = snapshot.val() && snapshot.val().falseValue ? snapshot.val().falseValue : 'f';

        dispatch(startSetTrue(trueValue));
        dispatch(startSetFalse(falseValue));
      });
  };
};
