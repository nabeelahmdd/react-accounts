import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import { toast } from "react-toastify";

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
    const errorMessage =
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
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
