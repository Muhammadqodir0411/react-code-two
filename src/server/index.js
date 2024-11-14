import axios from "axios";

const request = axios.create({
    baseURL: "https://66648cc1932baf9032ab6d1b.mockapi.io/",
    timeout: 10000
})

export default request