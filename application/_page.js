define([],function(){

    /* 所有页面的基类 */
    var Page = (function(){
        
        function Page() {
            
            /* 本页面地址，绝对地址 */
            this.path = '/' + window.pageinfo.name + '.html';

            /* 主页地址 */
            this.indexPath = '/index.html';

            /* TODO, 屏幕适应组件 */

            /* 页面内所有控制器 */
            this.controllers = {};

            /*页面内所有模型*/
            this.models = {};
        }
        
        /* 将方法/函数代理到当前页面的上下文下 */
        Page.prototype.proxy = function(fn) {
            return $.proxy(fn, this);
        };

        return Page;
    }());

    return Page;
});
