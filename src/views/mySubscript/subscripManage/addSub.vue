<template>
  <div class="manage">
    <div class="header">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
    </div>
    <div class="content" v-if="procurement==1">
      <addComSub flag="1"></addComSub>
    </div>
    <div v-if="procurement==2">
      <addComSub flag="2"></addComSub>
    </div>
  </div>
</template>
<script>
import { PromptBox } from "@/components/contentBox/index.js"
import {columnType, contentRange} from "@/utils/const/attention";
import addComSub from "./components/addComSub";

export default {
  name: "addSub",
  components: {
    PromptBox,
    addComSub
  },
  data(){
    return{
      procurement: '1',

    }
  },
  created() {
  },
  methods: {
    changeRrocurement(e){
      this.procurement = e;
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
.manage{
  .header{
    padding: 10px 20px 0 20px;
    background: white;
    /deep/ .ivu-tabs-bar{
      margin-bottom: 0;
    }
  }
}
/deep/ .ivu-form{
  .ivu-form-item-label {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #999999;
  }
  .ivu-input-wrapper{
    width: 36%;
  }
  .ivu-select {
    width: 200px;
  }
}

</style>