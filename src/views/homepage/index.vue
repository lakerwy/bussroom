<template>
  <div>
    <div class="home" v-if="isAdmin">
      <div class="myteam">
        <span :class="!isTeam?'active':''" @click="setMyTeam(false)">我的</span>
        <span :class="isTeam?'active':''" @click="setMyTeam(true)">我的团队</span>
      </div>
      <div class="myCont">
        <section class="left">

          <Card v-show="isTeam"  class="card teamView">
            <div class="teamViewDetail">
              <TeamViewsBox class="details" v-for="(item,index) in teamViewData" :key="index" :teamViewsData="item"></TeamViewsBox>
            </div>
          </Card>

          <Card v-show="!isTeam" class="card winning">
            <div class="award">
              <ContentBox class="contBox" v-for="(item,index) in awardData"
                          :key="index" :numData="item" @viewDetail="viewDetail"></ContentBox>
            </div>
            <div class="quantity">
              <QuantityBox class="contQuan" v-for="(item,index) in quantityData" :key="index" :numData="item"></QuantityBox>
            </div>
          </Card>

          <Card class="card myApp">
            <div class="mine">我的应用</div>
            <ul>
              <li v-for="(item,index) in myAppData" :key="index">
                <img :src="item.imgUrl" alt="">
                {{ item.text }}
              </li>
            </ul>
          </Card>
          <Card class="card platform">
            <h3>管理平台</h3>
            <div class="management">
              <PlatformBox :platTitle="'成员管理'"  :platTableTitle="platTableTitle" :platAllNumber="5" :tableData="platTableData">
              </PlatformBox>
              <PlatformBox :platTitle="'待审核'"  :platTableTitle="platTableTitle2" :platAllNumber="6" :tableData="platTableData2">
              </PlatformBox>
<!--              <AuditBox :platTitle="'待审核'" >-->
<!--              </AuditBox>-->
            </div>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card activity" :class="!isTeam?'activity':'teamActive'">
            <h3 class="h3-title">活动专区</h3>
            <ActiveBox class="activeBox" :title="'优惠活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
            <ActiveBox class="online" :title="'线上活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
            <ActiveBox class="offline " :title="'线下活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
          </Card>
        </section>
      </div>
    </div>
<!--   非管理员页面   -->
    <div class="home" v-if="!isAdmin">
      <div class="myteam">
        <span class="active">我的</span>
      </div>
      <div class="myCont">
        <section class="left">
          <Card class="card stratorList">
            <div class="stratTitle">
              浏览今日余量<span class="ml-1">  45</span>条
              导出本月余量<span class="ml-1">45</span>条
              短信余量<span class="ml-1"> 45</span>条
              <Button type="primary" class="floatBtn">增量购买</Button>
            </div>
            <BrowselistBox
                class="browse"
                v-for="(item,index) in browseListData"
                :key="index"
                :title="item.title"
                :titleDate="item.titleDate"
                :titleNum="item.titleNum"
                :list="item.list"
            >
            </BrowselistBox>
          </Card>
          <Card class="card myApp">
            <div class="mine">新产品体验</div>
            <ul>
              <li v-for="(item,index) in myAppData" :key="index">
                <img :src="item.imgUrl" alt="">
                {{ item.text }}
              </li>
            </ul>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card average">
            <h3 class="h3-title">活动专区</h3>
            <ActiveBox class="activeBox" :title="'优惠活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
            <ActiveBox class="online" :title="'线上活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
            <ActiveBox class="offline" :title="'线下活动'">
              <div class="forward">
                暂 无 活 动 <br>
                敬 请 期 待
              </div>
            </ActiveBox>
          </Card>
<!--          <Card class="card myApply">-->
<!--            <h3>我的申请</h3>-->
<!--            <ul>-->
<!--              <li>序号</li>-->
<!--              <li>申请内容</li>-->
<!--              <li>申请状态</li>-->
<!--              <li>申请日期</li>-->
<!--            </ul>-->
<!--          </Card>-->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentBox, QuantityBox, BrowselistBox, TeamViewsBox } from "../../components/contentBox/index.js"
import PlatformBox from "./components/platformBox"
import AuditBox from "./components/auditBox"
import UserInfo from "./components/userInfo"
import ActiveBox from "./components/activeBox"
import {getAccountUsage, getApplyList, getProjectData, getProjectStatus, getTeamProjectData} from "@/api/homepage";
import {getMyCollect, getMyExport, getMyShare, getMySub, getMyVisit} from "../../api/homepage";

