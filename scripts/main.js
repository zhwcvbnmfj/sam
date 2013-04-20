require.config({
    baseUrl:'.',
    paths: {
        // folder
        'lib': 'script/lib',
        'app': 'application',
        'controller': 'application/controller',
        'model': 'application/model',
        'widget': 'application/widget',
        
        // lib
        'jquery': 'scripts/lib/jquery',
    }
});

// run application
require(['jquery', 'scripts/lang'], function($){

    if (window.pageinfo && window.pageinfo.name){
        require(['../application/' + window.pageinfo.name],function(Page){
           this.page = new Page(); 
        });
    } else {
        alert('Page load error');
    }
});
