{%* @file: index *%}
{%* @author: tangciwei(tangciwei@baidu.com) *%}
{%* @since 2017-04-11 *%}

{%extends file="../../layout.tpl"%}
    {%block name="block_title"%}
    有钱花
    {%/block%}
    {%block name="main"%}
        <section class="page-index">
            <landscape :config="config"></landscape>
        </section>
        {%script%}
            define('page/index', function () {
                return JSON.parse('{%$data|@json_encode%}');
            });

            require('./index.js');
        {%/script%}

        
        {%*$data|var_dump*%}

    {%/block%}

