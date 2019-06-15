<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择营区：</span>
        <div>
          <selectSchool @changeSchool="changeSchool" :school_id="curriculumData.school_id"></selectSchool>
        </div>
      </li>
      <li class="clearfix">
        <span>课程名字：</span>
        <div>
          <el-input v-model="curriculumData.name" placeholder="请输入课程名" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class>课程略缩图：</span>
        <div>
          <el-upload
            class="upload"
            action="/upload"
            :data="{type:3}"
            :show-file-list="false"
            :on-success="res => uploadSucess(res,'img')"
          >
            <img v-if="curriculumData.img" :src="curriculumData.img" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </li>
      <li class="clearfix">
        <span class>课程主图：</span>
        <div>
          <el-upload
            class="upload upload1"
            action="/upload"
            :data="{type:3}"
            :show-file-list="false"
            :on-success="res => uploadSucess(res,'main_img')"
          >
            <img v-if="curriculumData.main_img" :src="curriculumData.main_img" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </li>
      <li class="clearfix">
        <span>请选择课程类型：</span>
        <div>
          <el-select v-model="curriculumData.model" placeholder="请选择课程类型" class="w300">
            <el-option
              v-for="(item,index) of typeList"
              :key="index"
              :label="item.name"
              :value="item.model"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>课程开始时间：</span>
        <div>
          <el-date-picker
            v-model="curriculumData.start_time"
            type="date"
            placeholder="选择开始日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>课程结束时间：</span>
        <div>
          <el-date-picker
            v-model="curriculumData.end_time"
            type="date"
            placeholder="选择结束日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>课程价格：</span>
        <div>
          <el-input v-model="curriculumData.money" placeholder="请输入课程价格" class="w300" clearable></el-input>
          <em>&nbsp;&nbsp; 元</em>
        </div>
      </li>
      <li class="clearfix">
        <span>所在城市：</span>
        <div>
          <area-select
            v-model="curriculumData.location.cityCode"
            :level="2"
            :data="pcaa"
            :placeholders="['请选择省份','请选择市','请选择区县']"
            size="small"
          ></area-select>
        </div>
      </li>
      <li class="clearfix">
        <span>课程详细地址：</span>
        <div>
          <el-input v-model="curriculumData.address" placeholder="请输入详细地址" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>课程内容:</span>
        <div class="quill-editor-wrap">
          <quill-editor :options="editorOption" v-model="curriculumData.content"></quill-editor>
        </div>
      </li>
      <li class="clearfix">
        <span>课程适应人群：</span>
        <div>
          <el-input v-model="curriculumData.suit" placeholder="请输入课程适应人群" clearable></el-input>
        </div>
      </li>

      <li class="clearfix">
        <span>注意事项-说明:</span>
        <div>
          <el-input
            type="textarea"
            v-model="curriculumData.instruct"
            placeholder="请输入注意事项-说明"
            :rows="2"
          ></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>注意事项-运动装备:</span>
        <div>
          <el-input
            type="textarea"
            v-model="curriculumData.equipment"
            placeholder="请输入注意事项-运动装备"
            :rows="2"
          ></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>注意事项-说明:</span>
        <div>
          <el-input
            type="textarea"
            v-model="curriculumData.facilities"
            placeholder="请输入注意事项-设施"
            :rows="2"
          ></el-input>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="judgeCurriculumData" round>确认</el-button>
    </div>
  </div>
</template>
<script>
import pcaa from "area-data/pcaa";
import { Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);

