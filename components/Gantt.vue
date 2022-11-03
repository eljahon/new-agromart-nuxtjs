<template>
  <div class="q-pa-sm">
    <gantt-elastic
      :options="options"
      :tasks="fields"
      @tasks-changed="tasksUpdate"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
      @taskList-task-click="onTaskClick"
    >
      <gantt-header slot="header" :options="gantHeader" />
    </gantt-elastic>
    <div class="q-mt-md" />
    <button label="Add task" @click="addTask" />
  </div>
</template>

<script>
// import GanttElastic from 'gantt-elastic'
// import GanttHeader from 'gantt-elastic-header'
// import dayjs from 'dayjs'
// just helper to get current dates
function getDate (hours) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime()
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}
function startDate (date) {
  return new Date(date).getTime()
}
function taskClick (e) {
//   window.vue.onTaskClick(e)
}
export default {
  name: 'Gantt',
  components: {
    // GanttElastic
    // GanttHeader
  },
  data () {
    return {
      fields: [],
      options: {
        taskMapping: {
          progress: 'percent'
        },
        maxRows: 100,
        maxHeight: 500,
        row: {
          height: 24
        },
        calendar: {
          hour: {
            display: false
          }
        },
        chart: {
          progress: {
            bar: false
          },
          expander: {
            display: true
          }
        },
        taskList: {
          expander: {
            straight: true
          },
          columns: [
            {
              id: 1,
              label: 'Fields',
              value: 'label',
              width: 200,
              expander: true,
              html: true,
              events: {
                click ({ data }) {
                  taskClick(data)
                }
              }
            },
            {
              id: 2,
              label: 'Season',
              value: 'season',
              width: 68
            },
            {
              id: 4,
              label: 'Type',
              value: 'type',
              width: 68
            }
          ]
        }
      },
      dynamicStyle: {},
      lastId: 16,
      gantHeader: {
        title: {
          // label: '<button @click class="add_task_button">Add Task</button>',
          label: 'Agsat',
          html: true
        },
        locale: {
          Now: 'Cейчас',
          'X-Scale': 'Увеличить-Х',
          'Y-Scale': 'Увеличить-Y',
          'Task list width': 'Список заданий',
          'Before/After': 'Расширять',
          'Display task list': 'Показать список задач'
        }
      }
    }
  },
  created () {
    // this.fetchFields().then(() => {
    //   console.log(this)
    // })
  },
  mounted () {},
  methods: {
    onTaskClick (e) {
    //   if (e.parentId) {
    //     this.$store.dispatch(getById, e.main_id).then(res => {
    //       const _ = this.task
    //       _.seasonID = {
    //         label: res.seasonID?.name,
    //         value: res.seasonID?.id
    //       }
    //       _.fertilizerTypeID = {
    //         label: res.fertilizerTypeID?.name,
    //         value: res.fertilizerTypeID?.id
    //       }
    //       _.activity_type_ID = {
    //         label: res.activity_type_ID?.name,
    //         value: res.activity_type_ID?.id
    //       }
    //       _.field = {
    //         label: res.field?.name,
    //         value: res.field?.id
    //       }
    //       _.unitID = {
    //         label: res.unitID?.name,
    //         value: res.unitID?.id
    //       }
    //       _.id = res.id
    //       _.title = res.title
    //       _.periodDays = res.periodDays
    //       _.startDate = res.startDate
    //       _.description = res.description
    //       _.comment = res.comment
    //       _.costs = res.costs
    //       _.fertilizerAmount = res.fertilizerAmount
    //       this.addTaskModal = true
    //       console.log(this.task)
    //     })
    //   }
    },
    taskGenerator (field, parent) {
      this.fields.push({
        id: field.name ? (field.name.replaceAll(' ', '') + field.id) : (field.title.replaceAll(' ', '') + field.id),
        main_id: field.id,
        label: `<strong class="task_name">${field.name || field.title}</strong>`,
        season: field.seasonId || '',
        start: field.startDate ? startDate(field.startDate) : getDate(0),
        duration: field.periodDays ? (field.periodDays * 24 * 60 * 60 * 1000) : 0,
        parentId: parent,
        percent: 0,
        type: 'project',
        style: {
          base: {
            fill: `#${Math.floor(Math.random() * 9)}c${Math.floor(Math.random() * 9)}c1e`,
            stroke: '#ffffff'
          }
        }
      })
      if (field.activities && field.activities.length) {
        field.activities.forEach((e) => {
          this.taskGenerator(e, field.name.replaceAll(' ', '') + e.field)
        })
      }
    },
    async fetchFields () {
      await this.$store.dispatch('crud/field/getFields').then((res) => {
        res.forEach((field) => {
          this.taskGenerator(field)
        })
      })
    },
    addTask () {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: 'project'
      })
    },
    tasksUpdate (tasks) {
      this.tasks = tasks
    },
    optionsUpdate (options) {
      this.options = options
    },
    styleUpdate (style) {
      this.dynamicStyle = style
    }
  }
}
</script>
