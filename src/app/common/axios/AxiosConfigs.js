/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
import axios from "axios";
import Constants from "app/common/constants/constants";

const axiosConfigs = axios.create({
    baseURL: Constants.BASE_URL + Constants.API_URL + Constants.API_VERSION_1,
});

axiosConfigs.defaults.headers.common["Authorization"] = "Bearer ";
axiosConfigs.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";
export default axiosConfigs;
