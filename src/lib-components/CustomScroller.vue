<template>
  <div class="b-custom-scroller--wrapper" v-if="!onlyShowIfOverflowing || to_show">
    <label>
      <input
        class="b-custom-scroller"
        v-if="reference"
        ref="input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        @input="changeMainScroll"
        v-model="value"
      >
    </label>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data(){
    return{
      reference:null,
      value:0,
      to_show: true,
    }
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    onlyShowIfOverflowing: {
      type: Boolean,
      default: true
    },
    targetElement: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      default: 0.5
    },
  },
  mounted(){
    this.$nextTick(()=>{
      this.setReference();
      this.setValue();
      this.setThumbWidth();
      this.setToShow()
    })
  },
  updated(){
    window.addEventListener('scroll',()=>{
      this.setValue();
      this.setThumbWidth();
      this.setToShow()
    },true)
  },
  computed: {
    getFractionToScroll(){
      return (this.reference.clientWidth / this.reference.scrollWidth) ;
    },
    getWidthToScroll(){
      return (this.reference.scrollWidth - this.reference.clientWidth) ;
    },
    isTargetAVueComponent(){
      return this.$parent.$refs[this.targetElement] instanceof Vue;
    }
  },
  methods:{
    setThumbWidth(){
      if(this.$el && this.$el.style){
    typeof    this.$el.style.setProperty("--slider-thumb-width", `${this.getFractionToScroll * 100}%`);
      }
    },
    setToShow(){
      this.$set(this, 'to_show', this.getFractionToScroll < 1)
    },
    setReference(){
      this.reference = this.isTargetAVueComponent ? this.$parent.$refs[this.targetElement].$el : this.$parent.$refs[this.targetElement];
    },
    setValue(){
      this.value = Math.floor(( this.reference.scrollLeft * 100 ) / this.getWidthToScroll)
    },
    changeMainScroll(){
      this.reference.scrollLeft = this.value * this.getWidthToScroll / 100
      this.setThumbWidth();
      this.setToShow()
    },
  }
}
</script>

<style scoped>
:root{
  --slider-thumb-width : 90%;
}
 .b-custom-scroller {
  width: 200px;
  outline: none;
  -webkit-appearance: none;
   background: #EBEBEB;
   border-radius: 4px;
  cursor: pointer;
}
 .b-custom-scroller::-webkit-slider-thumb {
   -webkit-appearance: none;
   border: 1px solid #233242;
   height: 5px;
   width: var(--slider-thumb-width);
   cursor: pointer;
   background: #233242;
   border-radius: 4px;
   box-shadow: 1px 1px 1px #233242, 0 0 1px #233242;
 }
</style>
