<template>
  <div class="container">
    <h3>TodoList</h3>
    <input type="text" v-model="todoName" ref="todoinput" />
    <button @click="handleAddTodoList">新增清单</button>
    <div>
      <h3 class="title">
        任务清单
      </h3>
      <div class="row" v-for="todo in todoList" :key="todo.id">
        <span>{{ todo.name }}</span>
        <button @click="handleTodo(todo)">已完成</button>
        <button @click="handleDelete(todo, todoList)">删除</button>
      </div>
    </div>
    <div>
      <h3 class="title">
        已完成
      </h3>
      <div class="row" v-for="done in doneList" :key="done.id">
        <span>{{ done.name }}</span>
        <button @click="handleDelete(done, doneList)">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue'

export default {
  setup() {
    const { ctx } = getCurrentInstance()

    const todoName = ref('')
    // Todo 清单
    const todoList = reactive([
      {
        id: Date.now(),
        name: '吃饭'
      }
    ])

    // Done 清单
    const doneList = reactive([
      {
        id: Date.now(),
        name: '洗澡'
      }
    ])

    // 点击新增任务
    const handleAddTodoList = () => {
      if (todoName.value === '') return ctx.$refs.todoinput.focus()
      todoList.push({
        id: Date.now(),
        name: JSON.parse(JSON.stringify(todoName))
      })
    }

    // 点击完成
    const handleTodo = it => {
      todoList.splice(
        todoList.findIndex(i => i.id === it.id),
        1
      )
      doneList.push(it)
    }

    // 点击删除
    const handleDelete = (it, arr) => {
      const start = arr.findIndex(i => i.id === it.id)
      if (start > -1) {
        arr.splice(start, 1)
      }
    }

    return {
      todoName,
      doneList,
      todoList,
      handleTodo,
      handleDelete,
      handleAddTodoList
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .row ~ .row {
    padding-top: 10px;
  }
  .row {
    display: flex;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    span {
      flex: 1;
    }
  }
}
</style>
