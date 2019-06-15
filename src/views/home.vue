<template>
  <div class="home">
    <div class="home-head clearfix">
      <img src="../assets/img/logo_03.png" class="logo">
      <h1 class="title">
        千辰体育
        <em>后台管理系统</em>
      </h1>
      <div class="user">
        <p>{{userInfo.user_name}}，你好</p>
        <a @click="signOut">退出</a>
      </div>
    </div>
    <div class="main clearfix">
      <ul class="leftNav">
        <li v-if="userInfo.is_super===1">
          <router-link to="/home/admin" active-class="active">管理员</router-link>
        </li>
        <li v-for="(item,index) of leftNav" :key="index">
          <router-link :to="item.url" active-class="active">{{item.text}}</router-link>
        </li>
      </ul>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //左边导航
      leftNav: [
        {
          text: "轮播图管理",
          url: "/home/banner"
        },
        {
          text: "活动管理",
          url: "/home/activity"
        },
        {
          text: "教练管理",
          url: "/home/teacher"
        },
        {
          text: "营区管理",
          url: "/home/school"
        },
        {
          text: "课程管理",
          url: "/home/curriculum"
        },
        {
          text: "头条新闻管理",
          url: "/home/news"
        },
        {
          text: "订单管理",
          url: "/home/orderForm"
        },
        {
          text: "学员管理",
          url: "/home/student"
        }
      ],
      userInfo: {} //用户信息
    };
  },
  beforeMount() {
    this.$axios.get(`/admin/user/info`).then(res => {
      if (res.data.code === 0) {
        this.$store.commit("setAdmin", res.data.data);
        this.userInfo = res.data.data;
      } else if (res.data.code === 100013 || res.data.code === 400) {
        this.$utils.showToast({ text: "登录已失效，请重新登录" }).then(() => {
          this.$router.replace("/signIn");
        });
      }
    });
  },
  methods: {
    //退出登录
    signOut() {
      this.$router.replace("/signIn");
      this.$utils.store.clear();
    }
  }
};
</script>
<style scoped>
.logo {
  float: left;
}
.home {
  width: 100vw;
  height: 100vh;
  background: #00205d;
}
.home-head {
  padding: 10px 30px;
}
.title {
  float: left;
  font-size: 22px;
  color: #0084d2;
  letter-spacing: 2px;
  line-height: 80px;
  margin-left: 20px;
}
.title em {
  color: #fb9337;
}

.user {
  float: right;
  margin-top: 25px;
}

.user * {
  float: left;
  color: #fff;
  line-height: 30px;
  margin-right: 15px;
}

.user p {
  font-size: 14px;
}

.user a {
  font-size: 12px;
  padding: 0 20px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.3);
}
.main {
  height: calc(100vh - 100px);
}
.leftNav {
  float: left;
  width: 12%;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 70px;
}
.leftNav li a {
  color: #fff;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 14px;
}

.leftNav li .active {
  background: rgba(0, 32, 93, 0.6);
}

.leftNav li:nth-of-type(n + 2) a {
  border-top: 1px solid #333;
}

.right {
  float: right;
  background: #fff;
  min-height: 100%;
  width: 88%;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: scroll;
  max-height: calc(100vh - 100px);
}
</style>

