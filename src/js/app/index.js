require('less/index.less')

var NoteManager = require('mod/note-manager.js').NoteManager
var Event = require('mod/event.js')
var Waterfall = require('mod/waterfall.js')

NoteManager.load()

$('.add-note').on('click',function () {
    NoteManager.add()
})

Event.on('waterfall',function () {
    Waterfall.init($('#content'))
})

$('.reList').on('click',function () {
    Waterfall.init($('#content'))
})