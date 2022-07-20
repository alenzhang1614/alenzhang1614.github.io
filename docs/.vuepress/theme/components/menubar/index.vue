<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    :mode="mode"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <menuItem v-for="(menu,index) in menus" :key="index" :menu="menu" :index='index'/>
  </el-menu>
</template>
<script>
import menuItem from './menuItem'
export default {
  name:"Menubar",
  components:{
    menuItem
  },
  props:{
      mode:{
        type:String,
        default:'vertical'
      },
       menus:{
      type:Array,
      default:[]
    }
  }
}
</script>
