<template>
  <div class="login">
    <div class="icon-po1"></div>
    <div class="icon-po2"></div>
    <div class="icon-po3"></div>
    <div class="login-content">
      <div class="login-banner"></div>
      <div class="login-box">
        <div class="login-box">
          <div class="el-card is-always-shadow">
            <div class="el-card__body">
              <h1 class="title">零部件制造管理系统</h1>
              <div class="msgLogin">
                <form class="el-form">
                  <div class="el-form-item is-error is-required">
                    <div class="el-form-item__content">
                      <div class="el-input el-input--prefix el-input--suffix">
                        <input
                          type="text"
                          autocomplete="off"
                          maxlength="11"
                          placeholder="请输入手机号"
                          class="el-input__inner"
                        />
                        <span class="el-input__prefix">
                          <i
                            class="el-icon-user"
                            style="font-size: 20px; color: rgb(102, 102, 102)"
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item is-required">
                    <div class="el-form-item__content">
                      <div
                        class="el-row"
                        style="margin-left: -2.5px; margin-right: -2.5px"
                      >
                        <div class="el-input el-input--prefix el-input--suffix">
                          <input
                            type="text"
                            autocomplete="off"
                            maxlength="16"
                            placeholder="请输入密码"
                            class="el-input__inner"
                          />
                          <span class="el-input__prefix">
                            <i
                              class="el-icon-warning-outline"
                              style="font-size: 20px; color: rgb(102, 102, 102)"
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="el-form-item">
                    <div class="el-form-item__content">
                      <button
                        type="button"
                        class="el-button el-button--primary"
                      >
                        <span>登录</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
html {
  height: 100%;
}

.login {
  overflow: hidden;
  position: relative;
  height: 100%;
  background: linear-gradient(
    50deg,
    rgba(24, 34, 128, 1) 0%,
    rgba(49, 73, 192, 1) 100%
  );
  background-repeat: no-repeat;
  background-size: cover;
  .icon-po1,
  .icon-po2,
  .icon-po3 {
    position: absolute;
  }
  .icon-po1 {
    width: 162px;
    height: 107px;
    top: 0;
    left: 227px;
    background: url(../assets/images/login/icon-01.png) no-repeat 100% 100%;
  }
  .icon-po2 {
    width: 158px;
    height: 212px;
    bottom: 0;
    left: 0;
    background: url(../assets/images/login/icon-02.png) no-repeat 100% 100%;
  }
  .icon-po3 {
    width: 734px;
    height: 100%;
    right: 0;
    top: 0;
    background: url(../assets/images/login/icon-03.png) no-repeat 100% 100%;
  }
  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1300px;
    transform: translate(-50%, -50%);
    .login-banner {
      width: 780px;
      height: 614px;
      background: url(../assets/images/login/banner.png) center/cover no-repeat;
    }
    .login-box {
      width: 350px;
      .title {
        padding-bottom: 10px;
        color: #0046c2;
        font-size: 24px;
        text-align: center;
      }
      & /deep/ .el-tabs__nav {
        width: 100%;
      }
      & /deep/ .el-tabs__active-bar {
        width: 50%;
      }
      & /deep/ .el-tabs__item {
        width: 50%;
        text-align: center;
      }
      & /deep/ .el-input /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #e1e1e1;
        border-radius: 0;
        padding-left: 41px;
      }
      & /deep/ .icon-user,
      & /deep/ .icon-lock,
      & /deep/ .icon-safetycertificate {
        font-size: 28px;
        color: #666666;
      }
      & /deep/ .validateCode {
        width: 100px;
        height: 32px;
        vertical-align: middle;
        cursor: pointer;
      }
      & /deep/ .el-button--primary {
        width: 100%;
        margin-top: 5px;
        background-color: #0067b3;
        border-color: #0067b3;
      }
      & /deep/ .forgetPassword {
        display: flex;
        justify-content: center;
        margin: 0;
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .login-content {
      width: 1000px;
      .login-banner {
        width: 600px;
        height: 500px;
      }
    }
  }
}
</style>
