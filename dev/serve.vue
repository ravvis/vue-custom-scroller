<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
import { CustomScroller } from "@/entry.esm";
import scrollableElement from "./scrollableElement";
export default Vue.extend({
  name: "ServeDev",
  components: {
    CustomScroller,
    scrollableElement
  },
});
</script>

<template>
  <div id="app">
<!--    <scrollable-element ref="targetEl"></scrollable-element>-->
    <div style="overflow: auto; display: flex; align-items: center;" ref="targetEl">
      <div v-for="i in 10" :key="i"
           style="height: 100px; min-width: 200px; background: red; margin-right: 24px; flex: 1; border-radius: 16px;"></div>
    </div>
    <div style="display: flex; justify-content: center;">
      <custom-scroller targetElement="targetEl"/>
    </div>
  </div>
</template>
