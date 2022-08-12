<template>
  <div class="editsub">
    <Card class="card">
      <div class="header">
        <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
          <TabPane label="招标与采购" name="1"></TabPane>
          <TabPane label="拟在建项目" name="2"></TabPane>
        </Tabs>
      </div>
      <h3>订阅信息列表</h3>
      <div class="btns">
        <Button class="" type="primary">新增订阅器<span>（还可新增4个）</span></Button>
        <Button class="right_btn"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />批量分享</Button>
        <Button class="right_btn"><Icon style="font-size: 18px;margin-right: 5px" type="ios-trash-outline" />批量删除</Button>
      </div>
      <Table class="my-table" :columns="columns" :data="tableData" @on-selection-change="handleSelectChange">
      </Table>
    </Card>

    <editComModal v-if="editModal" ref="editModal" @handleClose="handleClose" :flag="procurement"></editComModal>
  </div>
</template>

<script>
import editComModal from "./components/editComModal";
import {setColumn} from "./js/columns";

export default {
  name: "editSub",
  components: {
    editComModal
  },
  data(){
    return{
      editModal: false,
      selection: [],
      columns: setColumn(this),
      tableData: [
        {name: 11, opne: true},
        {name: 11, opne: false},
        {name: 11, opne: true},
        {name: 11, opne: true},
        {name: 11, opne: true},
        {name: 11, opne: true},
        {name: 11, opne: true},
        {name: 11, opne: true},
      ],
    }
  },
  methods: {
    editSub(params){
      this.editModal = true;
    },
    handleClose(){
      this.editModal = false;
    },
    //勾选
    handleSelectChange(selection) {
      this.selection = selection;
    },
    changeRrocurement(e){
      this.procurement = e;
    },
    renderSwitch(key){
      return(
        <div class={key?'hasopen':'notopen'}>
          <span class="point"></span>{key?'已开启':'未开启'}
        </div>
      )
    },
  }
}
</script>

<style scoped lang="less">
.editsub {
  .btns {
    margin-top: 15px;
    .right_btn{
      float: right;
      margin-left: 10px;
    }
  }
}

/deep/ .operaBtn {
  span {
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #3F6EF5;
  }
}
/deep/ .hasopen {
  .HasOpen()
}
/deep/ .notopen {
  .HasOpen(#999999)
}
.HasOpen(@pColor: #1CBD75) {
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: @pColor;
  .point{
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    width: 8px;
    height: 8px;
    background: @pColor;
    border-radius: 4px;
  }
}
</style>