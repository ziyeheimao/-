import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { routerMode } from '../config/env'
import { setToken } from "@/utils/ios_android_fun";
import { setCookie } from '@/config/mUtils'

Vue.use(Router)
const router = new Router({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

router.beforeEach((to, from, next) => {
	next()

	// setToken("nativeCallBack").then(()=>{
	// 	alert(1)
	// 	next()
	//   });
})
export default router
