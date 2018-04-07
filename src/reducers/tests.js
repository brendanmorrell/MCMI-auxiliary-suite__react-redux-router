const testsReducerDefaultState = [];
export default (state = testsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TEST':
      return [
        ...state,
        action.test,
      ];
    case 'REMOVE_TEST':
      return state.filter(({ id }) => id !== action.test.id);
    case 'EDIT_TEST':
      return state.map((test) => {
        const updatedObj = test.id !== action.test.id ? test : { ...test, ...action.test };
        return updatedObj;
      });
    case 'SET_TESTS':
      return action.tests;
    default:
      return state;
  }
};
