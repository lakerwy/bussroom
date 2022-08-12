<template>
  <div class="permiss">
    <Form class="form" :label-width="80" label-position="left" :model="form" inline>
      <FormItem label="使用人：" >
        <Select v-model="user" style="width: 400px">
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
    <Modal
        v-model="editModal"
        title="账号权限修改"
        ok-text="保存修改"
        @on-ok="handleok"
        @on-cancel="handlecancel"
        width="700"
    >
      <Form class="permissForm" ref="permissForm" :rules="ruleValidate" :label-width="120" :model="form" label-position="right"
            inline>
        <FormItem label="账号："  >
          <span>189****1564</span>
        </FormItem>
        <FormItem label="创建时间："  >
          <span>2021-2-20</span>
        </FormItem>
        <FormItem label="账号状态："  >
          <i-switch v-model="form.switch1" />
        </FormItem>
        <FormItem label="访问权限："  >
          <Select v-model="form.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="角色类型："  >
          <span>管理员</span><br>
<!--          <span>(角色管理修改需联系专属客服)</span>-->
        </FormItem>
        <FormItem label="联系人："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="邮箱："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="电话："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="日访问量配置："  >
          <Select v-model="form.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="日访问量："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="月导出量配置："  >
          <Select v-model="form.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="月导出量："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="密码："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="确认密码："  >
          <Input v-model="form.name" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>

export default {
  data(){
    return{
      user: "",
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
          title: "角色类型",
          align: "center",
        },
        {
          title: "使用人",
          align: "center",
        },
        {
          title: "联系电话",
          align: "center",
        },
        {
          title: "邮箱",
          align: "center",
        },
        {
          title: "创建时间",
          align: "center",
        },
        {
          title: "状态",
          align: "center",
        },
        {
          title: "访问权限",
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
          title: "月导出配置模式",
          align: "center",
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
                  <span onClick={()=>this.editSub(params)}>修改</span>
                  <span>删除</span>
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
      editModal: false,
      form: {

      },
      ruleValidate: {
        name: [
          { required: true, message: 'empty', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    editSub(){
      this.editModal = true;
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

.permissForm {
  /deep/ .ivu-form-item-content{
    width: 186px;
  }
}
</style>