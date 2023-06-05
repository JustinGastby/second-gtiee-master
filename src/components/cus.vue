<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tabledata" border style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="idNum" label="身份证号"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="email" label="电子邮件"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phoneNum" label="电话"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑客户" :visible.sync="dialogVisible" width="30%">
      <el-form :model="editForm" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNum">
          <el-input v-model="editForm.idNum"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="editForm.birthday"></el-input>
        </el-form-item>
        <el-form-item label="姓别" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input v-model="editForm.phoneNum"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabledata: [],
      dialogVisible: false,
      editForm: {
        name: 'qqq',
        idNum: '',
        birthday: '',
        sex: '',
        email: '',
        address: '',
        phoneNum: '',
        userId: ''
      }
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async deleteRow(data) {
      const { userId } = data
      const { data: res } = await this.$http.delete(`user/delete/${userId}`)
      if (res.code == 200) {
        this.getDate()
        this.$message.success('删除成功！')
      } else {
        this.$message.error('删除失败！')
      }
      console.log(res)
    },
    async edit(data) {
      const { userId } = data
      const { data: res } = await this.$http.get(`user/listbyid/${userId}`)
      if (res.code == 200) {
        console.log(res.data)
        this.editForm = res.data[0]
      }
      this.dialogVisible = true
    },
    async getDate() {
      const { data: res } = await this.$http.get('user/list')
      this.tabledata = [...res.data]
    },
    async addconfirm() {
      const { data: res } = await this.$http.post('user/update', this.editForm)
      console.log(res)
      if (res.code == 200) {
        this.$message.success('修改成功！')
        this.getDate()
      } else {
        this.$message.error('修改失败！')
      }
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped></style>
