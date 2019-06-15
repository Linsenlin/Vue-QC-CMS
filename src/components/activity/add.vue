<template>
  <div>
    <ul class="agrms-list">
      <li class="clearfix upload-item">
        <span>上传活动略缩图：</span>
        <div>
          <el-upload
            class="upload"
            action="/upload"
            :data="{type:4}"
            :show-file-list="false"
            :on-success="res => uploadSucess(res,'photo')"
          >
            <img v-if="activityData.photo" :src="activityData.photo" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="hint-text">任意宽高比：推荐1:1</p>
        </div>
      </li>
      <li class="clearfix upload-item1">
        <span>上传活动主图：</span>
        <div>
          <el-upload
            class="upload upload1"
            action="/upload"
            :data="{type:4}"
            :show-file-list="false"
            :on-success="res => uploadSucess(res,'img')"
          >
            <img v-if="activityData.img" :src="activityData.img" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="hint-text">任意宽高比</p>
        </div>
      </li>
      <li class="clearfix">
        <span>活动标题：</span>
        <div>
          <el-input v-model="activityData.title" placeholder="请输入活动标题" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>活动开始时间：</span>
        <div>
          <el-date-picker
            v-model="activityData.start_time"
            type="date"
            placeholder="选择开始日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>活动结束时间：</span>
        <div>
          <el-date-picker
            v-model="activityData.end_time"
            type="date"
            placeholder="选择结束日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>活动停止报名时间：</span>
        <div>
          <el-date-picker
            v-model="activityData.end_enroll"
            type="date"
            placeholder="选择停止报名日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>活动地址：</span>
        <div>
          <el-input v-model="activityData.address" placeholder="请输入活动地址" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>活动费用：</span>
        <div class="w300">
          <el-input v-model="activityData.money" placeholder="请输入活动费用" clearable></el-input>
        </div>
        <em>&nbsp;&nbsp; 元</em>
      </li>
      <li class="clearfix">
        <span>活动内容介绍：</span>
        <div class="quill-editor-wrap">
          <quill-editor :options="editorOption" v-model="activityData.content"></quill-editor>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="judgeActivityData" round>确认添加活动项目</el-button>
    </div>
  </div>
</template>
<script>
import { Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);

export default {
  data() {
    return {
      activityData: {
        photo: "", //略缩图
        img: "", //主图
        title: "",
        start_time: "", //活动开始时间
        end_time: "", //活动结束时间
        end_enroll: "", //结束报名时间
        address: "",
        money: "",
        content: "",
        type: 1
      },
      editOnOff: false, //是否是修改
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "/upload",
            response: res => {
              return res.data.path;
            },
            change: (xhr, formData) => {
              formData.append("type", 4);
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  //初始化
  beforeMount() {
    this.$utils.store.set("defaultData", this.activityData);
    this.editOnOff =
      this.$route.path === "/home/activity/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      for (let key in this.activityData) {
        this.activityData[key] = editData[key];
      }
      this.activityData.id = editData.id;
      this.activityData.type = 3;
    }
  },
  methods: {
    //图片上传成功
    uploadSucess(res, agrms) {
      if (res.code === 0) this.activityData[agrms] = res.data.path;
    },
    //判断输入的活动内容
    judgeActivityData() {
      const utils = this.$utils;
      if (!utils.judgeNull(this.activityData.photo)) {
        utils.showToast({ text: "请上传略缩图" });
      } else if (!utils.judgeNull(this.activityData.img)) {
        utils.showToast({ text: "请上传活动主图" });
      } else if (!utils.judgeNull(this.activityData.title)) {
        utils.showToast({ text: "请输入标题" });
      } else if (!utils.judgeNull(this.activityData.start_time)) {
        utils.showToast({ text: "请输入活动开始时间" });
      } else if (!utils.judgeNull(this.activityData.end_time)) {
        utils.showToast({ text: "请输入活动结束时间" });
      } else if (!utils.judgeNull(this.activityData.end_enroll)) {
        utils.showToast({ text: "请输入活动停止报名时间" });
      } else if (!utils.judgeNull(this.activityData.address)) {
        utils.showToast({ text: "请输入活动地址" });
      } else if (!utils.judgeNull(this.activityData.money)) {
        utils.showToast({ text: "请输入活动费用" });
      } else if (!utils.judgeNull(this.activityData.content)) {
        utils.showToast({ text: "请输入活动内容介绍" });
      } else {
        this.addActicity();
      }
    },
    //添加活动
    addActicity() {
      const style = "max-width:100%;word-wrap:break-word;";
      this.$utils.setQuillStyle("p", style);
      this.$utils.setQuillStyle("img", style);
      this.activityData.content = this.$utils.query(".ql-editor")[0].innerHTML;
      this.$axios
        .post("/admin/activity/manage", this.activityData)
        .then(res => {
          if (res.data.code !== 0) return;
          this.$utils.showToast({ text: "添加活动成功" });
          this.activityData = this.$utils.store.get("defaultData");
          if (this.editOnOff) this.$router.replace("/home/activity/list");
        });
    }
  }
};
</script>

<style scoped>
.agrms-list li .w300 {
  width: 300px;
}
</style>
