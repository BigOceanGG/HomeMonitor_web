<template>
  <div style="margin: -20px -20px 0px;">
    <div v-if="breadcrumbData.length" class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <template v-for="n in breadcrumbData">
          <el-breadcrumb-item v-if="n.path" :key="n.name" :to="n.path">
            {{ n.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else :key="n.name">{{ n.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      breadcrumbData: 'getBreadcrumbData'
    })
  }
};
</script>

<style lang="postcss" scoped>
.page {
  &-header {
    background: #fff;
    padding: 16px 32px 0;
    border-bottom: 1px solid #e8e8e8;
    >>> {
      .el-breadcrumb {
        margin-bottom: 16px;
      }
      .el-breadcrumb__inner,
      .el-breadcrumb__inner a,
      .el-breadcrumb__inner.is-link {
        color: rgba(0, 0, 0, 0.45);
        transition: color 0.3s;
        font-weight: normal;
      }
      .el-breadcrumb__inner.is-link,
      .el-breadcrumb__inner a {
        &:hover {
          color: #40a9ff;
        }
      }
      .el-breadcrumb__separator {
        font-weight: normal;
        margin: 0 8px;
        color: rgba(0, 0, 0, 0.45);
      }
      .el-breadcrumb__item {
        white-space: nowrap;
        &:last-child {
          .el-breadcrumb__inner {
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
  &-content {
    margin: 20px 20px 0;
  }
}
</style>
