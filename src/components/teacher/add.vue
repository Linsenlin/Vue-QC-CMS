<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择营区：</span>
        <div>
          <selectSchool @changeSchool="changeSchool" :school_id="teacherData.school_id"></selectSchool>
        </div>
      </li>
      <li class="clearfix">
        <span>教练名：</span>
        <div>
          <el-input v-model="teacherData.name" placeholder="请输入名字" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class>教练头像：</span>
        <div>
          <el-upload
            class="upload"
            action="/upload"
            :data="{type:5}"
            :show-file-list="false"
            :on-success="uploadSucess"
          >
            <img v-if="teacherData.avatar" :src="teacherData.avatar" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="hint-text">建议宽高： 1 : 1</p>
        </div>
      </li>
      <li class="clearfix">
        <span>教练简介：</span>
        <div class="quill-editor-wrap">
          <quill-editor :options="editorOption" v-model="teacherData.instruction"></quill-editor>
        </div>
      </li>
      <li class="clearfix">
        <span>教龄：</span>
        <div>
          <el-input v-model="teacherData.experience" placeholder="请输入教龄：" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>职业生涯：</span>
        <div>
          <el-input
            type="textarea"
            v-model="teacherData.sport_exp"
            placeholder="请输入职业生涯事迹"
            :rows="5"
          ></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>技能：</span>
        <div>
          <el-input type="textarea" v-model="teacherData.skill" placeholder="请输入擅长技能" :rows="3"></el-input>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="judgeTeacherData" round>确认</el-button>
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
      //添加教龄数据
      teacherData: {
        school_id: "", //校区id
        name: "",
        avatar: "",
        instruction: "", //简介
        experience: "", //教龄
        sport_exp: "", //职业生涯
        skill: "", //技能
        type: 1 //1添加 2删除 3修改
      },
      editOnOff: false, //是否是修改
      schoolList: [], //校区列表
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
              formData.append("type", 5);
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
  // 初始化
  beforeMount() {
    this.$utils.store.set("defaultData", this.teacherData);
    this.editOnOff =
      this.$route.path === "/home/teacher/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      for (let key in this.teacherData) {
        this.teacherData[key] = editData[key];
      }
      this.teacherData.id = editData.id;
      this.teacherData.type = 2;
    }
  },
  methods: {
    //选择校区
    changeSchool(id) {
      this.teacherData.school_id = id;
    },
    //图片上传成功
    uploadSucess(res) {
      if (res.code === 0) this.teacherData.avatar = res.data.path;
    },
    //添加教练
    judgeTeacherData() {
      const utils = this.$utils;
      if (typeof this.teacherData.school_id !== "number") {
        utils.showToast({ text: "请选择校区" });
      } else if (!utils.judgeNull(this.teacherData.name)) {
        utils.showToast({ text: "请输入教练名字" });
      } else if (!utils.judgeNull(this.teacherData.avatar)) {
        utils.showToast({ text: "请上传教练头像" });
      } else if (!utils.judgeNull(this.teacherData.instruction)) {
        utils.showToast({ text: "请输入教练简介" });
      } else if (!utils.judgeNull(this.teacherData.experience)) {
        utils.showToast({ text: "请输入教龄" });
      } else if (!utils.judgeNull(this.teacherData.sport_exp)) {
        utils.showToast({ text: "请输入职业生涯说明" });
      } else if (!utils.judgeNull(this.teacherData.skill)) {
        utils.showToast({ text: "请输入擅长技能" });
      } else {
        this.addTeacher();
      }
    },
    //发送添加教练请求
    addTeacher() {
      const style = "max-width:100%;word-wrap:break-word;";
      this.$utils.setQuillStyle("p", style);
      this.$utils.setQuillStyle("img", style);
      this.teacherData.instruction = this.$utils.query(
        ".ql-editor"
      )[0].innerHTML;
      this.$axios.post("/admin/teacher/manage", this.teacherData).then(res => {
        if (res.data.code === 0) {
          this.teacherData = this.$utils.store.get("defaultData");
          if (this.editOnOff) this.$router.replace("/home/teacher/list");
        }
      });
    }
  },
  components: {
    selectSchool: () => import("@/components/public/selectSchool.vue")
  }
};
</script>

<style scoped>
.btn-wrap {
  text-align: right;
}
.agrms-list .search-wrap {
  margin: 0 auto 15px;
}
</style>
