import Vue from 'vue';

//
var script = {
  data() {
    return {
      reference: null,
      value: 0,
      to_show: true
    };
  },

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
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
    customClass: {
      type: String
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setReference();
      this.setValue();
      this.setThumbWidth();
      this.setToShow();
    });
  },

  updated() {
    window.addEventListener('scroll', () => {
      this.setValue();
      this.setThumbWidth();
      this.setToShow();
    }, true);
  },

  computed: {
    getFractionToScroll() {
      return this.reference.clientWidth / this.reference.scrollWidth;
    },

    getWidthToScroll() {
      return this.reference.scrollWidth - this.reference.clientWidth;
    },

    isTargetAVueComponent() {
      return this.$parent.$refs[this.targetElement] instanceof Vue;
    }

  },
  methods: {
    setThumbWidth() {
      if (this.$el && this.$el.style) {
        this.$el.style.setProperty("--slider-thumb-width", `${this.getFractionToScroll * 100}%`);
      }
    },

    setToShow() {
      this.$set(this, 'to_show', this.getFractionToScroll < 1);
    },

    setReference() {
      this.reference = this.isTargetAVueComponent ? this.$parent.$refs[this.targetElement].$el : this.$parent.$refs[this.targetElement];
    },

    setValue() {
      this.value = Math.floor(this.reference.scrollLeft * 100 / this.getWidthToScroll);
    },

    changeMainScroll() {
      this.reference.scrollLeft = this.value * this.getWidthToScroll / 100;
      this.setThumbWidth();
      this.setToShow();
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.onlyShowIfOverflowing || _vm.to_show ? _c('div', [_c('label', [_vm.reference ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.value,
      expression: "value"
    }],
    ref: "input",
    staticClass: "v-vuetility__vue-custom-scroller",
    class: [_vm.customClass],
    attrs: {
      "type": "range",
      "min": _vm.min,
      "max": _vm.max,
      "step": _vm.step
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.changeMainScroll,
      "__r": function ($event) {
        _vm.value = $event.target.value;
      }
    }
  }) : _vm._e()])]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-782eb48f_0", {
    source: "[data-v-782eb48f]:root{--slider-thumb-width:90%}.v-vuetility__vue-custom-scroller[data-v-782eb48f]{width:200px;outline:0;-webkit-appearance:none;background:#ebebeb;border-radius:4px;cursor:pointer}.v-vuetility__vue-custom-scroller[data-v-782eb48f]::-webkit-slider-thumb{-webkit-appearance:none;border:1px solid #233242;height:5px;width:var(--slider-thumb-width);cursor:pointer;background:#233242;border-radius:4px;box-shadow:1px 1px 1px #233242,0 0 1px #233242}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-782eb48f";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CustomScroller: __vue_component__
});

// Import vue components

const install = function installVueCustomScroller(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__ as CustomScroller };
