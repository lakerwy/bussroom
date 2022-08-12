<template>
  <div class="browse">
    <div class="myteam">
      <span>我的</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="search">
        <div class="search_group">
          <div class="group_title">
            <h3>搜素条件</h3><span><Icon type="ios-create-outline" />编辑</span>
          </div>
          <div class="group_btn">
            <ul>
              <li v-for="(item,index) in groupList" :key="index">
                <Tooltip
                    class="group_tip"
                    transfer
                    placement="left-end"
                    max-width="200"
                    :disabled="item.name.length <= 15"
                    :content="item.name"
                >
                  <Button class="btn_text" @click="setGourp(item, index)" :type="groupFlag == item.id ? 'primary' : ''"
                          long>{{ item.name }}
                  </Button>
                </Tooltip>
                <Button type="primary" class="btn_del">—</Button>
              </li>
            </ul>
          </div>
          <Page
              class="group_page"
              :total="10"
              size="default"
              simple
              :page-size="5"
          />
        </div>
        <div class="search_main">
          <div class="formining" v-if="procurement==1">
            <h3>筛选条件：</h3>
            <ul class="columm_type" style="display: flex">
              <span>栏目类型：</span>
              <RadioGroup v-model="searchForm.table">
                <li v-for="(item,index) in columnType" :key="index"><Radio :label="item.id">{{ item.name }}</Radio></li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              搜索范围：
              <RadioGroup v-model="searchForm.searchRange">
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              地区范围：
              <RadioGroup v-model="searchForm.area">
                <li v-for="(item,index) in regional" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              时间范围：
              <RadioGroup v-model="searchForm.range">
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              查询逻辑：
              <RadioGroup v-model="searchForm.withOrValue">
                <li v-for="(item,index) in withOr" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type column_input">
              搜索词：<img class="prompt" src="img/prompt.png" alt="">
              <li v-for="(item,index) in 10" :key="index">
                <Input class="input"></Input> <span v-if="index !=9">与</span>
              </li>
            </ul>
            <ul class="columm_type ">
              排除词：<img class="prompt" src="img/prompt.png" alt="">
              <li v-for="(item,index) in 3" :key="index">
                <Input class="input"></Input> <span v-if="index !=2">与</span>
              </li>
            </ul>
          </div>
          <div class="building" v-if="procurement==2">
            <h3>筛选条件：</h3>
            <ul class="columm_type">
              栏目类型：
              <RadioGroup v-model="searchForm.table">
                <li v-for="(item,index) in columnType2" :key="index"><Radio :label="item.id">{{ item.name }}</Radio></li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              搜索范围：
              <RadioGroup v-model="searchForm.type">
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              行业类型：
              <RadioGroup v-model="searchForm.category1">
                <li v-for="(item,index) in industryType" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type" style="display: flex">
              <span>进展阶段：</span>
              <RadioGroup v-model="searchForm.stage">
                <li v-for="(item,index) in developmentPhase" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              地区范围：
              <RadioGroup v-model="searchForm.area">
                <li v-for="(item,index) in regional" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              时间范围：
              <RadioGroup v-model="searchForm.range">
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              查询逻辑：
              <RadioGroup v-model="searchForm.keywordLogic">
                <li v-for="(item,index) in withOr" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type column_input ">
              搜索词：<img class="prompt" src="img/prompt.png" alt="">
              <li v-for="(item,index) in 10" :key="index">
                <Input class="input"></Input> <span v-if="index !=9">与</span>
              </li>
            </ul>
            <ul class="columm_type column_input">
              排除词：<img class="prompt" src="img/prompt.png" alt="">
              <li v-for="(item,index) in 3" :key="index">
                <Input class="input"></Input> <span v-if="index !=2">与</span>
              </li>
            </ul>
          </div>
          <Button class="column_btn" type="primary">立即搜索</Button>
          <Button class="column_btn" type="primary">清空搜索条件</Button>
          <Button class="column_btn" type="primary">保存搜索条件</Button>
        </div>
      </div>
      <div class="list">
        <h3>浏览结果</h3>
        <span class="listAll">共 **** 条</span>
        <Button style="margin-left: 30px; width: 100px" type="primary">浏览增量</Button>
        <div class="list_btn">
          <Button class="right_btn"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
          <Button class="right_btn"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />分享</Button>
          <Button class="right_btn"><Icon style="font-size: 18px;margin-right: 5px" type="md-heart-outline" />收藏</Button>
          <Button class="right_btn">取消收藏</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" :loading="loadingFlag">
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
import { deepClone } from "@/utils/utils.js";
import {getNzjSearch, getZtbSearch} from "../../../api/myAttention";

