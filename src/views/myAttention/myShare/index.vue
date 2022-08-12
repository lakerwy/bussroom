<template>
  <div class="browse">
    <div class="myteam">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="list">
        <div class="searchBox">
          <ul class="columm_type" v-if="procurement==1">
            <span class="column_title">栏目类型：</span>
            <RadioGroup v-model="searchData.infoType">
              <li v-for="(item,index) in columnType" :key="index">
                <Radio :label="item.value">{{ item.label }}</Radio>
              </li>
            </RadioGroup>
          </ul>
          <ul class="columm_type" v-if="procurement==2">
            <span class="column_title">栏目类型：</span>
            <RadioGroup v-model="searchData.infoType">
              <li v-for="(item,index) in columnType2" :key="index">
                <Radio :label="item.value">{{ item.label }}</Radio>
              </li>
            </RadioGroup>
          </ul>
          <ul class="columm_type">
            <span class="column_title">时间范围：</span>
            <RadioGroup v-model="searchData.dateRange">
              <li v-for="(item,index) in timeRange" :key="index">
                <Radio :label="item.value">{{ item.label }}</Radio>
              </li>
            </RadioGroup>
          </ul>
          <div class="search">
            <Input v-model="searchData.title" placeholder="请输入关键词" />
            <Button type="primary" @click="getMyShareList">立即搜索</Button>
          </div>
        </div>
        <span class="total">共 {{ pageForm.pageTotal }} 条</span> <Button style="margin-left: 20px;" type="primary">导出增量</Button>
        <div class="list_btn">
          <Button class="right_btn" @click="exportDetail"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />批量导出</Button>
          <Button class="right_btn" @click="delShareList"><Icon style="font-size: 18px;margin-right: 5px" type="ios-trash-outline" />移除分享</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
        </Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
        />
      </div>
    </Card>
  </div>
</template>

<script>
import {  getArrayIds } from "@/utils/utils.js";
import { columnType, informationType, timeRange } from "@/utils/const/attention";
import {downAnnouncement, exportAnnouncement, getMyShareList, removeShare} from "@/api/myAttention";
import {setColumn} from "./js/columns";

export default {
  name: "index",
  data(){
    return{
      loadingFlag: false,
      isTeam: 0,
      procurement: '1',
      searchValue: "",
      columnType: columnType,
      columnType2: informationType,
      timeRange: timeRange,
      columns: setColumn(this, 0, 1),
      tableData: [],
      selection: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchData: {
        infoType: 1000, //招标与采购1000，拟在建2000
        type: 0, //0个人，1团队
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getMyShareList();
    },
    //我的分享列表
    async getMyShareList(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.searchData,
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getMyShareList(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //批量导出
    async exportDetail(){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要导出的公告");
        return;
      }
      let params = {
        ids: getArrayIds("infoId", this.selection)
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        let title = "招标与采购导出.xlsx"
        downAnnouncement({
          path: result
        }, title).then(()=>{
          this.$Message.success("导出成功");
        })
      }
    },
    //勾选
    handleSelectChange(selection) {
      this.selection = selection;
    },
    //移除分享
    async delShareList(){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要移除分享的公告");
        return;
      }
      let params = {
        ids: getArrayIds("id", this.selection)
      }
      let res = await removeShare(params);
      const {success, result} = res;
      if(success){
        this.$Message.success("移除分享成功");
        this.getMyShareList();
      }
    },
    setMyTeam(e){
      this.isTeam = e;
      this.searchData.type = e;
      this.columns = setColumn(this, this.isTeam, this.procurement);
      this.getMyShareList(1);
    },
    changeRrocurement(item) {
      this.procurement = item;
      this.columns = setColumn(this, this.isTeam, this.procurement);
      this.searchData = Object.assign({},{infoType: 1000,
        type: this.searchData.type })
      this.searchData.infoType = item == 1 ? 1000 : 2000;
      this.getMyShareList(1);
    },

  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.browse {
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    min-height: calc(100vh - 190px);
    //height: 1000px;
    .list {
      .searchBox {
        height: 141px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #E8E8E8;
        padding: 20px;
        padding-top: 15px;
        margin-bottom: 15px;
        .columm_type {
          height: 25px;
          width: 100%;
          overflow: hidden;
          margin-bottom: 10px;
          .column_title {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
          li {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            display: inline-block;
            margin-right: 10px;
            height: 25px;
          }
          .prompt {
            width: 26px;
            vertical-align: middle;
          }
        }
        .search {
          margin-bottom: 10px;
          .ivu-input-wrapper {
            width: 300px;
          }
          .ivu-btn {
            width: 100px;
            margin-left: 20px;
          }
        }
      }
      .total {
        display: inline-block;
        height: 34px;
        line-height: 32px;
      }
      .list_btn {
        float: right;
        .right_btn {
          width: 100px;
          margin-left: 20px;
          padding: 0;
        }
      }
      .my-page {
        margin-top: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
    }
  }
}


</style>