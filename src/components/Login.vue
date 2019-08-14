<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img src="../assets/imgs/logo-main.png" class="logo" alt="logo">
          <span class="title">BTC123 通行证</span>
        </div>
        <div class="desc">123通行证是区块链最具影响力的授权认证系统</div>
      </div>
      <div class="main">
        <el-form ref="login" :model="params" @submit.native.prevent="handleLogin">
          <el-form-item :rules="[{required: true,message:'请输入账号'}]" prop="cellphone">
            <el-input v-model="params.cellphone" placeholder="账号" prefix-icon="icon-user"></el-input>
          </el-form-item>
          <el-form-item :rules="[{required: true,message:'请输入密码'}]" prop="password">
            <el-input v-model="params.password" type="password" placeholder="密码" prefix-icon="icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" native-type="submit" style="width:100%;">{{ loading ? '登录中...' : '登 录' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="copyright">Copyright
        <i class="anticon icon-copyright"></i>
        2018 BTC123
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'blank',
  data() {
    return {
      loading: false,
      params: {
        cellphone: '',
        password: '',
        typeCode: 'zh-cn'
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$login
            .login(this.params)
            .then(({ data }) => {
              this.loading = false;
              if (data.status === 0) {
                this.$store.commit('setLoggedUser', data.data);
                this.$message.success({
                  duration: 2000,
                  message: '登录成功'
                });
                this.$router.replace({ name: 'index' });
              } else {
                this.$message.warning(data.errorMessage);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="postcss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
}

.content {
  padding: 32px 0;
  flex: 1 1;
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}
.desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.main {
  width: 368px;
  margin: 0 auto;
}

.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
}

.copyright {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

@media (min-width: 768px) {
  .container {
    background-image: url(~/assets/img/login-bg.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .content {
    padding: 112px 0 24px;
  }
}
</style>
