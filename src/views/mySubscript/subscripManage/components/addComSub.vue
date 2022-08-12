<template>
  <div class="comSub">
    <Card class="card left">
      <Form ref="formInline" :rules="ruleValidate" :model="form" :label-width="120" label-position="left">
        <FormItem label="订阅器名称：" prop="name">
          <Input v-model="form.name" placeholder="请输入订阅器名称（仅用于区别不同订阅规则，不作为订阅词）"></Input>
          <Button class="right_btn" type="primary">新增订阅器<span>（还可新增9个）</span></Button>
        </FormItem>
        <div class="line"></div>
        <FormItem label="订阅词：" prop="name">
          <div class="addInput">
            <Input v-model="form.name" placeholder="请输入订阅词"></Input><Icon class="IconMd" type="md-add" />
            <PromptBox class="prompt">
              <Icon class="icon" type="ios-information-circle" />
              <p>
                订阅词的合理设定是获取价值公告的关键！用“+”添加订阅词，多个关键词按照订阅逻辑筛选公告。还可添加 <span class="red">7</span>/10个订阅词
              </p>
            </PromptBox>
          </div>
          <div v-for="item in 3" :key="item.id" class="addInput">
            <span class="txtYu">与</span><Input v-model="form.name" placeholder="请输入订阅词"></Input><Icon class="IconMd" type="md-remove" />
          </div>
        </FormItem>
        <FormItem label="订阅逻辑：" prop="name">
          <div class="logic">
            <RadioGroup v-model="form.radio">
              <Radio class="logicRadio" label="1">包含全部订阅词（与关系）</Radio>
              <Radio label="2">包含任何一个订阅词（或关系）</Radio>
            </RadioGroup>
            <PromptBox class="logicPrompt">
              <h4>示例</h4>
              <ul>
                <li>
                  <span class="cir">1</span>
                  <span class="logicTitle">订阅逻辑：</span>包含全部订阅词（与关系）
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>酒店 <span style="color: #999999">与</span> 绿化 <span style="color: #2b85e4">与</span> 租摆
                </li>
                <li>
                  <span class="logicTitle">订阅公告：</span>宁波市北仑区公共资源交易中心关于丽都<span style="color: #2b85e4">酒店</span>物业部<span style="color: #2b85e4">绿化租摆</span>的公开招标公告
                </li>
                <li>
                  <span class="cir">2</span>
                  <span class="logicTitle">订阅逻辑：</span>包含任何一个订阅词（或关系）
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>酒店 <span style="color: #2b85e4">或</span> 绿化 <span style="color: #2b85e4">或</span> 租摆
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>欢乐海岸<span style="color: #2b85e4">绿化</span>管养服务采购招标公告
                </li>
              </ul>
            </PromptBox>
          </div>
        </FormItem>
        <FormItem label="排除词：">
          <div class="addInput">
            <Input v-model="form.name" placeholder="请输入排除词" ></Input>
          </div>
          <div v-for="item in 2" :key="item.id" class="addInput">
            <span class="txtYu">与</span><Input v-model="form.name" placeholder="请输入排除词"></Input>
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
              style="width: 412px"
              v-model="form.city"
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
        <FormItem>
          <Button type="primary">保存订阅器</Button>
          <Button style="margin-left: 20px">返回</Button>
        </FormItem>
      </Form>
    </Card>
    <Card class="card right">
      <div class="rightHeader">
        <h3>订阅规则</h3>
        <div class="ruleTitle">
          <div>
            <span class="point"></span>全文<span style="color: red">包含</span>
            <div class="subWord"><span class="txthuo"></span> 订阅词1：<span class="blue">酒店</span></div>
            <div class="subWord" v-for="item in 3" :key="item.id">
              <span class="txthuo">或</span>
              订阅词1：<span class="blue">酒店</span>
            </div>
          </div>
          <div style="margin-top: 10px">
            <span class="point"></span>全文<span style="color: red">不包含</span>
            <div class="subWord"><span class="txthuo"></span> 订阅词1：<span class="blue">酒店</span></div>
            <div class="subWord" v-for="item in 1" :key="item.id">
              <span class="txthuo">或</span>
              订阅词1：<span class="blue">酒店</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rightCont">
        <h3>智能预览</h3>
        <div class="my-explain"><Icon class="icon" type="ios-information-circle-outline" />近一周可获取 130条中标信息</div>
        <ul class="preview">
          <li v-for="item in previewList" :key="item.id">
            <h4 v-html="item.title"></h4>
            <p>一、采购人名称：{{ item.txt1 }} </p>
            <p>二、采购项目名称：{{item.txt2}}</p>
          </li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<script>