export default {
  data() {
    return {
      pcaa, //城市数据
      //添加新闻数据
      curriculumData: {
        school_id: "",
        name: "",
        img: "",
        main_img: "", //主图
        model: 0, //课程类型
        start_time: "",
        end_time: "",
        money: "",
        location: { cityCode: [], areas: [] }, //所在城市
        address: "",
        content: "",
        suit: "", //适应人群
        instruct: "", //注意事项-说明
        equipment: "", //注意事项-运动装备
        facilities: "", //注意事项-设施
        type: 1 //1添加 2修改 3删除
      },
      schoolList: [], //校区列表
      //课程类型列表
      typeList: [
        {
          name: "兴趣班",
          model: 0
        },
        {
          name: "提高班",
          model: 1
        },
        {
          name: "梯队班",
          model: 2
        }
      ],
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
              formData.append("type", 3);
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
    this.$utils.store.set("defaultData", this.curriculumData);
    this.editOnOff =
      this.$route.path === "/home/curriculum/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      for (let key in this.curriculumData) {
        this.curriculumData[key] = editData[key];
      }
      this.curriculumData.id = editData.id;
      this.curriculumData.type = 2;
    }
  },
  methods: {
    //选择校区
    changeSchool(id) {
      this.curriculumData.school_id = id;
    },
    //图片上传成功
    uploadSucess(res, agrms) {
      if (res.code === 0) this.curriculumData[agrms] = res.data.path;
    },
    //添加课程
    judgeCurriculumData() {
      const utils = this.$utils;
      if (typeof this.curriculumData.school_id !== "number") {
        utils.showToast({ text: "请选择营区" });
      } else if (!utils.judgeNull(this.curriculumData.name)) {
        utils.showToast({ text: "请输入课程名字" });
      } else if (!utils.judgeNull(this.curriculumData.img)) {
        utils.showToast({ text: "请上传课程略缩图" });
      } else if (!utils.judgeNull(this.curriculumData.main_img)) {
        utils.showToast({ text: "请上传课程主图" });
      } else if (!utils.judgeNull(this.curriculumData.start_time)) {
        utils.showToast({ text: "请选择课程开始时间" });
      } else if (!utils.judgeNull(this.curriculumData.end_time)) {
        utils.showToast({ text: "请选择课程结束时间" });
      } else if (!utils.judgeNull(this.curriculumData.money)) {
        utils.showToast({ text: "请输入课程费用" });
      } else if (this.curriculumData.location.cityCode.length === 0) {
        utils.showToast({ text: "请输入选择所在城市" });
      } else if (!utils.judgeNull(this.curriculumData.address)) {
        utils.showToast({ text: "请输入地址" });
      } else if (!utils.judgeNull(this.curriculumData.content)) {
        utils.showToast({ text: "请输入课程内容介绍" });
      } else if (!utils.judgeNull(this.curriculumData.suit)) {
        utils.showToast({ text: "请输入课程适应人群" });
      } else if (!utils.judgeNull(this.curriculumData.instruct)) {
        utils.showToast({ text: "请输入课程注意事项" });
      } else if (!utils.judgeNull(this.curriculumData.equipment)) {
        utils.showToast({ text: "请输入课程运动装备" });
      } else if (!utils.judgeNull(this.curriculumData.facilities)) {
        utils.showToast({ text: "请输入课程设施" });
      } else {
        this.addCurriculum();
      }
    },
    //发送添加课程请求
    addCurriculum() {
      const style = "max-width:100%;word-wrap:break-word;";
      this.$utils.setQuillStyle("p", style);
      this.$utils.setQuillStyle("img", style);
      this.curriculumData.content = this.$utils.query(
        ".ql-editor"
      )[0].innerHTML;
      this.curriculumData.location.areas = [];
      this.$utils.query(".area-selected-trigger").forEach(item => {
        this.curriculumData.location.areas.push(item.innerHTML);
      });
      this.$axios
        .post("/admin/course/manage", this.curriculumData)
        .then(res => {
          if (res.data.code !== 0) return;
          this.curriculumData = this.$utils.store.get("defaultData");
          if (this.editOnOff) this.$router.replace("/home/curriculum/list");
        });
    }
  },
  components: {
    selectSchool: () => import("@/components/public/selectSchool.vue")
  }
};
</script>

<style scoped>
.agrms-list .search-wrap {
  margin: 0 0 15px;
}
</style>
