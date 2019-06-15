<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择购买课程：</span>
        <div>
          <search @search="search($event,'/admin/course/list','curriculumList')" width="100%"></search>
          <el-select
            v-model="addStudentData.course_id"
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
        <span>购买日期：</span>
        <div>
          <el-date-picker
            v-model="addStudentData.join_time"
            type="date"
            placeholder="选择日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>购买学员：</span>
        <div>
          <search @search="search($event,'/admin/student/list','searchStudentList')" width="100%"></search>
          <el-select v-model="addStudentData.user_id" placeholder="请先搜索学员然后选择" class="w300">
            <el-option
              v-for="(item,index) of searchStudentList"
              :key="index"
              :label="item.user_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <div class="btn-wrap">
          <el-button type="primary" class="btn" @click="addStudent" round>确认</el-button>
        </div>
      </li>
      <li class="clearfix">
        <span>已购买此课程的学员：</span>
        <div class="now-student">
          <a
            class="el-icon-delete"
            v-for="(item,index) of nowStudent"
            :key="index"
            @click="deleteStudent(item.id)"
          >
            <span>{{item.user_name}}</span>
            <em>{{item.join_time}}</em>
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
      //添加目录数据
      addStudentData: {
        course_id: "", //课程id
        school_id: "", //营区id
        join_time: "", //日期
        user_id: "" //学员id
      },
      searchStudentList: [], //搜索学员
      curriculumList: [], //课程列表
      nowStudent: [] //已购买学员
    };
  },

  methods: {
    //搜索课程/学员
    search(keyword, url, list) {
      if (this.$utils.judgeNull(keyword)) {
        this.$axios
          .get(`${url}?key=${keyword}&page=1&pageSize=100`)
          .then(res => {
            if (res.data.code === 0) this[list] = res.data.data.list;
          });
      }
    },
    //获取课程信息
    getCurriculumData(id) {
      this.$axios.get(`/admin/course/info?course_id=${id}`).then(res => {
        if (res.data.code !== 0) return;
        this.nowStudent = res.data.data.members;
        this.addStudentData.school_id = res.data.data.school_id;
      });
    },
    //添加学员
    addStudent() {
      if (typeof this.addStudentData.course_id !== "number") {
        this.$utils.showToast({ text: "请选择添加日程的课程" });
      } else if (!this.$utils.judgeNull(this.addStudentData.join_time)) {
        this.$utils.showToast({ text: "请选择日期" });
      } else if (typeof this.addStudentData.user_id !== "number") {
        this.$utils.showToast({ text: "请选择添加的学员" });
      } else {
        this.$axios
          .post("/admin/course/joinUser", this.addStudentData)
          .then(res => {
            if (res.data.code !== 0) return;
            this.$utils.showToast({ text: "添加成功" });
            this.getCurriculumData(this.addStudentData.course_id);
          });
      }
    },
    //删除目录
    deleteStudent(id) {
      this.$confirm(`此操作将永久删除该学员, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$axios.post("/admin/course/delUser", { id });
        })
        .then(res => {
          if (res.data.code !== 0) return;
          this.$utils.showToast({ text: "删除成功" });
          this.getCurriculumData(this.addStudentData.course_id);
        })
        .catch(() => {});
    }
  },
  components: {
    search: () => import("@/components/public/search.vue")
  }
};
</script>

<style>
.agrms-list .search-wrap {
  margin: 0 0 15px !important;
}
.agrms-list .now-student {
  width: 750px;
}
.now-student a {
  float: left;
  padding: 5px 40px 5px 15px;
  line-height: 18px;
  background: #409eff;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  margin: 0 10px 10px 0;
}
.now-student a:hover {
  background: red;
}
.now-student a * {
  display: block;
  color: #fff;
  line-height: 15px;
}

.now-student a span {
  font-size: 14px;
}
.now-student a em {
  font-size: 12px;
}

.el-icon-delete:before {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}
.btn-wrap {
  width: 100% !important;
}
</style>
