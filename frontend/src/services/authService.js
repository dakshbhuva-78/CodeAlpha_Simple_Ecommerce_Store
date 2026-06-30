import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;


export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

export const registerUser = async (userData) => {

  const { data } = await axios.post(

    `${API_URL}/register`,

    userData

  );

  return data;

};

export const getUserProfile = async (token) => {
  const response = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateUserProfile = async (

  userData,

  token

) => {

  const { data } = await axios.put(

    `${API_URL}/profile`,

    userData,

    {

      headers: {

        Authorization: `Bearer ${token}`

      }

    }

  );

  return data;

};