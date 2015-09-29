# loadroute
一个自动加载路由到express APP 或者 router 的工具

** 用法：

`var loadroute = require("loadroute");
`var app = require("express")();
`loadroute(app,"","./controller");

即可加载./controller文件夹下所有 路由。
文件或文件夹名即为 url 地址.

**特别
./controller文件夹下的  __before.js 会被优先加载，作为整个目录下所有的路径的中间件。
