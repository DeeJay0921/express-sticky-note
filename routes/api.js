var express = require('express');
var router = express.Router();
var Note = require('../model/note.js').Note

/* GET home page. */
router.get('/notes',function (req,res,next) {
    Note.findAll({raw: true}).then(function (notes) {
        console.log(notes)
        res.send({status: 0,data:notes})
    })

})
router.post('/notes/add',function (req,res,next) {
    var notes = req.body.notes
    Note.create({text: notes}).then(function (notes) {
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
})
router.post('/notes/edit', function(req, res, next) {
    console.log(req.body.id)
    Note.update({text: req.body.notes},{where:{id: req.body.id}}).then(function () {
        console.log(arguments)
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
});
router.post('/notes/delete',function (req,res,next) {
    console.log('删除id为'+ req.body.id + '的数据')
    Note.destroy({where:{id: req.body.id}}).then(function () {
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
})
module.exports = router;