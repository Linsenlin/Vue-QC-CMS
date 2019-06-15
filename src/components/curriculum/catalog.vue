<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择课程：</span>
        <div>
          <search @search="search" width="100%"></search>
          <el-select
            v-model="addCatalogData.course_id"
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
        <span>选择日期：</span>
        <div>
          <el-date-picker
            v-model="addCatalogData.day"
            type="date"
            placeholder="选择日期"
            :editable="false"
            class="w300"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </li>
      <li class="clearfix">
        <span>选择课程时间范围：</span>
        <div>
          <el-time-picker
            is-range
            v-model="time_range"
            value-format="HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-time-picker>
        </div>
      </li>
      <li class="clearfix">
        <div class="btn-wrap">
          <el-button type="primary" class="btn" @click="judgeCatalog" round>确认</el-button>
        </div>
      </li>
      <li class="clearfix">
        <span>已添加课程目录：</span>
        <div>
          <ul class="catalog-list">
            <li class="clearfix" v-for="(item,index) of catalogList" :key="index">
              <em class="el-icon-date"></em>
              <a @click.stop="editCatalog(index)">
                {{item.day}} {{item.start_time}} - {{item.end_time}}
                <i
                  class="el-icon-delete"
                  @click.stop="deleteCatalog(item.id)"
                ></i>
              </a>
              <span class="watch-sign-in" @click="showSignIn(index)">学员签到</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- 修改日程 -->
    <el-dialog title="修改日程" :visible.sync="editOnOff" @close="close">
      <div>
        <el-date-picker
          v-model="addCatalogData.day"
          type="date"
          placeholder="选择日期"
          :editable="false"
          class="w300"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div>
        <el-time-picker
          is-range
          v-model="time_range"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="mt15"
        ></el-time-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOnOff = false">取 消</el-button>
        <el-button type="primary" @click="judgeCatalog">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 学员签到 -->
    <el-dialog title="学员签到" :visible.sync="signInOnOff">
      <div class="student-sign-in">
        <el-checkbox-group v-model="signData.users">
          <el-checkbox
            v-for="(item,index) of signInList"
            :key="index"
            :label="item.user_id"
          >{{item.user_name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signInOnOff = false">取 消</el-button>
        <el-button type="primary" @click.native="setStudentSignIn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //添加目录数据
      addCatalogData: {
        course_id: "", //课程id
        school_id: "", //营区id
        day: "", //日期
        start_time: "", //开始时间
        end_time: "", //结束时间
        id: "",
        model: 1 //1添加 2修改 3删除
      },
      curriculumList: [], //课程列表
      catalogList: [], //目录列表
      time_range: "", //时间范围
      editOnOff: false, //是否是修改
      signInOnOff: false, //签到情况弹窗开关
      signInList: [], //签到的学员列表
      signData: {
        outline_id: "",
        users: []
      }
    };
  },
  methods: {
    //设置学员签到
    setStudentSignIn() {
      this.$axios.post("/admin/course/call", this.signData).then(res => {
        if (res.data.code !== 0) return;
        this.$utils.showToast({ text: "设置成功" });
        this.signInOnOff = false;
        this.getCurriculumData(this.addCatalogData.course_id);
      });
    },
    //显示学员签到
    showSignIn(index) {
      this.signInOnOff = true;
      this.signInList = this.catalogList[index].buy_members;
      this.signData.users = [];
      this.signInList.forEach(item => {
        if (item.is_called === 1) this.signData.users.push(item.user_id);
      });
      this.signData.outline_id = this.catalogList[index].id;
    },
    //搜索课程
    search(keyword) {
      if (this.$utils.judgeNull(keyword)) {
        this.$axios
          .get(`/admin/course/list?key=${keyword}&page=1&pageSize=100`)
          .then(res => {
            if (res.data.code === 0) this.curriculumList = res.data.data.list;
          });
      }
    },
    //获取课程信息
    getCurriculumData(id) {
      this.$axios.get(`/admin/course/info?course_id=${id}`).then(res => {
        if (res.data.code !== 0) return;
        this.catalogList = res.data.data.outline;
        this.addCatalogData.school_id = res.data.data.school_id;
      });
    },
    //添加日程
    judgeCatalog() {
      const utils = this.$utils;
      if (typeof this.addCatalogData.course_id !== "number") {
        utils.showToast({ text: "请选择添加日程的课程" });
      } else if (!utils.judgeNull(this.addCatalogData.day)) {
        utils.showToast({ text: "请选择日期" });
      } else if (typeof this.time_range === "string") {
        utils.showToast({ text: "请选择时间范围" });
      } else {
        this.addCatalogData.start_time = this.time_range[0];
        this.addCatalogData.end_time = this.time_range[1];
        this.addCatalogData.model = this.editOnOff ? 2 : 1;
        this.$axios
          .post("/admin/course/manageOutline", this.addCatalogData)
          .then(res => {
            if (res.data.code !== 0) return;
            this.$utils.showToast({ text: "操作成功" });
            this.getCurriculumData(this.addCatalogData.course_id);
            this.editOnOff = false;
          });
      }
    },
    //修改目录
    editCatalog(index) {
      const oldData = this.catalogList[index];
      for (let key in this.addCatalogData) {
        if (oldData[key]) {
          this.addCatalogData[key] = oldData[key];
        }
      }
      this.time_range = [oldData.start_time, oldData.end_time];
      this.editOnOff = true;
    },
    //删除目录
    deleteCatalog(id) {
      this.$confirm(`此操作将永久删除该日程, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$axios.post("/admin/course/manageOutline", {
            id,
            model: 3
          });
        })
        .then(res => {
          if (res.data.code !== 0) return;
          this.$utils.showToast({ text: "删除成功" });
          this.getCurriculumData(this.addCatalogData.course_id);
        })
        .catch(() => {});
    },
    //关闭弹窗
    close() {
      this.editOnOff = false;
      this.addCatalogData.day = this.addCatalogData.time_range = "";
      this.time_range = "";
    }
  },
  components: {
    search: () => import("@/components/public/search.vue")
  }
};
</script>

<style>
.catalog-list .watch-sign-in {
  float: right;
  cursor: pointer;
  padding-right: 10px;
}

.catalog-list .watch-sign-in:hover {
  color: #409eff;
}

.agrms-list .search-wrap {
  margin: 0 0 15px !important;
}

.catalog-list > li:nth-of-type(n + 2) {
  border-top: 1px dashed #d2d2d2;
}
.catalog-list li * {
  float: left;
}
.catalog-list > li {
  overflow: hidden;
}
.catalog-list li em {
  color: #999;
  width: 10%;
  text-align: center;
  line-height: 40px;
}
.catalog-list li a {
  box-sizing: border-box;
  width: 60%;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.catalog-list li a i {
  float: right;
  line-height: 40px;
  padding: 0 10px;
}
.catalog-list li a i:hover {
  color: red;
}
.catalog-child {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 10px 10%;
  display: none;
}
.catalog-child li {
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
.catalog-child li a,
.catalog-child li em,
.catalog-child li .el-icon-delete {
  line-height: 30px;
}
.catalog-child li em {
  width: unset;
}
.catalog-child li a span {
  width: 100%;
  font-size: 12px;
  line-height: 20px;
}

.display-block {
  display: block !important;
}

.btn-wrap {
  width: 100% !important;
}
.el-checkbox {
  width: 25%;
  margin-left: 0 !important;
  line-height: 30px;
}
</style>
