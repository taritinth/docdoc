import { SET_USER } from "../actions/testAction";

const initialState = {
  user: null,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.data };
    default:
      return state;
  }
};

export default testReducer;
