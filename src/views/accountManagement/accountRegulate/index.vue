<template>
  <div class="account">
    <div class="myteam">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">{{ isAdmin?"我的":"信息管理" }}</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">{{ isAdmin?"我的团队":"配额申请" }}</span>
    </div>
    <Card v-if="isTeam==0" class="card accountCont">
      <h3>基础信息</h3>
      <Form class="form" ref="formInline" :rules="ruleValidate" :label-width="120" :model="form" inline>
        <div>
          <FormItem :label-width="0">
            <span>个人信息</span>
          </FormItem>
          <FormItem label="公司名称：" prop="name">
            <Input v-model="form.name" placeholder=""></Input>
          </FormItem>
          <FormItem label="部门：" >
            <Input v-model="form.name" placeholder=""></Input>
          </FormItem>
          <FormItem label="职务：" >
            <Input v-model="form.name" placeholder=""></Input>
          </FormItem>
          <FormItem label="姓名：" >
            <Input v-model="form.name" placeholder=""></Input>
          </FormItem>
        </div>
        <div>
          <FormItem :label-width="0">
            <span>账号信息</span>
          </FormItem>
          <FormItem label="账号等级：" prop="name">
            <Input v-model="form.name" placeholder="" disabled></Input>
          </FormItem>
          <FormItem label="角色权限：" >
            <Input v-model="form.name" placeholder="" disabled></Input>
          </FormItem>
          <FormItem label="地区权限：" >
            <Input v-model="form.name" placeholder="" disabled></Input>
          </FormItem>
          <FormItem label="到期时间：" >
            <Input v-model="form.name" placeholder="" disabled></Input>
          </FormItem>
        </div>
        <FormItem :label-width="0">
          <Button class="" type="primary">保存基础信息修改</Button>
        </FormItem>
      </Form>
      <h3>绑定信息</h3>
      <div style="margin-bottom: 20px">
        <div class="bindInfo"><span class="bindLabel">绑定手机号：</span> <span class="bindNum">12345678910</span> <span class="bindBtn">修改</span></div>
        <div class="bindInfo"><span class="bindLabel">绑定邮箱：</span> <span class="bindNum">lishan@sina.cn</span> <span class="bindBtn">修改</span></div>
        <div class="bindInfo"><span class="bindLabel">绑定微信：</span> <span class="bindNum">未绑定微信账号</span> <span class="bindBtn">立即绑定</span></div>
      </div>
      <h3>密码设定</h3>
      <div class="changePass">
        <div class="setPass">
          <Button class="">修改密码</Button>
          <Form class="form" :rules="ruleValidate" :label-width="120" label-position="right">
            <FormItem label="原密码："  prop="name">
              <Input v-model="form.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="新密码："  prop="name">
              <Input v-model="form.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="确认新密码："  prop="name">
              <Input v-model="form.name" placeholder=""></Input>
            </FormItem>
            <FormItem>
              <Button class="" type="primary" style="margin-right: 20px">保存</Button>
              <Button class="">取消</Button>
            </FormItem>
          </Form>
        </div>
        <div class="resetPass">
          <Button class="">密码重置</Button>
          <Form class="form" :rules="ruleValidate" :label-width="140" label-position="left">
            <FormItem label="验证方式："  prop="name">
              <Input v-model="form.name" placeholder="请输入手机号或绑定邮箱"></Input>
            </FormItem>
            <FormItem label="验证码："  prop="name">
              <Input v-model="form.name" search enter-button="获取验证码" placeholder="" />
            </FormItem>
            <FormItem label="输入新密码："  prop="name">
              <Input v-model="form.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="再次输入新密码："  prop="name">
              <Input v-model="form.name" placeholder=""></Input>
            </FormItem>
            <FormItem>
              <Button class="" type="primary" style="margin-right: 20px">立即找回</Button>
              <Button class="">取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
    <Card v-if="isTeam==1" class="card accountCont">
      <accountMyTeam v-if="isAdmin"></accountMyTeam>
      <applayQuota v-else></applayQuota>
    </Card>
  </div>
</template>

<script>
import accountMyTeam from "./accountMyTeam";
import applayQuota from "./applayQuota";

export default {
  name: "index",
  components: {
    accountMyTeam,
    applayQuota
  },
  data(){
    return{
      isAdmin: true,
      isTeam: 0,
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
    setMyTeam(e){
      this.isTeam = e;
    },
  }
}
</script>

<style scoped lang="less">
.account {
  .accountCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    .form {
      margin-top: 15px;
    }
    .bindInfo {
      margin: 10px 0;
      .bindLabel {
        display: inline-block;
        width: 100px;
      }
      .bindNum {
        display: inline-block;
        width: 120px;
      }
      .bindBtn {
        color: #2b85e4;
      }
    }

    .changePass {
      margin-top: 20px;
      display: flex;
      .setPass {
        margin-right: 40px;
        width: 330px;
      }
    }

  }

}
</style>