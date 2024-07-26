<template>
  <!-- 鉴于一般这种页面都用了 element-plus，如果没有用，也可以自己用flex写个左右布局即可 -->
  <el-container>
    <el-aside width="150px" class="doc-toc-container">
      <ul class="toc-wrapper">
        <li class="toc-item" v-for="(name, index) in sideList" :key="index">
          <a :class="['toc-link', { active: sideNow === index }]" :href="`#${name}`">
            <p>{{ name }}</p>
          </a>
        </li>
      </ul>
    </el-aside>
    <el-main class="doc-content">
      <div ref="docContentRef" class="docContentRef">
        <section class="content-item" :id="`${name}`" v-for="(name, index) in sideList" :key="index">{{ name }}
        </section>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const docContentRef = ref(null)
const sideNow = ref(0)
const sideList = ref(['锚点一', '锚点二', '锚点三', '锚点四'])
/**
 * 滚动回调处理
 * 计算当前滚了多少，如果离某个锚点够近就设置导航高亮
 */
const scrollHandler = () => {
  let itemDoms = docContentRef.value.querySelectorAll('.content-item')
  let st = docContentRef.value.scrollTop
  let idxOld = sideNow.value

  for (let index = 0; index < itemDoms.length; index++) {
    const element = itemDoms[index]
    if (Math.abs(st - element.offsetTop) < 60) {
      sideNow.value = index
    }
  }

  // 有时最后一条滚动不到容器顶部,这时直接高亮最后一个
  if (st - itemDoms[itemDoms.length - 2].offsetTop > 200) {
    sideNow.value = itemDoms.length - 1
  }

  console.log(111, st, sideNow.value, `#${itemDoms[sideNow.value].id}`)

  // 变化浏览器地址栏的锚点hash值为当前导航
  if (sideNow.value !== idxOld) {
    // 这样直接修改hash会导致页面跳到该锚点，并且页面刷新了，可以观察到触发了 onBeforeUnmount
    // window.location.hash = `#${itemDoms[sideNow.value].id}`

    // 用 replaceState 来动态修改浏览器地址栏中的锚点内容
    let { origin, pathname, search } = location
    let newUrl = `${origin}${pathname}${search}#${itemDoms[sideNow.value].id}`

    console.log('newUrl', newUrl)
    history.replaceState({}, '', newUrl)
  }
}

/**
 * 节流
 * @param {function} fun
 * @param {number} delay
 * @returns
 */
function throttle(fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}

// 给滚动处理加入节流
const scrollHandlerThrottled = throttle(scrollHandler, 100)

onMounted(() => {
  // 进入页面时平滑滚动到之前hash锚点的位置，如果没有的话，滚动到第一个
  let parent = docContentRef.value
  let hashNow = decodeURIComponent(window.location.hash) || `#${sideList.value[0]}`
  let child = parent.querySelector(hashNow)

  console.log('hashNow', hashNow)
  parent.scrollTo({
    top: child.offsetTop, //需要父元素设置postion(relative、absolute、fixed)
    behavior: 'smooth',
  })

  // 监听内容区域滚动，检测滚动到了哪个hash
  docContentRef.value.addEventListener('scroll', scrollHandlerThrottled)
})
// 退出页面时销毁注册
onBeforeUnmount(() => {
  console.log('leave page')
  docContentRef.value.removeEventListener('scroll', scrollHandlerThrottled)
})
</script>
<style lang="scss" scoped>
.doc-toc-container {
  overflow: visible;
  border-right: 1px solid #eee;

  .toc-wrapper {
    // 通过这里让左侧导航在页面中不动
    position: sticky;
    top: 32px;
    margin-top: 0;
    padding: 4px 8px 4px 12px;
    margin-bottom: 32px;

    list-style: none;

    .toc-item {
      margin-bottom: 30px;

      .toc-link {
        position: relative;
        color: #909399;
        transition: color 0.2s;
        font-weight: 500;
        text-decoration: none;
      }

      .active {
        color: #409eff;
      }
    }
  }
}

.doc-content {
  .docContentRef {
    // 设置这个position用于子元素的offsetTop是相对于它的
    position: relative;
    height: calc(100vh - 150px);
    padding-bottom: 50px;
    overflow: auto;
  }

  .content-item {
    margin-bottom: 20px;
    height: 500px;
    background-color: yellow;
  }
}
</style>
