import axios from 'axios'
import { alert } from 'react-native'

//请求拦截器
axios.interceptors.request.use(
    function(config) {
        //添加响应头等设置
        config.headers.userToken = "this is my token";
        return config;
    },
    function(error) {
        return Promise.reject(error)//请求出错
    }
)
//返回拦截器
axios.interceptors.response.use(
    function(response) {
        if(response.data.data.result !== 1) {
            let { retMsg } = response.data.data;
            Alert.alert('温馨提示', retMsg);
            return Promise.reject(retMsg);
        }else {
            return response.data;
        }
    },
    function(error) {
        return Promise.reject(error);
    }
)

const defaultData = {};
const defaultUrl = '';
function PostAxios(url = defaultUrl, data = defaultData) {
    return axios({
        method: 'POST',
        url,
        data
    });
}
function GetAxios(url = defaultUrl, data = defaultData) {
    return axios({
        method: 'GET',
        url,
        data
    });
}
export default {
    PostAxios,
    GetAxios
}

//使用
// import {PostAxios, GetAxios} from '/axios'
// GetAxios(url).then(res => {
//     //数据处理
// }).catch(res => {
//     //错误处理
// })

