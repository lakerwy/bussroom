<template>
  <div id="platform">
    <!-- 基本信息 -->
    <div class="base">
      <h2><i></i>招标代理工作台</h2>
      <div class="binfo cl">
        <img
          src="https://esep.cn/img/service-icon.16442b17.png"
          alt=""
          class="bpic"
        />
        <div class="bjoin">
          <div class="bcompany cl">
            <h3 class="sl">中信国际招标有限公司</h3>
            <div class="btrade">企</div>
          </div>
          <p>入驻时间：第一年</p>
        </div>
        <div class="bmsg">
          <h3>消息提醒<span>48</span></h3>
          <p>报名信息跟新</p>
        </div>
      </div>
    </div>

    <!-- 跟进状态 -->
    <div class="status">
      <ul>
        <li>
          <a href="" class="cl">
            <div class="sicon">
              <img src="../../../assets/supplier/icon-jrtjxs.png" alt="" />
            </div>
            <div class="stext">
              <h4>106</h4>
              <p>今日线索推荐</p>
            </div>
          </a>
        </li>
        <li>
          <a href="" class="cl">
            <div class="sicon">
              <img src="../../../assets/supplier/icon-dgjxs.png" alt="" />
            </div>
            <div class="stext">
              <h4>106</h4>
              <p>今日线索推荐</p>
            </div>
          </a>
        </li>
        <li>
          <a href="" class="cl">
            <div class="sicon">
              <img src="../../../assets/supplier/icon-yrlxs.png" alt="" />
            </div>
            <div class="stext">
              <h4>106</h4>
              <p>今日线索推荐</p>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- 采购线索 -->
    <div class="clue">
      <h2>采购线索推荐</h2>
      <Carousel autoplay v-model="carIndex" :loop="true" :autoplay-speed="3000">
        <Carousel-item
          v-for="(caritem, i) in Math.ceil(clueData.length / 4)"
          :key="i"
        >
          <div class="demo-carousel">
            <ul>
              <li
                v-for="(item, i) in clueData.slice(
                  (caritem - 1) * 4,
                  caritem * 4
                )"
                :key="i"
              >
                <h4>{{ item.title }}</h4>
                <div class="keys cl">
                  <div class="ktext" v-for="kitem in item.keys" :key="kitem">
                    {{ kitem }}
                  </div>
                </div>
                <p><span>数量：</span>{{ item.numbers }}</p>
                <p><span>发布时间：</span>{{ item.publicTime }}</p>
                <p><span>采购期限：</span>{{ item.procurement }}</p>
                <p><span>采购说明：</span>{{ item.explain }}</p>
                <p><span>距离截止剩余时间：</span>{{ item.deadline }}</p>
              </li>
            </ul>
          </div>
        </Carousel-item>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carIndex: 0,
      clueData: [
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        },
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        },
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        },
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        },
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        },
        {
          title: '智慧太阳能路灯采购',
          keys: [
            '北京', '企业采购'
          ],
          numbers: '100个',
          publicTime: '2022-05-06',
          procurement: '3个月',
          explain: '了解详细需求，请电联',
          deadline: '12天21小时5分30秒'
        }
      ]
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
#platform {
  min-width: 960px;
  min-height: 520px;
  color: #333;
  .sl {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cl:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .cl {
    zoom: 1;
  }

  .base {
    width: 100%;
    height: 152px;
    background-color: #fff;
    margin-bottom: 20px;
    h2 {
      font-size: 20px;
      line-height: 60px;
      padding-left: 33px;
      padding-right: 20px;
      position: relative;
      i {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 3px;
        height: 20px;
        background-color: #2d6eff;
        border-radius: 2px;
      }
    }
    .binfo {
      padding: 0 20px;
      .bpic {
        float: left;
        width: 46px;
        height: 46px;
      }
      .bjoin {
        float: left;
        padding-left: 30px;
        padding-right: 90px;
        .bcompany {
          h3 {
            float: left;
            font-size: 16px;
            line-height: 20px;
            max-width: 240px;
          }
          .btrade {
            float: left;
            width: 16px;
            height: 16px;
            line-height: 14px;
            font-size: 12px;
            border: 1px solid #5489ff;
            margin-top: -10px;
            margin-left: 4px;
            color: #5489ff;
            border-radius: 16px;
          }
        }
        p {
          font-size: 14px;
          padding-top: 6px;
          line-height: 20px;
        }
      }
      .bmsg {
        float: left;
        padding-left: 90px;
        border-left: 2px solid #c4c8cf;
        h3 {
          font-size: 16px;
          line-height: 20px;
          position: relative;
          span {
            position: absolute;
            left: 68px;
            top: -12px;
            padding: 0 10px;
            line-height: 18px;
            font-size: 14px;
            background-color: #ffd0d0;
            color: #ff0000;
            border-radius: 18px;
            font-weight: normal;
          }
        }
        p {
          font-size: 14px;
          padding-top: 6px;
          line-height: 20px;
        }
      }
    }
  }

  .status {
    width: 100%;
    height: 135px;
    background-color: #fff;
    margin-bottom: 20px;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      padding: 30px 90px;
      li {
        list-style: none;
        width: 200px;
        margin-right: 70px;
        a {
          color: #333;
        }
        .sicon {
          float: left;
          width: 78px;
          height: 78px;
          background-color: #eef2ff;
          border-radius: 4px;
          text-align: center;
          margin-right: 20px;
          img {
            margin-top: 17px;
            width: 44px;
          }
        }
        .stext {
          float: left;
          h4 {
            font-size: 20px;
            line-height: 40px;
          }
          p {
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
    }
  }

  .clue {
    width: 100%;
    // height: 680px;
    background-color: #fff;
    padding-bottom: 65px;
    /deep/ .ivu-carousel-dots-inside {
      bottom: -25px !important;
    }
    h2 {
      font-size: 20px;
      line-height: 60px;
      padding-left: 20px;
      padding-right: 20px;
    }
    ul {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      //justify-content: space-between;
      justify-content: flex-start;
      li {
        list-style: none;
        width: 366px;
        height: 336px;
        padding: 10px 20px;
        background: url("../../../assets/supplier/bg-cgxstj.png") no-repeat 0 0;
        background-size: 368px 336px;
        margin: 0 10px;
        h4 {
          font-size: 16px;
          line-height: 56px;
        }
        .ktext {
          float: left;
          font-size: 14px;
          color: #fff;
          line-height: 28px;
          padding: 0 10px;
          background: #6394ff;
          margin-right: 20px;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          line-height: 36px;
          span {
            color: #666;
          }
        }
      }
    }
  }
}
</style>