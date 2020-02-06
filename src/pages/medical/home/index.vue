<template>
	<section class="ctn">
		<van-nav-bar title="寻医问诊" left-arrow @click-left="quit"/>

		<div class="top">
			<div class="card" @click="click(0)">
				<van-icon name="comment" />
				咨询记录
			</div>
			<div class="card" @click="click(1)">
				<van-icon name="like" />
				医生服务
			</div>
		</div>

		<van-tabs v-model="tabsActive">
			<van-tab class="tab-box" title="按科室找">
				<!-- 九宫格 -->
				<van-grid :column-num="3">
					<van-grid-item class="grid-item" v-for="(v,k) in department" :key="k" :icon="v.icon ? v.icon : 'photo-o'" :text="v.name" @click="toDoctor(v)"/>
				</van-grid>
			</van-tab>

			<van-tab title="按疾病找">
				<div class="disease-card-box">
					<div class="disease-card" v-for="(v,k) in disease" :key="k"  @click="toDoctor2(v)">{{v.name}}</div>
				</div>
			</van-tab>
		</van-tabs>

		<div class="btn" @click="toDepartmentSlect">
			查看全部科室
		</div>

		<!-- 占位 -->
		<div class="bottom"></div>

		<van-tabbar v-model="tabbarActive">
			<van-tabbar-item icon="coupon">肺炎疫情</van-tabbar-item>
			<van-tabbar-item icon="add-square">寻医问诊</van-tabbar-item>
			<van-tabbar-item icon="manager">个人中心</van-tabbar-item>
		</van-tabbar>
	</section>
</template>

<script>

export default {
  components: {},
  // props: [''],
  computed: {
    // InnerSize () {
    //   return this.$store.getters.InnerSize
    // },
  },
  data () {
    return {
			tabsActive: 0,
			tabbarActive: 1,
			department: [], // 科室
			disease: [] // 疾病
    }
  },
  methods: {
		quit () {
			console.log('返回')
		},
		toDepartmentSlect () {
			// this.$router.push('/medical/home/department')
			this.$router.push('/medical/home/doctor')
		},
		click (type) {
			switch (type) {
				case 0:
					this.$router.push('/medical/home/advisoryRecord') // 咨询记录
					break
				case 1:
					this.$router.push('/medical/home/doctorServices') // 医生服务
					break
			}
		},
		toDoctor (v) {
			this.$router.push({path: `/medical/home/doctor`, query: { id: v.id }})
		},

		toDoctor2 (v) {
			this.$router.push({path: `/medical/home/doctor`}) // , query: { id: v.id }
		},
		init () {
			this.$api.medical.diseaseAll().then(res => { // 所有疾病
				if (res.code === 0) this.disease = res.bean
			})

			this.$api.medical.departmentRecommend().then(res => { // 推荐科室
				if (res.code === 0) this.department = res.bean
			})
		}
	},
  beforeCreate () {},
  created () {
		this.init()
	},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  deactivated () {},
  watch: {
		tabbarActive () {
			if (this.tabbarActive === 2) {
				this.$router.push(`/medical/home/patientConsultation`)
			} else if (this.tabsActive === 0) {
				this.$router.push('/medical/home/login')
			}
		}
	}
}
</script>

<style lang='scss' scoped>
.btn{
	padding: 5px;
	text-align: center;
	font-size: 14px;
}

.ctn{
	&>.van-nav-bar{}
	&>.top{
		display: flex;
		justify-content: space-around;
		padding: 25px;
		&>.card{
			font-size: 20px;
			border: 1px solid #eee;
			padding: 25px 15px;
			text-align: center;
			display: flex;
			flex-direction: column;
		}
	}

	&>.van-tabs{
		.disease-card-box{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 10px;
			.disease-card{
				margin: 5px;
				background-color: #eee;
				padding: 15px 0;
				width: 30%;
				text-align: center;
			}
		}
	}

	&>.bottom{
		height: 70px;
	}

	&>.van-tabbar{}
}
</style>
