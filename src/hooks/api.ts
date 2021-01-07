import handleRequest from './request'
interface Api {
  [key: string]: (id?, any?) => any;
}

const api: Api = {}

api.getStudentList = data => {
  return handleRequest('/api/v1/student', data)()
}

api.putStudentRemark = (id, data) => {
  return handleRequest(`/api/v1/student/remark/${id}`, data)({ method: 'PUT' })
}

api.deleteStudent = id => {
  return handleRequest(`/api/v1/student/${id}`)({ method: 'DELETE' })
}

export default api
