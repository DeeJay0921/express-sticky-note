var Toast = require('./toast').Toast
var Note = require('./note').Note
var Event = require('mod/event.js')

var NoteManager = (function () {
    function load() {
        $.get('api/notes')
            .done(function (ret) {
                console.log('ret为：' + ret)
                if(ret.status === 0) {
                    $.each(ret.data,function (i,e) {
                        new Note({
                            id: e.id,
                            context: e.text
                        })
                    })
                    Event.fire('waterfall')
                }
                else {
                    Toast(ret.errorMsg)
                }
            })
            .fail(function () {
                Toast('网络异常')
            })
    }
    function add() {
        new Note()
    }
    return {
        load: load,
        add: add
    }
})()

module.exports.NoteManager = NoteManager