export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function myTypeof(val) {
  var type = typeof val;
  var resObj = {
    "[object Array]": "array",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object Object]": "object",
    "[object Number]": "object number",
    "[object String]": "object string",
    "[object Boolean]": "object boolean",
  };
  if (val === null) {
    return "null";
  } else if (type === "object") {
    var typeStr = Object.prototype.toString.call(val);
    return resObj[typeStr];
  } else {
    return type;
  }
}

//节流，连续触发只会在每time时间段内执行回调
//例如滚动屏幕scroll，不停的滚动只会在[0,time]，[time+1,time*2]，...每个time时间段内分别执行一次回调
export function throttle(
  cb,
  interval,
  isImmediately = true,
  isLastExec = false
) {
  //isImmediately是否首次触发事件马上执行回调，否的话则等到下个time时间段再执行
  //isLastExec是否执行最后一次
  let last = isImmediately ? 0 : Date.now();
  let t = null;
  return function () {
    const args = arguments;
    const now = Date.now(); //当前时间戳
    if (now - last > interval) {
      //上次执行的时间戳减去当前触发事件的时间戳大于设定的间隔
      cb.apply(this, args);
      last = now; //回调后更新最新一次执行的时间戳
    } else if (isLastExec) {
      t && clearTimeout(t);
      t = setTimeout(() => {
        cb.apply(this, args);
        last = Date.now(); //需要重新获取now并刷新last防止最后一次执行后新触发事件时立马执行
      }, interval);
    }
  };
}

//防抖，连续触发只会在最后一次触发事件延迟time内不再触发事件后执行回调一次
//例如滚动屏幕scroll，不停的滚动只会在（1,需要停止滚动 2,且停止滚动后等待time内不再滚动）后执行一次回调
export function debounce(cb, time = 3000, isImmediately = false) {
  //isImmediately是否立即执行
  let t = null;
  let exec = true;
  return function () {
    const args = arguments;
    t && clearTimeout(t); //清除上次触发事件的定时器
    if (isImmediately && exec) {
      cb.apply(this, args); //首次需立即执行
      exec = false;
    } else {
      t = setTimeout(() => {
        //重新设定最新一次触发事件的定时器
        cb.apply(this, args); //time内不再触发,即t不被clear，那么time后执行一次回调cb
      }, time);
    }
  };
}

export function deepClone(origin, target) {
  var tar = target || {},
    toStr = Object.prototype.toString,
    arrType = "[object Array]";

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === "object" && origin[key] !== null) {
        toStr.call(origin[key]) === arrType ? (tar[key] = []) : (tar[key] = {});
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }
  return tar;
}

//获取已滚动距离
export function getScrolledSize() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
    };
  } else {
    return {
      //ie浏览器特别之处，这里仅有一个不为0
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
//获取视窗宽高
export function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    //怪异模式
    if (document.compatMode === "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    } else {
      //兼容w3c的标准模式
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }
  }
}
//获取整个页面的大小
export function getPageSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
    };
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    };
  }
}
//获取某个元素离文档左上角顶点距离
export function getElementPosition(el) {
  let parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    //若父级的父级仍有定位元素则继续累加
    parent = parent.offsetParent;
  }
  return {
    left: offsetLeft,
    top: offsetTop,
  };
}
