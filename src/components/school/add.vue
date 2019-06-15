<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>营区名称：</span>
        <div>
          <el-input v-model="schoolData.school_name" placeholder="请输入营区名" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>联系电话：</span>
        <div>
          <el-input v-model="schoolData.phone" placeholder="请输入联系电话：" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>所在城市：</span>
        <div>
          <area-select
            v-model="schoolData.city.cityCode"
            :level="2"
            :data="pcaa"
            :placeholders="['请选择省份','请选择市','请选择区县']"
            size="small"
          ></area-select>
        </div>
      </li>
      <li class="clearfix">
        <span>详细地址：</span>
        <div>
          <el-input v-model="schoolData.address" placeholder="请输入详细地址：" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class>营区展示：</span>
        <div>
          <el-upload
            class="upload-img-list"
            action="/upload"
            :data="{type:1}"
            :file-list="schoolData.imgs"
            list-type="picture"
            :on-success="uploadSucess"
            :on-remove="removeImg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="judgeSchoolData" round>确认</el-button>
    </div>
  </div>
</template>
<script>
import pcaa from "area-data/pcaa";

export default {
  data() {
    return {
      pcaa, //城市数据
      //添加营区数据
      schoolData: {
        school_name: "",
        phone: "",
        city: { cityCode: [], areas: [] }, //城市
        address: "", //地址
        imgs: [], //营区展示图片
        type: 1 //1添加 2修改 3删除
      },
      editOnOff: false //是否是修改
    };
  },
  // 初始化
  beforeMount() {
    this.$utils.store.set("defaultData", this.schoolData);
    this.editOnOff =
      this.$route.path === "/home/school/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      for (let key in this.schoolData) {
        this.schoolData[key] = editData[key];
      }
      this.schoolData.id = editData.id;
      this.schoolData.type = 2;
    }
  },
  methods: {
    //图片上传成功
    uploadSucess(res, file, fileList) {
      this.schoolData.imgs = fileList;
    },
    //删除上传图片
    removeImg(file, fileList) {
      this.schoolData.imgs = fileList;
    },
    //添加教练
    judgeSchoolData() {
      const utils = this.$utils;
      if (!utils.judgeNull(this.schoolData.school_name)) {
        utils.showToast({ text: "请输入营区名字" });
      } else if (!utils.judgePhoneNumber(this.schoolData.phone)) {
        utils.showToast({ text: "请检查输入的电话号码" });
      } else if (this.schoolData.city.cityCode.length === 0) {
        utils.showToast({ text: "请选择营区所在城市" });
      } else if (!utils.judgeNull(this.schoolData.address)) {
        utils.showToast({ text: "请输入营区详细地址" });
      } else if (this.schoolData.imgs.length === 0) {
        utils.showToast({ text: "请至少上传一张营区的照片" });
      } else {
        this.schoolData.city.areas = [];
        this.$utils.query(".area-selected-trigger").forEach(item => {
          this.schoolData.city.areas.push(item.innerHTML);
        });
        this.schoolData.imgs.forEach((item, index) => {
          if (item.response) {
            this.schoolData.imgs[index] = {
              name: item.response.data.fileName,
              url: item.response.data.path
            };
          }
        });
        this.addSchool();
      }
    },
    //发送添加营区请求
    addSchool() {
      this.$axios.post("/admin/school/manage", this.schoolData).then(res => {
        if (res.data.code === 0) {
          this.schoolData = this.$utils.store.get("defaultData");
          if (this.editOnOff) this.$router.replace("/home/school/list");
        }
      });
    }
  }
};
</script>

<style>
.upload-img-list .el-upload {
  text-align: left;
}
</style>
