<template>
  <el-menu
  
    :mode="mode"
 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <menuItem v-for="(menu,index) in menus" :key="index" :menu="menu" :index='index.toString()'/>
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
