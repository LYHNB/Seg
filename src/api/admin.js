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
    /**
     * 新增员工
     * @param {*} data 
     * @returns 
     */
    addEmp: (data) => {
        return request({
            url: '/employee/add',
            method: 'post',
            data
        })
    },

    /**
     * 编辑员工
     * @param {*} data 
     * @returns 
     */
    updateEmp: (data) => {
        return request({
            url: '/employee/update',
            method: 'put',
            data
        })
    },

    /**
     * 员工分页查询
     * @param {*} params 
     * @returns 
     */
    getEmployeeList: (params) => {
        return request({
            url: '/employee/page',
            method: 'get',
            params
        })
    },

    /**
     * 日志分页查询
     * @param {*} params 
     * @returns 
     */
    getLogList: (params) => {
        return request({
            url: '/log/page',
            method: 'get',
            params
        })
    }
}

export default admin