<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{ title }}<span>{{ titleDate }}{{ titleNum }}条）</span></h3>
      <span @click="viewDetail"><Icon type="ios-arrow-dropright" /></span>
    </section>
    <section class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <i class="point"></i>
          <a :href="'https://'+item.webUrl" target="_blank" :title="item.title">{{
              item.title
            }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    title: {
      type: String,
      default: ""
    },
    titleDate: {
      type: String,
      default: ""
    },
    titleNum: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    }
  },
  data(){
    return{

    }
  },
  methods: {
    viewDetail(){

      this.$emit('viewDetail','')
    }
  }
}
</script>

<style scoped lang="less">


.contentBox {
  width: 366px;
  height: 200px;
  border: 1px solid #E4E4E4;
  .title {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    background: #F6F6F6;
    h3 {
      width: 85%;
      padding-left: 20px;
      overflow: hidden;
      font-size: 16px;
      font-family: "Microsoft YaHei-Bold, Microsoft YaHei";
      font-weight: bold;
      color: #333333;
      span {
        color: #666666;
        font-size: 15px;
        font-weight: 400;
      }
    }
    >span {
      display: block;
      width: 35%;
      text-align: right;
      padding-right: 20px;
      font-size: 20px;
    }
  }
  .content {
    margin: 0 20px;
    ul {
      margin-top: 20px;

      // 使用函数切换点颜色
      .theme(@pointColor: #CCCCCC){
        .point {
          display: inline-block;
          vertical-align: middle;
          width: 2px;
          height: 2px;
          background: @pointColor;
          border: 1px solid @pointColor;
          margin-right: 10px;
          position: relative;
        }
        .point::after {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          border: 1px solid @pointColor;
          left: -3px;
          top: -3px;
        }
      }
      li:hover {
        .theme(#3F6EF5);  //调用函数
        color: #3F6EF5;
        a {
          color: #3F6EF5;
        }
      }
      li {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        //text-indent: -5px;
        margin: 10px 0;
        list-style: none;
        //list-style: square;
        cursor: pointer;
        .theme();  //调用函数

        a {
          color: #333;
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 16px);
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
  }
}



</style>