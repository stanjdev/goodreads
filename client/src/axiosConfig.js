import axios from "axios"

const render_react_server = process.env.REACT_APP_API_URI

const axiosCustom = axios.create({
    baseURL: `${render_react_server}`
})

export default axiosCustom;
