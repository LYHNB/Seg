import request from '@/utils/request'

const admin = {
    login: (data) => {
        return request({
            url: '/login',
            method: 'post',
            data
        })
    },
    /**
     * 删除员工
     * @param {*} id 
     * @returns 
     */
    deleteEmp: (id) => {
        return request({
            url: `/employee/delete/${id}`,
            method: 'delete',
        })
    },
    /**
     * 修改员工状态
     * @param {*} id 
     * @param {*} status 
     * @returns 
     */
    updateStatusEmp: (id, status) => {
        return request({
            url: `/employee/${id}/status`,
            method: 'put',
            params: {
                status
            }
        })
    },
    addEmp: (data) => {
        return request({
            url: '/employee/add',
            method: 'post',
            data
        })
    }
}

export default admin