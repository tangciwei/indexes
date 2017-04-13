/**
 * @file config.js
 * @author tangciwei(tangciwei@baidu.com)
 *
 * @since 2017-04-11
 */

import {defaultQuery} from 'constant';
import router from './router';
let stageName = {
    public: '公共首页',
    singleUser: '首页',
    singlePreapply: '预申请',
    singleApply: '申请',
    singleSupply: '补件',
    singleSign: '签约',
    singleProtocol: '协议',
    singleHelp: '帮助'
};

export default {
    project: 'adloan',
    stageName,
    defaultQuery,
    router
};
