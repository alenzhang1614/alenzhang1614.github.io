<template>
<ClientOnly>
  <div class="my-component" ref="preview">
    预览
    <input type="file" @change="preview" ref="file">
  </div>
  </ClientOnly>
</template>
<script>
import docx from 'docx-preview';
window.JSZip = require('jszip')
export default {
  name:'Promise',
  data(){
    return {
      fileName:123
    }
  },
  methods:{
    preview(e){
      docx.renderAsync(this.$refs.file.files[0],this.$refs.preview) // 渲染到页面预览
    }
  },
  mounted(){
    console.log(this)
  }
};
</script>
<style lang="styl" scoped>
.my-component{
  /* width: 100%;
  height: 90vh;
  border: 1px solid #000; */
}
</style>
