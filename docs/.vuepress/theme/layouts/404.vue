<template>
    <div class="error-container">
        <img src="../assets/image/404.jpg" alt="">
        <div class="button" @click="$router.replace('/')">进入首页</div>
    </div>
</template>
<style lang="stylus" scoped>
.error-container img
    width 100%
    max-width 100%
    max-height 100%
.button
    text-align center
    font-size 30px
    cursor pointer    
</style>