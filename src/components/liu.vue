<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/second' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="绿地新里城(VR科创城)非常棒！！！" type="success" style="margin-bottom: 20px; margin-top: 20px"></el-alert>
      <el-alert title="和昌莱蒙都会地段很好啊，我觉得可以考虑。" type="info" style="margin-bottom: 20px"></el-alert>
      <el-alert title="华宸龙隐山环境没有想象中的好..." type="warning" style="margin-bottom: 20px"></el-alert>
      <el-alert title="江铃龙湖云璟真是人间仙境" type="error" style="margin-bottom: 20px"></el-alert>
      <el-alert v-if="liuyan2 != ''" :title="liuyan2" type="success" style="margin-bottom: 20px"></el-alert>
      <el-input type="textarea" placeholder="我来说点什么..." v-model="liuyan" style="margin-bottom: 20px"></el-input>
      <el-button type="primary" @click="addliuyan">发布</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liuyan: '',
      liuyan2: ''
    }
  },
  methods: {
    addliuyan() {
      this.liuyan2 = this.liuyan
    }
  }
}
</script>
<style lang="less" scoped></style>
