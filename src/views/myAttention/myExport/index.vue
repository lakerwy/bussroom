<template>
  <div class="browse">
    <div class="myteam">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="导出记录" name="1"></TabPane>
        <TabPane label="导出明细" name="2"></TabPane>
      </Tabs>
      <div class="list" v-if="procurement==1">
        <div class="my-explain"><Icon class="icon" type="ios-information-circle-outline" />导出文件7日内可以重复下载，过期后将无法重复下载，需要重新选择公告导出</div>
        <div class="timeRange">
          <span>时间范围：</span>
          <RadioGroup v-model="timeRangeValue">
            <span class="mr-20" v-for="(item,index) in timeRange" :key="index">
              <Radio :label="item.value">{{item.label}}</Radio>
            </span>
          </RadioGroup>
          <DatePicker
              class="datePicker"
              v-show="timeRangeValue == -1"
              type="daterange"
              :options="dateOption"
              transfer
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="pickDate"
              v-model="dateArr"
          ></DatePicker>
        </div>
        <div class="list_btn">
          <Button class="right_btn" type="primary">导出增量</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData"></Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
        />
      </div>
      <div class="subsidiary" v-if="procurement==2">
        <div class="sub-btn">
          <ButtonGroup>
            <Button :class="biddingConstruct==1?'active':''" @click="changeSubsidiary(1)">招标与采购</Button>
            <Button :class="biddingConstruct==2?'active':''" @click="changeSubsidiary(2)">拟在建项目</Button>
          </ButtonGroup>
          <div class="float-btn">
            <Button type="primary" @click="exportDetail"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
            <Button type="primary"><Icon style="font-size: 18px;margin-right: 5px" type="md-heart-outline" />收藏</Button>
          </div>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns2" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
        </Table>
        <Page
            v-if="tableData.length"
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
import { deepClone, filterDict } from "@/utils/utils.js";
import {downAnnouncement, exportAnnouncement, getMyExportDetail} from "../../../api/myAttention";
import {infoTypeList, timeRange} from "@/utils/const/attention";

