<template>
  <page-layout>
    <div class="form-wrapper">
      <el-form :inline="true" label-suffix="：" size="small">
        <div>
          <el-form-item label="应用">
            <el-input v-model="query.applicationName" placeholder="应用名称"></el-input>
          </el-form-item>
          <el-form-item label="接入时间">
            <el-date-picker v-model="daterange" :picker-options="pickerOptions" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleDateChange">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="应用类型">
            <el-select v-model="query.applicationType" style="width: 140px;" placeholder="选择应用类型">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(v,k) in types" :key="k" :label="v" :value="k"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授权类型">
            <el-select v-model="query.authorizationType" style="width: 140px;" placeholder="选择授权类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="登录授权" value="1"></el-option>
              <el-option label="登录授权+身份授权" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接入状态">
            <el-select v-model="query.enabled" style="width: 140px;">
              <el-option label="全部" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button type="success" @click="handleClick">新增接入</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" style="width: 100%" element-loading-text="拼命加载中">
      <el-table-column prop="applicationID" label="应用编号"></el-table-column>
      <el-table-column prop="applicationName" label="应用名称" min-width="120"></el-table-column>
      <el-table-column prop="companyName" label="主体名称"></el-table-column>
      <el-table-column prop="contactPhone" label="联系电话"></el-table-column>
      <el-table-column label="应用类型">
        <template slot-scope="scope">
          {{ types[scope.row.applicationType] }}
        </template>
      </el-table-column>
      <el-table-column label="授权类型">
        <template slot-scope="scope">
          {{ scope.row.authorizationType === 2 ? '登录授权+身份授权' : '登录授权' }}
        </template>
      </el-table-column>
      <el-table-column label="接入时间" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.createTime | date }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enabled===1?'success':'danger'" size="mini">{{ scope.row.enabled===1?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEnabled(scope.row)">{{ scope.row.enabled===1?'禁用':'启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" :current-page.sync="query.pageNum" :page-size="query.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" title="新增接入" width="700px">
      <el-form size="medium" label-suffix="：" label-width="120px">
        <el-row>
          <el-card>
            <div slot="header">
              <span>应用信息</span>
            </div>
            <el-col :span="18">
              <el-form-item label="应用名称">
                <el-input v-model="item.applicationName" placeholder="请输入应用名称; 50字以内"></el-input>
              </el-form-item>
              <el-form-item label="应用类型">
                <el-select v-model="item.applicationType" style="width: 100%;" placeholder="选择应用类型">
                  <el-option v-for="(v,k) in types" :key="k" :label="v" :value="k"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应用介绍">
                <el-input v-model="item.applicationSummary" type="textarea" placeholder="请输入应用介绍"></el-input>
              </el-form-item>
              <el-form-item label="应用地址">
                <el-input v-model="item.applicationWebsite" placeholder="请输入应用地址"></el-input>
              </el-form-item>
              <el-form-item label="回调地址">
                <el-input v-model="item.callbackAddress" placeholder="请输入回调地址"></el-input>
              </el-form-item>
              <el-form-item label="授权类型">
                <el-select v-model="item.authorizationType" style="width: 100%;" placeholder="选择授权类型">
                  <el-option label="登录授权" value="1"></el-option>
                  <el-option label="登录授权+身份授权" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-card>
          <el-card>
            <div slot="header">
              <span>主体信息</span>
            </div>
            <el-col :span="18">
              <el-form-item label="开发者类型">
                <el-radio v-model="item.userType" label="1">个人开发者</el-radio>
                <el-radio v-model="item.userType" label="2">企业开发者</el-radio>
              </el-form-item>
              <el-form-item v-if="item.userType == 2" label="主体名称">
                <el-input v-model="item.companyName" placeholder="请输入主体名称"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="item.linkMan" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="item.contactPhone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="联系邮箱">
                <el-input v-model="item.contactEmail" placeholder="请输入联系邮箱"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="item.remark" :rows="4" type="textarea" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-card>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>

    </el-dialog>
  </page-layout>
</template>

<script>
export default {
  async asyncData({ app, query }) {
    const { data } = await app.$apps.list(query);
    return {
      list: data.data.list,
      total: data.data.total,
      query: {
        applicationName: '',
        applicationType: '0',
        endTime: '',
        enabled: '0',
        authorizationType: '0',
        pageSize: data.data.pageSize,
        pageNum: data.data.pageNum,
        ...query
      }
    };
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      types: {
        1: '交易所',
        2: '媒体 ',
        3: '项目',
        4: '平台'
      },
      daterange: '',
      dialogVisible: false,
      item: {
        applicationName: '',
        applicationSummary: '',
        applicationType: '',
        applicationWebsite: '',
        authorizationType: '',
        callbackAddress: '',
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        remark: '',
        userType: '',
        linkMan: ''
      },
      loading: false,
      identity: {},
      identityLoading: false
    };
  },
  methods: {
    handleDateChange(v) {
      this.query.startTime = v ? `${v[0]} 00:00:00` : '';
      this.query.endTime = v ? `${v[1]} 23:59:59` : '';
    },
    onSearch() {
      this.query.pageNum = 1;
      this.fetch();
    },
    add() {
      this.loading = true;
      this.$apps
        .add(this.item)
        .then(({ data }) => {
          this.loading = false;
          this.$message({
            type: 'success',
            message: data.message
          });
          this.dialogVisible = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetch() {
      this.loading = true;
      this.$apps
        .list(this.query)
        .then(({ data }) => {
          this.loading = false;
          this.list = data.data.list;
          this.total = data.data.total;
          this.query = {
            pageSize: data.data.pageSize,
            pageNum: data.data.pageNum,
            ...this.query
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.query.pageNum = 1;
      this.query.pageSize = val;
      this.fetch();
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      this.fetch();
    },
    handleEnabled(item) {
      const { id, enabled, applicationName } = item;
      const value = enabled === 1 ? 2 : 1;
      const text = enabled === 1 ? '禁用' : '启用';
      const h = this.$createElement;
      this.$msgbox({
        title: text,
        message: h('p', null, [
          h('span', null, '确定对此应用 “'),
          h('span', { style: 'color: #1890ff' }, applicationName),
          h('span', null, `” 执行${text}?`)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.$apps.update({ id, enabled: value }).then(({ data }) => {
              if (data.status === 0) {
                done();
                instance.confirmButtonLoading = false;
                this.$message.success(`${applicationName}已${text}！`);
                item.enabled = value;
              } else {
                instance.confirmButtonText = '确定';
                instance.confirmButtonLoading = false;
                this.$message.warning(data.message);
              }
            });
          } else {
            instance.confirmButtonText = '确定';
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).catch(() => {});
    },
    addClick() {
      Object.assign(this.item, {
        applicationName: '',
        applicationSummary: '',
        applicationType: '',
        applicationWebsite: '',
        authorizationType: '',
        callbackAddress: '',
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        remark: '',
        userType: '',
        linkMan: ''
      });
      this.dialogVisible = true;
    },
    handleClick(item) {
      this.item = item;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="postcss" scoped>
.form-wrapper {
  padding: 10px;
  background-color: #fff;
  margin-bottom: 16px;
}
.el-table__body {
  th,
  td {
    text-align: center;
  }
  .cell {
    img {
      max-width: 260px;
      height: auto;
    }
  }
}
</style>
