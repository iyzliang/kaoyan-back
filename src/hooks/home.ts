import { reactive, ref, onMounted } from 'vue'
import Api from '@/hooks/api'

export function useStudentData () {
  const degreeOptions = ref(['本科', '专科', '高中', '中学', '小学'])
  const form = reactive({
    name: '',
    contact: '',
    degree: '',
    remark: ''
  })
  const pageInfo = reactive({
    page: 1,
    size: 10,
    total: 0
  })
  const loading = ref(false)
  const studentList = ref([])
  const addRemark = ref('')
  const curAddRemarkId = ref(null)

  const getData = async () => {
    loading.value = true
    try {
      const reqBody = {
        ...pageInfo,
        ...form
      }
      const studentData = await Api.getStudentList(reqBody)
      pageInfo.total = studentData.data.total
      studentList.value = studentData.data.list
    } finally {
      loading.value = false
    }
  }

  const submitRemark = async (row) => {
    const id = row.id
    await Api.putStudentRemark(id, { remark: addRemark.value })
    await getData()
    addRemark.value = ''
    curAddRemarkId.value = null
  }

  const addRemarkFn = row => {
    curAddRemarkId.value = row.id
    addRemark.value = row.remark
    console.log(row.id, row.remark)
  }

  const searchData = () => {
    pageInfo.page = 1
    getData()
  }

  const handleSizeChange = (val) => {
    pageInfo.size = val
    getData()
  }

  const handleCurrentChange = (val) => {
    pageInfo.page = val
    getData()
  }

  const deleteInfo = async (row) => {
    await Api.deleteStudent(row.id)
    await getData()
  }

  onMounted(() => {
    getData()
  })

  return {
    form,
    degreeOptions,
    loading,
    studentList,
    addRemark,
    curAddRemarkId,
    pageInfo,
    submitRemark,
    addRemarkFn,
    searchData,
    handleSizeChange,
    handleCurrentChange,
    deleteInfo
  }
}
