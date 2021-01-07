<template>
  <div class="home view-container">
    <div class="container-handle">
      <div class="handle-input">
        <p class="label-text">姓名</p>
        <el-input v-model="form.name" placeholder="请输入搜索姓名"></el-input>
      </div>
      <div class="handle-input">
        <p class="label-text">联系方式</p>
        <el-input v-model="form.contact" placeholder="请输入搜索联系方式"></el-input>
      </div>
      <div class="handle-input">
        <p class="label-text">备注</p>
        <el-input v-model="form.remark" placeholder="请输入搜索备注"></el-input>
      </div>
      <div class="handle-input">
        <p class="label-text">学历</p>
        <el-select v-model="form.degree" placeholder="请选择学历">
          <el-option
            v-for="(item, index) in degreeOptions"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="handle-button">
        <el-button type="primary" round @click="searchData">搜索</el-button>
      </div>
    </div>
    <div class="container-tabel">
      <el-table
        v-loading="loading"
        stripe
        :data="studentList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="degree"
          label="学历">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template #default="scope">
            <el-popover
              placement="left"
              :width="400"
              trigger="click"
              :visible="scope.row.id === curAddRemarkId"
            >
              <template #reference>
                <el-button @click="addRemarkFn(scope.row)">添加备注</el-button>
              </template>
              <el-form label-width="100px">
                <el-form-item label="添加备注">
                  <el-input v-model="addRemark" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitRemark(scope.row)">提交</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
            <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除当前信息吗？"
              @confirm="deleteInfo(scope.row)"
            >
            <template #reference>
              <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="container-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useStudentData } from '@/hooks/home.ts'

export default defineComponent({
  name: 'home',

  setup () {
    const home = useStudentData()
    return {
      ...home
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
