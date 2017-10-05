var Waterfall = (function () {
    var $ct
    var $items
    function render($c) {
        $ct = $c
        $items = $ct.children()

        var nodeWidth = $items.outerWidth(true)
        var colNum = parseInt($(window).width()/nodeWidth) // 列数
        var eachColHeightSum = [] //每列的总高度
        // 进行初始化为 有colNum项的数组 每一项为当前列的总高度
        for(var i = 0; i < colNum; i ++) {
            eachColHeightSum.push(0)
        }
        $items.each(function () {
            var $cur = $(this)

            var idx = 0
            var minSumHeight = eachColHeightSum[0]
            for(var i = 0; i < eachColHeightSum.length; i ++) {
                if(minSumHeight > eachColHeightSum[i]) {
                    idx = i // 找到当前总高度最小的那一列
                    minSumHeight = eachColHeightSum[i]
                }
            }
            $cur.css({
                left: nodeWidth * idx,
                top: minSumHeight
            })
            //元素摆放完成后 更新eachColHeightSum该项的总高度
            eachColHeightSum[idx] = eachColHeightSum[idx] + $cur.outerHeight(true)
        })
    }

    $(window).on('resize',function () { //监听窗口变化事件
        render($ct)
    })

    return {
        init: render
    }
})()
//用法： Waterfall.init('#content')
module.exports = Waterfall