export default {
  components: {
    ContentBox,
    QuantityBox,
    BrowselistBox,
    PlatformBox,
    AuditBox,
    UserInfo,
    ActiveBox,
    TeamViewsBox
  },
  data(){
    return{
      isAdmin: true,
      isTeam: false,
      awardBgColor: ['#EDF2FF','#FFE6E6','#EAFFF5'],
      awardData: [
        {
          id: 1,
          title: "中标情况（近一月）",
          numTitle: "数量",
          priceTitle: "金额(万)",
          num: 0,
          price: 0,
          rateTitle: "月同比",
          rate: 0,
          priceRate: 0,
        },
        {
          id: 2,
          title: "订阅情况（近一周）",
          numTitle: "已发量",
          priceTitle: "未读量",
          num: 0,
          price: 0,
          rateTitle: "周同比",
          rate: 0,
          priceRate: 0,
        },
        {
          id: 3,
          title: "重点项目情况（近一月）",
          numTitle: "新增量",
          priceTitle: "未读量",
          num: 0,
          price: 0,
          rateTitle: "月同比",
          rate: 0,
          priceRate: 0,
        }
      ],
      quantityData: [
        {
          id: 1,
          title: "浏览量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 645,
          price: 75,
          rateTitle: "今日浏览量余额",
          rate: "26"
        },
        {
          id: 1,
          title: "导出量",
          numTitle: "近一月",
          priceTitle: "今日",
          num: 645,
          price: 75,
          rateTitle: "今日浏览量余额",
          rate: "26"
        },
        {
          id: 1,
          title: "收藏量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 645,
          price: 75,
        },
        {
          id: 1,
          title: "分享量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 645,
          price: 75,
        },
      ],
      myAppData: [
        {id: 1, imgUrl: "img/app_1.png", text: "数据超市", path: ""},
        {id: 2, imgUrl: "img/app_2.png", text: "数据结构化", path: ""},
        {id: 3, imgUrl: "img/app_3.png", text: "定制行为报告", path: ""},
        {id: 4, imgUrl: "img/app_4.png", text: "AAA信用评级", path: ""},
        {id: 5, imgUrl: "img/app_5.png", text: "配载增量包", path: ""},
      ],
      browseListData: [
        {id: 1, title: '我的浏览', titleDate: '（近一周', titleNum: 236, list: []},
        {id: 2, title: '我的收藏', titleDate: '（近一周', titleNum: 85, list: []},
        {id: 3, title: '我的订阅', titleDate: '（近一周', titleNum: 236, list: []},
        {id: 4, title: '我的分享', titleDate: '（近一周', titleNum: 236, list: []},
        {id: 5, title: '我的导出', titleDate: '（近一周', titleNum: 236, list: []},
        {id: 6, title: '我的重点项目', titleDate: '（本月', titleNum: 12, list: []},
      ],
      teamViewData: [
        { id: 1, title: '浏览量', nearWeek: '近一周',nearWeekNum: 645, today: '今日', todayNum: 75, allowance: '今日浏览量余额', allowanceNum: 26, showMoreBuy: true,},
        { id: 2, title: '导出量', nearWeek: '近一月',nearWeekNum: 645, today: '今日', todayNum: 75, allowance: '本月导出量余额', allowanceNum: 26, showMoreBuy: true,},
        { id: 3, title: '订阅量', nearWeek: '近一周已发送',nearWeekNum: 645, today: '近一周已读量', todayNum: 75, allowance: '订阅短信余额', allowanceNum: 26, showMoreBuy: true,},
        { id: 4, title: '收藏量', nearWeek: '近一周',nearWeekNum: 645, today: '今日', todayNum: 75, allowance: '周同比', allowanceNum: 12, showMoreBuy: false,},
        { id: 5, title: '重点项目', nearWeek: '近一月',nearWeekNum: 645, today: '今日', todayNum: 75, allowance: '月同比', allowanceNum: 15, showMoreBuy: false,},
      ],
      platTableTitle: [
        { title: '账号', field: 'name', width: "13%" },
        { title: '浏览量', field: 'visitNum', width: "13%" },
        { title: '余量', field: 'visitRemianNum', width: "13%" },
        { title: '导出量', field: 'exportNum', width: "13%" },
        { title: '余量', field: 'exportRemianNum', width: "13%" },
        { title: '短信发送量', field: 'smsNum', width: "22%" },
        { title: '余量', field: 'smsRemianNum', width: "13%" },
      ],
      platTableData: [],
      platTableTitle2: [
        { title: '序号', field: 'name', width: "15%" },
        { title: '申请人', field: 'views', width: "20%" },
        { title: '申请时间', field: 'viewsAllowance', width: "20%" },
        { title: '申请项目', field: 'export', width: "20%" },
        { title: '操作', field: 'edit', width: "25%" },
      ],
      platTableData2: [
        {id: 1, name: '王石', views: 72, viewsAllowance: 2, export: 6, exportAllowance: 20, push: 50, pushAllowance: 860},
        {id: 2, name: '王石1', views: 72, viewsAllowance: 2, export: 5, exportAllowance: 20, push: 50, pushAllowance: 860},
        {id: 3, name: '王石2', views: 72, viewsAllowance: 2, export: 6, exportAllowance: 20, push: 50, pushAllowance: 860},
        {id: 4, name: '王石3', views: 72, viewsAllowance: 2, export: 6, exportAllowance: 20, push: 50, pushAllowance: 860},
      ],
      userInfo: {
        avatar: "img/userlogo.png",
        username: '用户名',
        userType: '管理员',
        members: 'VIP会员',
        dueDate: '2023-5-19',
        customer: '周小鑫',
        contactPhone: '13255687359'
      },
      userInfoDetail: null,
    }
  },
  created() {
    this.userInfoDetail = JSON.parse(this.getStore("userInfo"));
    console.log(this.userInfoDetail);
    this.init();
  },
  methods: {
    init(){
      this.getUserInfo();
      this.getProjectStatus();
      this.getProjectData();
      this.getAccountUsage();
      this.getApplyList();
      this.getTeamProjectData();

      this.getMyVisit();
      this.getMyCollect();
      this.getMySub();
      this.getMyShare();
      this.getMyExport();
      this.getMyCollect(1);
    },
    //获取用户信息
    getUserInfo(){
      this.userInfo.username = this.userInfoDetail.nickname;
      this.userInfo.members = this.userInfoDetail.memberType;
      this.userInfo.dueDate = this.userInfoDetail.expireTime;
      this.userInfo.customer = this.userInfoDetail.contact;
      this.userInfo.contactPhone = this.userInfoDetail.contactPhone;
      this.userInfo.avatar = this.userInfoDetail.avatar;
    },
    async getProjectStatus(){
      let res = await getProjectStatus();
      const {success, result} = res;
      if(success){
        this.awardData[0].num = result.bidWinning.bidnum;
        this.awardData[0].price = result.bidWinning.amount;
        this.awardData[0].rate = result.bidWinning.bidnumMonthRatio;
        this.awardData[0].priceRate = result.bidWinning.amountMonthRatio;

        this.awardData[1].num = result.keyProject.keyProjectNum;
        this.awardData[1].price = result.keyProject.unReadNum;
        this.awardData[1].rate = result.keyProject.keyProjectRatio;
        this.awardData[1].priceRate = result.keyProject.unReadRatio;

        this.awardData[2].num = result.subStatus.sendNum;
        this.awardData[2].price = result.subStatus.unReadNum;
        this.awardData[2].rate = result.subStatus.sendRatio;
        this.awardData[2].priceRate = result.subStatus.unReadRatio;
      }
    },
    async getProjectData(){
      let res = await getProjectData();
      const {success, result} = res;
      if(success){
        this.quantityData[0].price = result.visitData.todayVisitNum;
        this.quantityData[0].num = result.visitData.weekVisitNum;
        this.quantityData[0].rate = result.visitData.remainVisitNum;

        this.quantityData[1].price = result.exportData.todayExportNum;
        this.quantityData[1].num = result.exportData.monthExportNum;
        this.quantityData[1].rate = result.exportData.remainExportNum;

        this.quantityData[2].price = result.collectData.todayCollectNum;
        this.quantityData[2].num = result.collectData.weekCollectNum;

        this.quantityData[3].price = result.shareData.todayShareNum;
        this.quantityData[3].num = result.shareData.weekShareNum;
      }
    },
    //管理平台-成员管理列表
    async getAccountUsage(){
      let res = await getAccountUsage();
      const {success, result} = res;
      if(success){
        this.platTableData = result.content;
      }
    },
    //管理平台-待审核列表
    async getApplyList(){
      let params = {
        memberId: this.userInfoDetail.companyId,
      }
      let res = await getApplyList(params);
      const {success, result} = res;
      if(success){

      }
    },
    //获取团队项目数据统计
    async getTeamProjectData(){
      let res = await getTeamProjectData();
      const {success, result} = res;
      if(success){
        this.teamViewData[0].todayNum = result.visitData.todayVisitNum;
        this.teamViewData[0].nearWeekNum = result.visitData.weekVisitNum;
        this.teamViewData[0].allowanceNum = result.visitData.remainVisitNum;

        this.teamViewData[1].todayNum = result.exportData.todayExportNum;
        this.teamViewData[1].nearWeekNum = result.exportData.monthExportNum;
        this.teamViewData[1].allowanceNum = result.exportData.remainExportNum;

        this.teamViewData[2].todayNum = result.subData.readNum;
        this.teamViewData[2].nearWeekNum = result.subData.smsTotalRemain;
        this.teamViewData[2].allowanceNum = result.subData.sendNum;

        this.teamViewData[3].todayNum = result.collectData.todayCollectNum;
        this.teamViewData[3].nearWeekNum = result.collectData.collecRatio;
        this.teamViewData[3].allowanceNum = result.collectData.weekCollectNum;

        this.teamViewData[4].todayNum = result.keyProjectData.todayKeyProjectNum;
        this.teamViewData[4].nearWeekNum = result.keyProjectData.KeyProjectRatio;
        this.teamViewData[4].allowanceNum = result.keyProjectData.monthKeyProjectNum;
      }
    },
    /*非管理员部分接口*/
    //获取我的浏览
    async getMyVisit(){
      let params = {
        createBy: this.userInfoDetail.id,
      }
      let res = await getMyVisit(params);
      const {success, result} = res;
      if(success){
        this.browseListData[0].titleNum = result.totalElements;
        this.browseListData[0].list = result.content;
      }
    },
    //获取我的收藏0一般 1重要
    async getMyCollect(flag = 0){
      let params = {
        createBy: this.userInfoDetail.id,
        signFlag: flag,
      }
      let res = await getMyCollect(params);
      const {success, result} = res;
      if(success){
        if(!flag){
          this.browseListData[1].titleNum = result.totalElements;
          this.browseListData[1].list = result.content;
        } else {
          this.browseListData[5].titleNum = result.totalElements;
          this.browseListData[5].list = result.content;
        }
      }
    },
    //获取我的订阅
    async getMySub(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
      }
      let res = await getMySub(params);
      const {success, result} = res;
      if(success){
        this.browseListData[2].titleNum = result.totalElements;
        this.browseListData[2].list = result.content;
      }
    },
    //获取我的分享
    async getMyShare(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
      }
      let res = await getMyShare(params);
      const {success, result} = res;
      if(success){
        this.browseListData[3].titleNum = result.totalElements;
        this.browseListData[3].list = result.content;
      }
    },
    //获取我的导出
    async getMyExport(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
      }
      let res = await getMyExport(params);
      const {success, result} = res;
      if(success){
        this.browseListData[4].titleNum = result.totalElements;
        this.browseListData[4].list = result.content;
      }
    },


    //查看更多按鈕
    viewDetail(){

    },
    //切换我的和我的团队
    setMyTeam(e){
      this.isTeam = e;
    }
  }
}
</script>

