var express = require('express');
var router = express.Router();
var Note = require('../model/note.js').Note

/* GET home page. */
router.get('/notes',function (req,res,next) {
    //如果未登录 那么可以浏览所有的note
    var query = {raw: true}
    if (req.session.user) {
        query.where = {
            uid: req.session.user.id
        }
    }
    Note.findAll(query).then(function (notes) {
        console.log(notes)
        res.send({status: 0,data:notes})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })

})
router.post('/notes/add',function (req,res,next) {
    var notes = req.body.notes
    if(!req.session.user) {
        return res.send({status: 1,errorMsg: '请先登录'})
    }
    var uid = req.session.user.id
    Note.create({text: notes,uid: uid}).then(function (notes) {
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
})
router.post('/notes/edit', function(req, res, next) {
    console.log(req.body.id)
    if(!req.session.user) {
        return res.send({status: 1,errorMsg: '请先登录'})
    }
    var uid = req.session.user.id
    Note.update({text: req.body.notes},{where:{id: req.body.id},uid: uid}).then(function () {
        console.log(arguments)
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
});
router.post('/notes/delete',function (req,res,next) {
    console.log('删除id为'+ req.body.id + '的数据')
    if(!req.session.user) {
        return res.send({status: 1,errorMsg: '请先登录'})
    }
    var uid = req.session.user.id
    Note.destroy({where:{id: req.body.id,uid: uid}}).then(function () {
        res.send({status: 0})
    }).catch(function () {
        res.send({status: 1,errorMsg: '数据库出错'})
    })
})
module.exports = router;