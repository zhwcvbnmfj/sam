define(['jquery','widget/event'],function( $, Events){
        
    /* 滑动窗的控制器 */
    var Slider = (function(){

        function Slider() {
            this.curItemNum = 0;
            this.nextItemNum = 0;
            this.prevItemNum = 0;

            this.prevButton = $('#prev');
            this.nextButton = $('#next');

            this.sliderTimer = undefined;
            /* 绑定事件 */
            this.prevButton.on('click', this.proxy(this.clickPrev));
            this.nextButton.on('click', this.proxy(this.clickNext));
        }

        /* 初始化方法 */
        Slider.prototype.init = function(className) {
            console.log("Init slider, this: "+this);
            
            this.curItemNum = 0;
            this.container = $('.'+className);
            this.getNextAndPrev();

            this.container[this.curItemNum].style.left = '15%';
            this.container[this.curItemNum].style.visibility = 'visible';
            this.container[this.prevItemNum].style.left = '-70%';
            this.container[this.prevItemNum].style.visibility = 'visible';
            this.container[this.nextItemNum].style.left = '100%';
            this.container[this.nextItemNum].style.visibility = 'visible';
            
            // TODO 可能要加定时器
        };

        Slider.prototype.getNextAndPrev = function() {
            this.nextItemNum = (this.curItemNum == this.container.length-1 ? 0 : this.curItemNum+1);
            this.prevItemNum = (this.curItemNum == 0 ? this.container.length-1 : this.curItemNum-1);
        };

        /* 处理向前滑动 */
        Slider.prototype.clickPrev = function(evt) {

            if(evt)
                evt.preventDefault();

            var curLeft = parseInt(this.container[this.curItemNum].style.left);
            var prevLeft = parseInt(this.container[this.prevItemNum].style.left);

            if (curLeft < 100 && prevLeft < 15) {
                curLeft += 10;
                this.container[this.curItemNum].style.left = curLeft+"%";
                prevLeft += 10;
                this.container[this.prevItemNum].style.left = prevLeft+"%";
                
                this.sliderTimer = setTimeout(this.proxy(this.clickPrev), 40);
            } else {
                clearTimeout(this.sliderTimer);

                this.container[this.curItemNum].style.left = "100%";
                this.container[this.prevItemNum].style.left = "15%";
                this.container[this.nextItemNum].style.visibility = "hidden";

                this.curItemNum = this.prevItemNum;
                this.getNextAndPrev();
                this.container[this.prevItemNum].style.left = "-70%";
                this.container[this.prevItemNum].style.visibility = "visible";
            }
        };

        /* 处理向后滑动 */
        Slider.prototype.clickNext = function(evt) {
            if(evt)
                evt.preventDefault();

            var curLeft = parseInt(this.container[this.curItemNum].style.left);
            var nextLeft = parseInt(this.container[this.nextItemNum].style.left);
            
            if (curLeft > -70 && nextLeft > 15) {
                curLeft -= 10;
                this.container[this.curItemNum].style.left = curLeft+"%";
                nextLeft -= 10;
                this.container[this.nextItemNum].style.left = nextLeft+"%";
                
                this.sliderTimer = setTimeout(this.proxy(this.clickNext), 40);
            } else {
                clearTimeout(this.sliderTimer);

                this.container[this.curItemNum].style.left = "-70%";
                this.container[this.nextItemNum].style.left = "15%";
                this.container[this.prevItemNum].style.visibility = "hidden";

                this.curItemNum = this.nextItemNum;
                this.getNextAndPrev();
                this.container[this.nextItemNum].style.left = "100%";
                this.container[this.nextItemNum].style.visibility = "visible";
            }
        };

        /* 将方法/函数代理到当前控制器的上下文下 */
        Slider.prototype.proxy = function(fn) {
            return $.proxy(fn, this);
        };

        return Slider;
    }());

    return Slider;
});
