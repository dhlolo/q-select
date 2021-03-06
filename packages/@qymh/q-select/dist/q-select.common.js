/**
 * @qymh/q-select v0.4.10
 * (c) 2020 Qymh
 * @license MIT
 */
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var Dom = (function () {
    function Dom() {
        this.initialDomString = '';
    }
    Dom.prototype.init = function (data, options, inline, callback) {
        var _this = this;
        var id = options.id, loading = options.loading;
        var baseSize = Math.floor(options.count / 2) * options.chunkHeight;
        if (!inline) {
            this.initialDomString += "\n        <div class=\"q-select-header q-select-header--" + id + "\" style=\"height:45px;padding-left:20px;padding-right:20px;\">\n          <div class=\"q-select-header-cancel q-select-header-cancel--" + id + "\" style=\"width:100px; font-size:14px;\">\n            <div class=\"q-select-header-cancel__value q-select-header-cancel__value--" + id + "\">" + (options.cancelBtn ||
                '取消') + "</div>\n          </div>\n          <div class=\"q-select-header-title q-select-header-title--" + id + "\">\n            <div class=\"q-select-header-title__value q-select-header-title__value--" + id + "\">" + (options.title ||
                '请选择') + "</div>\n          </div>\n          <div class=\"q-select-header-confirm q-select-header-confirm--" + id + "\" style=\"width:100px; font-size:14px;\">\n            <div class=\"q-select-header-confirm__value q-select-header-confirm__value--" + id + "\">" + (options.confirmBtn ||
                '确定') + "</div>\n          </div>\n        </div>\n      ";
        }
        this.initialDomString += "\n      <div style=\"height:" + options.count * options.chunkHeight + "px;display:" + (loading ? 'flex' : 'none') + "\" class=\"q-select-loading q-select-loading--" + id + "\">\n        <svg class=\"q-select-loading-svg\" viewBox=\"25 25 50 50\" style=\"height:30px; width:30px;\">\n          <circle\n            class=\"q-select-loading-svg__circle\"\n            cx=\"50\"\n            cy=\"50\"\n            r=\"20\"\n            fill=\"none\"\n          />\n        </svg>\n      </div>\n      <div style=\"height:" + options.count *
            options.chunkHeight + "px\" class=\"q-select-box q-select-box--" + id + "\">\n    ";
        data.forEach(function (v) {
            _this.initialDomString += "\n      <div class=\"q-select-box-item q-select-box-item--" + id + " q-select-flex\">\n        <div class=\"q-select-box-item__overlay q-select-box-item__overlay--" + id + "\" style=\"background-size: 100% " + (!loading ? baseSize + 'px' : '100%') + ";\"></div>\n        <div class=\"q-select-box-item__highlight q-select-box-item__highlight--" + id + "\" style=\"top: " + baseSize + "px;height: " + options.chunkHeight + "px\"></div>\n        <div class=\"q-select-box-item-collections q-select-box-item-collections--" + id + "\">\n        " + v
                .map(function (p) {
                return "<div style=\"line-height: " + options.chunkHeight + "px;\" class=\"" + (p.disabled
                    ? 'q-select-box-item-collections__tick--disabled'
                    : '') + " q-select-box-item-collections__tick q-select-box-item-collections__tick--" + id + "\">\n              " + p.value + "\n            </div>";
            })
                .join('') + "\n        </div>\n      </div>\n      ";
        });
        callback(this.initialDomString);
    };
    Dom.prototype.remove = function () {
        this.initialDomString = '';
    };
    Dom.diff = function (dataTrans, dataTransLater, weight, id, chunkHeight, touches, hand, callback) {
        var $collections = Dom.findAll("q-select-box-item-collections--" + id);
        var $select = Dom.find("q-select-box--" + id);
        if (dataTrans.length < dataTransLater.length) {
            if ($collections.length < dataTransLater.length) {
                var $overlayArr = [];
                var $chunksArr = [];
                var $highlightArr = [];
                for (var y = hand ? weight : weight + 1; y < dataTrans.length; y++) {
                    var collection = $collections[y];
                    Dom.diffForDatas(collection, id, chunkHeight, touches[y].data, dataTransLater[y]);
                }
                for (var v = $collections.length; v < dataTransLater.length; v++) {
                    var fragment = document.createDocumentFragment();
                    var $box = Dom.create('div');
                    Dom.addClass($box, [
                        'q-select-box-item',
                        'q-select-flex',
                        "q-select-box-item--" + id
                    ]);
                    var $overlay = Dom.create('div');
                    Dom.addClass($overlay, [
                        'q-select-box-item__overlay',
                        "q-select-box-item__overlay--" + id
                    ]);
                    var $highlight = Dom.create('div');
                    Dom.addClass($highlight, [
                        'q-select-box-item__highlight',
                        "q-select-box-item__highlight--" + id
                    ]);
                    Dom.addStyle($highlight, { height: chunkHeight + "px" });
                    $box.appendChild($overlay);
                    $box.appendChild($highlight);
                    var $chunks = Dom.create('div');
                    Dom.addClass($chunks, [
                        'q-select-box-item-collections',
                        "q-select-box-item-collections--" + id
                    ]);
                    for (var y = 0; y < dataTransLater[v].length; y++) {
                        var $div = Dom.create('div');
                        Dom.addClass($div, [
                            'q-select-box-item-collections__tick',
                            "q-select-box-item-collections__tick--" + id
                        ]);
                        Dom.addStyle($div, { lineHeight: chunkHeight + "px" });
                        $div.textContent = dataTransLater[v][y].value;
                        fragment.appendChild($div);
                    }
                    $chunks.appendChild(fragment);
                    $box.appendChild($chunks);
                    $select.appendChild($box);
                    $overlayArr[v] = $overlay;
                    $chunksArr[v] = $chunks;
                    $highlightArr[v] = $highlight;
                }
                callback && callback($overlayArr, $chunksArr, $highlightArr);
            }
            else {
                for (var y = hand ? weight : weight + 1; y < dataTransLater.length; y++) {
                    var collection = Dom.findIndex("q-select-box-item-collections--" + id, y);
                    Dom.diffForDatas(collection, id, chunkHeight, touches[y].data, dataTransLater[y]);
                }
                callback && callback();
            }
        }
        else if (dataTrans.length === dataTransLater.length) {
            for (var y = hand ? weight : weight + 1; y < dataTransLater.length; y++) {
                Dom.diffForDatas($collections[y], id, chunkHeight, dataTrans[y], dataTransLater[y]);
            }
            callback && callback();
        }
        else if (dataTrans.length > dataTransLater.length) {
            for (var y = hand ? weight : weight + 1; y < dataTransLater.length; y++) {
                Dom.diffForDatas($collections[y], id, chunkHeight, dataTrans[y], dataTransLater[y]);
            }
            callback && callback();
        }
    };
    Dom.diffForDatas = function (collect, id, chunkHeight, dataTransList, dataTransListLater) {
        var diffLen = dataTransListLater.length - dataTransList.length;
        var dataTransListLen = dataTransList.length;
        var dataTransListLaterLen = dataTransListLater.length;
        if (diffLen > 0) {
            var fragment = document.createDocumentFragment();
            for (var y = 0; y < dataTransListLen; y++) {
                var _a = dataTransListLater[y], value = _a.value, disabled = _a.disabled;
                var item = collect.children[y];
                item.textContent = value;
                if (!disabled) {
                    Dom.removeClass(item, 'q-select-box-item-collections__tick--disabled');
                }
                else {
                    Dom.addClass(item, 'q-select-box-item-collections__tick--disabled');
                }
            }
            for (var y = dataTransListLen; y < dataTransListLaterLen; y++) {
                var div = document.createElement('div');
                var _b = dataTransListLater[y], value = _b.value, disabled = _b.disabled;
                Dom.addClass(div, [
                    'q-select-box-item-collections__tick',
                    "q-select-box-item-collections__tick--" + id
                ]);
                if (disabled) {
                    Dom.addClass(div, ['q-select-box-item-collections__tick--disabled']);
                }
                Dom.addStyle(div, { lineHeight: chunkHeight + "px" });
                div.textContent = value;
                fragment.appendChild(div);
            }
            collect.appendChild(fragment);
        }
        else {
            for (var y = 0; y < dataTransListLaterLen; y++) {
                var _c = dataTransListLater[y], value = _c.value, disabled = _c.disabled;
                var item = collect.children[y];
                item.textContent = value;
                if (!disabled) {
                    Dom.removeClass(item, 'q-select-box-item-collections__tick--disabled');
                }
                else {
                    Dom.addClass(item, 'q-select-box-item-collections__tick--disabled');
                }
            }
            var children = __spreadArrays(Array.from(collect.children));
            for (var y = dataTransListLaterLen; y < dataTransListLen; y++) {
                collect.removeChild(children[y]);
            }
        }
    };
    Dom.create = function (tag) {
        return document.createElement(tag);
    };
    Dom.find = function (className) {
        return document.querySelector("." + className);
    };
    Dom.findIndex = function (className, index) {
        var $els = Array.from(document.querySelectorAll("." + className));
        return $els[index];
    };
    Dom.findLast = function (className) {
        var $els = Array.from(document.querySelectorAll("." + className));
        return $els[$els.length - 1];
    };
    Dom.addClass = function (el, className) {
        if (Array.isArray(className)) {
            className = className.filter(function (v) {
                return !el.classList.contains(v);
            });
        }
        else {
            if (el.classList.contains(className)) {
                return;
            }
        }
        var add = Array.isArray(className) ? className.join(' ') : className;
        el.className += " " + add;
    };
    Dom.removeClass = function (el, className) {
        var _a;
        if (Array.isArray(className)) {
            (_a = el.classList).remove.apply(_a, className);
        }
        else {
            el.classList.remove(className);
        }
    };
    Dom.addStyle = function (el, style) {
        var _this = this;
        if (Array.isArray(style)) {
            style.map(function (v) { return _this.addStyle(el, v); });
        }
        else {
            for (var key in style) {
                el.style[key] = style[key];
            }
        }
    };
    Dom.remove = function (parent, child) {
        if (child) {
            parent.removeChild(child);
        }
    };
    Dom.findAll = function (className) {
        return document.querySelectorAll("." + className);
    };
    Dom.bind = function (el, event, fn, options) {
        el.addEventListener(event, fn, options);
    };
    Dom.unbind = function (el, event) {
        el.removeEventListener(event, function () { });
    };
    return Dom;
}());

