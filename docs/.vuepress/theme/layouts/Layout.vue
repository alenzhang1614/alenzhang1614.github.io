<template>
  <section>
    <banner></banner>
    <el-header class="header-wrap">
      <h1>alenzhang的博客</h1>
      <menubar mode="horizontal" :menus="navs"></menubar>
    </el-header>
    <el-container>
  
      <el-aside width="260px" v-if="siderbar?.length">
        <menubar :menus="siderbar"></menubar>
      </el-aside>
      <div class="content"><Content /></div>
      
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
  computed: {
    navs() {
      return this.$themeConfig.nav
    },
    siderbar() {
      let sidebarConfig = { ...this.$site.themeConfig?.sidebar }
      if (!sidebarConfig) return []
      let sideKey = Object.keys(sidebarConfig).find(side => this.$route.path.includes(side))
      const side = sidebarConfig[sideKey]
      const pages = this.$site?.pages?.filter(page => page.path.includes(sideKey))
      console.log(side)
    
      return side?.map(item => {
        return {
          ...item,
          text:item.title,
          items: item.children.map(child => {
            const title = child[1]
           
          
            const page = pages.find(page => page.relativePath.includes(child[0])) || {}
             console.log(page,title)
            if ( Array.isArray(child)&&title) {
               
              page.title = title
             
            }
            return {...page,text:page.title,link:page.path}
          }),
        }
      })
    },
  },
  mounted:{}
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
  background-color rgb(84, 92, 100)
.el-container
  height calc(100vh - 155px - 60px)
.content
  height: 100%
  overflow: auto
  padding: 20px
  
</style>
