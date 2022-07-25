<template>
  <div class="browse">
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="list">
        <ul class="columm_type addSubscriber">
          <span class="column_title">订阅器：</span>
          <li v-for="(item,index) in 1" :key="index"><Tag color="geekblue">园区绿化</Tag></li>
          <Button class="right_btn" type="primary">新增订阅器<span>（还可新增9个）</span></Button>
        </ul>
        <ul class="columm_type editSub" >
          <span class="column_title">订阅词：</span>
          <li v-for="(item,index) in columnType" :key="index"><Radio v-model="item.checked">{{ item.name }}</Radio></li>
          <span class="addColumnText">新增关键词</span>
          <button class="right_btn">修改订阅</button>
        </ul>
        <ul class="columm_type">
          <span class="column_title">栏目类型：</span>
          <li v-for="(item,index) in columnType2" :key="index"><Radio v-model="item.checked">{{ item.name }}</Radio></li>
        </ul>
        <div class="search">
          <span class="column_title">筛选条件：</span>
          <Select class="searchSelect" placeholder="时间" v-model="searchForm.model1" style="width:130px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select class="searchSelect" placeholder="地区" v-model="searchForm.model2" style="width:130px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select class="searchSelect" placeholder="附件" v-model="searchForm.model3" style="width:130px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select class="searchSelect" placeholder="联系方式" v-model="searchForm.model4" style="width:130px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select class="searchSelect" placeholder="联系人" v-model="searchForm.model5" style="width:130px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="searchBtn">
            <Input v-model="searchValue" placeholder="请输入您要搜索的信息" />
            <Button type="primary">立即搜索</Button>
          </div>
        </div>
      </div>
    </Card>
    <Card class="card">
      <div>
        <span class="total">共 **** 条</span> <Button style="margin-left: 20px;" type="primary">导出增量</Button>
        <div class="list_btn">
          <Button class="right_btn" ><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />批量导出</Button>
          <Button class="right_btn" ><Icon style="font-size: 18px;margin-right: 5px" type="md-heart-outline" />批量收藏</Button>
          <Button class="right_btn" ><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />批量分享</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="procurement==1?columns:columns2" :data="browseData"></Table>
        <Page
            class="my-page"
            :total="100"
            :page-size="10"
            show-elevator
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { deepClone } from "@/utils/utils.js";

export default {
  name: "index",
  data(){
    return{
      isTeam: false,
      procurement: '1',
      searchValue: "",
      columnType: [
        {id: 1, name: '租摆', checked: false, field: ''},
        {id: 2, name: '养护', checked: false, field: ''},
        {id: 3, name: '种植', checked: false, field: ''},
        {id: 4, name: '庭院美化', checked: false, field: ''},
      ],
      columnType2: [
        {id: 1, name: '全部', checked: false, field: ''},
        {id: 2, name: '工程招标', checked: false, field: ''},
        {id: 3, name: '货物招标', checked: false, field: ''},
        {id: 4, name: '服务招标', checked: false, field: ''},
        {id: 5, name: '政府采购', checked: false, field: ''},
        {id: 6, name: '企业采购', checked: false, field: ''},
        {id: 7, name: '招标预告', checked: false, field: ''},
        {id: 8, name: '中标公示', checked: false, field: ''},
      ],
      searchForm: {

      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "信息类型",
          align: "center",
          minWidth: 120,
        },
        {
          title: "标题",
          align: "center",
          minWidth: 300,
        },
        {
          title: "地区",
          key: "date1",
          align: "center",
          minWidth: 120,
        },
        {
          title: "发布时间",
          key: "date2",
          align: "center",
          minWidth: 120,
        },
      ],
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "栏目类型",
          align: "center",
          minWidth: 120,
        },
        {
          title: "标题",
          align: "center",
          minWidth: 200,
        },
        {
          title: "进展阶段",
          key: "date1",
          align: "center",
          minWidth: 200,
        },
        {
          title: "行业",
          align: "center",
          minWidth: 200,
        },
        {
          title: "地区",
          key: "date2",
          align: "center",
          minWidth: 120,
        },
        {
          title: "发布时间",
          key: "date2",
          align: "center",
          minWidth: 120,
        },
      ],
      browseData: [
        {},{},{},{},{},{},{},{},{},
      ],
      copyColumns: [],
      copyColumns2: [],
    }
  },
  created() {
    this.copyColumns = deepClone(this.columns);
    this.copyColumns2 = deepClone(this.columns2);
    this.columns = this.columns.filter(col => col.key !== 'interviewer' )
    this.columns2 = this.columns2.filter(col => col.key !== 'interviewer' )

  },
  methods: {
    setMyTeam(e){
      this.isTeam = e;
      if(!e) {
        this.columns = this.columns.filter(col => col.key !== 'interviewer' )
        this.columns2 = this.columns2.filter(col => col.key !== 'interviewer' )
      } else {
        this.columns = this.copyColumns;
        this.columns2 = this.copyColumns2;
      }
    },
    changeRrocurement(item) {
      this.procurement = item
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
    //height: 1000px;
    .list {
      .column_title {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .columm_type {
        height: 33px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 10px;
        vertical-align: middle;
        li {
          display: inline-block;
          margin-right: 10px;
          height: 25px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .prompt {
          width: 26px;
          vertical-align: middle;
        }
      }
      .addSubscriber {
        overflow: inherit;
        height: 33px;
        border-bottom: 1px dashed #E8E8E8;
        position: relative;
        .right_btn {
          position: absolute;
          right: 0;
          bottom: 5px;
        }
      }
      .editSub {
        height: 33px;
        position: relative;
        .addColumnText {
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          width: 81px;
          height: 25px;
          line-height: 23px;
          border-radius: 2px;
          border: 1px dashed #D0D0D0;
          font-size: 13px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          cursor: pointer;
        }
        .right_btn {
          text-align: center;
          line-height: 31px;
          color: #3F6EF5;
          background: transparent;
          width: 88px;
          height: 33px;
          border-radius: 4px;
          border: 1px solid #3F6EF5;
          position: absolute;
          right: 0;
          top: 0px;
          cursor: pointer;
        }
      }
      .search {
        position: relative;
        margin-bottom: 10px;
        .searchSelect {
          margin-right: 12px;
        }
        .searchBtn {
          position: absolute;
          right: 0;
          top: 0;
          .ivu-input-wrapper {
            width: 300px;
          }
          .ivu-btn {
            width: 100px;
            margin-left: 20px;
          }
        }
      }
    }
  }
  .card {
    margin-right: 10px;
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
  .my-table {
    margin-top: 10px;
    /deep/ .ivu-table-header {
      th {
        background: #EDF2FF;
        height: 50px;
      }
      //.ivu-table-cell-with-selection::after {
      //  content: '全选';
      //  position: absolute;
      //  top: 9px;
      //  left: 42px;
      //}
    }
  }
  .my-page {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
}


</style>