function easeOutCubic(pos) {
    return Math.pow(pos - 1, 3) + 1;
}
function firstUpper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
function isPlainObj(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}
function isPlainNumber(obj) {
    return isFinite(obj);
}
function assert(condition, msg) {
    if (process.env.NODE_ENV === 'development') {
        if (!condition) {
            return Boolean(console.error("[SelectQ]: " + msg));
        }
        else {
            return true;
        }
    }
    return true;
}
function sameIndex(a, b) {
    return a.length === b.length && a.every(function (v, i) { return v === b[i]; });
}
function tips(condition, msg) {
    if (process.env.NODE_ENV === 'development') {
        if (!condition) {
            return Boolean(console.warn("[SelectQ]: " + msg));
        }
        else {
            return true;
        }
    }
    return true;
}
function deepClone(val) {
    if (Array.isArray(val)) {
        return val.map(function (v) { return deepClone(v); });
    }
    else if (isPlainObj(val)) {
        var res = {};
        for (var key in val) {
            var item = val[key];
            res[key] = isPlainObj(item) ? deepClone(item) : item;
        }
        return res;
    }
    else {
        return val;
    }
}
function isDefined(val) {
    return val === 0 || !!val;
}

window.requestAnimationFrame =
    window.requestAnimationFrame || window.webkitRequestAnimationFrame;
window.cancelAnimationFrame =
    window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
var Animate = (function () {
    function Animate(duration) {
        if (duration === void 0) { duration = 200; }
        this.start = 0;
        this.end = 0;
        this.diff = 0;
        this.dir = 'bottom';
        this.count = 0;
        this.ratio = 0;
        this.result = 0;
        this.animateId = 0;
        this.duration = duration;
        this.pipline = true;
    }
    Animate.prototype.getAnimateCount = function (duration) {
        return duration / 16;
    };
    Animate.prototype.getDirection = function () {
        return this.start > this.end ? 'top' : 'bottom';
    };
    Animate.prototype.run = function (start, end, callback, last, duration) {
        if (start === end) {
            last && last(end);
            return;
        }
        if (duration === 0) {
            last && last(end);
            return;
        }
        this.pipline = true;
        this.ratio = 0;
        this.start = start;
        this.end = end;
        this.result = start;
        this.diff = Math.abs(this.start - this.end);
        this.count = Math.ceil(this.getAnimateCount(duration || this.duration));
        this.dir = this.getDirection();
        this.doAnimate(callback, last);
    };
    Animate.prototype.stop = function () {
        this.pipline = false;
        this.ratio = 0;
        window.cancelAnimationFrame(this.animateId);
    };
    Animate.prototype.doAnimate = function (callback, last) {
        if (!this.pipline) {
            return;
        }
        this.ratio += 1 / this.count;
        if (this.ratio <= 1) {
            this.result =
                this.start +
                    this.diff * easeOutCubic(this.ratio) * (this.dir === 'bottom' ? 1 : -1);
            this.animateId = window.requestAnimationFrame(this.doAnimate.bind(this, callback, last));
        }
        else {
            this.result = this.end;
            window.cancelAnimationFrame(this.animateId);
            last && last(this.end);
            this.ratio = 0;
        }
        callback && callback(this.result);
    };
    return Animate;
}());