export default {
  name: "index",
  data(){
    return{
      loadingFlag: false,
      isTeam: false,
      procurement: '1',
      groupFlag: 0,
      groupList: [
        {id: 1, name: '电力公路学校电力公路学校电力公路学校电力公路学校电力公路学校电力公路学校电力公路学校电力公路学校电力公路学校', field: ''},
        {id: 2, name: '电力公路学校', field: ''},
        {id: 3, name: '电力公路学校', field: ''},
        {id: 4, name: '电力公路学校', field: ''},
        {id: 5, name: '电力公路学校', field: ''},
      ],
      columnType: [
        {id: 1000, name: '全部', },
        {id: 1, name: '工程招标', },
        {id: 2, name: '货物招标', },
        {id: 3, name: '服务招标', },
        {id: 6, name: '政府采购', },
        {id: 7, name: '企业采购', },
        {id: 5, name: '招标预告', },
        {id: 4, name: '中标公示', },
      ],
      columnType2: [
        {id: 2000, name: '全部', },
        {id: 3030, name: 'VIP项目', },
        {id: 3020, name: '项目核准批复',},
        {id: 3050, name: '项目动态', },
        {id: 3070, name: '项目跟踪', },
      ],
      searchScope: [
        {id: 1, name: '全部'},
        {id: 2, name: '标题'},
        {id: 3, name: '内容(标题+正文)'},
        {id: 4, name: '附件'},
      ],
      industryType: [
        {id: 1, name: '全部'},
        {id: 2, name: '建工'},
        {id: 3, name: '风电'},
        {id: 4, name: '能源'},
        {id: 5, name: '水利 +'},
      ],
      developmentPhase: [
        {id: 1, name: '全部阶段'},
        {id: 2, name: '项目建议书阶段'},
        {id: 3, name: '可行性研究报告阶段'},
        {id: 4, name: '项目审批核查'},
        {id: 5, name: '工程设计'},
        {id: 6, name: '施工准备'},
        {id: 7, name: '在建阶段'},
      ],
      regional: [
        {id: 1, name: '全部'},
        {id: 2, name: '华东地区'},
        {id: 3, name: '华南地区'},
        {id: 4, name: '华北地区'},
        {id: 5, name: '华中地区'},
        {id: 6, name: '海外地区'},
      ],
      timeRange: [
        {name: '昨日', value: 0},
        {name: '近一周', value: 1},
        {name: '近两周', value: 2},
        {name: '近一个月', value: 3},
        {name: '近三个月', value: 4},
        {name: '近一年', value: 5},
        {name: '自定义时间', value: -1},
      ],
      withOr: [
        {id: 1, name: '与关系'},
        {id: 2, name: '或关系'}
      ],
      columns: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
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
          title: "收藏",
          align: "center",
          key: "share",
          minWidth: 90,
          render: (h,params)=>{
            let temp;
            if (params.row.share) {
              temp = <Icon style="cursor: pointer; font-size: 20px; color: rgb(45, 140, 240)" type="md-heart" onClick={() => this.changeShare(params)} />
            } else {
              temp = <Icon style="cursor: pointer; font-size: 20px" type="md-heart-outline" onClick={() => this.changeShare(params)} />

            }
            return (temp)
          }
        },
        {
          title: "行业",
          align: "center",
          key: "industry",
          minWidth: 90,
        },
        {
          title: "阶段",
          align: "center",
          key: "phase",
          minWidth: 90,
        },
        {
          title: "地区",
          align: "center",
          minWidth: 90,
        },
        {
          title: "发布时间",
          key: "date1",
          align: "center",
          minWidth: 120,
        },
        {
          title: "访问时间",
          key: "date2",
          align: "center",
          minWidth: 120,
        },
      ],
      tableData: [],
      copyColumns: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchForm: {
        table: "",
        searchRange: "",
      }
    }
  },
  created() {
    this.copyColumns = deepClone(this.columns);
    this.columns = this.columns.filter(col => col.key !== 'industry' && col.key !== 'phase');
    this.init();
  },
  methods: {
    init(){
      this.getZtbSearch();
    },
    // 招标与采购查询
    async getZtbSearch(){
      let params = {
        ...this.searchForm,
        page: this.pageForm.pageNumber,
        rows: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getZtbSearch(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    // 拟在建查询
    async getNzjSearch(){
      let params = {
        ...this.searchForm,
        page: this.pageForm.pageNumber,
        rows: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getNzjSearch(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    changeRrocurement(item) {
      this.procurement = item;
      if (item == 1){
        this.columns = this.columns.filter(col => col.key !== 'industry' && col.key !== 'phase');
        this.getZtbSearch();
      } else {
        this.columns = this.copyColumns;
        this.getNzjSearch();
      }
    },
    setGourp(item, index){
      this.groupFlag = item.id;
    },
    //收藏和取消收藏
    changeShare(params){
      // console.log(params);
      this.tableData[params.index].share = !this.tableData[params.index].share;
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
  .myteam {
    span{
      width: 105px;
      text-align: center;
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
    .active {
      background: #74BCFF;
      color: white;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    //height: 1000px;
    min-height: calc(100vh - 190px);

    .search {
      display: flex;
      .search_group {
        height: 362px;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
        width: 23%;
        margin-right: 15px;
        padding: 10px 16px;
        .group_title {
          display: flex;
          align-items: center;
          h3 {
            width: 90%;
            font-size: 16px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          span {
            display: inline-block;
            width: 48px;
            cursor: pointer;
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #3F6EF5;
          }
        }
        .group_btn {
          //height: 168px;
          li {
            display: flex;
            margin: 15px 0;
            /deep/ .ivu-btn {
              height: 36px;
            }
            .group_tip {
              width: 83%;
              /deep/ .ivu-tooltip-rel{
                width: 100%;
              }
              .btn_text {
                width: 100%;
                padding-right: 5px;
                /deep/ span {
                  display: inline-block;
                  width: 100%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  line-height: 34px;
                }
              }
            }
            .btn_del {
              margin-left: 10px;
              width: 12%;
              padding: 0;
            }
          }
        }
        .group_page {
          text-align: center;
          margin-top: 20px;
        }
      }
      .search_main {
        font-size: 15px;
        margin-left: 15px;
        height: 362px;
        width: 77%;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
        padding: 10px 0 0 30px;
        h3 {
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .columm_type {
          margin: 9px 0;
          height: 25px;
          width: 100%;
          overflow: hidden;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          li {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            display: inline-block;
            margin-right: 10px;
            height: 25px;
            .input {
              width: 65px;
              /deep/ .ivu-input{
                height: 23px;
              }
            }
          }
          .prompt {
            width: 26px;
            vertical-align: middle;
          }
        }
        .formining {
          margin-bottom: 15px;
        }
        .building {
          margin-bottom: 10px;
          .columm_type {
            height: 24px;
            margin: 6px 0;
          }
          .column_input {
            height: 25px;
          }
        }
        .column_btn {
          margin-right: 20px;
        }
      }
    }
    .list {
      h3{
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .listAll {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .list_btn {
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
  }
}


</style>