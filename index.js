var fs = require("fs");
/**
   * 将某目录下的所有文件加载到 router 下
   * 文件名或文件夹名即路径名
   * 
   * @param  {[type]} router     [description]
   * @param  {[type]} base       [description]
   * @param  {[type]} dir_routes [description]
   * @return {[type]}            [description]
   */
function loadRoutes(router,base,dir_routes){
  if(!router || typeof base !=="string" || !dir_routes){
    throw new Error("缺少足够参数。需要router,router根路径,routes文件的放置目录");
  }
  var files = fs.readdirSync(dir_routes);

  //在目录下放置特殊的__before.js用于对整个目录做过滤器，或者统一加载一些数据，等等。
  
  var before_hack = "__before.js";

  files = files.filter(function(f){
    return f !== before_hack;
  });

  var before_hack_file = dir_routes+"/"+ before_hack;

  if( fs.existsSync( before_hack_file ) ){
    router.use( base, require(before_hack_file));
  }

  // 遍历目录下所有的 控制器，按目录对url进行映射. 
  // controller 中比较灵活，一个单个的js 可以通过 express.Router 直接就对其子url进行规划了。
  // 也可以通过Router 来实现restful
  
  files.forEach(function(f){
      var stat = fs.lstatSync(dir_routes+"/"+f);

      if(stat.isDirectory()){
        loadRoutes(router,base+ "/" +f ,dir_routes+"/" + f);
        return;
      }

      var name =  f === "index.js" ? "" : f.replace(".js","");

      url_path = base + "/" + name;

      var module = dir_routes+"/"+f;

      router.use(url_path,require(module));
  });
}

module.exports = loadRoutes;