var Touch = (function () {
    function Touch(data, aim, overlay, collection, hightlightEl, curIndex, pre, endCall, fromDiff) {
        this.overlay = overlay;
        this.collection = collection;
        this.hightlightEl = hightlightEl;
        this.pre = pre;
        this.endCall = endCall;
        this.curIndex = curIndex;
        this.preIndex = curIndex;
        this.preTrans = 0;
        this.animateSlide = new Animate(2000);
        this.animateShrink = new Animate(250);
        this.data = data;
        this.average = Math.floor(pre.count / 2);
        this.maxScrollTop = 0;
        this.minScrollTop = 0;
        this.featureScrollTop = 0;
        this.isAnimating = false;
        this.aim = aim;
        this.hidden = false;
        this.lastTime = 0;
        this.positions = [];
        this.touchStart = 0;
        this.touchDiff = 0;
        this.fromDiff = fromDiff || false;
        this.init();
    }
    Touch.prototype.init = function () {
        Dom.bind(this.overlay, 'touchstart', this.doTouchStart.bind(this));
        Dom.bind(this.overlay, 'touchmove', this.doTouchMove.bind(this));
        Dom.bind(this.overlay, 'touchend', this.doTouchEnd.bind(this));
        this.initTrans();
    };
    Touch.prototype.active = function (index) {
        Dom.removeClass(Dom.findIndex("q-select-box-item--" + this.pre.id, index), 'q-select-none');
        Dom.addClass(Dom.findIndex("q-select-box-item--" + this.pre.id, index), 'q-select-flex');
        this.hidden = false;
    };
    Touch.prototype.deactive = function (index) {
        Dom.removeClass(Dom.findIndex("q-select-box-item--" + this.pre.id, index), 'q-select-flex');
        Dom.addClass(Dom.findIndex("q-select-box-item--" + this.pre.id, index), 'q-select-none');
        this.hidden = true;
    };
    Touch.prototype.reset = function (data, reset) {
        this.data = data;
        this.preIndex = this.curIndex;
        this.setMinScrollTop(this.data);
        if (reset) {
            this.preIndex = 0;
            this.curIndex = 0;
            this.scrollTo(0);
        }
        else {
            this.scrollTo(this.pre.dynamicIndex[this.aim]);
        }
    };
    Touch.prototype.initTrans = function () {
        var val = (this.average - this.curIndex) * this.pre.chunkHeight;
        this.preTrans = val;
        this.initScrollTop(this.average * this.pre.chunkHeight);
        this.setTrans(val);
        if (this.fromDiff) {
            this.setSize();
        }
    };
    Touch.prototype.setSize = function () {
        var baseSize = Math.floor(this.pre.$options.count / 2) * this.pre.$options.chunkHeight;
        Dom.addStyle(this.overlay, {
            backgroundSize: "100% " + baseSize + "px"
        });
        if (this.hightlightEl) {
            Dom.addStyle(this.hightlightEl, {
                top: baseSize + "px"
            });
        }
    };
    Touch.prototype.shrinkSize = function () {
        Dom.addStyle(this.overlay, {
            backgroundSize: "100% 100%"
        });
    };
    Touch.prototype.initScrollTop = function (top) {
        this.maxScrollTop = top;
        this.setMinScrollTop(this.data);
    };
    Touch.prototype.setMinScrollTop = function (data) {
        this.minScrollTop =
            this.maxScrollTop - (data.length - 1) * this.pre.chunkHeight;
    };
    Touch.prototype.setTrans = function (value) {
        this.collection.style.transform = "translate3d(0," + value + "px,0)";
    };
    Touch.prototype.getTouchCenter = function (touches) {
        if (touches.length >= 2) {
            return (touches[0].pageY + touches[1].pageY) / 2;
        }
        else {
            return touches[0].pageY;
        }
    };
    Touch.prototype.doTouchStart = function (e) {
        if (!this.data.length || this.data.every(function (v) { return v.disabled; })) {
            return;
        }
        this.touchStart = this.getTouchCenter(e.touches);
        this.animateSlide.stop();
        this.animateShrink.stop();
    };
    Touch.prototype.doTouchMove = function (e) {
        e.preventDefault();
        if (!this.data.length || this.data.every(function (v) { return v.disabled; })) {
            return;
        }
        var time = e.timeStamp;
        this.touchDiff =
            this.getTouchCenter(e.touches) - this.touchStart + this.preTrans;
        if (this.touchDiff >
            this.maxScrollTop + this.pre.$options.chunkHeight * 0.4) {
            this.touchDiff = this.maxScrollTop + this.pre.$options.chunkHeight * 0.4;
        }
        if (this.touchDiff <
            this.minScrollTop - this.pre.$options.chunkHeight * 0.4) {
            this.touchDiff = this.minScrollTop - this.pre.$options.chunkHeight * 0.4;
        }
        if (this.positions.length > 60) {
            this.positions.splice(0, 30);
        }
        this.positions.push({
            top: this.touchDiff,
            time: time
        });
        this.lastTime = time;
        this.setTrans(this.touchDiff);
    };
    Touch.prototype.doTouchEnd = function (e) {
        if (!this.data.length || this.data.every(function (v) { return v.disabled; })) {
            return;
        }
        var time = e.timeStamp;
        this.isAnimating = true;
        if (time - this.lastTime <= 100) {
            this.doSlideAnimate(time);
        }
        else {
            this.doShrinkAnimate();
        }
    };
    Touch.prototype.doSlideAnimate = function (time) {
        var post = this.positions.length - 1;
        var pre = this.positions.filter(function (v) { return v.time >= time - 100; })[0];
        var timeOffset = this.positions[post].time - pre.time;
        var movedTop = this.touchDiff - pre.top;
        var decelerationTrans;
        decelerationTrans = (movedTop / timeOffset) * (1000 / 60);
        var featureScrollTop = this.touchDiff;
        var debounceScrollTop;
        var duration = 0;
        var isFrezzed = false;
        this.positions.length = 0;
        while (Math.abs(decelerationTrans) >= 0.1) {
            duration += 16;
            decelerationTrans = decelerationTrans * 0.95;
            featureScrollTop += decelerationTrans;
            if (featureScrollTop >= this.maxScrollTop) {
                isFrezzed = true;
                featureScrollTop = this.maxScrollTop;
                debounceScrollTop =
                    this.maxScrollTop + this.pre.$options.chunkHeight * 0.4;
                break;
            }
            if (featureScrollTop <= this.minScrollTop) {
                isFrezzed = true;
                featureScrollTop = this.minScrollTop;
                debounceScrollTop =
                    this.minScrollTop - this.pre.$options.chunkHeight * 0.4;
                break;
            }
        }
        this.preIndex = this.curIndex;
        var featureIndex = this.getFeatureIndex(featureScrollTop);
        featureIndex = this.getDisabledAfterIndex(featureIndex);
        var realFeatureScrollTop = isFrezzed
            ? featureScrollTop
            : this.getFeatureScrollTop(featureIndex);
        if (Math.abs(movedTop) <= 10 || duration <= 250) {
            this.shrinkAnimateToEnd(realFeatureScrollTop, undefined, debounceScrollTop);
        }
        else {
            this.slideAnimateToEnd(realFeatureScrollTop, duration, debounceScrollTop);
        }
    };
    Touch.prototype.doShrinkAnimate = function () {
        this.shrinkAnimateToEnd(this.touchDiff);
    };
    Touch.prototype.scrollTo = function (index) {
        var featureScrollTop = this.getFeatureScrollTop(index || 0);
        this.shrinkAnimateToEnd(featureScrollTop, true);
    };
    Touch.prototype.getDisabledAfterIndex = function (index) {
        while (this.data[index].disabled) {
            index++;
            if (index === this.data.length) {
                index--;
                break;
            }
        }
        if (index === this.data.length - 1) {
            while (this.data[index].disabled) {
                index--;
            }
        }
        return index;
    };
    Touch.prototype.slideAnimateToEnd = function (realFeatureScrollTop, duration, debounce) {
        var _this = this;
        this.animateSlide.run(this.touchDiff, debounce || realFeatureScrollTop, function (res) {
            _this.touchDiff = res;
            _this.preTrans = res;
            _this.setTrans(res);
        }, function (end) {
            if (debounce) {
                _this.shrinkAnimateToEnd(realFeatureScrollTop);
            }
            else {
                _this.animateFinishedCall(end);
            }
        }, duration);
    };
    Touch.prototype.shrinkAnimateToEnd = function (featureScrollTop, fast, debounce) {
        var _this = this;
        var index = this.getFeatureIndex(featureScrollTop);
        index = this.getDisabledAfterIndex(index);
        featureScrollTop = this.getFeatureScrollTop(index);
        this.animateShrink.run(this.touchDiff, debounce || featureScrollTop, function (res) {
            _this.setTrans(res);
            _this.preTrans = res;
            _this.touchDiff = res;
        }, function (end) {
            if (debounce) {
                _this.shrinkAnimateToEnd(featureScrollTop);
            }
            else {
                _this.animateFinishedCall(end, fast);
            }
        }, fast ? 0 : 250);
    };
    Touch.prototype.animateFinishedCall = function (end, fast) {
        this.isAnimating = false;
        this.preTrans = end;
        this.touchDiff = end;
        this.setTrans(end);
        this.curIndex = this.getFeatureIndex(end);
        if (this.preIndex === this.curIndex || fast) {
            return;
        }
        var curData = this.data[this.curIndex];
        if (!this.fromDiff) {
            this.endCall(__assign(__assign({}, curData), { index: this.curIndex }), this.aim);
        }
        this.preIndex = this.curIndex;
    };
    Touch.prototype.getFeatureIndex = function (featureScrollTop) {
        var curI = this.average - Math.round(featureScrollTop / this.pre.chunkHeight);
        var len = this.data.length;
        return curI < 0 ? 0 : curI > len - 1 ? len - 1 : curI;
    };
    Touch.prototype.getFeatureScrollTop = function (featureIndex) {
        return (this.average - featureIndex) * this.pre.chunkHeight;
    };
    Touch.prototype.destroy = function () {
        Dom.unbind(this.overlay, 'touchstart');
        Dom.unbind(this.overlay, 'touchmove');
        Dom.unbind(this.overlay, 'touchend');
    };
    return Touch;
}());

