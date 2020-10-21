<template>
    <transition name="homeFade">
        <div class="homeLayout-container">
            <div class="welcome-text">
                <h3 class="textCenter">欢迎来到aleneZhang的博客</h3>
                <p class="textCenter">天地万物，包罗万象，你想知道的都在这里</p>

            </div>
            <div class="button"
                 @click="enterIndex">
                <span class="icon iconfont icon-xiangxia"></span>
            </div>
        </div>
    </transition>
</template>
<script>

export default {
    methods: {
        enterIndex () {
            this.$router.push("/senior-js/jquery/1")
        }
    }

}
</script>
<style lang="stylus">
.textCenter
    text-align center
.homeLayout-container
    background #040872
    // background blue
    height 100vh
.welcome-text
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    &::after, &::before
        position absolute
        left 0
        top 0
        display block
        content '\200B'
        line-height 0
        width 100%
        height 100%
        border 1px solid #ffffff
    &:before
        clip rect(0, 50px, 50px, 0)
    &::after
        clip rect(clac(100% - 50px), clac(100% - 50px), 50px, 50px)
.button
    position absolute
    left 50%
    bottom 3%
    transform translateX(-50%)
    border none
    font-size 100px
    background none
    padding 0
    animation jump 1s linear infinite alternate
    span
        position relative
        color rgba(255, 255, 255, 0.3)
        font-size 50px
        background-image linear-gradient(180deg, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 50%)
        background-clip text
        animation move 1s linear infinite
.homeFade-enter-active, .fade-leave-active
    transition height 3s
.home-enter, .fade-leave-to
    height 0
@keyframes move
    for i in 0 .. 10
        {10% * i}
            background-image linear-gradient(180deg, rgba(255, 255, 255, 0) 10% * i, rgba(255, 255, 255, 0.5) 10% * i, rgba(255, 255, 255, 0) 50% + (10 * i))
@keyframes jump
    from
        bottom 4%
    to
        bottom 3%
</style>