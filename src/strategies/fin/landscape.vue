<template>
    <section class="test-landscape">
        <h1 class="head">索引页</h1>
        <div class="wrap">
            <div class="left">
                <h2 class="t">目录</h2>
                <div class="group" v-for="(key, stage) in urls">
                    <h2 class="title">{{stage.title}}</h2>
                    <div class="stage">
                        <div v-for="item in stage.list">
                            <a :href="item.url" target="_blank" >
                                {{item.text}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <h2 class="t">二维码</h2>
                <div class="group-wrap">
                    <div class="group" v-for="(key, stage) in urls">
                        <h2 class="title">{{stage.title}}</h2>
                        <div class="stage">
                            <div v-for="item in stage.list">
                                <a :href="item.url" target="_blank" >
                                    {{item.text}}
                                </a>
                                <div id="{{item.id}}" class="qcode"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
/**
 * @file landscape
 * @author tangciwei(tangciwei@baidu.com)
 *
 * @since 2017-04-13
 */
function createUrls(config) {
    // project:项目名
    let { project, defaultQuery, stageName, router } = config;
    let level1 = Object.keys(router);
    let urls = {};
    let pre = location.protocol + '//' + location.host;
    level1.map((stage, i) => {
        let list = router[stage].map((item, j) => {
            let url = pre + `/${project}/${stage}/${item.name}?${defaultQuery}#ed=1`;
            return {
                url,
                text: item.name,
                // 二维码
                id: (i + 1) + '' + j
            };
        });
        let title = stage + '(' + stageName[stage] + ')';
        urls[stage] = {
            title,
            list
        };

    });
    return urls;
}

function loadJs(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = script.onreadystatechange = function () {
        if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') {
            return;
        }
        script.onreadystatechange = script.onload = null
        if (callback) {
            callback();
        }
    }
    document.body.appendChild(script);
}


export default {
    props: {
        config: {
            type: Object,
            default () {
                return {
                    project: '',
                    stageName: {},
                    defaultQuery: '',
                    router: {}
                };
            }
        }
    },
    data() {
        return {
            is: 'test-landscape',
            urls: {},
            ready: false
        };
    },
    methods: {
        createQcode() {
            let level1 = Object.keys(this.urls);
            level1.forEach(stage => {
                let list = this.urls[stage].list;
                list.forEach(item => {
                    let id = item.id;
                    $('#' + id).qrcode({
                        text: item.url
                    });
                });
            });
        }
    },
    ready() {
        let {
            project,
            stageName,
            defaultQuery,
            router
        } = this.config;
        this.urls = createUrls({
            project,
            defaultQuery,
            stageName,
            router
        });
        loadJs('https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js', () => {
            loadJs('https://cdnjs.cloudflare.com/ajax/libs/lrsjng.jquery-qrcode/0.14.0/jquery-qrcode.min.js', () => {
                this.createQcode();
            });
        });
    }
};
</script>

<style lang="less" scoped rel="stylesheet/less">
   .test-landscape{
        .ft(@fontsize, @height){
            font-size: @fontsize;
            height: @height;
            line-height: @height;
        }
        .head{
            text-align: center;
            font-size: 16px;
            .ft(18px,24px);

        }
        .wrap{
            display: flex;
            .ft(14px,18px); 
            .t{
                .ft(16px,18px); 
                text-align: center;
            }   
            .title{
                background: #ddd;
                margin-top:4px;
            }   
        }
        .left{
            flex: 1;
            margin-right: 10px;
            margin-left: 10px;
            .group{
                
            }
            .stage{
                overflow: hidden;
            }
            a{
                float: left;
                padding: 2px 10px 2px 0;
            }

        }
        .right{
            flex: 3;
            margin-right: 10px;
            .group-wrap{
                padding-bottom: 20px;
            }
            .group{
                overflow: hidden;
            }
            .stage{
                overflow: hidden;
                >div{
                    float: left;
                    margin-right: 6px;

                }
                a{
                    .ft(12px,13px); 
                    display: block;
                    text-align: center;
                }
                .qcode{
                    >canvas{
                        width: 100;
                        height: 100;
                    }
                }
            }
        }
   }
</style>
