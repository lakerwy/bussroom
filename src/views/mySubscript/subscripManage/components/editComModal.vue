<template>
  <div class="modal">
    <Modal
        v-model="modal1"
        title="订阅信息修改"
        :ok-text="'保存'"
        width="970"
        @on-cancel="cancel"
        @on-ok="handleOk"
    >
      <Form class="form" ref="formInline" :rules="ruleValidate" :model="form" :label-width="120" label-position="left">
        <FormItem label="订阅器名称：" prop="name">
          <Input v-model="form.name" placeholder="请输入订阅器名称（仅用于区别不同订阅规则，不作为订阅词）"></Input>
        </FormItem>
        <FormItem label="订阅词：" prop="name">
          <div>
            <div class="tag" v-for="item in 3" :key="item.id" >
              <Tag style="" closable>标签一</Tag>
            </div>
            <div class="tag"><Tag closable>养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护养护</Tag></div>
            <div class="dashedBox">
              <Button class="dashedBtn" type="dashed">添加关键词</Button>
              <span class="dashedTxt">（还可添加<span style="color: #333333">6</span>/10个关键词）</span>
            </div>
            <div class="peer">
              同行订阅的关键词:
              <span class="peerTxt"> 绿化</span>
              <span class="peerTxt">园林</span>
              <span class="peerTxt">花卉</span>
              <span class="peerTxt">苗木</span>
              <div class="rightBtn"><Icon style="font-size: 18px" type="md-sync" /> 换一批</div>
            </div>
          </div>
        </FormItem>
        <FormItem label="订阅逻辑：" prop="name">
          <div class="logic">
            <RadioGroup v-model="form.radio">
              <Radio style="margin-right: 30px" label="1">包含全部订阅词（与关系）</Radio>
              <Radio label="2">包含任何一个订阅词（或关系）</Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <FormItem label="排除词：">
          <div class="tag" v-for="item in 3" :key="item.id" >
            <Tag style="" closable>标签一</Tag>
          </div>
          <div class="dashedBox">
            <Button class="dashedBtn" type="dashed">添加关键词</Button>
            <span class="dashedTxt">（还可添加<span style="color: #333333">6</span>/10个关键词）</span>
          </div>
        </FormItem>
        <div v-if="flag == 1">
          <FormItem label="栏目类型：">
            <RadioGroup v-model="form.type">
              <template v-for="(item,index) in columnType">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="内容范围：">
            <RadioGroup v-model="form.type">
              <template v-for="(item,index) in contentRange">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
        </div>
        <div v-if="flag == 2">
          <FormItem label="信息类型：">
            <RadioGroup v-model="form.type">
              <template v-for="(item,index) in informationType">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="内容范围：">
            <RadioGroup v-model="form.type">
              <template v-for="(item,index) in contentRange">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="项目阶段：">
            <RadioGroup v-model="form.type">
              <template v-for="(item,index) in projectPhase">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="行业范围：">
            <div class="industry">
              一级行业
              <Select v-model="form.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </div>
            <div class="industry">
              二级行业
              <Select v-model="form.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </div>
          </FormItem>
        </div>
        <FormItem label="地区：">
<!--          <Input v-model="form.name" placeholder="" ></Input>-->
          <treeselect
              style="width: 400px"
              v-model="value"
              :multiple="true"
              :options="options"
              :default-expand-level="2"
              :isDefaultExpanded="true"
          />
        </FormItem>
        <FormItem label="订阅发送：">
          <div class="switch">
            <span>邮件订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.switch1" />
          </div>
          <div class="switch">
            <span>微信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.switch2" />
          </div>
          <div class="switch">
            <span>短信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.switch3" />
          </div>
          <div class="switch">
            <span>APP订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.switch4" />
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {columnType, contentRange, informationType, projectPhase, regionData} from "@/utils/const/attention";

export default {
  props: {
    flag: {
      type: String,
      default: "1"
    }
  },
  name: "editComModal",
  data(){
    return{
      value: null,
      modal1: false,
      form: {
        switch1: false
      },
      ruleValidate: {
        name: [
          { required: true, message: 'empty', trigger: 'blur' }
        ]
      },
      columnType: columnType,
      contentRange: contentRange,
      informationType: informationType,
      projectPhase: projectPhase,
      options: regionData,
    }
  },
  created() {
    this.modal1 = true;
  },
  methods: {
    cancel(){
      this.$emit("handleClose", false);
    },
    handleOk(){
      this.$emit("handleClose", false);
    }
  }
}
</script>

<style scoped lang="less">
.modal {

}
/deep/ .ivu-form{
  .ivu-form-item-label {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #999999;
  }
  .ivu-input-wrapper{
    width: 400px;
  }
  .ivu-select {
    width: 200px;
  }

  .ivu-tag-default {
    background-color: #ECF1FE;
  }

  .tag {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-right: 15px;
  }

  .dashedBox {
    display: inline-block;
    .dashedBtn {
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #3F6EF5;
      border-color: #3F6EF5;
    }
    .dashedTxt {
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
  }
  .peer {
    padding: 0 16px;
    font-size: 13px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    line-height: 50px;
    color: #333333;
    margin-top: 15px;
    height: 50px;
    background: #F6F6F6;
    border-radius: 2px 2px 2px 2px;
    .peerTxt {
      display: inline-block;
      color: #666666;
      margin-right: 20px;
      cursor: pointer;
    }
    .rightBtn {
      float: right;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #3F6EF5;
      cursor: pointer;
    }
  }

  .switch {
    display: inline-block;
    margin-right: 20px;
  }

  .industry {
    display: inline-block;
    margin-right: 20px;
  }
}
</style>