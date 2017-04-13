/**
 * @file config.js
 * @author tangciwei(tangciwei@baidu.com)
 *
 * @since 2017-04-11
 */

import {defaultQuery} from 'constant';
import router from './router';
let stageName = {

    public: '',
    singleUser: '',
    singlePreapply: '',
    singleApply: '',
    singleSupply: '',
    singleSign: '',
    singleProtocol: '',
    singleHelp: ''
};

export default {
    project: '',
    stageName,
    defaultQuery,
    router
};


