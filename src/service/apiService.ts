import axios from "./config/axios"

const ApiService = {
    setHader : ()=> {
        /**
         * it will fix
         * make tokenService & get token
         */
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('accessToken')
    }
}
export default ApiService