var id = 0;
var Layer = (function () {
    function Layer(options) {
        this.$options = options || {};
        options = options || {};
        this.id = id++;
        this.target = null;
        if (options.target) {
            var $target = document.querySelector(options.target);
            if ($target) {
                this.target = $target;
            }
            else {
                assert(false, "can not catch " + options.target + ",make sure you have set a right flag of a element");
            }
        }
        this.$options.id = this.id;
        this.count = options.count = isPlainNumber(+options.count)
            ? +options.count
            : 7;
        this.chunkHeight = options.chunkHeight = isPlainNumber(+options.chunkHeight)
            ? +options.chunkHeight
            : 40;
        this.data = deepClone(options.data);
        this.dataTrans = [];
        this.index = options.index;
        this.dynamicIndex = [];
        this.realIndex = [];
        this.touchs = [];
        this.dynamicData = [];
        this.realData = [];
        this.cachedCall = [];
        this.isReady = false;
        this.isGanged = false;
        this.hidden = true;
        this.loading = !!options.loading;
        this.dom = new Dom();
        this.validateOptions() && this.init();
    }
    Layer.prototype.validateOptions = function () {
        var _this = this;
        function tipsForFn(value) {
            if (this.$options[value] && typeof this.$options[value] !== 'function') {
                tips(false, value + " must be a function but not get " + this.$options[value]);
                this.$options[value] = function () { };
            }
        }
        if (this.count % 2 !== 1 && (this.count < 5 || this.count > 9)) {
            tips(false, "count can only be 5 or 7 or 9, but now get " + this.count);
            this.count = this.$options.count = 7;
        }
        if (this.chunkHeight < 30 || this.chunkHeight > 60) {
            tips(false, "chunkHeight must greater than 30 and less than 60,but now get " + this.chunkHeight);
            this.chunkHeight = this.$options.chunkHeight = 40;
        }
        ['ready', 'cancel', 'confirm', 'show', 'close'].map(function (v) {
            return tipsForFn.call(_this, v);
        });
        if (!this.validateData() || !this.validateIndex()) {
            return false;
        }
        return true;
    };
    Layer.prototype.validateData = function (forceData, forceType) {
        var data = forceData || this.$options.data;
        if (!data ||
            !Array.isArray(data) ||
            (Array.isArray(data) && data.length === 0)) {
            tips(false, 'data can only be an array');
            this.data = data = [['']];
        }
        this.isGanged =
            forceType !== undefined
                ? forceType
                : data.every(function (v) { return isPlainObj(v); });
        function validateGangedData(data, firstLevel) {
            return data.every(function (v) {
                if (isPlainObj(v)) {
                    var levelBool = true;
                    var childBool = true;
                    if (firstLevel) {
                        levelBool = assert(v.value, 'value is required if in the first level of GangedData');
                    }
                    else {
                        childBool = assert(v.value, 'value is required if you use object to define a property of GangedData');
                    }
                    if ((childBool || levelBool) && v.children && v.children.length) {
                        return validateGangedData(v.children, false);
                    }
                    return true;
                }
                else {
                    return assert(typeof v === 'string' || typeof v === 'number', "value can only be number or string if you use object to define a property of GangedData but now get " + v);
                }
            });
        }
        if (this.isGanged) {
            return validateGangedData(data, true);
        }
        else {
            return data.every(function (v) {
                if (!Array.isArray(v)) {
                    assert(false, "NotGangedData must contain arrays, but now get " + v);
                    return false;
                }
                return v.every(function (p) {
                    if (isPlainObj(p)) {
                        if (p.children && p.children.length) {
                            return assert(false, 'notGangedData can not has prop which is children');
                        }
                        else {
                            return assert(p.value !== undefined, 'value is required if NotGangedData is an object');
                        }
                    }
                    else if (typeof p !== 'string' && typeof p !== 'number') {
                        return assert(false, "value can only be number or string if NotGangedData is not an object but now get " + p + " which is " + typeof p);
                    }
                    return true;
                });
            });
        }
    };
    Layer.prototype.validateIndex = function (forceIndex) {
        var index = forceIndex || this.$options.index;
        if (!index) {
            return true;
        }
        if (!Array.isArray(index)) {
            return assert(false, "index must be an Array, but now get " + index);
        }
        return index.every(function (v) {
            if (typeof v !== 'number') {
                return assert(false, "index can only be a number, but now get " + v);
            }
            return true;
        });
    };
    Layer.prototype.init = function () {
        var _this = this;
        this.normalizeData();
        this.dom.init(this.dataTrans, this.$options, !!this.target, function (domString) {
            var $bk = Dom.find('q-select-bk');
            if (!$bk && !_this.target) {
                var $bk_1 = Dom.create('div');
                Dom.addClass($bk_1, 'q-select-bk');
                Dom.addStyle($bk_1, [
                    {
                        zIndex: isPlainNumber(+_this.$options.bkIndex)
                            ? +_this.$options.bkIndex
                            : 500
                    },
                    {
                        display: 'none'
                    }
                ]);
                document.body.appendChild($bk_1);
            }
            var $el = Dom.create('div');
            Dom.addClass($el, ['q-select', "q-select--" + _this.id]);
            if (!_this.target) {
                Dom.addStyle($el, [
                    {
                        zIndex: isPlainNumber(+_this.$options.selectIndex)
                            ? +_this.$options.selectIndex
                            : 600
                    },
                    {
                        display: 'none'
                    }
                ]);
            }
            else {
                Dom.addStyle($el, [
                    {
                        position: 'static'
                    }
                ]);
            }
            $el.innerHTML = domString;
            if (!_this.target) {
                document.body.appendChild($el);
            }
            else {
                _this.target.appendChild($el);
                _this.hidden = false;
            }
            _this.dom.remove();
            _this.prepareMount();
        });
    };
    Layer.prototype.getDisabledAfterIndex = function (data, index) {
        if (!data || !data[index]) {
            return index;
        }
        while (data[index].disabled) {
            index++;
            if (index === this.data.length) {
                index--;
                break;
            }
        }
        if (index === this.data.length - 1) {
            while (data[index].disabled) {
                index--;
            }
        }
        return index;
    };
    Layer.prototype.normalizeIndex = function (dataTransLater, forceIndex) {
        var _this = this;
        this.index = forceIndex || this.index;
        this.index =
            this.index || Array.from({ length: dataTransLater.length }).fill(0);
        this.index.map(function (v, i) {
            if (v < 0) {
                _this.index[i] = 0;
            }
            if (dataTransLater[i]) {
                var len = dataTransLater[i].length;
                if (v > len - 1) {
                    _this.index[i] = len - 1;
                }
            }
            _this.index[i] = _this.getDisabledAfterIndex(_this.dataTrans[i], _this.index[i]);
            return v;
        });
        var lenDiff = this.index.length - dataTransLater.length;
        this.index =
            lenDiff >= 0
                ? this.index.slice(0, dataTransLater.length)
                : __spreadArrays(this.index, Array.from({ length: Math.abs(lenDiff) }).fill(0));
        this.dynamicIndex = __spreadArrays(this.index);
        this.realIndex = __spreadArrays(this.index);
    };
    Layer.prototype.normalizeData = function (forceData, index) {
        if (this.isGanged) {
            this.normalizeGangedData();
            this.dataTrans = this.genGangedData(this.data);
        }
        else {
            if (forceData) {
                if (Array.isArray(forceData) && Array.isArray(index)) {
                    for (var i = 0; i < forceData.length - 1; i++) {
                        this.data[index[i]] = forceData[index[i]];
                    }
                }
                else {
                    this.data[index] = forceData;
                }
            }
            this.normalizeNotGangedData();
            this.dataTrans = deepClone(this.data);
        }
    };
    Layer.prototype.normalizeGangedData = function () {
        function loop(data) {
            data.map(function (v, i) {
                if (!isPlainObj(v)) {
                    data[i] = v = {
                        value: v,
                        key: v,
                        children: []
                    };
                }
                else {
                    v.key = v.key || v.value;
                }
                if (v.children && v.children.length) {
                    loop(v.children);
                }
                else {
                    v.children = [];
                }
                return v;
            });
        }
        loop(this.data);
    };
    Layer.prototype.normalizeNotGangedData = function () {
        this.data.map(function (v) {
            for (var key in v) {
                var item = v[key];
                if (isPlainObj(item)) {
                    item.key = item.key || item.value;
                }
                else {
                    v[key] = {
                        key: item,
                        value: item
                    };
                }
            }
            return v;
        });
    };
    Layer.prototype.prepareMount = function () {
        var _this = this;
        this.normalizeIndex(this.dataTrans);
        var $overlays = Dom.findAll("q-select-box-item__overlay--" + this.id);
        var $collections = Dom.findAll("q-select-box-item-collections--" + this.id);
        var $highlights = Dom.findAll("q-select-box-item__highlight--" + this.id);
        this.dynamicData = this.dataTrans.reduce(function (acc, val, index) {
            acc[index] = val[_this.index[index]] || {};
            acc[index].index = index;
            return acc;
        }, []);
        this.realData = deepClone(this.dynamicData);
        if (!this.target) {
            this.mountActions();
        }
        this.mountTouches($overlays, $collections, $highlights);
    };
    Layer.prototype.mountActions = function () {
        var _this = this;
        var $confirm = Dom.find("q-select-header-confirm--" + this.id);
        var $cancel = Dom.find("q-select-header-cancel--" + this.id);
        function reset() {
            this.dynamicIndex = __spreadArrays(this.realIndex);
            if (this.isGanged) {
                var dataTrans = deepClone(this.dataTrans);
                var dataTransLater = this.genGangedData(this.data, this.realIndex);
                this.diff(dataTrans, dataTransLater, 0, true, false, true);
            }
            this.stopAll();
        }
        Dom.bind($confirm, 'click', function () {
            var _a;
            if (_this.touchs.filter(function (v) { return !v.hidden; }).every(function (v) { return !v.isAnimating; })) {
                _this.realIndex = __spreadArrays(_this.dynamicIndex);
                _this.realData = deepClone(_this.dynamicData);
            }
            else {
                _this.dynamicData = deepClone(_this.realData);
                reset.call(_this);
            }
            _this.closeSelect();
            _this.$options.confirm && (_a = _this.$options).confirm.apply(_a, _this.getChangeCallData());
        });
        Dom.bind($cancel, 'click', function () {
            if (!_this.$options.disableDefaultCancel) {
                _this.closeSelect();
            }
            reset.call(_this);
            _this.$options.cancel && _this.$options.cancel();
        });
    };
    Layer.prototype.mountTouches = function ($overlays, $collections, $highlights) {
        var _a;
        var _this = this;
        this.dataTrans.forEach(function (v, i) {
            _this.touchs[i] = new Touch(v, i, $overlays[i], $collections[i], $highlights[i], _this.dynamicIndex[i], _this, _this.touchCallback.bind(_this));
        });
        this.setBoxWidth();
        this.isReady = true;
        this.$options.ready && (_a = this.$options).ready.apply(_a, this.getChangeCallData());
    };
    Layer.prototype.closeSelect = function () {
        var _this = this;
        if (this.hidden) {
            return;
        }
        var $select = Dom.find("q-select--" + this.id);
        var $bk = Dom.find("q-select-bk");
        Dom.addStyle($bk, {
            display: 'none'
        });
        this.slideAnimation('out', $select, function () {
            var _a;
            Dom.addStyle($select, {
                display: 'none'
            });
            _this.hidden = true;
            _this.$options.hide && (_a = _this.$options).hide.apply(_a, _this.getChangeCallData());
        });
    };
    Layer.prototype.destroySelect = function () {
        this.touchs.forEach(function (v) { return v.destroy(); });
        Dom.remove(document.body, Dom.find("q-select--" + this.id));
        if (Dom.findAll('q-select').length === 0) {
            Dom.remove(document.body, Dom.find("q-select-bk"));
        }
        this.__proto__ = null;
        for (var key in this) {
            this[key] = null;
        }
    };
    Layer.prototype.showSelect = function () {
        var _this = this;
        if (!this.hidden) {
            return;
        }
        var $select = Dom.find("q-select--" + this.id);
        var $bk = Dom.find("q-select-bk");
        Dom.addStyle($select, { display: 'block' });
        Dom.addStyle($bk, { display: 'block' });
        this.slideAnimation('in', $select, function () {
            var _a;
            _this.hidden = false;
            _this.$options.show && (_a = _this.$options).show.apply(_a, _this.getChangeCallData());
        });
    };
    Layer.prototype.slideAnimation = function (type, $select, callback) {
        Dom.addClass($select, [
            'animated',
            type === 'in' ? 'slideInUp' : 'slideOutDown'
        ]);
        var timer = setTimeout(function () {
            Dom.removeClass($select, [
                'animated',
                type === 'in' ? 'slideInUp' : 'slideOutDown'
            ]);
            callback && callback();
            clearTimeout(timer);
        }, 200);
    };
    Layer.prototype.stopAll = function () {
        var _this = this;
        this.touchs
            .filter(function (v) { return !v.hidden; })
            .forEach(function (v, i) {
            v.animateShrink.stop();
            v.animateSlide.stop();
            v.scrollTo(_this.realIndex[i]);
            v.setMinScrollTop(_this.dataTrans[i]);
        });
    };
    Layer.prototype.setIndexAndData = function (dataTransLater) {
        var _this = this;
        dataTransLater.forEach(function (v, i) {
            var curIndex = _this.dynamicIndex[i];
            if (curIndex > v.length - 1) {
                _this.realIndex[i] = _this.dynamicIndex[i] = curIndex = v.length - 1;
            }
            if (curIndex < 0) {
                _this.realIndex[i] = _this.dynamicIndex[i] = curIndex = 0;
            }
            _this.dynamicData[i] = __assign(__assign({}, dataTransLater[i][curIndex]), { index: curIndex });
            _this.realData[i] = __assign(__assign({}, dataTransLater[i][curIndex]), { index: curIndex });
        });
    };
    Layer.prototype.setBoxWidth = function () {
        var $box = Dom.findAll("q-select-box-item--" + this.id);
        var width = 100 / this.touchs.filter(function (v) { return !v.hidden; }).length + '%';
        $box.forEach(function (v) {
            v.style.width = width;
        });
    };
    Layer.prototype.touchCallback = function (value, i) {
        this.dynamicIndex[i] = value.index;
        if (this.target) {
            this.realIndex[i] = value.index;
        }
        if (!this.isGanged) {
            this.notGangedCallback(value, i);
        }
        else {
            this.gangedCallback(value, i);
        }
    };
    Layer.prototype.notGangedCallback = function (value, i) {
        var _a;
        this.dynamicData[i] = value;
        var cache = function () { };
        cache.priority = i;
        this.cachedCall.push(cache);
        if (this.touchs.every(function (v) { return !v.isAnimating; }) && !this.hidden) {
            var weight = Math.min.apply(Math, this.cachedCall.reduce(function (acc, val) {
                acc.push(+val.priority);
                return acc;
            }, []));
            var changeCallData = this.getChangeCallData();
            this.$options.change && (_a = this.$options).change.apply(_a, __spreadArrays([weight], changeCallData));
            this.cachedCall.length = 0;
        }
    };
    Layer.prototype.gangedCallback = function (value, i) {
        var callback = function () { };
        callback.priority = i;
        callback.value = value;
        var activeTouches = this.touchs.filter(function (v) { return !v.hidden; });
        this.cachedCall[i] = callback;
        if (activeTouches.every(function (v) { return !v.isAnimating; })) {
            var weight = Math.min.apply(Math, this.cachedCall.reduce(function (acc, val) {
                acc.push(+val.priority);
                return acc;
            }, []));
            this.dynamicIndex = this.dynamicIndex.slice(0, weight + 1);
            for (var y = weight + 1; y < activeTouches.length; y++) {
                this.dynamicIndex[y] = 0;
            }
            var dataTransLater = this.genGangedData(this.data, this.dynamicIndex);
            this.diff(this.dataTrans, dataTransLater, weight, false, true);
        }
    };
    Layer.prototype.getChangeCallData = function () {
        var valueCollections = this.dynamicData.reduce(function (acc, val) {
            acc.push(val.value);
            return acc;
        }, []);
        var keyCollections = this.dynamicData.reduce(function (acc, val) {
            acc.push(val.key);
            return acc;
        }, []);
        var dynamicData = this.dynamicData;
        return [valueCollections, keyCollections, dynamicData];
    };
    Layer.prototype.diff = function (dataTrans, dataTransLater, weight, ignoreChange, resetIndex, trigger) {
        var _this = this;
        Dom.diff(dataTrans, dataTransLater, weight, this.id, this.chunkHeight, this.touchs, trigger, function ($overlay, $collection, $highlight) {
            var _a;
            if (dataTransLater.length > dataTrans.length) {
                _this.dynamicData[weight] = __assign(__assign({}, dataTransLater[weight][_this.dynamicIndex[weight]]), { index: _this.dynamicIndex[weight] });
                for (var y = trigger ? weight : weight + 1; y < dataTransLater.length; y++) {
                    if (!_this.touchs[y]) {
                        _this.touchs[y] = new Touch(dataTransLater[y], y, $overlay[y], $collection[y], $highlight[y], _this.dynamicIndex[y], _this, _this.touchCallback.bind(_this));
                        if (!trigger || resetIndex) {
                            _this.dynamicIndex[y] = 0;
                        }
                        _this.touchs[y].setSize();
                        _this.dynamicData[y] = __assign(__assign({}, dataTransLater[y][_this.dynamicIndex[y]]), { index: _this.dynamicIndex[y] });
                    }
                    else {
                        _this.touchs[y].reset(dataTransLater[y], resetIndex);
                        _this.touchs[y].active(y);
                        if (!trigger || resetIndex) {
                            _this.dynamicIndex[y] = 0;
                        }
                        _this.dynamicData[y] = __assign(__assign({}, dataTransLater[y][_this.dynamicIndex[y]]), { index: _this.dynamicIndex[y] });
                    }
                    _this.setBoxWidth();
                }
                if ($overlay) {
                    $overlay.length = 0;
                    $collection.length = 0;
                    $highlight.length = 0;
                }
            }
            else if (dataTransLater.length === dataTrans.length) {
                _this.resetExistTouch(weight, dataTransLater, trigger, resetIndex);
            }
            else {
                var spliceArr = [];
                for (var y = dataTransLater.length; y < dataTrans.length; y++) {
                    _this.touchs[y].deactive(y);
                    spliceArr.push(y);
                }
                _this.resetExistTouch(weight, dataTransLater, trigger, resetIndex);
                _this.dynamicIndex.splice(spliceArr[0], spliceArr.length);
                _this.dynamicData.splice(spliceArr[0], spliceArr.length);
                spliceArr.length = 0;
                _this.setBoxWidth();
            }
            if (!ignoreChange) {
                var changeCallData = _this.getChangeCallData();
                _this.$options.change && (_a = _this.$options).change.apply(_a, __spreadArrays([weight], changeCallData));
            }
            _this.dataTrans = dataTransLater;
            _this.cachedCall.length = 0;
        });
    };
    Layer.prototype.resetExistTouch = function (weight, dataTransLater, trigger, resetIndex) {
        if (dataTransLater[weight]) {
            this.dynamicData[weight] = __assign(__assign({}, dataTransLater[weight][this.dynamicIndex[weight]]), { index: this.dynamicIndex[weight] });
        }
        for (var y = trigger ? weight : weight + 1; y < this.touchs.filter(function (v) { return !v.hidden; }).length; y++) {
            if (!trigger || resetIndex) {
                this.dynamicIndex[y] = 0;
            }
            this.dynamicIndex[y] = this.getDisabledAfterIndex(dataTransLater[y], this.dynamicIndex[y]);
            this.dynamicData[y] = __assign(__assign({}, dataTransLater[y][this.dynamicIndex[y]]), { index: this.dynamicIndex[y] });
            this.touchs[y].reset(dataTransLater[y], resetIndex);
        }
    };
    Layer.prototype.genGangedData = function (data, preciseIndex) {
        var index = 0;
        var dataTrans = [];
        function genGangedDataChildren(child) {
            dataTrans[index] = [];
            for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                var item = child_1[_i];
                var obj = __assign({}, item);
                delete obj.children;
                dataTrans[index].push(obj);
            }
            var curIndex = (preciseIndex || [])[index] || 0;
            curIndex = this.getDisabledAfterIndex(dataTrans[index], curIndex);
            index++;
            if (child[curIndex]) {
                if (child[curIndex].children.length) {
                    genGangedDataChildren.call(this, child[curIndex].children);
                }
            }
            else if (child[0] && child[0].children.length) {
                genGangedDataChildren.call(this, child[0].children);
            }
        }
        genGangedDataChildren.call(this, data);
        this.completeDynamicIndex(dataTrans);
        return dataTrans;
    };
    Layer.prototype.completeDynamicIndex = function (data) {
        for (var i = 0; i < this.dynamicIndex.length; i++) {
            if (data[i] && this.dynamicIndex[i] > data[i].length - 1) {
                this.dynamicIndex[i] = data[i].length - 1;
            }
            if (this.dynamicIndex[i] < 0) {
                this.dynamicIndex[i] = 0;
            }
        }
        for (var i = this.dynamicIndex.length; i < data.length; i++) {
            this.dynamicIndex[i] = 0;
        }
        this.dynamicIndex = this.dynamicIndex.slice(0, data.length);
    };
    Layer.prototype.callReady = function () {
        var _a;
        this.$options.ready && (_a = this.$options).ready.apply(_a, this.getChangeCallData());
    };
    return Layer;
}());

