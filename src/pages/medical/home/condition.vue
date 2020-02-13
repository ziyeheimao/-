<template>
  <section class="ctn">
    <van-nav-bar title="填写病情" left-arrow @click-left="quit" style="border-bottom: 1px solid #f4f4f4;"/>

    <van-cell title="年龄 / 性别" :value="text" @click="show = true" required />

    <van-action-sheet v-model="show" title="年龄 / 性别">
      <van-picker show-toolbar title="" :columns="columns" @confirm='confirm' @cancel='cancel'/>
    </van-action-sheet>

    <div class="box">
      <p>病情描述</p>
      <van-field v-model="form.diseaseDesc" rows="5" type="textarea" required
        maxlength="500" show-word-limit
        placeholder="详细描述您的病情症状,曾经做过的检查、治疗情况，以及想获得医生的帮助"/>
    </div>

    <div class="box">
      <p>最近14天是否去过武汉或者接触过感染者？</p>
      <van-radio-group v-model="form.touchPatient" required>
        <van-radio name="0">是</van-radio>
        <van-radio name="1">否</van-radio>
        <van-radio name="2">不确定</van-radio>
      </van-radio-group>
    </div>

    <div class="box">
      <p>图文资料(非必填)</p>
      <p>上传能体现病情的患处照片、检验检查资料等，不多于三张</p>
      <van-uploader v-model="form.fileList" multiple :max-count="3" :before-read="beforeRead"/>
    </div>

    <div style="height: 55px;"></div>

    <div class="bottom">
      <van-button type="info" size="large" @click="submit" color="#4B7DC2">发送咨询</van-button>
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  components: {},
  data () {
    return {
      show: false,
      text: '＞',
      columns: [
        { values: ['男', '女'], defaultIndex: 0 }, // 第一列
        { values: [
          1,2,3,4,5,6,7,8,9,
          10,11,12,13,14,15,16,17,18,19,
          20,21,22,23,24,25,26,27,28,29,
          30,31,32,33,34,35,36,37,38,39,
          40,41,42,43,44,45,46,47,48,49,
          50,51,52,53,54,55,56,57,58,59,
          60,61,62,63,64,65,66,67,68,69,
          70,71,72,73,74,75,76,77,78,79,
          80,81,82,83,84,85,86,87,88,89,
          90,91,92,93,94,95,96,97,98,99,
          ,100,101,102,103,104,105,106,107,108,109
          ,110,111,112,113,114,115,116,117,118,119
          ,120
        ], defaultIndex: 19 } // 第二列
      ],
      form: {
        slect: [], // 选择的结果
        fileList: [],

        age: '', //年龄
        diseaseDesc: '', // 描述
        attachment: '', // 附件
        doctorId: '', // 医生id
        gender: '', // 性别
        touchPatient: '2', // 14天内是否接触患者
      },

      gender: [], // 性别
      interval: null
    }
  },
  computed: {},
  methods: {
    quit () {
      this.$router.go(-1)
    },
    init () {
      this.form.doctorId = this.$route.query.id
      // 字典
      let req = { dictType: 'gender' } // 性别
      this.$api.medical.sysDictSelectItemsByDictType(req).then(res => {
        if (res.code === 0) {
          let arr = []
          for (let i of res.bean) { arr.push(i.dictItemName) }
          this.columns[0].values = arr
          this.gender = res.bean // 提交前对比用
        }
      })
    },
    cancel (e) { // 取消
      this.show = false
    },
    confirm (e) { //  完成
      this.show = false
      this.form.slect = e
      this.text = `${e[0]} / ${e[1]} ＞`
    },

    beforeRead(file) {
      let arr = ['image/jpeg', 'image/png']
      if (!arr.includes(file.type)) {
        Toast('请上传 jpg或png 格式图片');
        return false;
      }
      return true;
    },
    findAttrVal (data, arr, attrName, targetAttrName) {
      for (let i of arr) {
        if (i[attrName] === data) {
          return i[targetAttrName]
        }
      }
    },
    submit () {
      let req = {
        age: Number(this.form.slect[1]), // 年龄
        gender: this.findAttrVal(this.form.slect[0], this.gender, 'dictItemName', 'dictType'), // 性别
        diseaseDesc: this.form.diseaseDesc, // 描述
        doctorId: Number(this.form.doctorId), // 医生id
        touchPatient: this.form.touchPatient, // 14天内是否接触患者
      }

      if (!req.age || !req.gender || !req.diseaseDesc) {
        Toast('年龄、性别及病情描述为必填项')
        return
      }

      this._file(req)
    },

    _file (req) {
      // 处理文件
      if (this.form.fileList.length > 0) {
        let arr = []
        for (let i of this.form.fileList) {this.updata(i.file, arr)}

        let isSubmit = false
        this.interval = setInterval(() => {
          if (arr.length === this.form.fileList.length && isSubmit === false) {
            isSubmit = true
            req.attachment = arr.toString()
            clearInterval(this.interval)
            this._submit(req)
          }
        }, 500)
      } else {
        this._submit(req)
      }
    },
    _submit (req) {
      this.$api.medical.inquiryRecordAdd(req).then(res => {
        if (res.code === 0) {
          Toast('添加成功')
          req.id = req.doctorId
          this.$router.push({path: '/medical/home/chat', query: req}) // 跳转聊天页面 环信
        }
      })
    },

    updata (file, arr) {
      let data = new FormData()
      data.append('file', file)
      this.$api.medical.sysOssUpload(data).then(res => {
        if (res.code === 0) {
          arr.push(res.bean)
        }
      })
    },
  },
  created () {
    this.init()
  },
  mounted () {},
  beforeDestroy() {
    clearInterval(this.interval)
  },
  watch: {}
}
</script>

<style lang='scss' scoped>
@import './index.scss';

.ctn{
  background-color: #fff !important;
  & > .box{
    padding: 15px;
    &>p{
      font-size: 15px;
      margin-bottom: 10px;
    }
    &>.van-radio-group{
      display: flex;
      justify-content: space-between;
      padding: 5px 20px;
    }
  }
  // bottom: ;
  &>.bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }
}
</style>
