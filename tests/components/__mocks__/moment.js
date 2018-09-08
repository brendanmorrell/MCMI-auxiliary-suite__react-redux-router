const moment = require.requireActual('moment');// here we are creating a fake version of moment to run, but we can't actually import moment, because that's the name of our mock as well which would be a recursive loop. jest gives this function to import something, and then use the real name for the mock function below

export default (timestamp = 0) => {
  return moment(timestamp);
};
