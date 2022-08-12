<template>
<div class="usage">
  <Form class="form" ref="formInline" :label-width="80" label-position="left" :model="form">
    <FormItem label="使用人：" >
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
</div>
</template>

<script>
import {timeRange} from "@/utils/const/attention";

export default {
  name: "usageTeam",
  data(){
    return{
      form: {

      },
      timeRange: timeRange,
      tableData: [{}],
      columns: [
        {
          title: "账号",
          align: "center",
          minWidth: 120,
        },
        {
          title: "使用人",
          align: "center",
        },
        {
          title: "访问量",
          align: "center",
        },
        {
          title: "导出量",
          align: "center",
        },
        {
          title: "收藏量",
          align: "center",
        },
        {
          title: "分享量",
          align: "center",
        },
        {
          title: "使用产品",
          align: "center",
        },
        {
          title: "最后一次登录时间",
          align: "center",
        },
      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
    }
  }
}
</script>

<style scoped lang="less">
.form {
  margin-left: 20px;
}
.my-page {
  margin-top: 15px;
  text-align: center;
}
</style>