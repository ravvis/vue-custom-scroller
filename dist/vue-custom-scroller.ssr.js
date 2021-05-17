'use strict';var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
var script = {
  data: function data() {
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
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.setReference();

      _this.setValue();

      _this.setThumbWidth();

      _this.setToShow();
    });
  },
  updated: function updated() {
    var _this2 = this;

    window.addEventListener('scroll', function () {
      _this2.setValue();

      _this2.setThumbWidth();

      _this2.setToShow();
    }, true);
  },
  computed: {
    getFractionToScroll: function getFractionToScroll() {
      return this.reference.clientWidth / this.reference.scrollWidth;
    },
    getWidthToScroll: function getWidthToScroll() {
      return this.reference.scrollWidth - this.reference.clientWidth;
    },
    isTargetAVueComponent: function isTargetAVueComponent() {
      return this.$parent.$refs[this.targetElement] instanceof Vue__default['default'];
    }
  },
  methods: {
    setThumbWidth: function setThumbWidth() {
      if (this.$el && this.$el.style) {
        this.$el.style.setProperty("--slider-thumb-width", "".concat(this.getFractionToScroll * 100, "%"));
      }
    },
    setToShow: function setToShow() {
      this.$set(this, 'to_show', this.getFractionToScroll < 1);
    },
    setReference: function setReference() {
      this.reference = this.isTargetAVueComponent ? this.$parent.$refs[this.targetElement].$el : this.$parent.$refs[this.targetElement];
    },
    setValue: function setValue() {
      this.value = Math.floor(this.reference.scrollLeft * 100 / this.getWidthToScroll);
    },
    changeMainScroll: function changeMainScroll() {
      this.reference.scrollLeft = this.value * this.getWidthToScroll / 100;
      this.setThumbWidth();
      this.setToShow();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.onlyShowIfOverflowing || _vm.to_show ? _c('div', [_vm._ssrNode("<label data-v-782eb48f>" + (_vm.reference ? "<input type=\"range\"" + _vm._ssrAttr("min", _vm.min) + _vm._ssrAttr("max", _vm.max) + _vm._ssrAttr("step", _vm.step) + _vm._ssrAttr("value", _vm.value) + _vm._ssrClass("v-vuetility__vue-custom-scroller", [_vm.customClass]) + " data-v-782eb48f>" : "<!---->") + "</label>")]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-782eb48f_0", {
    source: "[data-v-782eb48f]:root{--slider-thumb-width:90%}.v-vuetility__vue-custom-scroller[data-v-782eb48f]{width:200px;outline:0;-webkit-appearance:none;background:#ebebeb;border-radius:4px;cursor:pointer}.v-vuetility__vue-custom-scroller[data-v-782eb48f]::-webkit-slider-thumb{-webkit-appearance:none;border:1px solid #233242;height:5px;width:var(--slider-thumb-width);cursor:pointer;background:#233242;border-radius:4px;box-shadow:1px 1px 1px #233242,0 0 1px #233242}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-782eb48f";
/* module identifier */

var __vue_module_identifier__ = "data-v-782eb48f";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,CustomScroller: __vue_component__});var install = function installVueCustomScroller(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,CustomScroller: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;