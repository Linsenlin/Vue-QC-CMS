<template>
  <div class="admin-list">
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>请选择轮播图位置：</span>
        <div>
          <el-select
            v-model="addBannerData.type"
            placeholder="请选择轮播图类型"
            class="w300"
            @change="changeType"
          >
            <el-option label="首页" :value="0"></el-option>
            <el-option label="营区" :value="1"></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>请选择轮播图类型：</span>
        <div>
          <el-select
            v-model="addBannerData.model"
            placeholder="请选择轮播图类型"
            @change="changeModel"
            class="w300"
          >
            <el-option
              v-for="(item,index) of bannerModel"
              :key="index"
              :label="item.name"
              :value="item.model"
              v-show="addBannerData.type!==1||item.model!==2"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span v-show="addBannerData.model===1">请选择课程：</span>
        <span v-show="addBannerData.model===2">请选择活动：</span>
        <span v-show="addBannerData.model===3">请选择新闻：</span>
        <div>
          <search @search="searchBanner" width="100%"></search>
          <el-select v-model="addBannerData.course_id" placeholder="请先搜索然后选择" class="w300 mt15">
            <el-option
              v-for="(item,index) of searchList"
              :key="index"
              :label="addBannerData.model===1?item.name:item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span class>上传轮播图：</span>
        <div>
          <el-upload
            class="upload upload1"
            action="/upload"
            :data="{type:6}"
            :show-file-list="false"
            :on-success="uploadSucess"
          >
            <img v-if="addBannerData.img" :src="addBannerData.img" class="upload-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="hint-text">建议宽高：15:8 ( 375px : 200px )</p>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="addBanner" round>确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //添加banner数据
      addBannerData: {
        state: 1, // 1添加 2删除 3编辑
        type: 0, //0首页 1营区
        img: "",
        course_id: "", // 关联的课程、活动、新闻ID
        school_id: "", //校区id
        model: 1 //1课程2活动3新闻
      },
      bannerModel: [
        {
          name: "课程",
          model: 1
        },
        {
          name: "活动",
          model: 2
        },
        {
          name: "新闻",
          model: 3
        }
      ],
      searchList: [] //搜索返回的列表
    };
  },
  methods: {
    //添加轮播的位置改变
    changeType() {
      this.addBannerData.model = 1;
      this.changeModel();
    },
    //轮播图类型改变
    changeModel() {
      this.searchList = [];
      this.addBannerData.course_id = "";
    },
    //图片上传成功
    uploadSucess(res) {
      if (res.code === 0) {
        this.addBannerData.img = res.data.path;
      }
    },
    //搜索banner图类型列表
    searchBanner(keyword) {
      if (this.$utils.judgeNull(keyword)) {
        let url = "/admin/course/list";
        if (this.addBannerData.model === 2) {
          url = "/admin/activity/list";
        } else if (this.addBannerData.model === 3) {
          url = "/admin/news/list";
        }
        this.$axios
          .get(`${url}?key=${keyword}&page=1&pageSize=100`)
          .then(res => {
            if (res.data.code === 0) {
              this.searchList = res.data.data.list;
            }
          });
      }
    },
    //添加banner
    addBanner() {
      if (typeof this.addBannerData.course_id !== "number") {
        this.$utils.showToast({ text: "请选择添加轮播图内容" });
      } else if (!this.$utils.judgeNull(this.addBannerData.img)) {
        this.$utils.showToast({ text: "请上传轮播图" });
      } else {
        this.searchList.forEach(item => {
          if (item.id === this.addBannerData.course_id) {
            this.addBannerData.school_id = item.school_id;
          }
        });
        this.$axios.post("/admin/banner/set", this.addBannerData).then(res => {
          if (res.data.code === 0) {
            this.$utils.showToast({ text: "添加成功" });
          }
        });
      }
    }
  },
  components: {
    search: () => import("@/components/public/search.vue")
  }
};
</script>
<style scoped>
.agrms-list .search-wrap {
  margin: 0;
}
</style>