function argumentsAssert(argumentsVar, argumentsStr, functionName, reject) {
    var bool = false;
    argumentsVar.forEach(function (v, i) {
        if (!assert(isDefined(v), argumentsStr[i] + " is required as the " + i + " argument of " + functionName)) {
            if (!bool) {
                bool = true;
            }
            reject && reject();
        }
    });
    return bool;
}
var QSelect = (function (_super) {
    __extends(QSelect, _super);
    function QSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QSelect.prototype.setColumnData = function (column, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (argumentsAssert([column, data], ['column', 'data'], 'setColumnData', reject)) {
                    return;
                }
                if (_this.touchs.filter(function (v) { return !v.hidden; }).some(function (v) { return v.isAnimating; })) {
                    reject('[SelectQ]: Please wait for animating stops');
                    return;
                }
                var preTrans = __spreadArrays(_this.dataTrans);
                var realData = [];
                if (Array.isArray(column)) {
                    var i = 0;
                    for (var _i = 0, column_1 = column; _i < column_1.length; _i++) {
                        var item = column_1[_i];
                        realData[+item] = data[i];
                        i++;
                    }
                }
                else {
                    realData = data;
                }
                var max = Array.isArray(column)
                    ? column[column.length - 1] + 1
                    : column + 1;
                var min = Array.isArray(column) ? column[0] : column;
                var validateData = Array.isArray(column) ? realData : [realData];
                if (_this.validateData(validateData, false)) {
                    _this.normalizeData(realData, column);
                    _this.dataTrans = _this.dataTrans.slice(0, max).filter(function (v) { return v.length; });
                    _this.normalizeIndex(_this.dataTrans, _this.dynamicIndex);
                    _this.realIndex = __spreadArrays(_this.dynamicIndex);
                    _this.diff(preTrans, _this.dataTrans, min, true, true, true);
                    _this.realData = deepClone(_this.dynamicData);
                    resolve(_this.getChangeCallData());
                }
                else {
                    reject();
                }
            }
            catch (error) {
                reject(error);
            }
        });
    };
    QSelect.prototype.scrollTo = function (column, index) {
        if (argumentsAssert([column, index], ['column', 'index'], 'scrollTo')) {
            return;
        }
        var later = __spreadArrays(this.dynamicIndex);
        later[column] = index;
        return this.setIndex(later);
    };
    QSelect.prototype.setIndex = function (index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                argumentsAssert([index], ['index'], 'setIndex', reject);
                if (_this.validateIndex(index)) {
                    _this._setIndex(index, reject);
                    resolve(_this.getChangeCallData());
                }
                else {
                    reject();
                }
            }
            catch (error) {
                reject(error);
            }
        });
    };
    QSelect.prototype._setIndex = function (index, reject, preDataTrans, diff) {
        var _this = this;
        if (this.touchs.filter(function (v) { return !v.hidden; }).some(function (v) { return v.isAnimating; })) {
            reject('[SelectQ]: Please wait for animating stops');
            return;
        }
        var preIndex = __spreadArrays(this.dynamicIndex);
        this.dynamicIndex = __spreadArrays(index);
        this.realIndex = __spreadArrays(index);
        if (!sameIndex(preIndex, index) || diff) {
            if (!this.isGanged) {
                this.normalizeIndex(this.dataTrans, index);
                if (diff) {
                    this.diff(preDataTrans, this.dataTrans, 0, true, !(index && index.length), true);
                }
                this.setIndexAndData(this.dataTrans);
                this.touchs
                    .filter(function (v) { return !v.hidden; })
                    .forEach(function (v, i) { return v.scrollTo(_this.realIndex[i] || 0); });
                this.callReady();
            }
            else {
                var dataTransLater = this.genGangedData(this.data, this.dynamicIndex);
                this.diff(preDataTrans || this.dataTrans, dataTransLater, 0, true, false, true);
                this.realIndex = __spreadArrays(this.dynamicIndex);
                this.realData = deepClone(this.dynamicData);
                this.callReady();
            }
            this.touchs
                .filter(function (v) { return !v.hidden; })
                .forEach(function (v, i) {
                v.curIndex = v.preIndex = _this.realIndex[i] || 0;
            });
        }
    };
    QSelect.prototype.setValue = function (value) {
        return this._setKeyAndValue('value', value);
    };
    QSelect.prototype.setKey = function (key) {
        return this._setKeyAndValue('key', key);
    };
    QSelect.prototype._setKeyAndValue = function (type, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            argumentsAssert([value], [type], "set" + firstUpper(type), reject);
            var findedIndex = [];
            var index = 0;
            function findIndex(data) {
                data.forEach(function (v, i) {
                    if (v[type] === value[index]) {
                        index++;
                        findedIndex.push(i);
                        findIndex(v.children);
                    }
                });
            }
            try {
                if (_this.isGanged) {
                    findIndex(_this.data);
                    var dataTransLater = _this.genGangedData(_this.data, findedIndex);
                    for (var y = findedIndex.length; y < dataTransLater.length; y++) {
                        findedIndex[y] = 0;
                    }
                }
                else {
                    _this.dataTrans.forEach(function (v, i) {
                        var res = v.findIndex(function (w) { return w[type] === value[i]; });
                        findedIndex.push(res === -1 ? 0 : res);
                    });
                }
                _this._setIndex(findedIndex, reject);
                resolve(_this.getChangeCallData());
            }
            catch (error) {
                reject(error);
            }
        });
    };
    QSelect.prototype.setData = function (data, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.isGanged = data.every(function (v) { return isPlainObj(v); });
            if (_this.validateData(data) &&
                (index ? _this.validateIndex(index) : true)) {
                var preDataTrans = deepClone(_this.dataTrans);
                _this.data = deepClone(data);
                _this.normalizeData();
                _this._setIndex(index ||
                    Array.from({ length: _this.dataTrans.length }).fill(0), reject, preDataTrans, true);
                resolve(_this.getChangeCallData());
            }
            else {
                reject('wrong data or index');
            }
        });
    };
    QSelect.prototype.getData = function () {
        return this.getChangeCallData();
    };
    QSelect.prototype.getIndex = function () {
        return this.realIndex;
    };
    QSelect.prototype.getValue = function () {
        return this.dynamicData.reduce(function (acc, val) {
            acc.push(val.value);
            return acc;
        }, []);
    };
    QSelect.prototype.getKey = function () {
        return this.dynamicData.reduce(function (acc, val) {
            acc.push(val.key);
            return acc;
        }, []);
    };
    QSelect.prototype.close = function () {
        return this.closeSelect();
    };
    QSelect.prototype.show = function () {
        return this.showSelect();
    };
    QSelect.prototype.destroy = function () {
        return this.destroySelect();
    };
    QSelect.prototype.setLoading = function () {
        this.loading = true;
        var $loading = Dom.find("q-select-loading--" + this.id);
        Dom.addStyle($loading, [{ display: 'flex' }]);
        this.touchs
            .filter(function (v) { return !v.hidden; })
            .forEach(function (v) {
            v.shrinkSize();
        });
    };
    QSelect.prototype.cancelLoading = function () {
        this.loading = false;
        var $loading = Dom.find("q-select-loading--" + this.id);
        Dom.addStyle($loading, { display: 'none' });
        this.touchs
            .filter(function (v) { return !v.hidden; })
            .forEach(function (v) {
            v.setSize();
        });
    };
    QSelect.prototype.setTitle = function (title) {
        if (!argumentsAssert([title], ['title'], 'setTitle')) {
            var $title = Dom.find("q-select-header-title__value--" + this.id);
            $title.innerHTML = title;
        }
    };
    return QSelect;
}(Layer));

module.exports = QSelect;
