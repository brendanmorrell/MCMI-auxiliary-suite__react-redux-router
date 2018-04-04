const trueFalseDefaultValues = { trueValue: 't', falseValue: 'f' };
export default (state = trueFalseDefaultValues, action) => {
  switch (action.type) {
    case 'SET_TRUE':
      return {
        ...state,
        trueValue: action.trueValue,
      };
    case 'SET_FALSE':
      return {
        ...state,
        falseValue: action.falseValue,
      };
    default:
      return state;
  }
};
