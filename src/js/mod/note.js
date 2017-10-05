require('less/note.less')

var Toast = require('./Toast.js').Toast
var Event = require('mod/event.js')

// 定义一个note 需要{id: 1,text: 'hello'} 一般2个属性，id用于进行查找到目标note，text为文本内容
function Note(opts) {
    this.initOpts(opts)
    this.createNote()
    this.setStyle()
    this.bindEvent()
}

Note.prototype = {
    colors: [
        ['#ea9b35','#efb04e'],
        ['#dd598b','#e672a2']
    ],
    defaultOpts: {
        id: '', //note的id
        $ct: $('#content').length>0 ? $('#content') : $('body'), // 存放Note的容器
        context: 'input here' //Note的内容
    },
    initOpts: function (opts) {
        this.opts = $.extend({},this.defaultOpts,opts || {})
        if(this.opts.id) {
            this.id = this.opts.id
        }
        else {
            console.log('mei you init')
        }
    },
    createNote: function () {
        var template = `<div class="note">
        <div class="note-head"><span class="delete">x</span></div>
        <div class="note-ct" contenteditable="true"></div>
    </div>`
        this.$note = $(template)
        this.$note.find('.note-ct').html(this.opts.context)
        this.opts.$ct.append(this.$note)
        if(!this.id) {
            this.$note.css({
                bottom: 10
            })
        }
    },
    setStyle: function () {
        var color = this.colors[Math.floor(Math.random()*2)]
        this.$note.find('.note-head').css({
            background: color[0]
        })
        this.$note.find('.note-ct').css({
            background: color[1]
        })
    },
    setLayout: function () {
        var self = this
        if(self.clk) {
            clearTimeout(self.clk)
        }
        self.clk = setTimeout(function () {
            Event.fire('waterfall')
        },100)
    },
    bindEvent: function () {
        var self = this
        var $note = this.$note
        var $noteHead = $note.find('.note-head')
        var $noteCt = $note.find('.note-ct')
        var $delete = $note.find('.delete')

        $delete.on('click',function () {
            self.delete()
        })
        
        $noteCt.on('focus',function () { //监听$noteCt的focus事件
            // 如果内容还是默认的内容的话  focus的时候就清空
            if($noteCt.html() === 'input here') {
                $noteCt.html('')
            }
            $noteCt.data('before',$noteCt.html())
        }).on('blur paste',function () { //监听blur 和 paste事件 失去焦点和粘贴时
            if($noteCt.data('before') != $noteCt.html()) {
                $noteCt.data('before',$noteCt.html())
                self.setLayout()
                // self.edit($noteCt.html())
                if(self.id) {
                    self.edit($noteCt.html())
                }
                else {
                    self.add($noteCt.html())
                }
            }
        })

        //设置note的移动
        $noteHead.on('mousedown',function (e) {
            var evtX = e.pageX - $note.offset().left //evtX计算事件的触发点在note内部 到note的左边缘的距离
            var evtY = e.pageY - $note.offset().top
            $note.addClass('draggable').data('evtPos',{x: evtX,y: evtY})
        }).on('mouseup',function () {
            $note.removeClass('draggable').removeData('pos')
        })

        $('body').on('mousemove',function (e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,
                left: e.pageX - $('.draggable').data('evtPos').x
            })
        })
    },
    
    edit: function (msg) {
        var self = this
        $.post('/api/notes/edit',{id: this.id, notes: msg})
            .done(function (ret) {
                if(ret.status === 0) {
                    Toast('编辑成功')
                }
                else{
                    // Toast('编辑失败')
                    Toast(ret.errorMsg)
                }
            })
    },
    add : function (msg) {
        var self = this
        $.post('/api/notes/add', {notes: msg})
            .done(function (ret) {
                console.log(ret)
                if(ret.status === 0) {
                    Toast('添加成功')
                    // self.id = ret.data.id
                    console.log('add之后，id:' + self.id)

                }
                else {
                    Toast(ret.errorMsg)
                }
            })
    },
    
    delete: function () {
        var self = this
        console.log(this.id)
        $.post('/api/notes/delete',{id: this.id})
            .done(function (ret) {
                if(ret.status === 0) {
                    Toast('删除成功')
                    self.$note.remove()
                }
                else {
                    Toast(ret.errorMsg)
                }
            })
    }

}

window.Note = Note

module.exports.Note = Note