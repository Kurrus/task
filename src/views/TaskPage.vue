<template>
  <div class="content task-create">
    <form action="" @submit.prevent="submit" class="task-create__form">
      <div class="task-create__form-group">
        <label for="name">Названия*</label>
        <input type="text" id="name" v-model="name" placeholder="Названия" disabled>
        <small v-if="!$v.name.required && $v.name.$dirty">Введите название</small>
      </div>
      <div class="task-create__form-group">
        <label for="tags">Теги</label>
        <vue-tags-input
            id="tags"
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            :autocomplete-items="filteredItems"
            placeholder="Перечислите теги через Enter"
        />
      </div>
      <div class="task-create__form-group">
        <label for="description">Описание*</label>
        <textarea id="description" v-model="description" placeholder="Напишете описание задачи"></textarea>
        <small v-if="!$v.description.required && $v.description.$dirty">Введите описание</small>
        <small v-if="!$v.description.maxLength && $v.description.$dirty">Описане не должно превышать
          {{ $v.description.$params.maxLength.max }} символов.</small>
      </div>
      <div class="task-create__form-group">
        <label>Дедлаин</label>
        <date-picker id="deadline" lang="ru" v-model="deadline" value-type="timestamp"></date-picker>
      </div>
      <div class="task-create__form-group">
        <label for="status">Статус</label>
        <select id="status" v-model="currentStatus">
          <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.text }}</option>
        </select>
      </div>
      <div class="task-create__form-group">
        <input type="submit" value="Создать" class="btn-primary">
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueTagsInput from '@johmun/vue-tags-input';
import {maxLength, required} from 'vuelidate/lib/validators'

export default {
  components: {DatePicker, VueTagsInput},
  data() {
    return {
      name: null,
      tag: '',
      tags: [],
      description: null,
      deadline: Date.now(),
      currentStatus: null
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      let fields = {
        id: this.task.id,
        name: this.name,
        tags: this.tags,
        description: this.description,
        deadline: this.deadline,
        status: this.currentStatus,
      }
      await this.$store.dispatch('updateTask', fields)
      await this.$router.push('/tasks-list')
    }
  },
  async created() {
    await this.$store.dispatch('getTask', this.$route.params.id)
    const {name, tags, description, deadline, status} = this.task
    this.name = name
    this.tags = tags
    this.description = description
    this.deadline = deadline
    this.currentStatus = status
  },
  computed: {
    filteredItems() {
      return this.$store.getters.getTags.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    task() {
      return this.$store.getters.getTaskInfo
    },
    status() {
      return this.$store.getters.getStatus
    }
  },
  validations: {
    name: {
      required
    },
    description: {
      required,
      maxLength: maxLength(2048)
    }
  }
}
</script>
