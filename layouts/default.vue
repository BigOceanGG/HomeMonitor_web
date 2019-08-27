<template>
  <el-container>
    <sider-menu :collapse.sync="collapse" />
    <el-container>
      <el-header>
        <global-header :collapse.sync="collapse" />
      </el-header>
      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import GlobalHeader from '~/components/GlobalHeader';
import SiderMenu from '~/components/SiderMenu';
export default {
  components: { GlobalHeader, SiderMenu },
  data() {
    return {
      collapse: false
    };
  }
};
</script>
<style lang="postcss" scoped>
.el-header {
  height: 64px !important;
  padding: 0;
  position: relative;
  z-index: 9;
}
.el-main {
  position: relative;
}
</style>
