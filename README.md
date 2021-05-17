# Custom Scroller
> A customizable Vue scroller component 📜📦

**WARNING: custom-scroller is at pre-alpha stage of development and may undergo significant changes.**

**Feel free to submit issues and feature requests [here](https://github.com/singh-ravi-siso/vue-custom-scroller/issues)**.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Installation

``` bash
npm i @vuetility/vue-custom-scroller
```

or if you prefer yarn

``` bash
yarn add @vuetility/vue-custom-scroller
```

## Usage

### Global

You may install Custom Scroller globally:

``` js
import Vue from 'vue';
import VueCustomScroller from '@vuetility/vue-custom-scroller';

Vue.use(VueCustomScroller);
```
This will make **&lt;custom-scroller&gt;** available to all components within your Vue app.

### Local

Include the custom scroller directly into your component using import:

``` js
<script>
import { CustomScroller } from '@vuetility/vue-custom-scroller';

export default {
  ...
  components: {
    CustomScroller
  }
  ...
};
</script>
<template>
  ...
    <scrollable-element ref="targetEl"></scrollable-element> /* some scrollable element(component) */
    <custom-scroller targetElement="targetEl"/>
  ...
</template>
```

### Props
| Property                    | Type    | Required | Default | Description                                                                                                                                                                                                                                                                           |
|:----------------------------|:--------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| targetElement               | String  | true    |         | ref of the element to scroll, it can be an HTMLElement or a VueComponent
| onlyShowIfOverflowing       | Boolean | false   | true    | Only show scroller if the target element overflows
| customClass                 | String  | false   |         | class name to override the scroller styles(find the default styles attached below)

### Default styles

```scss
.v-vuetility__vue-custom-scroller {
    width: 200px;
    outline: none;
    -webkit-appearance: none;
    background: #EBEBEB;
    border-radius: 4px;
    cursor: pointer;
}
.v-vuetility__vue-custom-scroller::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #233242;
    height: 5px;
    width: var(--slider-thumb-width);
    cursor: pointer;
    background: #233242;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #233242, 0 0 1px #233242;
}
```

#### Default styles can be overridden by passing the custom class name as a prop, like this:

```html
<template>
    ...
    <custom-scroller 
        targetElement="targetEl" 
        customClass="custom-class"
        onlyShowIfOverflowing
        step="0.7"
    ></custom-scroller>
    ...
</template>
<style scoped>
>>> .custom-class {
    /*...styles here...*/
}
>>> .custom-class::-webkit-slider-thumb {
    /*...styles here...*/
}
</style>
```

## Demo

[Click here](https://codesandbox.io/s/vue-custom-scroller-3jr2r?file=/src/App.vue) to see the component in action.

## Development

To begin development, run:

``` bash
npm install
npm run serve
```

then navigate to `http://localhost:8080/`
