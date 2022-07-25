<template>
  <div class="project">
    <div class="myteam">
      <span>我的项目</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="项目跟进" name="1"></TabPane>
        <TabPane label="项目联系人" name="2"></TabPane>
      </Tabs>
      <div class="list">
        <div v-if="procurement==1">
          <Table class="my-table" :columns="columns" :data="browseData" :loading="loadingFlag">
          </Table>
        </div>
        <div v-if="procurement==2">
          <Table class="my-table" :columns="columns2" :data="browseData" :loading="loadingFlag">
          </Table>
        </div>
        <Page
            v-if="browseData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
            @on-change="pageChange"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import {getFollowList, getProjectPerson} from "../../../api/myAttention";

export default {

  name: "index",
  data(){
    return{
      loadingFlag: false,
      isTeam: false,
      procurement: '1',
      columns: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "项目编号",
          align: "center",
          minWidth: 120,
          key: 'projectNo'
        },
        {
          title: "项目名称",
          align: "center",
          minWidth: 500,
          key: 'projectName',
          tooltip: true,
          render: (h, params)=>{
            return (
                <a target="_blank"
                   href={params.row.webUrl}
                   class="infoTitle"
                >{params.row.projectName}</a>
            )
          }
        },
        {
          title: "我跟进的次数",
          align: "center",
          minWidth: 120,
          key: 'followNum'
        },
        {
          title: "跟进时间",
          align: "center",
          minWidth: 120,
          key: 'lastFollowDate'
        },
      ],
      columns2: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "联系人姓名",
          align: "center",
          minWidth: 120,
        },
        {
          title: "公司名称",
          align: "center",
          minWidth: 400,
        },
        {
          title: "职务",
          align: "center",
          minWidth: 90,
        },
        {
          title: "关注时间",
          key: "date1",
          align: "center",
          minWidth: 120,
        },
        {
          title: "涉及项目",
          key: "date1",
          align: "center",
          minWidth: 120,
        }
      ],
      browseData: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 100,
        pageSize: 10,
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getFollowList();
    },
    //项目跟进
    async getFollowList(){
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.browseData = [];
      let res = await getFollowList(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success){
        this.browseData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //项目联系人
    async getProjectPerson(){
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.browseData = [];
      let res = await getProjectPerson(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        this.browseData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    changeRrocurement(item) {
      this.procurement = item;
      if(item == 1){
        this.getFollowList();
      } else {
        this.getProjectPerson();
      }
    },
    pageChange(){
      if(this.procurement == 1){
        this.getFollowList();
      } else {
        this.getProjectPerson();
      }
    }
  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.project {
  .myteam {
    span{
      display: inline-block;
      padding: 5px 15px;
      background: white;
      margin-right: 10px;
      border-radius: 3px;
      border-bottom-left-radius: 0 0;
      border-bottom-right-radius: 0 0;
      cursor: pointer;
      color: #3F6EF5;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    //height: 1000px;
    height: calc(100vh - 190px);
    .list {
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
        }
      }
    }
    .my-page {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
  }
}
</style>