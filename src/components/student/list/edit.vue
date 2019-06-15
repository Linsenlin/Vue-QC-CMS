<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>惯用脚：</span>
        <div>
          <el-select v-model="studentData.idiomatic_feet">
            <el-option label="左脚" :value="0"></el-option>
            <el-option label="右脚" :value="1"></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>逆足能力：</span>
        <div>
          <el-select v-model="studentData.inverse_foot">
            <el-option v-for="(item,index) of 5" :key="index" :label="`${index+1}星`" :value="index"></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix">
        <span>花式技巧：</span>
        <div>
          <el-select v-model="studentData.fancy_tricks">
            <el-option v-for="(item,index) of 5" :key="index" :label="`${index+1}星`" :value="index"></el-option>
          </el-select>
        </div>
      </li>
    </ul>
    <div v-for="(item,index) of studentDataList" :key="index">
      <p class="title">{{item.title}}</p>
      <ul class="agrms-list w600">
        <li class="clearfix" v-for="(itemChild,indexChild) of item.reqData" :key="indexChild">
          <span>{{itemChild.name}}：</span>
          <div>
            <el-input v-model="studentData[itemChild.key]" placeholder="请输入数值" clearable></el-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="editData" round>确认保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //学员技能参数
      studentData: {
        user_id: "", //学员id
        idiomatic_feet: "", //惯用脚
        inverse_foot: "", //逆足能力
        fancy_tricks: "" //花式技巧
      },
      studentDataList: [
        {
          title: "进攻",
          reqData: [
            {
              name: "传中",
              key: "cross"
            },
            {
              name: "射门",
              key: "shots"
            },
            {
              name: "头球",
              key: "head_home"
            }
          ]
        },
        {
          title: "技巧",
          reqData: [
            {
              name: "盘带",
              key: "dribbling"
            },
            {
              name: "弧线",
              key: "arc"
            },
            {
              name: "任意球",
              key: "free_kick"
            },
            {
              name: "长传",
              key: "long_pass"
            },
            {
              name: "控球",
              key: "ball_control"
            }
          ]
        },
        {
          title: "移动",
          reqData: [
            {
              name: "加速",
              key: "speed_up"
            },
            {
              name: "速度",
              key: "speed"
            },
            {
              name: "敏捷",
              key: "agility"
            },
            {
              name: "反应",
              key: "reaction"
            },
            {
              name: "平衡",
              key: "balance"
            }
          ]
        },
        {
          title: "力量",
          reqData: [
            {
              name: "射门力量",
              key: "shooting_power"
            },
            {
              name: "弹跳",
              key: "bounce"
            },
            {
              name: "耐力",
              key: "endurance"
            },
            {
              name: "强壮",
              key: "strong"
            },
            {
              name: "远射",
              key: "long_shot"
            }
          ]
        },
        {
          title: "心理",
          reqData: [
            {
              name: "侵略性",
              key: "aggressivity"
            },
            {
              name: "拦截意识",
              key: "Intercept_consciousness"
            },
            {
              name: "跑位",
              key: "positioning"
            },
            {
              name: "视野",
              key: "view"
            },
            {
              name: "点球",
              key: "penalty_kick"
            }
          ]
        },
        {
          title: "防守",
          reqData: [
            {
              name: "盯人",
              key: "marking"
            },
            {
              name: "抢断",
              key: "stealing"
            },
            {
              name: "铲球",
              key: "tackling_tackles"
            }
          ]
        },
        {
          title: "守门",
          reqData: [
            {
              name: "鱼跃",
              key: "fish_dive"
            },
            {
              name: "手型",
              key: "hand_shape"
            },
            {
              name: "开球",
              key: "open_ball"
            },
            {
              name: "站位",
              key: "stance"
            },
            {
              name: "反应",
              key: "response"
            }
          ]
        },
        {
          title: "不同位置的能力值",
          reqData: [
            {
              name: "左边锋",
              key: "left_wing"
            },
            {
              name: "中锋",
              key: "center_wing"
            },
            {
              name: "右边锋",
              key: "right_wing"
            },
            {
              name: "影锋",
              key: "secondstriker"
            },
            {
              name: "左中场",
              key: "left_midfield"
            },
            {
              name: "前腰",
              key: "short_loin"
            },
            {
              name: "右中场",
              key: "right_midfield"
            },
            {
              name: "中前卫",
              key: "centre_halfback"
            },
            {
              name: "左翼卫",
              key: "who_left"
            },
            {
              name: "后腰",
              key: "back_loin"
            },
            {
              name: "右翼卫",
              key: "who_right"
            },
            {
              name: "中后卫",
              key: "center_quarter"
            },
            {
              name: "左后卫",
              key: "left_quarter"
            },
            {
              name: "守门员",
              key: "goalkeeper"
            },
            {
              name: "右后卫",
              key: "right_quarter"
            }
          ]
        }
      ]
    };
  },
  //初始化请求数据
  beforeMount() {
    this.studentDataList.forEach(item => {
      item.reqData.forEach(itemChild => {
        this.$set(this.studentData, itemChild.key, 0);
      });
    });
    this.$axios
      .get(
        `/admin/student/bodydata?user_id=${
          this.$utils.store.get("editData").id
        }`
      )
      .then(res => {
        if (res.data.code === 0) {
          for (let key in this.studentData) {
            this.studentData[key] = res.data.data[key];
          }
        }
      });
  },
  methods: {
    //确认修改
    editData() {
      this.$axios
        .post("/admin/student/setbodydata", this.studentData)
        .then(res => {
          if (res.data.code === 0) {
            this.$utils.showToast({ text: "修改成功" });
            this.$router.replace("/home/student/list");
          }
        });
    }
  },
  components: {}
};
</script>
<style scoped>
.agrms-list {
  margin: 0 auto;
}
.agrms-list li div {
  width: 200px;
}
.title {
  line-height: 40px;
  font-size: 20px;
  padding: 15px 0 0 30px;
}

.btn-wrap {
  position: fixed;
  right: 10vw;
  top: 50%;
}

.btn {
  width: 200px;
}
</style>
