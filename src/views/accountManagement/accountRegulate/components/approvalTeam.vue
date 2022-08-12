<template>
  <div class="approval">
    <Form class="form" ref="formInline" :label-width="80" label-position="left" :model="form" inline>
      <FormItem label="使用人：" >
        <Select v-model="form.select" style="width: 400px">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="20" >
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

export default {
  data(){
    return{
      form: {

      },
      tableData: [{}],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
        },
        {
          title: "账号",
          align: "center",
        },
        {
          title: "申请人",
          align: "center",
        },
        {
          title: "申请时间",
          align: "center",
        },
        {
          title: "申请项目",
          align: "center",
        },
        {
          title: "申请原因",
          align: "center",
        },
        {
          title: "日访问配置模式",
          align: "center",
        },
        {
          title: "日配额",
          align: "center",
        },
        {
          title: "月导出量配置模式",
          align: "center",
          minWidth: 90
        },
        {
          title: "日配额",
          align: "center",
        },
        {
          title: "操作",
          align: "left",
          minWidth: 100,
          fixed: 'right',
          render:(h,params) => {
            return(
                <div class="operaBtn">
                  <span onClick={()=>this.editSub(params)}>通过</span>
                  <span>驳回</span>
                </div>
            )
          }
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

/deep/ .operaBtn {
  span {
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #3F6EF5;
    cursor: pointer;
  }
}
</style>