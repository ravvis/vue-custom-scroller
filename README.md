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

## Demo

[Click here](https://codesandbox.io/s/vue-custom-scroller-3jr2r?file=/src/App.vue) to see the component in action.

## Development

To begin development, run:

``` bash
npm install
npm run serve
```

then navigate to `http://localhost:8080/`
