### 使用步骤
* yarn add weison-utils
* import {myTypeof,getRandomNum,throttle,debounce,deepClone} from 'weison-utils'
  * getRandomNum(min, max)
  * myTypeof(val) 
  * throttle(cb,interval,isImmediately = true,isLastExec = false) //cb回调函数,interval节流间隔时长，isImmediately是否立刻执行，isLastExec最后是否再触发一次
  * debounce(cb, time = 3000, isImmediately = false)//cb回调函数,time防抖延迟时长，isImmediately是否立刻执行
  * deepClone(origin) //深拷贝
* import {getScrolledSize,getViewportSize,getPageSize,getElementPosition} from 'weison-utils'
  * getScrolledSize()获取已滚动距离,返回{left,top}
  * getViewportSize()获取视窗宽高,返回{width,height}
  * getPageSize()获取整个页面的大小,返回{width,height}
  * getElementPosition(el)获取某个元素离文档左上角顶点距离,返回{left,top}