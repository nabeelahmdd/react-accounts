import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./userReducers";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
export default rootReducer;
