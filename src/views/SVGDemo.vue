<template>
  <div class="container">
    <div class="luck-lottery">
      <svg
        class="svg-content"
        viewBox="0 0 64 64"
        fill="currentColor"
        fill-rule="evenodd"
      >
        <g class="g1">
          <!-- 上 -->
          <circle v-for="i in 6" :key="i" :cx="2 + 12 * (i - 1)" cy="2" r="1" />
          <!-- 左 -->
          <circle v-for="i in 6" :key="i" cx="2" :cy="2 + 12 * (i - 1)" r="1" />
          <!-- 下 -->
          <circle
            v-for="i in 6"
            :key="i"
            :cx="2 + 12 * (i - 1)"
            cy="62"
            r="1"
          />
          <!-- 右 -->
          <circle
            v-for="i in 6"
            :key="i"
            cx="62"
            :cy="2 + 12 * (i - 1)"
            r="1"
          />
        </g>
        <g class="g2">
          <!-- 上 -->
          <circle v-for="i in 6" :key="i" :cx="8 + 12 * (i - 1)" cy="2" r="1" />
          <!-- 左 -->
          <circle v-for="i in 6" :key="i" cx="2" :cy="8 + 12 * (i - 1)" r="1" />
          <!-- 下 -->
          <circle
            v-for="i in 6"
            :key="i"
            :cx="8 + 12 * (i - 1)"
            cy="62"
            r="1"
          />
          <!-- 右 -->
          <circle
            v-for="i in 6"
            :key="i"
            cx="62"
            :cy="8 + 12 * (i - 1)"
            r="1"
          />
        </g>
      </svg>

      <ul class="lottery-list">
        <template v-for="(n, i) in awardList">
          <li
            :key="n.id"
            :class="{ selected: current === n.runId, startStyle: i === 4 }"
          >
            <div v-if="i !== 4">{{ n.name }}</div>
            <div class="startBtn" v-else @click="handleStart">点击抽奖</div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
export default {
  setup() {
    let time = 0,
      speed = 100,
      diff = 20

    const current = ref(0),
      lotteryList = reactive([
        {
          id: 1,
          runId: 0,
          name: '潘多拉音箱'
        },
        {
          id: 2,
          runId: 1,
          name: '小酷M1耳机'
        },
        {
          id: 3,
          runId: 2,
          name: '酷狗VIP会员'
        },
        {
          id: 4,
          runId: 7,
          name: '8元话费'
        },
        {
          id: 5,
          runId: 3,
          name: '12元话费'
        },
        {
          id: 6,
          runId: 6,
          name: '谢谢参与1'
        },
        {
          id: 7,
          runId: 5,
          name: '4元话费'
        },
        {
          id: 8,
          runId: 4,
          name: '谢谢参与2'
        }
      ])

    // 计算属性
    const awardList = computed(() => {
      let newArr = JSON.parse(JSON.stringify(lotteryList))
      newArr.splice(4, 0, { name: 'drawBtn' })
      return newArr
    })

    const handleStart = () => {
      time = Date.now()
      move()
    }

    const move = () => {
      let timer = setTimeout(() => {
        current.value++
        speed += diff
        if (current.value > 7) {
          current.value = 0
        }
        if ((Date.now() - time) / 1000 > 8) {
          clearTimeout(timer)
          return
        }
        move()
      }, speed)
    }

    return {
      awardList,
      current,
      handleStart
    }
  }
}
</script>

<style lang="less" scoped>
.luck-lottery {
  position: relative;
  height: 600px;
  width: 600px;
  margin: 0 auto;
  color: #fed479;
  background: #fed479;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 40px;

  .svg-content {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
  }

  .g1 {
    animation: bulb-animation 0.5s -0.25s infinite;
  }

  .g2 {
    animation: bulb-animation 0.5s infinite;
  }

  .lottery-list {
    height: 100%;
    width: 100%;
    list-style: none;
    top: 0;
    left: 0;
    padding: 35px;
    margin: 0;
    position: absolute;
    z-index: 9;

    li {
      display: flex;
      float: left;
      align-items: center;
      justify-content: center;
      width: 28%;
      height: 28%;
      background-color: #fff;
      border-radius: 20%;
      margin: 3px;
      box-sizing: border-box;
      &.selected {
        border: 2px solid #ff7051;
        border-top-width: 9px;
      }

      &.startStyle {
        background-color: #b73131;
      }
    }
    .startBtn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: 20%;
      animation: draw-btn-jump 0.5s infinite;
      color: #fff;
      background-color: #ff7051;
    }
  }
}

@keyframes bulb-animation {
  0% {
    color: #ffffff;
  }

  50% {
    color: #ffe37f;
  }

  100% {
    color: #ffffff;
  }
}

@keyframes draw-btn-jump {
  0% {
    top: -6px;
  }

  50% {
    top: 0;
  }

  100% {
    top: -6px;
  }
}
</style>
