<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择课程：</span>
        <div>
          <search @search="search($event,'/admin/course/list','curriculumList')" width="100%"></search>
          <el-select
            v-model="addTeacherData.course_id"
            placeholder="请先搜索课程然后选择"
            class="w300"
            @change="getCurriculumData"
          >
            <el-option
              v-for="(item,index) of curriculumList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>请选择教练：</span>
        <div>
          <search @search="search($event,'/admin/teacher/list','teacherList')" width="100%"></search>
          <el-select v-model="addTeacherData.teacher_id" placeholder="请先搜索教练然后选择" class="w300">
            <el-option
              v-for="(item,index) of teacherList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>请选择教练类型：</span>
        <div>
          <el-select v-model="addTeacherData.type" placeholder="请选择课程类型" class="w300">
            <el-option
              v-for="(item,index) of typeList"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <div class="btn-wrap">
          <el-button type="primary" class="btn" @click="addTeacher" round>确认</el-button>
        </div>
      </li>
      <li class="clearfix">
        <span>已添加的教练：</span>
        <div class="now-teachers">
          <a
            class="el-icon-delete"
            v-for="(item,index) of nowTeacher"
            :key="index"
            @click="deleteTeacher(item.teacher_id)"
          >
            <span>{{item.name}}</span>
            <em>{{item.type===0?'助教练':'主教练'}}</em>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //添加教练数据
      addTeacherData: {
        course_id: "", //课程id
        school_id: "", //校区id
        teacher_id: "", //教练id
        type: 1, //0助教1主教
        model: 1 //1添加 2编辑 3删除
      },
      curriculumList: [], //课程列表
      teacherList: [], //教练列表
      nowTeacher: [], //现在已添加的教练
      //教练类型
      typeList: [
        {
          name: "助教",
          type: 0
        },
        {
          name: "主教",
          type: 1
        }
      ]
    };
  },
  //初始化
  beforeMount() {},
  methods: {
    //搜索课程/教练
    search(keyword, url, list) {
      if (this.$utils.judgeNull(keyword)) {
        this.addTeacherData.teacher_id = "";
        this.$axios
          .get(`${url}?key=${keyword}&page=1&pageSize=100`)
          .then(res => {
            if (res.data.code === 0) this[list] = res.data.data.list;
          });
      }
    },
    //发送添加教练请求
    addTeacher() {
      if (typeof this.addTeacherData.course_id !== "number") {
        utils.showToast({ text: "请选择添加教练的课程" });
      } else if (typeof this.addTeacherData.teacher_id !== "number") {
        utils.showToast({ text: "请选择添加的教练" });
      } else {
        this.setTeacher(this.addTeacherData);
      }
    },
    //删除课程教练请求
    deleteTeacher(teacher_id) {
      this.setTeacher({
        course_id: this.addTeacherData.course_id,
        school_id: this.addTeacherData.school_id,
        teacher_id,
        model: 3
      });
    },
    //设置课程教练
    setTeacher(reqData) {
      this.$axios.post("/admin/course/manageTeacher", reqData).then(res => {
        if (res.data.code !== 0) return;
        this.getCurriculumData(this.addTeacherData.course_id);
      });
    },
    //获取课程信息
    getCurriculumData(id) {
      this.$axios.get(`/admin/course/info?course_id=${id}`).then(res => {
        if (res.data.code !== 0) return;
        this.nowTeacher = res.data.data.teachers;
        this.addTeacherData.school_id = res.data.data.school_id;
      });
    }
  },
  components: {
    search: () => import("@/components/public/search.vue")
  }
};
</script>

<style scoped>
.agrms-list .search-wrap {
  margin: 0 0 15px;
}

.now-teachers a {
  float: left;
  padding: 5px 40px 5px 15px;
  line-height: 18px;
  background: #409eff;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  margin: 0 10px 10px 0;
}
.now-teachers a:hover {
  background: red;
}
.now-teachers a * {
  display: block;
  color: #fff;
}

.now-teachers a span {
  font-size: 14px;
}
.now-teachers a em {
  font-size: 12px;
}

.el-icon-delete:before {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}
</style>
