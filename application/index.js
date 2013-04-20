define(['app/_page','controller/slider'],function(Page,Slider) {

    var Index = (function(_super){
        
        __extends(Index, _super);

        function Index() {
            Index.__super__.constructor.apply(this, arguments);

            /* 滑动窗控制器 */
            var mainSlider = this.controllers.mainSlider = new Slider();

            /* 初始化滑动窗 */
            mainSlider.init('intro');
        }
        
        return Index;
    }(Page));

    return Index;
});
