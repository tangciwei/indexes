/**
 * @file index.js
 * @author tangciwei(tangciwei@baidu.com)
 *
 * @since 2017-04-11
 */

import Vue from 'vue';
import u from 'underscore';
import pageData from 'page/index';
import landscape from './landscape.vue';
import config from './config';

new Vue({
    el: 'body',
    data() {
        return u.extend({
                config
            },
            pageData, {
                validation: '',
                fieldsData: ''
            });
    },
    components: {
        landscape
    }
});
