import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import { toast } from "react-toastify";
import { getErrors } from "../../helpers/reduxHelper";

export const login = (dataForm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/accounts/login/`,
      dataForm,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Login Successfully!");
  } catch (error) {
    let errorMessage = getErrors(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  toast.success("Logout Successfully!");
};

export const register = (dataForm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/accounts/register/`,
      dataForm,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Register Successfully!");
  } catch (error) {
    let errorMessage = getErrors(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};
