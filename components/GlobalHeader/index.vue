<template>
  <div class="header">
    <i :class="{'icon-menu-fold': !isCollapse, 'icon-menu-unfold': isCollapse}" class="trigger" @click="handleTrigger"></i>
    <div v-if="loggedUser&&loggedUser.user" class="right">
      <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
        <div class="action">
          <span class="avatar">
            <img v-if="!loggedUser.user.avatar" src="~/assets/img/logo.png" width="32px" alt="avatar">
            <img v-else :src="loggedUser.user.avatar" alt="avatar">
          </span>
          <span class="name">{{ loggedUser.user.userName || 'Super 哈哈怪' }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isCollapse: this.collapse
    };
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  methods: {
    handleTrigger() {
      this.isCollapse = !this.isCollapse;
      this.$emit('update:collapse', this.isCollapse);
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('此操作将永久退出系统, 是否继续?', '提示', {
          closeOnClickModal: false,
          type: 'warning'
        })
          .then(() => {
            this.$store.commit('setLoggedUser', null);
            this.$message({
              type: 'success',
              message: '成功退出!'
            });
            this.$router.replace({ name: 'login' });
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.header {
  height: 64px;
  padding: 0 12px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  >>> {
    .icon-menu-fold {
      &:before {
        content: '\E9AC';
      }
    }
    .icon-menu-unfold {
      &:before {
        content: '\E9AD';
      }
    }
  }
}

.right {
  float: right;
  height: 100%;
}

.action {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  transition: all 0.3s;
  height: 100%;
  &:hover {
    background: #e6f7ff;
  }
}
i.trigger {
  font-size: 20px;
  line-height: 64px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
  padding: 0 24px;
  &:hover {
    background: #e6f7ff;
  }
}
.avatar {
  margin: 20px 8px 20px 0;
  color: #1890ff;
  background: hsla(0, 0%, 100%, 0.85);
  vertical-align: middle;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
