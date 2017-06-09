const locals = {};
locals.install = function (Vue) {
  // // 1. 添加全局方法或属性
  // Vue.myGlobalMethod = function () {
  //   // 逻辑...
  // }
  // // 2. 添加全局资源
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // 逻辑...
  //   }
  //   ...
  // })
  // // 3. 注入组件
  // Vue.mixin({
  //   created: function () {
  //     // 逻辑...
  //   }
  //   ...
  // })
  // 4. 添加实例方法
  Vue.prototype.$locals = function(key) {
    let locals = window.localStorage,
      data = JSON.parse(key ? locals.getItem(key) : "{}");
    return {
      get(_key){
        return _key? data[_key] : data;
      },
      add(val){
        locals.setItem(key, JSON.stringify(val))
      },
      remove(_key){
        if(_key){
          delete data[_key];
          locals.setItem(key, JSON.stringify(data));
          return
        }
        locals.removeItem(key);
      },
      set(_key, _val){
        let newObj = {};
        val ? (newObj[key] = val) : (newObj =  val); 
        let newData = Object.assign({}, JSON.parse(data), newObj);
        locals.setItem(key, JSON.stringify( newData ));
      }
    }
  }
}

export {locals}