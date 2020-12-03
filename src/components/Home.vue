<template>
  <el-container class="home-container">
    <el-main class="content">
      <img class="avatar-img" alt="Vue logo" src="./../assets/images/avatar.jpg">
      <h1>{{ msg }}</h1>
      <ul>
        <li><a class="link-btn" href="https://github.com/Snail-Lu" target="_blank" rel="noopener">Github</a></li>
        <li><a class="link-btn" href="https://snail-lu.github.io" target="_blank" rel="noopener">Github Pages</a></li>
        <li><a class="link-btn" href="https://www.cnblogs.com/snaillu/" target="_blank" rel="noopener">Blog</a></li>
        <li><a class="link-btn" href="https://snail-lu.github.io/portfolio" target="_blank" rel="noopener">Portfolio</a></li>
      </ul>
    </el-main>
    <el-footer class="footer">
      <span>Copyright ©</span>
      <a class="footer-link" href="https://www.yes-i-do.cn">yes-i-do.cn</a>
      <span> All Rights Reserved.</span>
      <a target="_blank" class="footer-link beian-link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34160202000555">
        <img src="./../assets/images/beian.png" />
        <p>皖公网安备 34160202000555号</p>
      </a>
      <a class="footer-link" target="_blank" href="https://beian.miit.gov.cn/">皖ICP备2020019744号</a>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home-container {
  height: 100%;
  /* background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #f0dfb3;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:14px;
  color: #000;
}

.footer-link {
  color: #000;
  margin: 0 10px;
  text-decoration: none;
}

.beian-link {
  display: flex;
  align-items: center;
}

.beian-link img {
  width: 20px;
  height: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