import {columnType, contentRange, informationType, projectPhase, regionData} from "@/utils/const/attention";
import { PromptBox } from "@/components/contentBox/index.js"

export default {
  components: {
    PromptBox
  },
  name: "addComSub",
  props: {
    flag: String,
  },
  computed: {

  },
  created() {
    let arr = ["酒店", "湘南", "主机"];
    let reg = "/("+arr.join('|')+")/g";
    this.previewList.forEach((item,i)=>{
      this.previewList[i].title = item.title.replace(eval(reg),"<span style='color: #2e8bf0'>$&</span>");
    })
  },
  data(){
    return{
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
      previewList: [
        {id: 1, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        {id: 2, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        {id: 3, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        {id: 4, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"}
      ]
    }
  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.comSub {
  margin-top: 20px;
  display: flex;
  .left {
    margin-right: 20px;
    width: 80%;
    .right_btn{
      position: absolute;
      right: 0;
    }
    .line {
      width: 100%;
      height: 1px;
      border-bottom: 1px dotted #999999;
      margin-bottom: 15px;
    }
    .addInput {
      position: relative;
      margin-bottom: 15px;
      .prompt {
        width: 281px;
        height: 88px;
        position: absolute;
        left: calc(40% + 40px);
        top: -3px;
        padding-left: 30px;
        .icon {
          position: absolute;
          left: 10px;
          top: 10px;
        }
        p {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          .red {
            color: red;
          }
        }
      }
      .IconMd {
        font-size: 20px;
        margin-left: 30px;
        cursor: pointer;
      }
      .txtYu {
        position: absolute;
        left: -30px;
        top: 0;
      }
    }
    .switch {
      display: inline-block;
      margin-right: 20px;
    }
    .logic {
      position: relative;
      .ivu-radio-group {
        width: 40%;
      }
      .logicRadio {
        margin-right: 20px
      }
      .logicPrompt {
        width: 50%;
        min-width: 350px;
        //height: 202px;
        position: absolute;
        left: calc(40% + 4px);
        top: 0px;
        li {
          padding-left: 30px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 25px;
          .logicTitle {
            display: inline-block;
            color: #999999;
            width: 65px;
          }
        }
        .cir{
          margin-left: -25px;
          margin-right: 10px;
          line-height: 14px;
          text-align: center;
          vertical-align: middle;
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #CCCCCC;
          color: rgba(255, 255, 255, 1);
          font-size: 10px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          border-radius: 7px;
        }
      }
    }
    .industry {
      display: inline-block;
      margin-right: 20px;
    }
  }
  .right {
    width: 20%;
    /deep/ .ivu-card-body {
      padding: 0;
    }
    h3{
      font-size: 20px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    .rightHeader {
      padding: 16px;
      border-bottom: 1px solid #D0D0D0;
      .point {
        vertical-align: middle;
        display: inline-block;
        width: 6px;
        height: 6px;
        background: rgba(63, 110, 245, 1);
        border-radius: 3px;
        margin-left: -7px;
        margin-right: 10px;
      }
      .ruleTitle {
        font-size: 14px;
        font-weight: 400;
        font-family: Microsoft YaHei-Regular;
        padding: 15px 0 0 10px;

        .subWord:nth-of-type(1){
          margin-top: 5px;
        }
        .subWord {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          margin-left: 10px;
          line-height: 25px;
        }
        .txthuo {
          vertical-align: middle;
          display: inline-block;
          width: 25px;
        }
        .blue {
          color: rgba(63, 110, 245, 1);
        }
      }
    }
    .rightCont {
      padding: 16px;
      .my-explain {
        margin: 15px 0 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .preview {
        li {
          border-bottom: 1px dashed #999999;
          margin-bottom: 15px;
          padding-bottom: 15px;
          h4{
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>