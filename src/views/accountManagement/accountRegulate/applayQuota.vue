<template>
  <div class="applay">
    <h3>申请</h3>
    <Form class="form" ref="formInline" :label-width="85" label-position="left" :model="form">
      <FormItem label="申请项目：" >
        <Select v-model="form.select" style="width: 400px">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="申请原因：">
        <Input style="width: 400px" v-model="form.value" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="Enter something..." />
      </FormItem>
      <FormItem>
        <Button class="" type="primary">发送申请</Button>
      </FormItem>
    </Form>
    <h3>申请记录</h3>
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
export default {

  data(){
    return{
      form: {

      },
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
  margin-top: 20px;
}
.my-page {
  margin-top: 15px;
  text-align: center;
}
</style>