<style scoped lang="less">
@vw: 19.2vw;
@vh: 10.8vh;
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home {
  width: 100%;
  .card {
    height: 100%;
    margin-bottom: 20px;
    box-shadow: 5px 5px 3px #88888873;
    border: none;
    /deep/ .ivu-card-body {
      padding: 16px 16 / @vw;
    }
  }
  .card:hover {
    box-shadow: 5px 5px 3px #88888873;
  }
  .myteam {
    span{
      font-size: 16px;
      font-family: "Microsoft YaHei-Regular";
      width: 105px;
      text-align: center;
      display: inline-block;
      padding: 5px 15px;
      background: #F1F1F1;
      color: #999999;
      //margin-right: 10px;
      border-radius: 2px;
      border-bottom-left-radius: 0 0;
      border-bottom-right-radius: 0 0;
      cursor: pointer;
    }
    .active {
      border-top: 2px solid #83A1F8;
      background: white;
      color: #2F77FF;
    }
  }
  .myCont {
    display: flex;
  }
  .left {
    width: 79%;
    min-width: 780px;
    .winning {
      height: 420px;
      border-top-left-radius: 0 0;
      .award {
        margin-top: 5px;
        display: flex;
        justify-content: center;
        .contBox {
          width: 33%;
          height: 176px;
        }
        .contBox:nth-child(2){
          margin: 0 20px;
        }
      }
      .quantity {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .contQuan {
          width: 25%;
          height: 178px;
        }
        .contQuan:nth-child(2){
          margin: 0 25 / @vw;
        }
        .contQuan:nth-child(3){
          margin-right: 25 / @vw;
        }
      }
    }
    .myApp {
      height: 204px;
      width: 100%;
      /deep/ .ivu-card-body {
        padding: 20px;
      }
      .mine{
        width: 146px;
        font-size: 20px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      ul {
        display: flex;
        li {
          width: 20%;
          height: 136px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          img {
            display: inline-block;
            width: 63px;
            height: 59px;
            cursor: pointer;
            margin-bottom: 10px;
          }
        }
      }

    }
    .platform {
      height: 415px;
      //padding-left: 15px;
      h3 {
        font-size: 20px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .management {
        margin-top: 20px;
        display: flex;
        .contentBox {
          width: 50%;
          height: 325px;
        }
        .contentBox:nth-child(1){
          margin-right: 20px;
        }
      }
    }

    //非管理员部分
    .stratorList {
      border-top-left-radius: 0 0;
      height: 948px;
      .stratTitle {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        height: 32px;
        line-height: 32px;
        width: 100%;
        text-align: left;
        padding-left: 16px;
        .floatBtn {
          float: right;
          margin-right: 15px;
        }
        .ml-1 {
          color: #3F6EF5;
          display: inline-block;
          //margin: 0 10px;
          margin-left: 5px;
        }

      }
      .browse {
        width: 47%;
        height: 278px;
        margin: 10px 0;
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
      }
      .browse:nth-child(odd){
        margin-left: 40 / @vw;
      }
    }

    //我的团队部分
    .teamView {
      height: 363px;
      .teamViewDetail{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .details {
          height: 318px;
          width: 20%;
          margin: 0 10 / @vw;
        }
        .details:first-child{
          margin-left: 0;
        }
        .details:last-child {
          margin-right: 0;
        }
      }
    }

  }

  .right {
    margin: 0 0 20px 20px;
    width: 19%;
    min-width: 250px;
    .userInfo {
      width: 100%;
      //width: 312px;
      height: 420px;
    }
    .activity(@pHeight: 638px, @sHeight: 185px){
      width: 100%;
      //width: 312px;
      height: @pHeight;
      .activeBox {
        margin-top: 10px;
        width: 100%;
        height: @sHeight;
      }
      .online {
        width: 100%;
        height: @sHeight;
      }
      .offline {
        width: 100%;
        height: @sHeight;
      }
      .forward {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .activity {
      .activity()
    }
    .teamActive {
      .activity(582px, 160px)
    }
    .average {
      .activity(732px, 227px)
    }

    .myApply {
      height: 136px;
      h3 {
        border-bottom: 1px solid;
        margin-bottom: 10px;
      }
      ul {
        display: flex;
        text-align: center;
        li {
          width: 27%;
        }
        li:nth-child(1){
          width: 15%;
        }
      }
    }
  }

}

</style>