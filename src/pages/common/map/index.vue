<template>
  <div class="ctn">
    <van-button
      size="small"
      type="info"
      plain
      class="return-btn"
      style="min-width:15px;"
      @click="revert"
      >ㄑ</van-button
    >
    <div id="container" :style="'height:' + InnerSize.height + 'px;'"></div>

    <section
      class="list"
      ref="list"
      :style="
        'max-height:' +
          (InnerSize.height - 77) +
          'px; min-height: 76px;' +
          'height:' +
          (open === 'up'
            ? InnerSize.height - 77
            : open === 'dn'
            ? 76
            : open === 'middle'
            ? InnerSize.height / 2
            : '') +
          'px;'
      "
    >
      <div
        class="icon"
        v-html="icon"
        @click.stop="btnClick"
        @touchstart="btnTouchstart($event)"
        @touchmove="btnTouchmove($event)"
        @touchend="btnTouchend($event)"
      ></div>

      <div class="btn">
        <van-button
          round
          type="info"
          :plain="mapReq.type === k ? false : true"
          size="small"
          v-for="(v, k) in btnList"
          :key="k"
          @click="mapReq.type = k"
          >{{ v.name }}</van-button
        >
      </div>

      <ul
        :style="'height:' + listHeight"
        @touchstart="listTouchstart($event)"
        @touchend="listTouchend($event)"
      >
        <li v-for="(v, k) in list" :key="k" @click.stop="scenicSpot(v)">
          <div class="title">
            <h4>{{ v.name }}</h4>
            <p @click.stop="voice(v)" v-show="mapReq.type === 0">
              <span v-html="mike" style="margin-right:5px;"></span>语音讲解
            </p>
            <!-- 导航 -->
            <span v-html="Navigation" @click.stop="gps(v, true)"></span>
          </div>

          <p class="ctn">
            <output>距离您{{ v.distance / 1000 }}公里</output>
            |
            <output>{{ v.areaName }}</output>
          </p>

          <p class="tiem" v-show="mapReq.type === 0">
            <output>开放时间: {{ v.startTime + "-" + v.endTime }}</output>
          </p>

          <p class="location">
            <output>地址: {{ v.city + v.state + v.area + v.location }}</output>
          </p>
        </li>
      </ul>
    </section>

    <!-- 简介 -->
    <section class="introduction" v-if="introductionIndex !== -1">
      <div class="title">
        <h4>{{ list[introductionIndex].name }}</h4>
        <van-icon name="cross" @click="introductionIndex = -1" />
      </div>

      <p class="ctn">
        <output>距离您{{ list[introductionIndex].distance / 1000 }}公里</output>
        |
        <output>{{ list[introductionIndex].areaName }}</output>
      </p>

      <p class="tiem" v-show="mapReq.type === 0">
        <van-icon name="underway-o" />
        <output
          >开放时间:
          {{
            list[introductionIndex].startTime +
              "-" +
              list[introductionIndex].endTime
          }}</output
        >
      </p>

      <div class="btn">
        <div @click="gps(list[introductionIndex])">
          <span v-html="Navigation2"></span>
          <span>导航</span>
        </div>
      </div>
    </section>
    <!-- 
    <div class="test">
      <hr :style="'top:' + threshold1 + 'px; width: 100%; border-color: red; position: fixed; z-index: 999999;'">
      <hr :style="'top:' + threshold2 + 'px; width: 100%; border-color: red; position: fixed; z-index: 999999;'">

      <hr :style="'top:' + (InnerSize.height - 77) + 'px; width: 100%; border-color: rgb(0,0,255); position: fixed; z-index: 999999;'">
      <hr :style="'top:' + (InnerSize.height / 2) + 'px; width: 100%; border-color: rgb(0,0,255); position: fixed; z-index: 999999;'">
      <hr :style="'top:' + 76 + 'px; width: 100%; border-color: rgb(0,0,255); position: fixed; z-index: 999999;'">
    </div> -->
  </div>
</template>

<script>
import { clone } from "@/utils/index";
import { sdk, setToken } from "@/utils/ios_android_fun";
import { mapState } from "vuex";

