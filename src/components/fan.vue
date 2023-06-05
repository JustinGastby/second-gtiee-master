<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>房产管理</el-breadcrumb-item>
        <el-breadcrumb-item>房产信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-table :data="tabledata" border style="width: 100%">
          <el-table-column prop="homeId" label="发布编号" width="80px"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="buildArea" label="建筑面积" width="160px"></el-table-column>
          <el-table-column prop="actualArea" label="套内面积" width="160px"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="price" label="售价/￥" width="160px"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="show(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)"></el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="edit(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog :title="data1.name" :visible.sync="dialog1" width="50%">
        <el-descriptions class="margin-top" :title="data1.name" :column="4">
          <el-descriptions-item label="发布信息编号">{{ data1.homeId }}</el-descriptions-item>
          <el-descriptions-item label="建筑面积">{{ data1.buildArea }}</el-descriptions-item>
          <el-descriptions-item label="套内面积">{{ data1.actualArea }}</el-descriptions-item>
          <el-descriptions-item label="户型">3室1厅、3室2厅</el-descriptions-item>
          <el-descriptions-item label="估计售价">{{ data1.price }}￥</el-descriptions-item>
          <el-descriptions-item label="联系地址">{{ data1.address }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="margin-top" title="发布人信息" :column="3" border>
          <el-descriptions-item
            ><template slot="label"><i class="el-icon-user"></i>用户名</template>{{ data2.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-mobile-phone"></i>手机号</template>{{ data2.phoneNum }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-message"></i>邮箱</template>{{ data2.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              联系地址
            </template>
            {{ data2.address }}
          </el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog1 = false">取 消</el-button>
          <el-button type="primary" @click="dialog1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="发布信息" :visible.sync="dialogVisible" width="30%">
        <el-form :model="fabuForm" ref="ruleForm" label-width="100px">
          <el-form-item label="编号" prop="homeId">
            <el-input v-model="fabuForm.homeId"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="fabuForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="fabuForm.address"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积" prop="buildArea">
            <el-input v-model="fabuForm.buildArea"></el-input>
          </el-form-item>
          <el-form-item label="套内面积" prop="actualArea">
            <el-input v-model="fabuForm.actualArea"></el-input>
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-input v-model="fabuForm.price"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialog1: false,
      data1: {},
      data2: {},
      fabuForm: {
        homeId: '',
        name: '',
        actualArea: '',
        buildArea: '',
        price: '',
        address: ''
      },
      tabledata: []
    }
  },
  created() {
    this.getHouse()
  },
  methods: {
    async deleteRow(data) {
      const { homeId } = data
      const { data: res } = await this.$http.delete(`home/delete/${homeId}`)
      if (res.code == 200) {
        this.getHouse()
        this.$message.success('删除成功！')
      } else {
        this.$message.error('删除失败！')
      }
      console.log(res)
    },
    async show(data) {
      const { homeId } = data
      const { data: res1 } = await this.$http.get(`home/listbyid/${homeId}`)
      const { data: res2 } = await this.$http.get(`user/listbyid/${homeId}`)
      this.data1 = res1.data[0]
      this.data2 = res2.data[0]
      this.dialog1 = true
    },
    async edit(data) {
      const { homeId } = data
      const { data: res } = await this.$http.get(`home/listbyid/${homeId}`)
      if (res.code == 200) {
        console.log(res.data)
        this.fabuForm = res.data[0]
      }
      this.dialogVisible = true
    },
    async editConfirm() {
      const { data: res } = await this.$http.post('home/update', this.fabuForm)
      console.log(res)
      if (res.code == 200) {
        this.$message.success('修改成功！')
        this.getHouse()
      } else {
        this.$message.error('修改失败！')
      }
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    },
    async getHouse() {
      const { data: res } = await this.$http.get('home/list')
      this.tabledata = [...res.data]
    }
  }
}
</script>
<style lang="less" scoped></style>
