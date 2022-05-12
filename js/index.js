window.addEventListener('load', function() {
    // alert('one');
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // console.log(ul);
    var ol = document.querySelector('ol');
    var w = focus.offsetWidth;
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    //监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            //去掉过渡效果，这样让我们的ul 快速的调到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            //去掉过渡效果，这样让我们的ul 快速的调到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //小圆点跟随变化
        //把ol里面li带有current类名的选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        //让当前索引号 的li 加上 current  add
        ol.children[index].classList.add('current');
    });
    //手指滑动轮播图
    var startx = 0;
    var movex = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startx = e.targetTouches[0].pageX;
        // 手指接触就停止定时器
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        // 计算手指移动的距离
        movex = e.targetTouches[0].pageX - startx;
        // 移动盒子：  盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + movex;
        //手指拖动的时候， 不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; //若手指移动过我们再去判断否则不做判断
        e.preventDefault(); //阻止滚动屏幕的行为
    });
    //手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // 若移动距离大于50像素就播放上一张或下一张
            if (Math.abs(movex) > 50) {
                // 若是向左滑就是 下一张 movex 是负值
                if (movex > 0) {
                    index--;
                    // 若向右滑就是上一张 movex 是正值
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .5s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        //手指离开的时候就重新开始定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });

    // 返回顶部模块
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';

        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})