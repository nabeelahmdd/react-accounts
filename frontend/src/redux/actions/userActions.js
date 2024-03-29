import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
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
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState(); // get user info from userLogin state

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/user-detail/`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    let errorMessage = getErrors(error);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/user-detail/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch(getUserDetails("profile"));
    toast.success("Update Profile Successfully!");
  } catch (error) {
    let errorMessage = getErrors(error);
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const changePasswordAction =
  (dataForm) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PASSWORD_CHANGE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/custom/accounts/change-password/`,
        dataForm,
        config
      );

      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });

      toast.success("Password Change Successfully!");
    } catch (error) {
      let errorMessage = getErrors(error);
      dispatch({
        type: PASSWORD_CHANGE_FAIL,
        payload: errorMessage,
      });
      toast.error(errorMessage);
    }
  };
