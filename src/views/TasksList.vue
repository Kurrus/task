<template>
  <div class="content tasks-list">
    <Filters />
    <div class="tasks-list__wrap">
      <router-link
          v-for="(task, index) in tasks"
          :key="index"
          :to="`/task-page/${task.id}`"
          class="tasks-list__card"
      >
        <p class="name">{{task.name}}</p>
        <div class="tasks-list__card-body">
          <ul class="tags">
            <li
                v-for="(tag, index) in task.tags"
                :key="index"
            >{{tag.text}}</li>
          </ul>
          <p class="description">{{task.description}}</p>
        </div>
        <p class="deadline">{{task.deadline | date('datetime')}}</p>
        <p class="status">{{getStatus(task.status)}}</p>

      </router-link>
    </div>
  </div>
</template>

<script>
import Filters from "../components/page-elements/Filters";
export default {
  components: {Filters},
  async created() {
    await this.$store.dispatch('getTasks')
  },
  methods:{
    getStatus(status){
      return this.status.filter(el => el.value === status)[0].text
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasksList
    },
    status(){
      return this.$store.getters.getStatus
    }
  },
}
</script>
