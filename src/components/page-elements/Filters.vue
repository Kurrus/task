<template>
  <div class="tasks-list__filter">
    <h3>Фильтры</h3>
    <form class="tasks-list__form">
      <div class="tasks-list__form-group">
        <label>
          Теги:
          <select v-model="currentTags">
            <option :value="''">Все</option>
            <option v-for="(item, index) in tags" :key="index" :value="item.text">{{ item.text }}</option>
          </select>
        </label>
      </div>
      <div class="tasks-list__form-group">
        <label>
          Статус:
        <select v-model="currentStatus">
          <option :value="''">Все</option>
          <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.text }}</option>
        </select>
        </label>
      </div>
      <div class="tasks-list__form-group">
        <label>
          <input type="checkbox" v-model="overdue">
          Просроченные задачи
        </label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: '',
      currentTags: '',
      overdue: false,
      filter: {}
    }
  },
  watch: {
    currentTags(newValue) {
      if (newValue){
        this.filter.tag = newValue
      }else {
        delete this.filter.tag
      }
      this.$router.push({query:this.filter})
      this.$store.dispatch('getTasks')
    },
    currentStatus(newValue) {
      if (newValue){
        this.filter.status = newValue
      }else {
        delete this.filter.status
      }
      this.$router.push({query:this.filter})
      this.$store.dispatch('getTasks')
    },
    overdue(newValue) {
      if (newValue){
        this.filter.overdue = newValue
      }else {
        delete this.filter.overdue
      }
      this.$router.push({query:this.filter})
      this.$store.dispatch('getTasks')
    }
  },
  computed:{
    status(){
      return this.$store.getters.getStatus
    },
    tags(){
      return this.$store.getters.getTags
    }
  }
}
</script>