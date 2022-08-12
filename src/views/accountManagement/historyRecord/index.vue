<template>
  <div class="record">
    <div class="myteam">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
    </div>
    <Card class="card recordCont">
      <h3>历史操作记录</h3>
      <Form class="form" ref="formInline" :rules="ruleValidate" :label-width="120" label-position="left" :model="form">
        <FormItem label="操作类型：" >
          <Select v-model="form.select" style="width: 400px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="时间：">
          <RadioGroup v-model="form.time">
            <template v-for="(item,index) in timeRange">
              <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
        <FormItem :label-width="0" >
          <Button class="" type="primary">查看</Button>
        </FormItem>
      </Form>
      <Table class="my-table" :columns="columns" :data="tableData">
      </Table>
      <Page
          v-if="tableData.length"
          class="my-page"
          :current.sync="pageForm.pageNumber"
          :total="pageForm.pageTotal"
          :page-size="pageForm.pageSize"
          show-elevator
      />
    </Card>
  </div>
</template>

<script>
import {timeRange} from "@/utils/const/attention";

export default {
  name: "index",
  data(){
    return{
      isTeam: 0,
      form: {

      },
      ruleValidate: {
        name: [
          { required: true, message: 'empty', trigger: 'blur' }
        ]
      },
      timeRange: timeRange,
      tableData: [{}],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
        },
        {
          title: "操作类型",
          align: "center",
          minWidth: 120,
        },
        {
          title: "地区",
          align: "center",
        },
        {
          title: "IP地址",
          align: "center",
        },
        {
          title: "浏览器",
          align: "center",
        },
        {
          title: "登录时间",
          align: "center",
        },
      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
    }
  },
  methods: {
    setMyTeam(e){
      this.isTeam = e;
    },
  }
}
</script>

<style scoped lang="less">
.record {
  .recordCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    .form {
      margin-top: 20px;
    }
    .my-page {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>