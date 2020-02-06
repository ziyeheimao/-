<template>
	<div class="vue-wrap">
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>
	</div>
</template>

<script>
import svgIcon from "./components/common/svg";

import { setCookie } from "@/config/mUtils";
import { mapState, mapMutations } from "vuex";
import { setToken } from "@/utils/ios_android_fun";
export default {
  data() {
    return {};
  },

  created() {
      // setCookie("token", '46be7fd3-4ffe-4b05-a5f8-2f147f935ecb');
    this.innerSizeCount();
  },

 
  mounted() {
    // setToken("callback")
  },

  components: { svgIcon },
  computed: {},

  methods: {
    ...mapMutations(["changeNetwork"]),

    // 文档可视区尺寸
    innerSizeCount() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let size = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        this.$store.commit("InnerSize", size);
      }, 100);
    }
  }
};
</script>

<style lang="scss">
@import "./style/common";
.vue-wrap {
  width: 100%;
  height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
