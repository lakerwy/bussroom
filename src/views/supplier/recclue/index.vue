<template>
  <div id="recclue">
    <Form :model="formItem" :label-width="80" class="form">
      <Form-item label="信息标题">
        <Input v-model="formItem.title" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="信息类型">
        <Select v-model="formItem.type" placeholder="请选择">
          <Option
            v-for="item in formOptions.types"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </Form-item>
      <Form-item label="发布时间" class="time">
        <Date-picker
          :value="formItem.publishDate"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 240px"
        ></Date-picker>
        <span class="line">-</span>
        <Date-picker
          :value="formItem.publishDate"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 240px"
        ></Date-picker>
      </Form-item>
      <Form-item label="代理机构">
        <Input v-model="formItem.title" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="所属地区">
        <Select v-model="formItem.area" placeholder="请选择">
          <Option
            v-for="item in formOptions.areas"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </Form-item>
      <Form-item label="所属行业">
        <Select v-model="formItem.industry" placeholder="请选择">
          <Option
            v-for="item in formOptions.industrys"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </Form-item>
      <Form-item label="" class="submit">
        <Button type="primary" icon="ios-search" @click="formSearch"
          >查询</Button
        >
        <Button icon="md-refresh" class="ivu-form-refresh" @click="formReset"
          >重置</Button
        >
      </Form-item>
    </Form>

    <Tabs value="name1" class="rectabs">
      <Tab-pane label="在线报名信息" name="name1">
        <div class="clue-tip">
          <p>
            共搜索到<span class="tip-num">{{ tipNum }}</span
            >条数据
            <Button type="primary" class="tip-delete" @click="batchCliam()"
              >批量认领</Button
            >
          </p>
        </div>

        <div class="clue-table">
          <Table
            border
            :columns="clueColumns"
            :data="clueData"
            @on-selection-change="selectChange"
          >
            <template slot-scope="{ row }" slot="action">
              <Button @click="clueClaim(row)" class="t-btn">认领</Button>
              <Button @click="clueView(row)">查看</Button>
            </template>
          </Table>
          <Page
            :current="cluePage.page"
            :page-size="cluePage.size"
            :total="cluePage.total"
            show-elevator
            @on-change="pageChange"
            class="t-page"
          ></Page>
        </div>
      </Tab-pane>
      <Tab-pane label="采招信息" name="name2">标签二的内容</Tab-pane>
    </Tabs>

    <!-- 提示 -->
    <Modal
      v-model="hyFlag"
      title="提示"
      ok-text="在线咨询"
      cancel-text="取消"
      @on-ok="hyOn"
      @on-cancel="hyCancel"
    >
      <p>您还不是采招会员，办理采招会员后</p>
      <p>可以查看和认领，办理会员在线咨询客服</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hyFlag: false,
      formItem: {
        title: '',
        type: '',
        publishDate: [],
        agency: '',
        area: '',
        industry: '',
      },
      formOptions: {
        areas: [
          {
            label: '全国',
            value: '1'
          },
          {
            label: '北京',
            value: '2'
          }
        ],
        industrys: [
          {
            label: '全部',
            value: '1'
          }
        ],
        types: [
          {
            label: '全部',
            value: '1'
          },
          {
            label: '企业采购',
            value: '2'
          },
          {
            label: '政府采购',
            value: '3'
          },
          {
            label: '招标公告',
            value: '4'
          },
          {
            label: '招标预告',
            value: '5'
          },
          {
            label: '公告变更',
            value: '6'
          }
        ],
        sources: [
          {
            label: '全部',
            value: '1'
          },
          {
            label: '跟进中',
            value: '2'
          },
          {
            label: '未跟进',
            value: '3'
          }
        ]
      },
      tipNum: 2389,  //线索条数
      clueColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '信息标题',
          key: 'title',
          minWidth: 100
        },
        {
          title: '信息类型',
          key: 'type'
        },
        {
          title: '所属地区',
          key: 'area'
        },
        {
          title: '所属行业',
          key: 'industry'
        },
        {
          title: '代理机构',
          key: 'agency'
        },
        {
          title: '发布时间',
          key: 'publishTime'
        },
        {
          title: '状态',
          key: 'status',
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          fixed: "right",
          minWidth: 160
        }
      ],
      clueData: [
        {
          title: '2022年攀枝花东方太爷有限公司铁',
          type: '招标公告',
          area: '北京',
          industry: '五金',
          agency: '北京国信',
          publishTime: '2020-04-06',
          status: '未联系'
        },
        {
          title: '2022年攀枝花东方太爷有限公司铁',
          type: '招标公告',
          area: '北京',
          industry: '五金',
          agency: '北京国信',
          publishTime: '2020-04-06',
          status: '未联系'
        }
      ],
      cluePage: {
        page: 1,
        size: 10,
        total: 100
      }
    };
  },
  methods: {
    formSearch() {   //搜索

    },
    formSearch() {   //重置

    },
    batchCliam() {   //批量认领

    },
    clueClaim(row) {   // 认领
      console.log(row)
      this.hyFlag = true
    },
    clueView(row) {   // 查看
      console.log(row)
    },
    pageChange(val) {   // 页码改变
      console.log(val)
      this.cluePage.page = val
    },

    selectChange(data) {   //table的选中列表
      console.log(data)
    }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
#recclue {
  width: 100%;
  min-height: 520px;
  background-color: #fff;
  .form {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    padding: 20px;
    .ivu-form-item {
      // width: 300px;
      margin-right: 4.2vw;
      margin-bottom: 16px;
      /deep/ .ivu-input {
        width: 240px;
      }

      /deep/ .ivu-select-placeholder {
        width: 238px;
      }

      /deep/ .ivu-form-item-label {
        text-align: left;
      }
    }

    .ivu-form-item.time {
      margin-right: 0;
      .line {
        color: rgb(197, 195, 195);
        margin: 0 1px;
      }
    }
    .ivu-form-item.submit {
      margin-right: 0px;

      /deep/ .ivu-form-item-content {
        margin-left: -17px !important;
      }
    }
    .ivu-form-refresh {
      margin-left: 20px;
    }
  }

  .rectabs {
    padding: 0 20px;
  }

  .clue-tip {
    padding: 0 20px;
    font-size: 14px;
    line-height: 16px;
    color: #999;
    .tip-delete {
      margin-left: 20px;
    }
  }

  .clue-table {
    padding: 20px;
    .t-btn {
      margin-right: 5px;
    }
    .t-page {
      text-align: center;
      padding-top: 20px;
    }
    /deep/ .ivu-table-header {
      th {
        background-color: #edf2ff;
      }
    }
    /deep/ .ivu-table-fixed-header {
      th {
        background-color: #edf2ff;
      }
    }
  }
}
</style>