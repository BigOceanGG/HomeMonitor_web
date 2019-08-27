<template>
  <el-aside :class="{'collapse': collapse}" class="sider" width="220px">
    <div class="logo">
      <nuxt-link to="/">
        <img src="~/assets/img/logo.png" width="64px" alt="logo">
        <h1>123通行证</h1>
      </nuxt-link>
    </div>
    <el-menu :default-active="defaultActive" :collapse="collapse" :router="true" :unique-opened="true" class="sider-menu">
      <template v-for="m in menuData">
        <el-submenu v-if="m.children&&m.children.length" :index="m.path" :key="m.path" popper-class="sider-submenu">
          <template slot="title">
            <i :class="'icon-'+m.icon"></i>
            <span slot="title">{{ m.name }}</span>
          </template>
          <el-menu-item v-for="n in m.children" :key="n.path" :index="n.path">
            {{ n.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="m.path" :key="m.path">
          <i :class="'icon-'+m.icon"></i>
          <span slot="title">{{ m.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
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
      defaultActive: ''
    };
  },
  computed: {
    ...mapGetters(['menuData'])
  },
  watch: {
    $route: function() {
      this.setDefaultActive();
    }
  },
  mounted() {
    this.setDefaultActive();
  },
  methods: {
    setDefaultActive() {
      this.$nextTick(() => {
        this.defaultActive = this.$route.path;
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;
  h1,
  img {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    height: 32px;
  }
  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
}
.sider {
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  &.collapse {
    width: 80px !important;
  }
  >>> {
    .el-menu--collapse {
      .el-menu-item {
        padding-left: 32px !important;
        .el-tooltip {
          padding-left: 32px !important;
        }
        i {
          font-size: 16px;
        }
      }
      .el-submenu__title {
        padding-left: 32px !important;
        i {
          font-size: 16px;
        }
      }
    }
  }
}

.el-menu {
  padding: 16px 0;
  border-right: none;
  background: #001529;
  width: 100%;
}

.el-aside {
  transition: all 0.2s;
  position: relative;
  background: #001529;
  min-width: 0;
}

.el-menu >>> .el-menu-item,
.el-menu >>> .el-menu-item i,
.el-submenu >>> .el-submenu__title,
.el-submenu >>> .el-submenu__title i {
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.3s;
}

.el-submenu >>> .el-submenu__title i,
.el-menu >>> .el-menu-item i {
  margin-right: 10px;
  font-size: 14px;
}

.el-submenu >>> .el-submenu__title:hover {
  background-color: transparent;
}

.el-menu >>> .el-menu-item:focus,
.el-menu >>> .el-menu-item:hover,
.el-submenu >>> .el-submenu__title:hover,
.el-submenu >>> .el-submenu__title:hover i,
.el-submenu.is-opened >>> .el-submenu__title,
.el-submenu.is-opened >>> .el-submenu__title i {
  color: white;
  background-color: transparent;
}

.el-menu >>> .el-menu-item:hover i {
  color: white;
}

.el-menu >>> .el-menu-item,
.el-menu >>> .el-submenu__title {
  height: 44px;
  line-height: 44px;
}

.el-menu >>> .el-menu-item.is-active,
.el-menu >>> .el-menu-item.is-active i,
.el-menu >>> .el-submenu.is-active,
.el-menu >>> .el-submenu.is-active i {
  color: white;
}

.el-menu >>> .el-menu {
  background: #000c17;
  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45) inset;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.45);
}

.el-menu >>> .el-menu .el-menu-item.is-active {
  background-color: #1890ff;
}
</style>
<style lang="postcss">
.sider-submenu {
  .el-menu {
    background: #001529;
    min-width: 160px;
    box-shadow: none;
    &-item {
      color: rgba(255, 255, 255, 0.65);
      height: 44px;
      line-height: 44px;
      &:focus,
      &:hover {
        color: white;
        background-color: transparent;
      }
      &.is-active {
        color: white;
        background-color: #1890ff;
      }
    }
  }
}
</style>
