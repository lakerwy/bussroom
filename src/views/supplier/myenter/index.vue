<template>
  <div id="myenter">
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
      <Form-item label="报名时间" class="time">
        <Date-picker
          :value="formItem.claimDate"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 240px"
        ></Date-picker>
        <span class="line">-</span>
        <Date-picker
          :value="formItem.claimDate"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 240px"
        ></Date-picker>
      </Form-item>
      <Form-item label="公司名称">
        <Input v-model="formItem.company" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="状态">
        <Select v-model="formItem.source" placeholder="请选择">
          <Option
            v-for="item in formOptions.sources"
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

    <div class="clue-tip">
      <p>
        共搜索到<span class="tip-num">{{ tipNum }}</span
        >条数据
      </p>
    </div>

    <div class="clue-table">
      <Table border :columns="clueColumns" :data="clueData">
        <template slot-scope="{ row }" slot="action">
          <Button @click="enterView(row)" class="t-btn">查看</Button>
          <Button @click="enterDetail(row)">报名详情</Button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        title: '',
        type: '',
        claimDate: [],
        company: '',
        source: ''
      },
      formOptions: {
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
            label: '已报名',
            value: '2'
          }
        ]
      },
      tipNum: 2389,  //线索条数
      clueColumns: [
        {
          title: '信息标题',
          key: 'title',
          minWidth: 100
        },
        {
          title: '采购数量',
          key: 'nums'
        },
        {
          title: '信息类型',
          key: 'type'
        },
        {
          title: '公司名称',
          key: 'company',
          minWidth: 160
        },
        {
          title: '报名时间',
          key: 'enterTime'
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
          nums: '4000个',
          type: '招标公告',
          company: '北京马鞍山股份科技有限公司',
          enterTime: '2022-04-07',
          status: '已报名'
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
    enterView(row) {   // 查看
      console.log(row)
    },
    enterDetail(row) {   // 报名详情
      console.log(row)
    },
    pageChange(val) {   // 页码改变
      console.log(val)
      this.cluePage.page = val
    }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
#myenter {
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
        margin-left: 383px !important;
      }
    }
    .ivu-form-refresh {
      margin-left: 20px;
    }
  }

  .clue-tip {
    font-size: 14px;
    line-height: 16px;
    padding: 0 20px;
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