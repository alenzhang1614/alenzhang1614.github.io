1. 在stylus中引入css报错Resource interpreted as Stylesheet but transferred with MIME type text/html: "http://localhost:8088/docs/.vuepress/styles/iconfont/iconfont.css".
    引入方式是相对路径
    解决方案 改成绝对路径
    原因 stylus将css按成单独的模块引入
2. 页面警告将css文件按照html解析。Resource interpreted as Stylesheet but transferred with MIME type text/html: "http://ocalhost:8088/docs/.vuepress/styles/iconfont/iconfont.css".
    确实引入了,但是样式不生效