<template>
  <div class="myTeamCont">
    <h3>账号概览</h3>
    <div class="overview">
      <div class="situation">
        <h4>子账号情况</h4>
        共购买2个子账号，已使用1个
        <Button class="sitBtn" type="primary" @click="addUser">创建子账号</Button>
      </div>
      <div class="situation">
        <h4>日访问量配置情况</h4>
        共300条，已配置300条（共享300条）
        <Button class="sitBtn" type="primary">调整配额</Button>
        <Button class="sitBtn" type="primary">配额增量</Button>
      </div>
      <div class="situation">
        <h4>月导出量配置情况</h4>
        共100条，已配置75条（非共享300条）
        <Button class="sitBtn" type="primary">调整配额</Button>
        <Button class="sitBtn" type="primary">配额增量</Button>
      </div>
    </div>
    <Tabs :value="tabValue" @on-click="changeTab">
      <TabPane label="使用情况" name="1">
        <usageTeam v-if="tabValue == '1'"></usageTeam>
      </TabPane>
      <TabPane label="权限配置" name="2">
        <permissTeam v-if="tabValue == '2'"></permissTeam>
      </TabPane>
      <TabPane label="审批" name="3">
        <approvalTeam v-if="tabValue == '3'"></approvalTeam>
      </TabPane>
    </Tabs>

    <Modal
        v-model="addUserModal"
        title="添加用户"
        ok-text="提交"
        @on-ok="handleok"
        @on-cancel="handlecancel"
    >
      <Tabs type="card" :value="userTab" @on-click="changeUserTab">
        <TabPane label="手动添加" name="1"></TabPane>
        <TabPane label="微信邀请" name="2"></TabPane>
      </Tabs>
      <Form class="form" ref="userForm" :rules="ruleValidate" :label-width="100" :model="userForm">
        <FormItem label="姓名："  prop="name">
          <Input v-model="userForm.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="部门："  prop="name">
          <Input v-model="userForm.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="性别："  prop="name">
          <RadioGroup v-model="userForm.radio">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="手机号："  prop="name">
          <Input v-model="userForm.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="随机密码："  prop="name">
          <Input v-model="userForm.password" placeholder="" disabled></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import usageTeam from "./components/usageTeam";
import permissTeam from "./components/permissTeam";
import approvalTeam from "./components/approvalTeam";

export default {
  name: "accountMyTeam",
  components: {
    usageTeam,
    permissTeam,
    approvalTeam
  },
  data(){
    return{
      tabValue: "1",
      addUserModal: false,
      ruleValidate: {
        name: [
          { required: true, message: 'empty', trigger: 'blur' }
        ]
      },
      userTab: '1',
      userForm: {

      }
    }
  },
  methods: {
    changeTab(e){
      this.tabValue = e;
    },
    addUser(){
      this.addUserModal = true;
    },
    changeUserTab(e){
      this.userTab = e;
    },
    handleok(){

    },
    handlecancel(){

    }
  }
}
</script>

<style scoped lang="less">
.myTeamCont {
  .overview {
    width: 100%;
    background: #EEF2FF;
    padding: 15px 0;
    display: flex;
    margin-bottom: 20px;
    .situation:nth-child(3){
      border: none;
    }
    .situation {
      margin-left: 15px;
      padding-right: 15px;
      border-right: 1px solid #9DA5AB;
      .sitBtn {
        margin-left: 10px;
      }
    }
  }

  .form {
    margin-right: 30px;
  }
}
</style>