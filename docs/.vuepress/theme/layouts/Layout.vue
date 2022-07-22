<template>
  <section>
    <banner></banner>
      <el-header class="header-wrap">
        <h1>alenzhang的博客</h1>
        <menubar mode="horizontal" :menus="navs"></menubar>
      </el-header>
      <el-container>
        <el-aside width="260px">
          <menubar :menus="siderbar"></menubar>
        </el-aside>
        <Content />
      </el-container>
  </section>
</template>
<script>
import banner from '../components/Banner'
import menubar from '../components/menubar'

export default {
  components: {
    banner,
    menubar,
  },
  data() {
    return {}
  },
  computed:{
    navs(){
      return this.$themeConfig.nav
    },
    siderbar(){
      return this.$themeConfig.sidebar
    }
  }
}
</script>
<style lang="stylus" scoped>
section
  min-width 1080px
 

.header-wrap
  background #545c64
  display flex
  justify-content space-between
  align-items center
  padding 0 20px
  h1
    color #fff
    font-size 26px
.el-aside
  height 100%
  background-color: rgb(84, 92, 100);

.el-container
  height: calc(100vh - 155px - 60px) 

</style>
