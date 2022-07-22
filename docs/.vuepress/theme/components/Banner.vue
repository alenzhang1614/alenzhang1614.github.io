<template>
    <div class="banner-container">
        <div class="banner-wrap"
             @mouseenter="mouseEnter"
             @mouseleave="mouseLeave">
            <div class="layer"
                 style="filter:blur(4px)">
                <img src="../assets/image/1.png"
                     alt="">
            </div>
            <div class="layer"
                 style="filter:blur(1px)">
                <img :src="eyesSrc"
                     alt="">
            </div>

            <div class="layer"
                 style="filter:blur(4px)">
                <img src="../assets/image/6.png"
                     alt="">
            </div>
            <div class="layer"
                 style="filter:blur(5px)">
                <img src="../assets/image/3.png"
                     alt="">
            </div>
            <div class="layer"
                 style="filter:blur(5px)">
                <img src="../assets/image/5.png"
                     alt="">
            </div>
            <div class="layer"
                 style="filter:blur(5px)">
                <img src="../assets/image/4.png"
                     alt="">
            </div>

        </div>
        <div class="mask">图片与效果仿照哔哩哔哩制作</div>

    </div>
</template>
<script>
const eyesSrcArr = [require('../assets/image/open-eye.png'), require('../assets/image/closing-eye.png'), require('../assets/image/close-eye.png'), require('../assets/image/opening-eye.png'), require('../assets/image/open-eye.png')]
export default {
    data () {
        return {
            eyesSrc: eyesSrcArr[0],
            enterX: 0,
            enterY: 0,
            newPointX: 0,
            newPointY: 0,
            imageArr: []


        }
    },
    methods: {
        mouseEnter (e) {
            let that = this
            that.enterX = e.clientX
            that.enterY = e.clientY
            that.layerArr = document.querySelectorAll(".banner-wrap .layer")
            that.width = document.documentElement.clientWidth
            document.addEventListener('mousemove', this.mouseMove)
            that.layerArr.forEach((item) => { item.style.transition = "none" })
        },
        mouseMove (e) {
            let that = this;
            that.newPointX = e.clientX;
            let dis = that.newPointX - that.enterX;
            let rightX = that.width - that.enterX;
            let scale;// 阻尼系数，越到后面越拉不动scale越来越小
            dis >= 0 && (scale = (1 - dis / rightX) * 0.1);
            dis < 0 && (scale = (1 + dis / that.enterX) * 0.1);
            // 为了防止移动过程中的回弹，添加限制条件
            ((dis > 0 && dis <= Math.abs(rightX / 2)) || (dis < 0 && Math.abs(dis) < Math.abs(that.enterX / 2))) && (that.layerArr.forEach((item, index) => {
                index > 3 && (item.style.filter = `blur(${5 - dis * 0.02}px)`, item.style.transform = `translateX(${dis * scale}px)`)
                index == 1 && (item.style.filter = `blur(${1 + dis * 0.02}px)`)
            }))

        },
        mouseLeave () {
            let that = this
            document.removeEventListener('mousemove', this.mouseMove)
            that.layerArr.forEach((item, index) => {
                index > 1 && (item.style.filter = `blur(5px)`, item.style.transform = `translateX(0px)`)
                index == 1 && (item.style.filter = `blur(1px)`)
                item.style.transition = "1.5s all"
            })
        },
        eyesMoving () {
            let n = 0
            setTimeout(() => {
                let n = 0
                let timeId = setInterval(() => {
                    n++
                    this.eyesSrc = eyesSrcArr[n]
                    if (n >= eyesSrcArr.length - 1) {
                        n = 0
                        clearInterval(timeId)
                        timeId = null
                    }
                }, 100)
            }, 5000)
        }
    },

    created () {
        this.timeInter = setInterval(() => {
            this.eyesMoving()
        }, 2500)

    }
}
</script>
<style lang="stylus" scoped>
.banner-container
    margin 0 auto
    position relative
    z-index 0
    min-height 155px
    height 9.375vw
    min-width 999px
    background-color #f9f9f9
    .banner-wrap
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        overflow hidden
        .layer
            width 100%
            height 100%
            position absolute
            display flex
            justify-content center
            align-items center
            img
                // flex-shrink 0
                // width max-content
                height 100%
    .mask
        position absolute
        right 3%
        font-size 30px
        font-weight bold
        letter-spacing 4px
        color transparent
        background-image linear-gradient(45deg, rgba(255, 0, 0, 0.5) 10%, rgba(0, 255, 0, 0.5) 80%)
        background-clip text
        text-shadow 1px 0 0 rgba(255, 255, 255, 0.2)
</style>
