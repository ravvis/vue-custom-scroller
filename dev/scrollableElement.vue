<script>

export default {
  name: "scrollableElement",
  components: {},
}
</script>

<template>
  <div style="overflow: auto; display: flex; align-items: center;" ref="targetEl">
    <div
      v-for="i in 10"
      :key="i"
      style="height: 100px; min-width: 200px; background: red; margin-right: 24px; flex: 1; border-radius: 16px;"></div>
  </div>
</template>