export default {
  components: {},
  // props: [''],
  data() {
    return {
      map: null, // 地图
      icon: ``,
      up: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="30px" height="6px" viewBox="0 0 60.375 13.64" enable-background="new 0 0 60.375 13.64" xml:space="preserve">
          <line fill="none" stroke="#D8D8D8" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="2.242" y1="11.304" x2="30.176" y2="2.464"/>
          <line fill="none" stroke="#D8D8D8" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="58.11" y1="11.304" x2="30.176" y2="2.464"/>
        </svg>`,
      dn: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="30px" height="6px" viewBox="0 0 60.375 13.64" enable-background="new 0 0 60.375 13.64" xml:space="preserve">
        <line fill="none" stroke="#D8D8D8" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="2.302" y1="2.4" x2="30.236" y2="11.24"/>
        <line fill="none" stroke="#D8D8D8" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="58.17" y1="2.4" x2="30.236" y2="11.24"/>
        </svg>`,
      middle: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="30px" height="6px" viewBox="0 0 60.375 13.64" enable-background="new 0 0 60.375 13.64" xml:space="preserve">
        <line fill="none" stroke="#D8D8D8" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="2.26" y1="6.82" x2="58.17" y2="6.82"/>
        </svg>`,
      mike: `<svg t="1575704681751" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2345" width="14" height="14">
        <path d="M514.2 655h-0.4C439.4 655 379 594.6 379 520.2V199.8C379 125.4 439.4 65 513.8 65h0.4C588.6 65 649 125.4 649 199.8v320.4c0 74.4-60.4 134.8-134.8 134.8z" fill="#A5B8FF" p-id="2346"></path>
        <path d="M766.1 330.1c-10.9 1-19.1 10.4-19.1 21.4V529c0 129.5-105.2 234.8-234.6 235-129.5 0.2-235.4-107.5-235.4-236.9V351c0-12.2-10.5-22-22.9-20.9-10.9 1-19.1 10.4-19.1 21.4V529c0 74 28.8 143.6 81.1 195.9 47.8 47.8 110 76 176.9 80.5V917H367c-12.2 0-22 10.5-20.9 22.9 1 10.9 10.4 19.1 21.4 19.1h294.1c12.2 0 22-10.5 20.9-22.9-1-10.9-10.4-19.1-21.4-19.1H535V805c65.3-5.3 126-33.3 172.9-80.2C760.2 672.5 789 603 789 529V351c0-12.2-10.5-22-22.9-20.9z" fill="#1C4BFF" p-id="2347"></path>
        </svg>`,
      Navigation: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="30px" height="30px" viewBox="0 0 120.75 120.75" enable-background="new 0 0 120.75 120.75" xml:space="preserve">
        <circle fill="#1989fa" cx="60.375" cy="60.375" r="60.375"/>
        <path fill="#FFFFFF" d="M53.394,66.442l6.583,27.917c0,0,3.75,4.917,7-0.417s19.667-54.75,19.667-54.75s1.167-5.333-5.333-4.833
          s-55.25,17.417-55.25,17.417s-4.583,3.416,0,7.083S53.394,66.442,53.394,66.442z"/>
        </svg>`,

      Navigation2: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="25px" height="25px" viewBox="0 0 120.75 120.75" enable-background="new 0 0 120.75 120.75" xml:space="preserve">
        <path fill="#FFFFFF" d="M53.394,66.442l6.583,27.917c0,0,3.75,4.917,7-0.417s19.667-54.75,19.667-54.75s1.167-5.333-5.333-4.833
          s-55.25,17.417-55.25,17.417s-4.583,3.416,0,7.083S53.394,66.442,53.394,66.442z"/>
        </svg>`,
      list: [],
      btnList: [
        { name: "景点" },
        { name: "酒店" },
        { name: "停车场" },
        { name: "厕所" }
      ],
      open: "dn", // up dn middle
      listCoordinate: {
        startX: "",
        startY: ""
      },
      btnCoordinate: {
        startY: "",
        height: ""
      },
      mapReq: {
        // 用户的当前位置 如未获取到 默认在九寨沟为起点
        longitude: 103.92511651664972, // 经度
        latitude: 33.15422894542718, // 纬度
        type: 0,
        centerLongitude: 103.92511651664972,
        centerLatitude: 33.15422894542718
      },
      marker: [], // 标记点
      circle: {
        // 路线图
        startMarker: null,
        endMarker: null,
        routeLine: null
      },
      introductionIndex: -1 // 当前选中的地点id
    };
  },
  computed: {
    InnerSize() {
      return this.$store.getters.InnerSize;
    },
    threshold1() {
      return (
        (this.InnerSize.height - 77 - this.InnerSize.height / 2) / 2 +
        this.InnerSize.height / 2
      ); // 第一阈值： 当前手机屏幕up与middle的 中间高度
    },
    threshold2() {
      return (this.InnerSize.height / 2 - 76) / 2 + 76; // 第二阈值 当前手机屏幕dn与middle的 中间高度
    },
    listHeight() {
      switch (this.open) {
        case "dn":
          // return this.InnerSize.height - 77 - 76 + "px";
          return "";

        case "up":
          return this.InnerSize.height - 77 - 76 + "px";

        case "middle":
          return this.InnerSize.height / 2 - 76 + "px";
      }
    },
    ...mapState(["latitude", "longitude"])
  },
  methods: {
    // 返回
    revert() {
      this.$router.go(-1);
    },
    // 场景列表左右滑动↓
    listTouchstart(e) {
      this.listCoordinate.startX = e.changedTouches[0].pageX;
      this.listCoordinate.startY = e.changedTouches[0].pageY;
    },
    listTouchend(e) {
      let moveEndX = e.changedTouches[0].pageX;
      let moveEndY = e.changedTouches[0].pageY;
      let X = moveEndX - this.listCoordinate.startX;
      let Y = moveEndY - this.listCoordinate.startY;

      if (Y > 0) {
      } else if (Y < 0) {
      }

      if (Math.abs(X) > Math.abs(Y)) {
        if (Math.abs(X) < 30) return; // 滑动幅度太小时不执行防止用户误操作
        if (X > 0) {
          if (this.mapReq.type === 0)
            this.mapReq.type = this.btnList.length - 1;
          else this.mapReq.type -= 1;
        } else if (X < 0) {
          if (this.mapReq.type === this.btnList.length - 1)
            this.mapReq.type = 0;
          else this.mapReq.type += 1;
        }
      }
    },
    // 场景列表左右滑动↑

    // 手指拖动菜单栏上下滑动↓
    btnClick() {
      setTimeout(() => {
        if (this.open === "up" || this.open === "middle") this.open = "dn";
        else this.open = "up";
      }, 300);
    },
    btnTouchstart(e) {
      this.btnCoordinate.startY = e.changedTouches[0].pageY;
      this.btnCoordinate.height = this.$refs.list.style.height.slice(0, -2);
    },
    btnTouchmove(e) {
      let Y = this.btnCoordinate.startY - e.changedTouches[0].pageY;
      this.$refs.list.style.height =
        Number(this.btnCoordinate.height) + Y + "px";
    },
    btnTouchend(e) {
      let Y = this.$refs.list.style.height.slice(0, -2);

      if (Math.abs(Y) < 5) {
        this.btnClick(); // 移动距离太小视为点击
        return;
      }

      this.open = "";

      setTimeout(() => {
        if (Y > this.threshold1) {
          // ↑
          this.open = "up";
        } else if (Y < this.threshold2) {
          // 下
          this.open = "dn";
        } else {
          // 中间
          this.open = "middle";
        }
      }, 50);
    },
    // 手指拖动菜单栏上下滑动↑

    // 语音讲解
    voice(v) {
      this.$router.push({
        path: "/scenicSpot/home/index",
        query: { id: v.id, type: this.mapReq.type, voice: true }
      });
    },

    // 跳转详情页面
    scenicSpot(v) {
      this.$router.push({
        path: "/scenicSpot/home/index",
        query: { id: v.id, type: this.mapReq.type }
      });
    },

    // 初始化
    init() {
      this.getSurface(); // 获取当前位置附近地标
      if (this.$route.query.latitude && this.$route.query.longitude)
        this.gps({
          longitude: this.$route.query.longitude,
          latitude: this.$route.query.latitude
        }); // 如果路由传来坐标 调用导航
      this.map.setFitView(
        new AMap.Marker({
          position: [this.mapReq.centerLongitude, this.mapReq.centerLatitude]
        })
      ); // 自动适配到指定视野范围
    },

    // 获取周围地标
    getSurface(position = true) {
      if (this.longitude) this.mapReq.longitude = this.longitude;
      if (this.latitude) this.mapReq.latitude = this.latitude;
      let reqData = clone(this.mapReq);
      reqData.type = Number(reqData.type) + 1;
      this.$api.mapController.mapList(reqData).then(res => {
        this.list = res.bean.list;
        if (position) this.sign();
      });
    },
    // 标记地标
    sign() {
      if (this.marker.length > 0) {
        for (let i of this.marker) {
          i.setMap(null); // 清除标记点
        }
        this.marker = [];
      }

      for (let i of this.list) {
        let m = new AMap.Marker({ position: [i.longitude, i.latitude] });
        this.map.add(m); // 添加标记
        this.marker.push(m);

        AMap.event.addListener(m, "click", e => {
          for (let i = 0; i < this.list.length; i++) {
            if (
              this.list[i].latitude === e.target.B.position.lat &&
              this.list[i].longitude === e.target.B.position.lng
            ) {
              this.introductionIndex = i;
            }
          }
        });
      }
      // this.map.setFitView(arr); // 自动适配到指定视野范围
    },

    // 导航
    gps(v, hiddenMenu = false) {
      let _this = this;

      // 传参给安卓
      let position = v.longitude + "," + v.latitude;
      sdk(position);

      // if (hiddenMenu) { // 隐藏菜单
      //   this.$refs.list.style.height = this.InnerSize.height / 2 + "px";
      //   this.open = "middle";
      //   this.icon = this.middle;
      // }
    }
  },
  beforeCreate() {},
  created() {
    this.icon = this.up;
    if (this.$route.query.type) this.mapReq.type = this.$route.query.type;
  },
  beforeMount() {},
  mounted() {
    let _this = this;
    this.map = new AMap.Map("container", {
      autoFitView: false,
      resizeEnable: true,
      zoom: 10, // 级别
      center: [this.mapReq.longitude, this.mapReq.latitude], // 中心点坐标
      // viewMode: "3D", // 使用3D视图
      mapStyle: "amap://styles/macaron"
    });
    this.map.setFeatures(["bg", "point", "road", "building"]); // 多个种类要素显示 // bg  区域面 // point  兴趣点 // road  道路及道路标注 // building  建筑物
    this.map.plugin(["AMap.ToolBar"], () => {
      // 异步同时加载多个插件
      // 缩放工具
      var toolbar = new AMap.ToolBar();
      this.map.addControl(toolbar);
    });

    // setToken("callBack");
    // window["callBack"] = result => {
    //   let obj = JSON.parse(result);
    //   this.$store.commit("setUserInfo", obj);
    //   this.init();
    // };
 this.init();

    // 触摸地图
    this.map.on("touchend", ev => {
      var currentCenter = this.map.getCenter(); // 获取地图中心点

      this.mapReq.centerLatitude = currentCenter.P;
      this.mapReq.centerLongitude = currentCenter.Q;
      this.introductionIndex = -1;
      this.getSurface();
    });
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.map.destroy();
  },
  deactivated() {},
  watch: {
    "mapReq.type"() {
      this.getSurface();
    },
    introductionIndex() {
      if (this.introductionIndex != -1) {
        this.$refs.list.style.height = 76 + "px";
        this.icon = this.up;
      }
    },
    open() {
      switch (this.open) {
        case "up":
          this.icon = this.dn;
          break;
        case "dn":
          this.icon = this.up;
          break;
        case "middle":
          this.icon = this.middle;
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/style/mixin.scss";
.ctn {
  z-index: 1;
  position: relative;

  & > .van-button {
    z-index: 10;
    position: absolute;
    top: 27px;
    left: 16px;
  }

  & > .list {
    z-index: 501;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    overflow: hidden;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 0 3px #00000030;
    & > .icon {
      @include fj(center);
      padding: 10px 0;
    }
    & > .btn {
      white-space: nowrap;
      margin: 0 15px;
      @include scrollbar;
      & > .van-button {
        margin-right: 8px;
      }
    }
    & > ul {
      @include scrollbar;
      margin-top: 20px;
      & > li {
        color: #666;
        padding: 17px;
        & > .title {
          h4 {
            font-size: 16px;
            color: #333;
            max-width: 165px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 14px;
          }
          @include fj;
        }
        & > .ctn,
        & > .tiem {
          font-size: 14px;
        }
        & > .ctn {
          margin: 5px 0 10px;
        }
        & > .location {
          font-size: 14px;
          margin-top: 10px;
          @include oe(3);
        }
      }
    }
  }

  & > .introduction {
    z-index: 501;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    transition: 0.3s linear all;
    overflow: hidden;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 0 3px #00000030;
    padding: 17px;
    color: #666;

    & > .title {
      @include fj;
      h4 {
        color: #333;
        font-weight: bold;
        font-size: 18px;
      }
    }
    & > .ctn {
      font-size: 14px;
      margin: 10px 0;
    }
    & > .tiem {
      font-size: 14px;
    }
    & > .btn {
      text-align: right;
      & > div {
        float: right;
        border-radius: 19px;
        color: #fff;
        width: 112px;
        height: 36px;
        background-color: #1989fa;
        @include fj(center);
        align-items: center;
      }
    }
  }
}
#container {
  width: 100%;
  height: 500px;
}
</style>
<style lang='scss'>
a.amap-logo,
.amap-copyright {
  display: none !important;
}

// 地图缩放空间
.amap-zoomcontrol {
  bottom: 0 !important;
}
</style>
