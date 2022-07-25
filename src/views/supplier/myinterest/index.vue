<template>
  <div id="myinteres">
    <Form :model="formItem" :label-width="80" class="form">
      <Form-item label="公司名称">
        <Input v-model="formItem.company" placeholder="请输入"></Input>
      </Form-item>
      <Form-item label="关注时间">
        <Date-picker :value="formItem.focusDate" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
      </Form-item>
      <Form-item label="">
        <Button type="primary" icon="ios-search" @click="formSearch">查询</Button>
        <Button icon="md-refresh" class="ivu-form-refresh" @click="formReset">重置</Button>
      </Form-item>
    </Form>

    <div class="clue-tip">
      <p>
        共搜索到<span class="tip-num">{{tipNum}}</span>条数据
      </p>
    </div>

    <div class="clue-table">
      <Table border :columns="clueColumns" :data="clueData">
        <template slot-scope="{row}" slot="action">
          <Button @click="isFocus(row)" class="t-btn">关注</Button>
          <Button @click="interestView(row)">查看</Button>
        </template>
      </Table>
      <Page
        :current="cluePage.page"
        :page-size="cluePage.size"
        :total="cluePage.total"
        show-elevator
        @on-change="pageChange"
        class="t-page"></Page>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        company: '',
        focusDate: []
      },
      tipNum: 2389,  //线索条数
      clueColumns: [
        {
          title: '关注类型',
          key: 'type'
        },
        {
          title: '公司名称',
          key: 'company',
          minWidth: 160
        },
        {
          title: '关注时间',
          key: 'interTime'
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
          type: '代理机构',
          company: '北京马鞍山股份科技有限公司',
          interTime: '2022-04-07',
          status:'已报名'
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
    isFocus(row) {   // 关注
      console.log(row)
    },
    interestView(row) {   // 查看
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
  #myinteres{
    width: 100%;
    min-height: 520px;
    background-color: #fff;
    .form{
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      padding: 20px;
      .ivu-form-item{
        width: 300px;
        margin-bottom: 15px;
      }
      .ivu-form-refresh{
        margin-left: 20px;
      }
    }

    .clue-tip{
      font-size: 14px;
      line-height: 16px;
      padding: 0 20px;
      color: #999;
      .tip-delete{
        margin-left: 20px;
      }
    }

    .clue-table{
      padding: 20px;
      .t-btn{
        margin-right: 5px;
      }
      .t-page{
        text-align: center;
        padding-top: 20px;
      }
    }
  }
</style>