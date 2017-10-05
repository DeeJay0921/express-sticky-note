//订阅发布模式
var Event = (function () {
    var events = {}
    function on(evt,callback) {
        events[evt] = events[evt] || [] //如果evt事件已经被注册过，那么不初始化，直接进行push handler
        //如果没有被注册，那么初始化events[evt]为一个空数组 之后往value中push handler
        events[evt].push(callback)
    }
    function fire(evt,args) {
        if (!events[evt]) { //如果没注册直接return
            return
        }
        events[evt].forEach(function (e,i,arr) { //遍历events[arr],运行每一个on中push进去的handler,args为参数
            arr[i](args)
        })
    }
    function off(evt) {
        delete events[evt]
    }
    return {
        on: on,
        fire: fire,
        off: off
    }
})()

module.exports = Event