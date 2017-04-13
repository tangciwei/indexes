#!/usr/bin/env node --harmony

var fs = require('fs');
var path = require('path');
var etpl = require('etpl');
// 进程目录
console.log(process.cwd());
var dir = process.cwd();
var finName = '/single';
var targetDir = path.resolve(dir + finName + '/page/test');

//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}
if (fsExistsSync(targetDir)) {
    return console.log('page/test 文件夹已存在,请删除后再试');
}
// 创建目录
fs.mkdirSync(targetDir);

var data = fs.readFileSync(dir + '/server.conf');

function getRouter(serverConf) {
    let arr = serverConf.split('\n').filter(item => item.indexOf('template') !== -1);
    let result = {};
    // 项目名
    let app = '';
    arr.forEach(item => {
        if (item.indexOf('template') !== -1) {
            let arr = [];
            item.trim().split('template')[1].replace(/(\w)+/g, $0 => arr.push($0));
            if (!app) {
                app = arr[0];
            }
            if (!result[arr[1]]) {
                result[arr[1]] = [{
                    name: arr[2]
                }];
            } else {
                result[arr[1]].push({
                    name: arr[2]
                });
            }
        }
    });
    return {
        router: result,
        app
    }
}

var userData = {
    author: 'tangciwei',
    email: 'tangciwei',
    date: '2017年04月13日'
}

var templateDir = path.resolve(__dirname + '/../src/strategies/fin/template');
etpl.config({
    variableOpen: '<%',
    variableClose: '%>'
});

// let render = etpl.compile(templateDir+ '/config.js');
// let text = render({

// });

// fs.writeFileSync(
//     targetDir + '/router.js',
//     text, { encoding: 'utf8', flag: 'w' }
// );
