<template>
  <el-container class="container">
    <el-header class="header">
      <div>
        <img src="../assets/logo.jpg" class="head_img" />
        <span class="text1">房产中介信息发布中心</span>
      </div>
      <el-button type="danger" @click="logout" round>退出</el-button>
    </el-header>
    <el-main>
      <div class="ser">
        <i class="el-icon-message-solid" style="margin-right: 20px; color: powderblue; font-size: 1.5rem"></i>
        <el-autocomplete class="inline-input" v-model="state" :fetch-suggestions="querySearch" placeholder="搜索售楼信息..." @select="handleSelect" clearable></el-autocomplete>
        <el-button slot="append" icon="el-icon-search" style="background-color: #e4e7ed" @click="SerchMessage"></el-button>
        <el-link type="info" style="margin-left: 5px; margin-bottom: -20px" @click="serchdata">历史查询数据</el-link>
      </div>
      <el-divider></el-divider>
      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in pic" :key="item.id">
            <img :src="item.idView" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-divider></el-divider>
      <el-row style="margin-top: 10px">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" style="width: 300px; margin-left: 110px">
            <img src="../assets/1.png" class="card_img" />
            <div style="padding: 14px; margin-top: 10px">
              <span>绿地新里城(VR科创城)</span>
              <div class="bottom clearfix">
                <h5 style="color: darkgray"><i class="el-icon-location-outline"></i> 长宁区新渔路144号</h5>
                <el-button type="primary" icon="el-icon-view" @click="know(1)">了解详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" style="width: 300px; margin-left: 80px">
            <img src="../assets/7.png" class="card_img" />
            <div style="padding: 14px">
              <span>保利大都会</span>
              <div class="bottom clearfix">
                <h5 style="color: darkgray"><i class="el-icon-location-outline"></i> 上海市长宁区淞虹路131号</h5>
                <el-button type="primary" icon="el-icon-view" @click="know(2)">了解详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }" style="width: 300px; margin-left: 60px">
            <img src="../assets/4.png" class="card_img" />
            <div style="padding: 14px">
              <span>南昌保利天洪</span>
              <div class="bottom clearfix">
                <h5 style="color: darkgray"><i class="el-icon-location-outline"></i> 红谷滩区</h5>
                <el-button type="primary" icon="el-icon-view" @click="know(3)">了解详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div style="margin-top: 40px">
        <el-row>
          <div v-for="(item, index) in tabledata">
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }" style="width: 300px; margin-left: 70px">
                <img :src="picsrc[index]" class="card_img" />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <h5 style="color: darkgray"><i class="el-icon-location-outline"></i>{{ item.address }}</h5>
                    <el-button type="primary" icon="el-icon-view" @click="know(item.homeId)">了解详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>
        </el-row>
      </div>
      <div style="margin-top: 30px">
        <el-row>
          <div class="addmsg">
            <el-button type="success" @click="isChange">发布信息<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </el-row>
      </div>

      <el-divider content-position="left">留言板</el-divider>
      <el-card class="carousel">
        <template>
          <span style="font-size: 25px; font-family: Courier New; color: cornflowerblue">留言板</span>
          <el-alert title="绿地新里城(VR科创城)非常棒！！！" type="success" style="margin-bottom: 20px; margin-top: 20px"></el-alert>
          <el-alert title="和昌莱蒙都会地段很好啊，我觉得可以考虑。" type="info" style="margin-bottom: 20px"></el-alert>
          <el-alert title="华宸龙隐山环境没有想象中的好..." type="warning" style="margin-bottom: 20px"></el-alert>
          <el-alert title="江铃龙湖云璟真是人间仙境" type="error" style="margin-bottom: 20px"></el-alert>
          <el-alert v-if="liuyan2 != ''" :title="liuyan2" type="success" style="margin-bottom: 20px"></el-alert>
          <el-input type="textarea" placeholder="我来说点什么..." v-model="liuyan" style="margin-bottom: 20px"></el-input>
          <el-button type="primary" @click="addliuyan">发布</el-button>
        </template>
      </el-card>
    </el-main>
    <el-drawer title="历史数据查询" :visible.sync="drawer">
      <el-table :data="historydata" style="width: 100%; margin-left: 15px">
        <el-table-column prop="address" label="查询信息"></el-table-column>
        <el-table-column prop="date" label="查询时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, historydata)" type="text"> 移除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
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
      <el-form :model="fabuForm" :rules="zhucerules" ref="ruleForm" label-width="100px">
        <el-form-item label="编号" prop="id">
          <el-input v-model="fabuForm.homeId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="fabuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="adds">
          <el-input v-model="fabuForm.address"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积" prop="area1">
          <el-input v-model="fabuForm.buildArea"></el-input>
        </el-form-item>
        <el-form-item label="套内面积" prop="area2">
          <el-input v-model="fabuForm.actualArea"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="mony">
          <el-input v-model="fabuForm.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addconfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      state: '',
      drawer: false,
      isShow: false,
      pic: [
        { id: 0, idView: require('../assets/1.png') },
        { id: 1, idView: require('../assets/3.png') },
        { id: 2, idView: require('../assets/2.png') },
        { id: 3, idView: require('../assets/4.png') },
        { id: 4, idView: require('../assets/6.png') },
        { id: 5, idView: require('../assets/5.png') }
      ],
      picsrc: [require('@/assets/1.png'), require('@/assets/2.png'), require('@/assets/3.png'), require('@/assets/4.png'), require('@/assets/5.png')],
      historydata: [
        {
          address: '华宸龙隐山',
          date: '2023-6-6'
        },
        {
          address: '和昌莱蒙都会',
          date: '2023-6-7'
        },
        {
          address: '绿地新里城(VR科创城)',
          date: '2023-6-8'
        },
        {
          address: '江铃龙湖云璟',
          date: '2023-6-9'
        }
      ],
      tabledata: [],
      liuyan: '',
      liuyan2: '',
      dialog1: false,
      data1: {},
      data2: {},
      dialogVisible: false,
      fabuForm: {
        price: '1570000',
        actualArea: '118平',
        buildArea: '320平',
        address: '江西省南昌市经开区661号',
        homeId: '5',
        name: '东华理工'
      }
    }
  },
  created() {
    this.getHouse()
  },
  methods: {
    logout() {
      this.$router.push('/Login')
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    loadAll() {
      return [
        { value: '绿地新里城(VR科创城)', homeId: 1 },
        { value: '赣电洪府', homeId: 2 },
        { value: '和昌莱蒙都会', homeId: 4 },
        { value: '江铃龙湖云璟', homeId: 3 },
        { value: '绿地新城', homeId: '长宁区新渔路144号' }
      ]
    },
    serchdata() {
      this.drawer = true
    },
    async handleSelect(item) {
      const { homeId } = item
      const { data: res1 } = await this.$http.get(`home/listbyid/${homeId}`)
      const { data: res2 } = await this.$http.get(`user/listbyid/${homeId}`)
      this.data1 = res1.data[0]
      this.data2 = res2.data[0]
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    //添加留言
    addliuyan() {
      this.liuyan2 = this.liuyan
    },
    //了解详情展示页面
    async know(id) {
      const homeId = id
      const { data: res1 } = await this.$http.get(`home/listbyid/${homeId}`)
      const { data: res2 } = await this.$http.get(`user/listbyid/${homeId}`)
      this.data1 = res1.data[0]
      this.data2 = res2.data[0]
      this.dialog1 = true
    },
    //搜索信息
    SerchMessage() {
      this.dialog1 = true
      const { name } = this.data1
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const timeString = month + '-' + day + '-' + hours + '-' + minutes
      this.historydata.push({ address: name, date: timeString })
    },
    isChange() {
      this.dialogVisible = true
    },
    //发布信息
    async addconfirm() {
      const res = await this.$http.post('/home/add', this.fabuForm)
      if (res.data.code == 200) {
        this.$message.success('发布成功！')
        this.dialogVisible = false
        this.getHouse()
      }
    },
    async getHouse() {
      const { data: res } = await this.$http.get('home/list')
      this.tabledata = [...res.data]
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
}
.header {
  background-color: rgb(151, 180, 188);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 23px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.head_img {
  width: 55px;
  height: 56px;
  border-radius: 50%;
}
.text1 {
  margin-top: 0.5rem;
  text-align: center;
}
.ser {
  margin-top: 15px;
  align-items: center;
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.image {
  width: 100%;
  height: 100%;
}
.carousel {
  margin-top: 25px;
  width: 1000px;
  margin-left: 260px;
}
.card_img {
  width: 100%;
  display: block;
}
.addmsg {
  padding-left: 50%;
}
</style>
