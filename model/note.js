var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',

    storage: path.join(__dirname,'../database/database.sqlite')
})
//测试链接之后 进行定义
const Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    }
});

// Note.sync().then(function () {
//     Note.create({
//         text: 'Hello DeeJay'
//     })
// }).then(function () {
//     Note.findAll({raw: true}).then(notes => {
//         console.log(notes)
//     })
// })

Note.findAll({raw: true}).then(function (notes) {
    console.log(notes)
})

module.exports.Note = Note