export default {
  name: "index",
  data(){
    return{
      loadingFlag: false,
      isTeam: 0,
      procurement: '1',
      biddingConstruct: 1,
      timeRangeValue: 0,
      timeRange: timeRange,
      dateArr: ["", ""],
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now();
        },
      },
      columns: [
        {
          title: "导出日期",
          align: "center",
          minWidth: 120,
        },
        {
          title: "成功导出条数",
          align: "center",
          minWidth: 120,
        },
        {
          title: "导出格式",
          align: "center",
          minWidth: 120,
        },
        {
          title: "状态",
          key: "date1",
          align: "center",
          minWidth: 120,
        },
        {
          title: "导出人",
          key: "name",
          align: "center",
          minWidth: 120,
          filters: [
            {
              label: '小王',
              value: 1
            },
            {
              label: '小马',
              value: 2
            },
            {
              label: '小刘',
              value: 2
            },
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            console.log(1111)
          }
        },
        {
          title: "导出内容说明",
          align: "center",
          minWidth: 300,
        },
        {
          title: "操作",
          key: "date2",
          align: "center",
          minWidth: 120,
        },
      ],
      columns2: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "信息类型",
          align: "center",
          minWidth: 90,
          key: "infoType",
          render: (h, params) => {
            let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
            return (
                <div>{value}</div>
            )
          }
        },
        {
          title: "标题",
          align: "center",
          minWidth: 320,
          key: "title",
          render: (h, params)=>{
            return (
                <a target="_blank"
                   href={'https://'+ params.row.webUrl}
                   class="infoTitle"
                >{params.row.title}</a>
            )
          }
        },
        {
          title: "行业",
          align: "center",
          minWidth: 120,
          key: "industry",
        },
        {
          title: "地区",
          align: "center",
          minWidth: 120,
          key: "areaName"
        },
        {
          title: "发布时间",
          key: "publishDate",
          align: "center",
          minWidth: 120,
        },
        {
          title: "导出时间",
          key: "createTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: "导出人",
          key: "name",
          align: "center",
          minWidth: 120,
          filters: [
            {
              label: '小王',
              value: 1
            },
            {
              label: '小马',
              value: 2
            },
            {
              label: '小刘',
              value: 2
            },
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            console.log(1111)
          }
        },
      ],
      copyColumns: [],
      copyColumns2: [],
      tableData: [],
      selection: [], //勾选选项
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 100,
        pageSize: 10,
      },
      searchData: {
        infoType: 1000, //招标与采购1000，拟在建2000
        type: 0, //0个人，1团队
      }
    }
  },
  created() {
    this.copyColumns = deepClone(this.columns);
    this.copyColumns2 = deepClone(this.columns2);
    this.columns = this.columns.filter(col => col.key !== 'name' );
    this.columns2 = this.columns2.filter(col => col.key !== 'name' );
    this.columns2 = this.columns2.filter(col => col.key !== 'industry' );
    this.init();
  },
  methods: {
    init(){
      this.getMyExportDetail();
    },
    //我的导出明细
    async getMyExportDetail(){
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getMyExportDetail(Object.assign(params,this.searchData));
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //导出功能
    async exportDetail(){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要导出的公告");
        return;
      }
      let ids = "";
      this.selection.forEach((item,index)=>{
        ids = !index? item.infoId : ids + ',' + item.infoId;
      })
      let params = {
        // ids: "2209186137"
        ids: ids
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        let title = "导出明细.xlsx"
        downAnnouncement({
          path: result
        }, title)
      }
    },
    handleSelectChange(selection) {
      this.selection = selection;
    },
    setMyTeam(e){
      this.isTeam = e;
      this.searchData.type = e;
      if(!e) {
        this.columns = this.columns.filter(col => col.key !== 'name' )
        this.columns2 = this.columns2.filter(col => col.key !== 'name' )
      } else {
        this.columns = this.copyColumns;
        this.columns2 = this.copyColumns2;
      }
      if (this.procurement == 1){

      } else {
        this.getMyExportDetail();
      }
    },
    changeRrocurement(item) {
      this.procurement = item;
      if (this.procurement == 1){

      } else {
        this.getMyExportDetail();
      }
    },
    changeSubsidiary(e){
      this.biddingConstruct = e;
      if(e == 1){
        this.columns2 = this.columns2.filter(col => col.key !== 'industry' );
      } else {
        this.columns2 = this.copyColumns2;
      }
      if(!this.isTeam){
        //我的
        this.columns2 = this.columns2.filter(col => col.key !== 'name' );
      }
      this.searchData.infoType = e == 1 ? 1000 : 2000;
      this.getMyExportDetail();
    },
    pickDate(arr) {
      this.searchData.startTime = this.formatDate(new Date(arr[0]));
      this.searchData.endTime = this.formatDate(new Date(arr[1]));
    },
    pageChange(){
      this.getMyExportDetail();
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
.browse {
  .myteam {
    span{
      font-size: 16px;
      font-family: "Microsoft YaHei-Regular";
      width: 105px;
      text-align: center;
      display: inline-block;
      padding: 5px 15px;
      background: #F1F1F1;
      color: #999999;
      //margin-right: 10px;
      border-radius: 2px;
      border-bottom-left-radius: 0 0;
      border-bottom-right-radius: 0 0;
      cursor: pointer;
    }
    .active {
      border-top: 2px solid #83A1F8;
      background: white;
      color: #2F77FF;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    height: calc(100vh - 190px);
    //height: 1000px;

    .list {
      .timeRange {
        margin-top: 10px;
        display: inline-block;
        line-height: 34px;
        height: 34px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        .mr-20 {
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
      .list_btn {
        margin-top: 10px;
        float: right;
        .right_btn {
          width: 100px;
          margin-left: 20px;
        }
      }
      .my-page {
        margin-top: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
    }
    .subsidiary {
      .sub-btn {
        width: 100%;
        padding-bottom: 15px;
        .ivu-btn {

        }
      }
      .float-btn {
        //margin: 10px 0;
        float: right;
        .ivu-btn {
          width: 80px;
          margin-left: 20px;
        }
      }
      .my-table {
        /deep/ .ivu-table-header {
          th {
            height: 50px;
            background: #EDF2FF;
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
}

</style>