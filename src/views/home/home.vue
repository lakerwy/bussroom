<style lang="less">
  @import "./home.less";
  @import "../../styles/common.less";
</style>

<template>
  <div class="home">
    <Modal v-model="showVideo"  @on-cancel="cancelVideo" title="商务室订阅功能使用说明" :styles="{ top: '30px' }" footer-hide width="1000">
      <video ref="myVideo" webkit-playsinline="" v-if="showVideo" controls playsinline="" x-webkit-airplay="" x5-playsinline="" preload="preload"
        autoplay="autoplay" style="width: 100%; height: 100%;"
        src="/static/video.MP4"></video>
    </Modal>
    <Modal title="修改手机号" v-model="editMobileVisible" :closable="false" :mask-closable="false" :width="500">
      <Form ref="mobileEditForm" :model="mobileEditForm" :label-width="70" :rules="mobileEditValidate">

        <FormItem label="手机号" prop="mobile">
          <Input v-model="mobileEditForm.mobile" @on-change="hasChangePhone" placeholder="请输入新手机号" />
        </FormItem>
        <FormItem label="验证码" prop="code" :error="codeError">
          <Row type="flex" justify="space-between">
            <Input v-model="mobileEditForm.code" placeholder="请输入您收到的短信验证码" style="width: 280px" />
            <CountDownButton ref="countDownMobile" @on-click="sendEditMobileCode" :disabled="canSendMobileCode"
              :autoCountDown="false" :loading="sending" :text="getSms" />
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelInputCodeBox">取消</Button>
        <Button type="primary" :loading="checkCodeLoading" @click="submitEditMobile">提交</Button>
      </div>
    </Modal>
    <Modal title="欢迎进入商务室" v-model="wechatFlag" class-name="wechat" :mask-closable="false" style="text-align: center"
      @on-cancel="closeWechat">
      <p>这里是专属于您自己的商务空间，更多移动端服务关注公众号。</p>
      <img :src="wechatSrc" style="display: block; margin: 0 auto" alt="扫描绑定微信" />
      <div slot="footer">
        <Button type="primary" @click="closeWechat">关闭</Button>
      </div>
    </Modal>

    <div class="home_manager">
      <Card>
        <Row class="topbar" type="flex" align="middle" :gutter="10" style="padding: 10px">
          <Col span="8">
          <div class="item">
            <div class="head bold">
              <Avatar :src="head" size="70" />
            </div>
            <div class="intro">
              <p class="bold">
                您好！<span style="width: 10px; display: inline-block"></span>{{ userInfo.nickname }}
              </p>
              <Poptip trigger="hover" :content="userInfo.companyName" placement="bottom" :disabled="companyNamePop">
                <p class="second">
                  <span class="subtitle">所在企业：</span>{{ userInfo.companyName }}
                </p>
              </Poptip>
            </div>
          </div>
          </Col>
          <Col span="8">
          <!-- <img style="vertical-align: middle; margin-left:2em;" src="@/assets/vip1.png" alt="">  -->
          <div class="item">
            <div class="head">
              <img src="@/assets/vip-icon.png" style="margin-top: 5px" alt="" />
            </div>
            <div class="intro">
              <p style="margin-top: 8px">
                <span class="subtitle">会员级别：</span>{{ userInfo.memberType }}
              </p>
              <p class="second">
                <span class="subtitle">会员到期时间：</span>{{ userInfo.expireTime }}
              </p>
            </div>
          </div>
          </Col>
          <Col span="8">
          <div class="item">
            <div class="head">
              <img src="@/assets/service-icon.png" alt="" />
            </div>
            <div class="intro">
              <p style="margin-top: 8px">
                <span class="subtitle">专属客服：</span>{{ userInfo.contact }}
              </p>
              <Poptip trigger="hover" :content="userInfo.contactPhone" placement="bottom" :disabled="contactPhonePop">
                <p class="second">
                  <span class="subtitle">客服电话：</span>{{ userInfo.contactPhone }}
                </p>
              </Poptip>
            </div>
          </div>
          </Col>
        </Row>
      </Card>
      <Row :gutter="16" class="_row">
        <Col span="8">
        <Card :bordered="false">
          <div class="_clear" slot="title">
            <!-- <Icon type="ios-add-circle"  /> -->
            <span class="title">我的订阅</span><a style="color:#2d8cf0;font-size:18px;margin-left:5px;"
              @click="showVideo=true;">帮助<Icon type="social-youtube-outline"></Icon></a>
            <Button class="_right" @click="enterTo('subscribe-overview')" size="small" icon="ios-send">立即前往</Button>
          </div>
          <div class="card_body sub loading" v-if="loading">
            <Spin class="img">
              <Icon type="ios-loading" class="demo-spin-icon-load"/>
              <div>正在拼命加载中...</div>
            </Spin>
          </div>
          <div class="card_body sub" v-if="!loading">
            <p v-for="(item, i) in subList" :key="i">
              <a :href="item.url" target="_blank" :title="item.title">{{
                  item.title
                }}</a>
            </p>
            <div v-show="subList.length === 0" style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
              <Button type="primary" @click="enterTo('tendering')" icon="ios-add">添加我的订阅</Button>
            </div>
          </div>
        </Card>
        </Col>
        <Col span="8">
        <Card :bordered="false">
          <div slot="title" class="_clear">
            <!-- <Icon type="ios-star" style="margin-right:5px;" /> -->
            <span class="title">我的收藏</span>
            <Button class="_right" @click="enterTo('collect')" size="small" icon="ios-send">立即前往</Button>
          </div>
          <div class="card_body sub">
            <p v-for="(item, i) in colList" :key="i">
              <a :href="item.url" target="_blank" :title="item.name">{{
                  item.name
                }}</a>
            </p>
            <div v-show="colList.length === 0" style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
              还未添加过收藏
            </div>
          </div>
        </Card>
        </Col>
        <Col span="8">
        <Card :bordered="false">
          <div class="_clear" slot="title">
            <!-- <Icon type="ios-people" style="margin-right:5px;" /> -->
            <span class="title">现有成员（{{ allList.length }}）</span>
            <Button class="_right" v-if="managerFlag" @click="enterTo('count', { flag: 1 })" size="small"
              icon="ios-send">立即前往</Button>
          </div>
          <div class="card_body member">
            <div class="manager" v-if="managerFlag">
              <a v-for="(item, i) in allList" @click="enterTo('count', { flag: 1 })"
                :key="i">{{ item.nickname ? item.nickname : "[ ]" }}</a>
            </div>
            <div class="normal" v-else>
              <span v-for="(item, i) in allList" :key="i">{{
                  item.nickname ? item.nickname : "[ ]"
                }}</span>
            </div>
          </div>
        </Card>
        </Col>
      </Row>
      <Row :gutter="16" class="_row row2" v-if="managerFlag">
        <Col span="16">
        <Card :bordered="false" v-if="false">
          <div class="_clear" slot="title">
            <!-- <Icon type="md-cart" style="margin-right:5px;" /> -->
            <span class="title">我的频道</span>
            <Button class="_right" @click="enterTo('special', { flag: 2 })" size="small" icon="ios-send">立即前往</Button>
            <Button class="_right" type="primary" size="small" icon="ios-add"
              @click="enterTo('special', { flag: 1 })">添加更多</Button>
          </div>
          <div class="card_body channel">
            <a :href="item.url" target="_blank" v-for="(item, index) in paid_goods" :key="index">
              <img :src="item.image" tabindex="0" />
            </a>
            <div v-show="paid_goods.length === 0" style="
                  height: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
              还未购买频道
            </div>
          </div>
        </Card>
        <visit-volume :pv="this.userInfo.pv" />
        </Col>
        <Col span="8">
        <Card :bordered="false">
          <div class="_clear" slot="title">
            <!-- <Icon type="md-person-add" style="margin-right:5px;" /> -->
            <span class="title">待审批账号（{{ watingList.length }}）</span>
            <Button class="_right" @click="enterTo('count', { flag: 2 })" size="small" icon="ios-send">立即前往</Button>
          </div>
          <div class="card_body">
            <table class="wating">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>申请人</th>
                  <th>申请时间</th>
                  <th>邀请人</th>
                  <th>邀请方式</th>
                </tr>
              </thead>
              <tbody>
                <p style="text-align: center; line-height: 260px" v-if="watingList.length === 0">
                  暂无数据
                </p>
                <tr v-for="(item, i) in watingList" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.nickname }}</td>
                  <td>
                    {{ item.createTime ? item.createTime.split(" ")[0] : "" }}
                  </td>
                  <td>{{ item.creator }}</td>
                  <td>{{ "微信邀请" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
        </Col>
      </Row>
      <!-- 定制服务 -->
      <Row :gutter="16" style="margin-top: 16px">
        <Col span="16">
        <services></services>
        </Col>
        <Col span="8">
        <Card :bordered="false" v-if=" memberType === '免费会员' || !memberType">
          <div class="_clear" slot="title">
            <span class="title" style="
                  width: 100%;
                  overflow: hidden;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                ">敬请期待</span>
          </div>
          <div style="widht: 100%; height: 170px; padding: -20px"></div>
        </Card>
        <Card :bordered="false" v-else class="couponAmount">
          <div class="_clear" slot="title">
            <span class="title" style="
                  width: 100%;
                  overflow: hidden;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                "
              :title="couponAmount > 0 ? `消费券剩余：${couponAmount}元（有效期至${couponExpire}）` : ''"><span>消费券剩余：{{couponAmount > 0 ? couponAmount : 0}}元</span><span
                style="font-weight: normal;font-size: 14px;"
                v-show="couponAmount > 0">{{`（有效期至${couponExpire}）`}}</span></span>
          </div>
          <div style="widht: 100%; height: 190px; padding: -20px;font-size:16px;overflow-y: auto;line-height:30px;">
            <p>使用说明：</p>
            <p>1、本消费券需在使用截止日期前消费使用；</p>
            <p>2、本消费券不予兑换现金；</p>
            <p>3、本消费券可以购买(AAA级信用等级证书、元博网会员、标书制作、大数据服务)产品；</p>
            <p>4、该消费券最终解释权归采购与招标网所有！</p>
          </div>
        </Card>
        </Col>
      </Row>
    </div>
    <div v-show="false" class="home_normal">
      <Card>
        <Row class="top" type="flex" align="middle" style="">
          <Col span="3" style="text-align: center">
          <Avatar :src="head" size="large" />
          </Col>
          <Col span="21">
          <h3>
            欢迎您进入商务室，这里将为您开启专属于您自己的工作空间，有助您更高效的开发和管理项目。
          </h3>
          </Col>
        </Row>
      </Card>
      <Card style="margin-top: 20px">
        <p slot="title">
          <Icon type="md-search" />
          空间正在搭建中，如果您对此还有那些建议想法，欢迎留言给我们！
        </p>
        <Form>
          <FormItem label-position="left" label="留言框" :label-width="100" style="width: 700px">
            <Input v-model="keywords" type="textarea" :rows="6" placeholder="请输入留言..." />
          </FormItem>
          <FormItem style="margin-left: 100px">
            <Button type="primary">提交</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
  import {
    ipInfo,
    findAllUserData,
    getUserListData,
    changeMobile,
    sendEditMobileSms,
    toBindWechat,
    userInfo,
    getAllGroup,
    ztbSearch,
    getCollection,
    getAllProduct,
    getChannelBycondition,
    nzjSearch,
  } from "@/api/index";
  import visitVolume from "./components/visitVolume.vue";
  import services from "./components/services";
  import visitSeparation from "./components/visitSeparation.vue";
  import infoCard from "./components/infoCard.vue";
  import show from "./show.vue";
  import Cookies from "js-cookie";
  import CountDownButton from "@/views/my-components/xboot/count-down-button";
  import {
    validateMobile
  } from "@/libs/validate";
  export default {
    components: {
      visitVolume,
      CountDownButton,
      services,
    },
    data() {
      return {
        loading: false,
        memberType: '', // 会员状态
        couponAmount: 0, //（金额）
        couponExpire: '', //（有效期）
        companyNamePop: true,
        contactPhonePop: true,
        showVideo: false,
        nzjSearchData: {
          keyword: "",
          table: ["-1"],
          area: ["-1"],
          category1: ["-1"],
          category2: ["-1"],
          stage: ["0"],
          page: 1,
          rows: 30,
          type: 0,
          range: 4,
        },
        editMobileVisible: false,
        keywords: "",
        head: localStorage.avatorImgPath,
        managerFlag: "",
        userInfo: {},
        watingList: [],
        allList: [],
        searchForm: {
          id: "",
          username: "",
          departmentId: "",
          mobile: "",
          email: "",
          sex: "",
          type: "",
          status: "",
          pageNumber: 1,
          pageSize: 1000000,
          sort: "createTime",
          order: "desc",
          startDate: "",
          endDate: "",
          department: "",
          nickname: "",
          delFlag: 0,
        },
        mobileEditForm: {
          mobile: "",
          code: "",
        },
        mobileEditValidate: {
          mobile: [{
              required: true,
              message: "请输入手机号码",
            },
            {
              validator: validateMobile,
            },
          ],
        },
        canSendMobileCode: false,
        codeError: "",
        sending: false,
        getSms: "获取验证码",
        checkCodeLoading: false,
        wechatFlag: false,
        wechatSrc: "",
        timeId: 0,
        subList: [],
        colList: [],
        proList: [],
        paid_goods: [],
      };
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        let userInfo = JSON.parse(this.getStore('userInfo'));
        this.memberType = userInfo.memberType;
        this.couponAmount = userInfo.couponAmount;
        this.couponExpire = this.format(new Date(userInfo.couponExpire), 'yyyy年MM月dd日');
      },
      cancelVideo() {
        // console.log(123);
        // this.$refs.myVideo.paused = true;
      },
      closeWechat() {
        // 取消绑定
        clearInterval(this.timeId);
        this.wechatFlag = false;
      },
      updateUserInfo() {
        // 更新用户信息
        userInfo().then((res) => {
          if (res.success) {
            let endDate = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 - 1
            );
            // 避免超过大小限制
            delete res.result.permissions;
            Cookies.set("userInfo", JSON.stringify(res.result), {
              expires: endDate,
            });
            this.setStore("userInfo", res.result);
          }
        });
      },
      submitEditMobile() {
        this.$refs["mobileEditForm"].validate((valid) => {
          if (valid) {
            if (!this.mobileEditForm.code) {
              this.codeError = "请填写短信验证码";
              return;
            } else {
              this.codeError = "";
            }
            this.checkCodeLoading = true;
            changeMobile(this.mobileEditForm).then((res) => {
              this.checkCodeLoading = false;
              if (res.success) {
                this.$Message.success("修改成功");
                this.userInfo.mobile = this.mobileEditForm.mobile;
                // this.initPhone = this.mobileEditForm.mobile;
                this.updateUserInfo();
                this.editMobileVisible = false;
              }
            });
          }
        });
      },
      cancelInputCodeBox() {
        this.editMobileVisible = false;
      },
      sendEditMobileCode() {
        this.$refs["mobileEditForm"].validate((valid) => {
          if (valid) {
            this.getSms = "发送中";
            this.sending = true;
            sendEditMobileSms(this.mobileEditForm.mobile).then((res) => {
              this.getSms = "获取验证码";
              this.sending = false;
              if (res.success) {
                this.$Message.success("发送短信验证码成功");
                // 开始倒计时
                this.$refs.countDownMobile.startCountDown();
              }
            });
          }
        });
      },
      hasChangePhone() {
        if (this.mobileEditForm.mobile == this.initPhone) {
          this.canSendMobileCode = true;
        } else {
          this.$refs["mobileEditForm"].validate((valid) => {
            if (valid) {
              this.canSendMobileCode = false;
            } else {
              this.canSendMobileCode = true;
            }
          });
        }
      },
      enterTo(a, data) {
        this.$router.push({
          name: a,
          params: data,
        });
      },
      updateUserInfo() {
        // 更新用户信息
        userInfo().then((res) => {
          if (res.success) {
            let endDate = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 - 1
            );
            // 避免超过大小限制
            delete res.result.permissions;
            Cookies.set("userInfo", JSON.stringify(res.result), {
              expires: endDate,
            });
            this.setStore("userInfo", res.result);
          }
        });
      },
      getLinkFlag() {
        // 定时获取是否绑定微信
        this.timeId = setInterval(() => {
          userInfo().then((res) => {
            if (res.code === 404) {
              clearInterval(this.timeId);
            }
            if (res.result.wechat) {
              this.wechatFlag = false;
              this.$Message.success("绑定成功");
              this.updateUserInfo();
              this.userInfo.wechat = res.result.wechat;
              clearInterval(this.timeId);
            }
          });
        }, 1000);
      },
      setAprilFlag(id, endtime) {
        var date = localStorage.getItem("aprilFlag");
        var now = new Date().toLocaleDateString();
        if (date !== now) {
          // 新一天,清空id列表
          localStorage.setItem("aprilList", "");
          localStorage.setItem("aprilFlag", now);
        }
        var aprilList = localStorage.getItem("aprilList") ? JSON.parse(localStorage.getItem("aprilList")) : [];
        var flag1 = true;
        // 未关闭过
        for (var i = 0; i < aprilList.length; i++) {
          if (aprilList[i] === id) {
            flag1 = false;
            break;
          }
        }
        // 会员到期时间为四月到六月之间
        var april_n = new Date("2021/04/01").getTime()
        var june_n = new Date("2021/06/30").getTime()
        var end_n = new Date(endtime).getTime();
        var flag2 = end_n > april_n && end_n < june_n;


        if (flag1 && flag2) {
          var april_box = document.createElement("div");
          april_box.id = "april_box";
          april_box.innerHTML =
            `<div class="april" ><div id="april_close" @click="close"></div><div class="april_content"><h2 class="april_title red">公告</h2><p class="april_first">尊敬的用户：</p><p><img src="https://cdn.chinabidding.cn/public/2020/img/laba.png" alt=""> 避免给您造成经济损失，请仔细阅读!</p><p>您好！目前市场已经进入招标旺季，一些“钓鱼网站”，通过短信、邮件等方式，以我网的名义给广大用户发送到期通知，导致一些用户汇错款项，造成了不必要的经济损失。</p><p>在此提醒广大用户，请在办理续费前，与您的客服专员联系或拨打<span class="red"> 400-006-6655 </span>核对汇款信息！</p><p class="red"> 温馨提示：元博网采购与招标网首页右侧可随时查看账号的到期时间及专属客服联系方式。</p><p class="bottom">元博网采购与招标网</p></div></div>`;
          document.body.appendChild(april_box);
          aprilList.push(id);
          localStorage.setItem("aprilList", JSON.stringify(aprilList))
          document.querySelector("#april_close").onclick = function () {
            document.querySelector("#april_box").remove();

          }
          return false;
        }

        return true;

      },
      init() {


        let aprilTipFlag = true;
        let v = JSON.parse(Cookies.get("userInfo"));
        // 转换null为""
        for (let attr in v) {
          if (v[attr] == null) {
            v[attr] = "";
          }
        }
        let str = JSON.stringify(v);
        this.userInfo = JSON.parse(str);
        if (this.userInfo.memberType !== "免费会员") {
          aprilTipFlag = this.setAprilFlag(this.userInfo.id, this.userInfo.expireTime);
        }
        if (this.userInfo.companyName && this.userInfo.companyName.length > 15) {
          this.companyNamePop = false;
        }
        if (
          this.userInfo.contactPhone &&
          this.userInfo.contactPhone.length > 20
        ) {
          this.contactPhonePop = false;
        }
        let popFlag = Cookies.get("popFlag");
        this.userInfo.expireTime = this.userInfo.expireTime.slice(0, 10);
        this.managerFlag = this.userInfo.type === 1 ? true : false;
        this.searchForm.companyId = this.userInfo.companyId;
        // 获取现有成员列表
        getUserListData(this.searchForm).then((res) => {
          this.allList = res.result.content;
          // 引导弹窗逻辑
          if (popFlag == 1 && aprilTipFlag) {
            /* if (!this.userInfo.mobile) {
              // 未绑定手机
              this.editMobileVisible = true;
              Cookies.set("popFlag", 0);
            } else  */
            if (!this.userInfo.wechat) {
              // 未绑定微信
              toBindWechat().then((res) => {
                if (res.success) {
                  var ticket = res.result.ticket;
                  this.wechatSrc =
                    "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" +
                    ticket;
                  this.wechatFlag = true;
                  this.getLinkFlag();
                }
              });
              // this.wechatSrc = '/xboot/ticket/createQrcode?inviterId=' + this.userInfo.id
              Cookies.set("popFlag", 0);
            } else if (this.managerFlag) {
              if (res.result.content.length < 2) {
                this.$Modal.confirm({
                  title: "欢迎进入商务室",
                  content: "您可通过账号管理，邀请更多同事加入企业账号，共享会员服务。",
                  okText: "立即邀请",
                  onOk: () => {
                    this.$router.push({
                      path: "/companyManage/count",
                    });
                  },
                });
                // 未邀请用户
                Cookies.set("popFlag", 0);
              }
            }
          }
          // 弹窗逻辑end
        });
        let watingData = {
          ...this.searchForm,
        };
        watingData.status = 1;
        delete watingData.delFlag;
        getUserListData(watingData).then((res) => {
          this.watingList = res.result.content.slice(0, 5);
        });

        getChannelBycondition({
          status: 0,
        }).then((res) => {
          if (res.success) {
            this.paid_goods = res.result.content.slice(0, 4);
          }
        });
      },
      getByItem(group, index) {
        let item = group[index];
        if (item.type === 0) {
          let searchData = {
            page: 1,
            rows: 30,
          };
          searchData.area = item.area;
          searchData.range = item.dateRange;
          searchData.table = item.infoType;
          searchData.keyword = item.keyword;
          if (searchData.range == -1) {
            /* searchData.startTime = new Date(item.startTime)
              .toLocaleString()
              .split(" ")[0];
            searchData.endTime = new Date(item.endTime)
              .toLocaleString()
              .split(" ")[0]; */
            searchData.startTime = this.format(
              new Date(item.startTime),
              "yyyy/MM/dd"
            );
            searchData.endTime = this.format(
              new Date(item.endTime),
              "yyyy/MM/dd"
            );
          }
          ztbSearch(searchData).then((data) => {
            if (data.code == 6015){
              setTimeout(()=>{
                this.getByItem(group, index);
              },1000)
              return;
            }
            console.log(data)
            if (data.status === "OK") {
              if (data.result.items.length >= 5) {
                this.subList = data.result.items.slice(0, 5);
                this.loading = false;
              } else if (index > 0) {
                index--;
                this.getByItem(group, index);
              }
            }
          });

        } else if (item.type === 1) {
          this.nzjSearchData.area = [];
          item.area.split(",").forEach((b) => {
            if (b) {
              this.nzjSearchData.area.push(parseInt(b));
            }
          });
          this.nzjSearchData.range = item.dateRange;
          this.nzjSearchData.keyword = item.keyword;
          this.nzjSearchData.type = item.searchRange;
          this.nzjSearchData.table = item.infoType.split(",");
          this.nzjSearchData.category1 = item.primaryIndustry.split(",");
          this.nzjSearchData.category2 = item.secondaryIndustry.split(",");
          this.nzjSearchData.stage = item.stage.split(",");
          nzjSearch(this.nzjSearchData).then((data) => {
            if (data.code == 6015){
              setTimeout(()=>{
                this.getByItem(group, index);
              },1000)
              return;
            }
            if (data.status === "OK") {
              if (data.result.items.length >= 5) {
                this.subList = data.result.items.slice(0, 5);
                this.loading = false;
              } else if (index > 0) {
                index--;
                this.getByItem(group, index);
              }
            }
          });
        }
      },
      getItemInfo() {
        // 获取我的订阅
        getAllGroup().then((res) => {
          this.loading = true;
          if (res.success && res.result.length > 0) {
            res.result.forEach((item) => {
              for (let key in item) {
                item[key] = item[key] === null ? "" : item[key];
              }
            });
            let group = res.result;
            this.getByItem(group, group.length - 1);
          }
        });

        // 获取我的收藏
        let collectData = {
          name: "",
          type: 0,
          pageSize: 30,
          pageNumber: 1,
          delFlag: 0,
          sort: "createTime",
          order: "desc",
        };
        getCollection(collectData).then((res) => {
          if (res.success) {
            this.colList = res.result.content.slice(0, 5);
          }
        });
        // 获取频道页面
        getAllProduct().then((res) => {});
      },
    },
    mounted() {
      this.init();
      this.getItemInfo();
      this.getUserInfo();
      /* this.$router.push({
              name: "subscribe",
            }); */
    },
    destroyed() {
      clearInterval(this.timeId);
    },
    computed: {},
  };
</script>

<style lang="less" scoped>
.loading .img {
  margin-top: 50px;
}
/*加载中icon样式*/
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>