<template>
  <div :class="['cell', force ? 'cell--force' : '']">
    <div class="title">
      {{ title }}
    </div>
    <div v-if="!force && !hideDetails" class="details" @click="doClick">
      点击显示
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    title: {
      type: String,
      default: ''
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    force: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.cell {
  padding: 10px 10px;
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
}
.cell--force {
  background-color: deepskyblue;
  color: #fff;
}
.title {
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
}
.details {
  flex-grow: 0;
  flex-shrink: 0;
  text-align: right;
  margin-left: 10px;
}
</style>
