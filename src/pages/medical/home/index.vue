<template>
	<section class="ctn">
		<van-nav-bar title="寻医问诊"/>

		<div class="top">
			<div class="card left" @click="click(0)">
				<img src="../../../assets/img/indexCardLeft.png" alt="">
				咨询记录
			</div>
			<div class="card right" @click="click(1)">
				<img src="../../../assets/img/indexCardRight.png" alt="">
				医生服务
			</div>
		</div>

		<van-tabs v-model="tabsActive"
			title-inactive-color='rgb(89, 87, 87)'
			title-active-color='rgb(34, 93, 171)'
			:swipeable='true'
			line-height='0px'>
			<van-tab class="tab-box" title="按科室找">
				<!-- 九宫格 -->
				<van-grid :column-num="3">
					<van-grid-item class="grid-item" v-for="(v,k) in department" :key="k" :icon="v.iconUrl ? v.iconUrl : 'photo-o'" :text="v.name" @click="toDoctor(v)"/>
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
		<!-- <div class="bottom" style="height: 70px;"></div>

		<van-tabbar v-model="tabbarActive">
			<van-tabbar-item icon="wap-home">首 页</van-tabbar-item>
			<van-tabbar-item icon="add-square">寻医问诊</van-tabbar-item>
			<van-tabbar-item icon="manager">个人中心</van-tabbar-item>
		</van-tabbar> -->

	</section>
</template>

<script>

export default {
  components: {},
  // props: [''],
  computed: {},
  data () {
    return {
			tabsActive: 0,
			tabbarActive: 1,
			department: [], // 科室
			disease: [] // 疾病
    }
  },
  methods: {
		toDepartmentSlect () {
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
			console.log(v)
			this.$router.push({path: `/medical/home/doctor`, query: { id: v.departmentId }}) // , query: { id: v.id }
		},
		init () {
			this.$api.medical.diseaseAll().then(res => { // 所有疾病
				if (res.code === 0) this.disease = res.bean
				console.log(this.disease)
			})

			this.$api.medical.departmentRecommend().then(res => { // 推荐科室
				if (res.code === 0) this.department = res.bean
				console.log(this.department)
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
@import './index.scss';

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
		&>.card{
			width: 50%;
			font-size: 19px;
			padding: 25px 15px;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			&>img{
				width: 40px;
				margin-right: 10px;
			}
		}
		.card.left{
			background-color: rgba(248, 239, 222, 1);
			color: rgb(146, 111, 44);
		}
		.card.right{
			background-color: rgba(235, 238, 254, 1);
			color: rgb(90, 106, 187);
		}
	}

	&>.van-tabs{
		background-color: #fff;

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
	&>.btn{
		padding: 15px 0;
		margin-top: 10px;
		color: $title_c;
	}
	&>.van-tabbar{}
}
</style>
