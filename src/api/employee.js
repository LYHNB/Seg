import request from '@/utils/request'

const employee = {
    login: (data) => {
        return request({
            url: '/login',
            method: 'post',
            data
        })
    },
    getEmployeeList: (params) => {
        return request({
            url: '/employee/page',
            method: 'get',
            params
        })
    }
}

export default employee