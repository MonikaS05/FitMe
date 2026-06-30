// src/util/setAuthToken.js
import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply the token to the Authorization header for every request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Delete the authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;