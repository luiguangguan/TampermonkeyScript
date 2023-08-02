// ==UserScript==
// @name         弹幕快捷键【C键】
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在找到指定的input元素后，监听键盘的Ctrl+Shift+D并在按下组合键时让input元素获得焦点（仅适用于B站）
// @author       You
// @icon         https://www.bilibili.com/favicon.ico
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    let timer;
    let inputElement;

    function checkInputElement() {
        inputElement = document.querySelector('input.bpx-player-dm-input');
        if (inputElement) {
            console.log('已找到 input 元素:', inputElement);
            clearInterval(timer);

            document.addEventListener('keydown', handleKeyDown);
        }
    }

    function handleKeyDown(event) {
        // 检查是否按下了 Ctrl+Shift+D 组合键
        //if (event.ctrlKey && event.shiftKey &&( event.key === 'f'|| event.key === 'F')) {
        if (( event.key === 'c'|| event.key === 'C')) {
            if(event.ctrlKey||event.shiftKey||event.altKey||event.winKey||event.metaKey){
                console.log("按下了控制键")
                return;
            }
            if(document.activeElement === inputElement){
                return;
            }
            console.log("按下键盘");
            event.preventDefault();
            moveCursorToInputElement();
        }
    }

    function moveCursorToInputElement() {
        inputElement.click();
        inputElement.focus();
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }

    timer = setInterval(checkInputElement, 500);
})();
