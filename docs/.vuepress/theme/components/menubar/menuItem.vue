<template>
  <!-- <div> -->
    <el-submenu :index="index"  v-if="menu?.items?.length">
      <template slot="title">{{menu.text}}</template>
      <menu-item v-for="item in menu.items" :key="item.link" :menu="item" :index="item.link"></menu-item>
    </el-submenu>
    <el-menu-item index="1" v-else>{{menu.text}}</el-menu-item>
    
  <!-- </div> -->
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    menu: {
      type: Object,
      default: ()=>{}
    },
    index:{
      type:String
    }
   
  },
}
</script>
