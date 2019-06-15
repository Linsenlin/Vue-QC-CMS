<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>用户：</span>
        <div>
          <el-input v-model="adminData.username" placeholder="请输入用户名" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>密码：</span>
        <div>
          <el-input v-model="adminData.password" placeholder="请输入密码" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>是否启用：</span>
        <div>
          <el-switch v-model="adminData.enable" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="addAdmin" round>确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //添加管理员数据
      adminData: {
        username: "",
        password: "",
        enable: false,
        is_super: 0,
        type: 1
      },
      editOnOff: false //是否是修改
    };
  },
  //初始化
  beforeMount() {
    this.$utils.store.set("adminData", this.adminData);
    this.editOnOff =
      this.$route.path === "/home/admin/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      this.adminData.username = editData.user_name;
      this.adminData.enable = Boolean(editData.enable);
      this.adminData.id = editData.id;
      this.adminData.type = 2;
    }
  },
  methods: {
    //添加管理员
    addAdmin() {
      if (!this.$utils.judgeNull(this.adminData.username)) {
        this.$utils.showToast({ text: "请输入管理员名字" });
      } else if (!this.$utils.judgeNull(this.adminData.password)) {
        this.$utils.showToast({ text: "请输入密码" });
      } else {
        this.adminData.enable = Number(this.adminData.enable);
        this.$axios.post("/admin/manage", this.adminData).then(res => {
          if (res.data.code === 0) {
            this.$utils.showToast({ text: "操作成功" });
            this.adminData = this.$utils.store.get("adminData");
            if (this.editOnOff) this.$router.replace("/home/admin/list");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.agrms-list li div {
  width: 200px;
}
</style>
