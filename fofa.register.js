// ==UserScript==
// @name         自动填充注册表单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动填充 i.nosec.org/register注册表单
// @author       simon
// @match        https://i.nosec.org/register*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    let email="@xxx.com"
    let number = GM_getValue("number");
    if(!number){
        number=1;
    }
    const inputElement = document.querySelector('input[name="commit"][type="submit"]');
    if(inputElement){
        // 给输入元素添加点击事件监听器
        inputElement.addEventListener('click', function(event) {
            // 在输入元素被点击时执行你的自定义逻辑或操作
            GM_setValue("number",number+1);
            console.log('点击了输入元素！');
            // 可选：阻止默认的表单提交行为
            event.preventDefault();
        });
    }

    // 等待网页加载完成
    window.addEventListener('load', function() {
        const pwd='!QAZ2wsx';
        // 寻找并填充文本框
        const emailInput = document.querySelector('input#nosecuser_email');
        const passwordInput = document.querySelector('input#nosecuser_password');
        const confirmPasswordInput = document.querySelector('input#nosecuser_password_confirmation');
        const usernameInput = document.querySelector('input#nosecuser_username');

        if (emailInput) {
            emailInput.value = number + email;
        }

        if (passwordInput && confirmPasswordInput) {
            passwordInput.value = pwd;
            confirmPasswordInput.value = pwd;
        }

        if (usernameInput) {
            const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            usernameInput.value = `simon_lui${randomNum}`;
        }
    });
})();
