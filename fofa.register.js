// ==UserScript==
// @name         自动填充注册表单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动填充 i.nosec.org/register注册表单
// @author       simon
// @match        https://i.nosec.org/register*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    let number = GM_getValue("number");
    let pwd = GM_getValue("pwd");
    let pre = GM_getValue("pre");
    let email = GM_getValue("email");
    if(!number){
        number=1;
    }
     //const e_form = document.querySelector('#login-form');
    const inputElement = document.querySelector('input[name="commit"][type="submit"]');
    if(inputElement){
        // 给输入元素添加点击事件监听器
        inputElement.addEventListener('click', function(event) {
            // 在输入元素被点击时执行你的自定义逻辑或操作

            GM_setValue("number",parseInt(number)+1);
            console.log('点击了输入元素！');
            // 可选：阻止默认的表单提交行为
            //event.preventDefault();
        });
    }

    // 等待网页加载完成
    window.addEventListener('load', function() {
        // 寻找并填充文本框
        const emailInput = document.querySelector('input#nosecuser_email');
        const passwordInput = document.querySelector('input#nosecuser_password');
        const confirmPasswordInput = document.querySelector('input#nosecuser_password_confirmation');
        const usernameInput = document.querySelector('input#nosecuser_username');

        if (emailInput) {
            emailInput.value = number +"@"+ email;
        }

        if (passwordInput && confirmPasswordInput) {
            passwordInput.value = pwd;
            confirmPasswordInput.value = pwd;
        }

        if (usernameInput) {
            const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            usernameInput.value = `${pre}${randomNum}`;
        }

    });

    // 注册菜单
    GM_registerMenuCommand('#️⃣ 设置表单', function() {
        // 创建 Bootstrap 模态框元素
        const modalHtml = `
            <div class="modal" id="myModal" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">设置表单信息</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                   <div class="form-group">
                      <label for="input2">邮箱</label>
                      <input type="text" id="inputEmail" value="${email}" class="form-control" placeholder="请输入序号">
                    </div>
                   <div class="form-group">
                      <label for="input2">序号</label>
                      <input type="text" id="inputNumber" value="${number}" class="form-control" placeholder="请输入序号">
                    </div>
                    <div class="form-group">
                       <label for="input2">密码</label>
                       <input type="password" id="inputpwd" value="${pwd}" class="form-control" placeholder="请输入密码">
                     </div>
                    <div class="form-group">
                       <label for="input2">前缀</label>
                       <input type="text" id="inputpre" value="${pre}" class="form-control" placeholder="请输入前缀">
                     </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="saveInfo">保存</button>
                  </div>
                </div>
              </div>
            </div>`;

        // 获取模态框和输入框元素
        let modal = document.getElementById('myModal');
        if(modal==null){
            // 将模态框添加到页面
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            //重新获取模态框
            modal = document.getElementById('myModal');

            const inputEmail = document.getElementById('inputEmail');
            const inputNumber = document.getElementById('inputNumber');
            const inputPwd = document.getElementById('inputpwd');
            const inputPre = document.getElementById('inputpre');

            // 监听保存按钮的点击事件
            document.getElementById('saveInfo').addEventListener('click', function() {
                const mailValue = inputEmail.value;
                const numValue = inputNumber.value;
                const pwdValue = inputPwd.value;
                const preValue = inputPre.value;

                // 如果用户点击了保存按钮，且输入不为空，就保存序号
                if (mailValue !== '') {
                    GM_setValue('email', mailValue);
                }
                if (numValue !== '') {
                    GM_setValue('number', numValue);
                }
                if (pwdValue !== '') {
                    GM_setValue('pwd', pwdValue);
                }
                GM_setValue('pre', preValue);
                console.log('设置成功');
                // 隐藏模态框
                $(modal).modal('hide');
            });
        }
        // 打开模态框
        $(modal).modal('show');

    });

    // 动态添加 Bootstrap CSS 样式文件
    const bootstrapCss = document.createElement('link');
    bootstrapCss.rel = 'stylesheet';
    // bootstrapCss.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';  // 根据实际路径进行修改
    bootstrapCss.href = 'https://cdn.staticfile.org/bootstrap/5.3.1/css/bootstrap.min.css';  // 根据实际路径进行修改

    document.head.appendChild(bootstrapCss);

    // 动态添加 jQuery 和 Bootstrap JavaScript 文件
    const jQueryScript = document.createElement('script');
    // jQueryScript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
    jQueryScript.src = 'https://cdn.staticfile.org/jquery/3.7.0/jquery.min.js';

    jQueryScript.onload = function() {
        const bootstrapJs = document.createElement('script');
        // bootstrapJs.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
        bootstrapJs.src = 'https://cdn.staticfile.org/bootstrap/5.3.1/js/bootstrap.min.js';
        document.head.appendChild(bootstrapJs);
    };
    document.head.appendChild(jQueryScript);
})();
