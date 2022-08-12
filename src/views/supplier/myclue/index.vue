<template>
  <div id="myclue">
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
      <Form-item label="认领时间" class="time">
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
      <Form-item label="地区">
        <Select v-model="formItem.area" placeholder="请选择">
          <Option
            v-for="item in formOptions.areas"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </Form-item>
      <Form-item label="行业">
        <Select v-model="formItem.industry" placeholder="请选择">
          <Option
            v-for="item in formOptions.industrys"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</Option
          >
        </Select>
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
        <Button type="primary" class="tip-delete">删除认领</Button>
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
          <Button type="primary" @click="clueEntry(row)" class="t-btn"
            >一键报名</Button
          >
          <Button @click="clueFollow(row)" class="t-btn">跟进</Button>
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
    <regModal ref="regmodal" />

    <!-- <regModal /> -->
    <!-- 在线报名 -->
    <!-- <Modal v-model="enterFlag" width="580">
      <div
        slot="header"
        style="font-size: 20px; line-height: 20px; padding-top: 10px"
      >
        <p>
          在线报名<span style="color: #999; font-size: 14px; margin-left: 20px"
            >报名须知：报名信息务必真实，一遍及时联系</span
          >
        </p>
      </div>
      <div style="text-align: left">
        <Form
          ref="enterfrom"
          :model="enterfrom"
          :rules="enterValidate"
          :label-width="100"
        >
          <Form-item label="公司名称" prop="company">
            <Input
              v-model="enterfrom.company"
              placeholder="请输入公司名称"
            ></Input>
          </Form-item>
          <Form-item label="公司法人" prop="legal">
            <Input
              v-model="enterfrom.legal"
              placeholder="请输入公司法人"
            ></Input>
          </Form-item>
          <Form-item label="注册资金" prop="registmoney">
            <Input
              v-model="enterfrom.registmoney"
              placeholder="请输入公司注册资金"
            ></Input>
          </Form-item>
          <Form-item label="公司所在地" prop="location">
            <Select
              v-model="enterfrom.province"
              style="width: 150px; margin-right: 20px"
            >
              <Option value="beijing">北京市</Option>
              <Option value="shanghai" disabled>上海市</Option>
              <Option value="shenzhen">深圳市</Option>
            </Select>
            <Select v-model="enterfrom.city" style="width: 150px">
              <Option value="beijing">北京市</Option>
              <Option value="shanghai">上海市</Option>
              <Option value="shenzhen">深圳市</Option>
            </Select>
          </Form-item>
          <Form-item label="公司简介" prop="introduce">
            <Input
              v-model="enterfrom.introduce"
              type="textarea"
              :rows="3"
              placeholder="请输入公司介绍"
            ></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="large" @click="submitEnter('enterfrom')"
          >下一步1/2</Button
        >
      </div>
    </Modal>
    <Ad /> -->
  </div>
</template>

<script>
import regModal from '../components/regModal.vue'
export default {
  components: {
    regModal
  },
  data() {
    const locationReg = (rule, value, callback) => {
      if (!this.enterfrom.province || !this.enterfrom.city) {
        callback(new Error('请选择公司所在地'));
      } else {
        callback();
      }
    };

    return {
      enterFlag: false,
      formItem: {
        title: '',
        type: '',
        claimDate: [],
        area: '',
        industry: '',
        source: ''
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
          title: '认领时间',
          key: 'claimTime'
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
          claimTime: '2022-04-07',
          status: '未联系'
        },
        {
          title: '2022年攀枝花东方太爷有限公司铁',
          type: '招标公告',
          area: '北京',
          industry: '五金',
          agency: '北京国信',
          publishTime: '2020-04-06',
          claimTime: '2022-04-07',
          status: '未联系'
        }
      ],
      cluePage: {
        page: 1,
        size: 10,
        total: 100
      },

      enterfrom: {
        company: '',
        legal: '',
        registmoney: '',
        location: '',
        introduce: '',
        province: '',
        city: ''
      },
      enterValidate: {
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        legal: [
          { required: true, message: '请输入公司法人', trigger: 'blur' }
        ],
        registmoney: [
          { required: true, message: '请输入注册资金', trigger: 'blur' }
        ],
        location: [
          { required: true, validator: locationReg, trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入公司简介', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    formSearch() {   //搜索

    },
    formSearch() {   //重置

    },
    clueEntry(row) {   // 一键报名
      console.log(row)
      this.$refs.regmodal.modal = true;
      // this.enterFlag = true
    },
    clueFollow(row) {   // 跟进
      console.log(row)
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
    },
    submitEnter(name) {  //报名提交
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
#myclue {
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