# webpack4.0
webpack4.0搭建
- yarn init 一路回车
- yarn add webpack webpack-cli -D   安装开发依赖
- yarn add webpack-dev-server -D 安装本地server
- yarn add css-loader style-loader -D 安装cssloader, css-loader 是 解析@import , 路径等, style-loader 把css插入到head中
- yarn add less less-loader  -D  安装less, 和less解析loader
- yarn add mini-css-extract-plugin -D css分离
- yarn add postcss-loader autoprefixer -D 添加前缀loader和插件 这个要配置一个postcss.config.js文件,才能使用
- yarn add optimize-css-assets-webpack-plugin -D 压缩css插件
- yarn add uglifyjs-webpack-plugin -D 压缩js插件
- yarn add babel @babel/core @babel/preset-env -D 添加babel模块  @babel/core 核心模块,调用transform方法转换  @/babel/preset-env 把一些高级语法转换为低级语法
- yarn add @babel/plugin-proposal-class-properties -D 解析class语法
- yarn add @babel/plugin-transform-runtime -D
- yarn add @babel/runtime
- yarn add expose-loader -D  暴露给window
# webpack 可以进行0配置
- 打包工具->输出的结果(js模块) npx webpack
- expose-loader 暴露全局的loader 内联的loader
- pre 前面执行的loader normal 普通loader 内联loader  后置 postloader

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js
