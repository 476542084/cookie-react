#命名规则
    组件名字-大驼峰
    其他命名/文件夹-小驼峰
    PC端像素采用'px', 移动端采用'rem'(根部font-size已基于设计稿自动调节)

#cookie-react(可补充)
├── build			  ------------------出口
├── config			  ------------------webpack配置
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json 	  ------------------项目package.json		
├── public			  ------------------网页配置
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md  		  ------------------README
├── scripts			  ------------------运行脚本
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src 			  ------------------源码目录
│   ├── api			  ------------------API目录
│   │   └── getData.js
│   ├── assets		  ------------------资源			
│   ├── components    ------------------公共组件
│   │   ├── common    ------------------常用组件
│   │   ├── footer    ------------------footer组件
│   │   └── header    ------------------header组件
│   ├── config    ----------------------项目配置
│   │   ├── envconfig.js ---------------环境地址配置
│   │   ├── fetch.js -------------------封装fetch请求
│   │   └── rem.js ---------------------自适应
│   ├── index.css
│   ├── index.js
│   ├── pages    -----------------------页面目录
│   │   ├── mobile  --------------------移动端界面
│   │   └── pc      --------------------PC端界面
│   ├── plugins  -----------------------第三方插件
│   ├── router	 -----------------------路由
│   │   ├── index.js
│   │   └── privateRoute.js ------------路由守卫(暂时不用)
│   ├── serviceWorker.js  --------------热加载
│   ├── setupProxy.js ------------------api代理
│   ├── store   ------------------------react-redux状态管理目录
│   │   ├── forum
│   │   ├── products
│   │   └── store.js
│   ├── style   ------------------------通用样式目录
│   └── utils	------------------------公用方法
│       ├── asyncComponent.jsx   -------异步加载组件
│       └── commons.js   ---------------公用方法
└── tree.md   --------------------------项目结构
