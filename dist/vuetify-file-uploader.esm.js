import { VCardTitle, VImg, VAvatar, VProgressCircular, VCard, VCardSubtitle, VCol, VRow } from 'vuetify/lib';

var utils = {
  layouts() {
    return {
      CARD: "card",
      CARD_LIST: "card-list",
      AVATAR: "avatar"
    };
  },

  listLayouts() {
    return {
      GRID: "grid"
    };
  },

  commonFileTypes() {
    return ["text/csv", "application/msword", "image/", "image/gif", "image/jpeg", "text/calendar", "application/json", "audio/mpeg", "video/mp4", "video/mpeg", "audio/ogg", "video/ogg", "font/otf", "image/png", "application/pdf", "font/ttf", "text/plain", "audio/wav", "audio/webm", "video/webm", "image/webp", "font/woff", "font/woff2", "application/zip", "video/3gpp", "audio/3gpp", "video/3gpp2", "audio/3gpp2", "application/x-7z-compressed"];
  }

};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': utils
});

//
//
//
//
//
//
//
//
//
var script$6 = {
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    manageUpload: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    }
  },
  name: "FileInput",

  data() {
    return {
      isFileInputLoading: false
    };
  },

  computed: {
    isLoading: {
      get() {
        return this.isFileInputLoading;
      },

      set(val) {
        this.isFileInputLoading = val;
        this.$emit("isLoading", val);
      }

    }
  },
  methods: {
    browseFile() {
      this.$refs.fileInput.click();
    },

    selectFile(field, files) {
      const [file] = files;
      let isFileTypeAllowed = false;

      if (files.length > 0) {
        const size = file.size / 1024; //Check if file type is allowed

        if (typeof this.allowedFileTypes === "string") isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(type => file.type.indexOf(type) >= 0);
        }

        if (!isFileTypeAllowed) {
          this.$emit("errorType");
        } else if (this.maxSize && size > this.maxSize) {
          this.$emit("errorSize");
        } else {
          if (!this.manageUpload) this.$emit("upload", file);else this.upload(file);
        }
      } else {
        this.$emit("errorEmpty");
      }
    },

    upload(file) {
      this.isLoading = true;
      const reader = new FileReader();

      reader.onload = f => {
        this.$emit("fileLoaded", {
          title: file.name,
          type: file.type,
          imageSrc: f.target.result
        });
        this.isDragging = false;
        this.isLoading = false;
      };

      reader.readAsDataURL(file);
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

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', {
    ref: "fileInput",
    staticClass: "d-none",
    attrs: {
      "type": "file"
    },
    on: {
      "change": function ($event) {
        return _vm.selectFile($event.target.name, $event.target.files);
      }
    }
  });
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = undefined;
/* scoped */

const __vue_scope_id__$6 = "data-v-51f77ebb";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

var script$5 = {
  name: "DragDropArea",
  components: {
    FileInput: __vue_component__$6,
    VCardTitle: VCardTitle
  },
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    }
  },

  data() {
    return {
      isDragDropLoading: false,
      isDragging: false,
      errors: {
        fileTypeNotAllowed: false,
        fileSizeExceeded: false,
        fileEmpty: false
      }
    };
  },

  computed: {
    getClasses() {
      return {
        isDragging: this.isDragging
      };
    },

    isLoading: {
      get() {
        return this.isDragDropLoading;
      },

      set(val) {
        this.isDragDropLoading = val;
        this.$emit("isLoading", val);
      }

    }
  },
  methods: {
    dragOver() {
      this.isDragging = true;
    },

    dragLeave() {
      this.isDragging = false;
    },

    drop(e) {
      this.resetErrors();
      this.isLoading = true;
      let files = e.dataTransfer.files;
      let isFileTypeAllowed = false; // allows only 1 file

      if (files.length === 1) {
        let file = files[0];
        const size = file.size / 1024; //Check if file type is allowed

        if (typeof this.allowedFileTypes === "string") isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(type => file.type.indexOf(type) >= 0);
        }

        if (!isFileTypeAllowed) {
          this.errors.fileTypeNotAllowed = true;
          this.isDragging = false;
          this.isLoading = false;
        } else if (this.maxSize && size > this.maxSize) {
          this.errors.fileSizeExceeded = true;
          this.isDragging = false;
          this.isLoading = false;
        } else {
          const reader = new FileReader();

          reader.onload = f => {
            this.$emit("fileLoaded", {
              title: file.name,
              type: file.type,
              imageSrc: f.target.result
            });
            this.isDragging = false;
            this.isLoading = false;
          };

          reader.readAsDataURL(file);
        }
      }
    },

    onRequestUploadFiles() {},

    resetErrors() {
      this.errors = {
        fileTypeNotAllowed: false,
        fileSizeExceeded: false,
        fileEmpty: false
      };
    }

  }
};

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
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drop",
    class: _vm.getClasses,
    on: {
      "dragover": function ($event) {
        $event.preventDefault();
        return _vm.dragOver($event);
      },
      "dragleave": function ($event) {
        $event.preventDefault();
        return _vm.dragLeave($event);
      },
      "drop": function ($event) {
        $event.preventDefault();
        return _vm.drop($event);
      },
      "click": function ($event) {
        return _vm.$refs.fileInput.browseFile();
      }
    }
  }, [_vm.errors.fileTypeNotAllowed ? _c('v-card-title', [_vm._v("Wrong file type")]) : _vm.errors.fileSizeExceeded ? _c('v-card-title', [_vm._v("File size exceeded")]) : _vm.errors.fileSizeExceeded ? _c('v-card-title', [_vm._v("No file selected")]) : !_vm.isDragging ? _c('v-card-title', [_vm._v("Drop a file or click here")]) : _vm._e(), _vm._v(" "), _c('FileInput', _vm._b({
    ref: "fileInput",
    on: {
      "isLoading": function (val) {
        return _vm.$emit('isLoading', val);
      },
      "fileLoaded": function (data) {
        return _vm.$emit('fileLoaded', data);
      },
      "errorType": function ($event) {
        _vm.errors.fileTypeNotAllowed = true;
      },
      "errorSize": function ($event) {
        _vm.errors.fileSizeExceeded = true;
      },
      "errorEmpty": function ($event) {
        _vm.errors.fileEmpty = true;
      }
    }
  }, 'FileInput', _vm.$props, false))], 1);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-23f73223_0", {
    source: ".drop[data-v-23f73223]{cursor:pointer;width:100%;height:100%;background-color:#eee;border:10px solid #eee;display:flex;align-items:center;justify-content:center;padding:1rem;transition:background-color .2s ease-in-out;font-family:sans-serif}.isDragging[data-v-23f73223]{background-color:#999;border-color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$5 = "data-v-23f73223";
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

var script$4 = {
  name: "AvatarUploader",
  components: {
    DragDropArea: __vue_component__$5,
    VCardTitle: VCardTitle,
    VImg: VImg,
    VAvatar: VAvatar
  },
  props: {
    file: {
      type: Object,
      default: null
    },
    minWidth: {
      type: [String, Number],
      default: 265
    },
    minHeight: {
      type: [String, Number],
      default: 265
    },
    color: {
      type: String,
      default: "grey"
    },
    contain: {
      type: Boolean,
      default: false
    },
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    },
    imageAlt: {
      type: String,
      default: "Picture could not be load"
    }
  },

  data() {
    return {
      isLoading: false,
      internalFile: null,
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6"
    };
  },

  watch: {
    file(oldVal, newVal) {
      if (oldVal !== newVal) this.internalFile = Object.assign(this.file);
    }

  },

  mounted() {
    if (this.file) this.internalFile = Object.assign(this.file);
  },

  computed: {
    isImgReady() {
      return this.file && (this.file.type === null || this.file.type.indexOf("image/") >= 0);
    }

  },
  methods: {
    addFile({
      title,
      type,
      imageSrc
    }) {
      this.internalFile = {
        title,
        type,
        imageSrc
      };
      this.$emit("addFile", {
        title,
        type,
        imageSrc
      });
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-avatar', {
    attrs: {
      "color": _vm.color,
      "min-width": _vm.minWidth,
      "min-height": _vm.minHeight
    }
  }, [_vm.internalFile ? _c('v-img', {
    staticClass: "align-end",
    attrs: {
      "min-width": _vm.minWidth,
      "min-height": _vm.minHeight,
      "src": _vm.internalFile.imageSrc,
      "lazy-src": _vm.internalFile.imageLazySrc ? _vm.internalFile.imageLazySrc : _vm.defaultImageLazySrc,
      "gradient": "to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",
      "alt": _vm.imageAlt,
      "contain": _vm.contain
    },
    scopedSlots: _vm._u([{
      key: "placeholder",
      fn: function () {
        return [_c('v-card-title', [_vm._v("No preview available")])];
      },
      proxy: true
    }], null, false, 1656814713)
  }) : _c('DragDropArea', _vm._b({
    on: {
      "fileLoaded": _vm.addFile,
      "isLoading": function (val) {
        return _vm.isLoading = val;
      }
    }
  }, 'DragDropArea', _vm.$props, false))], 1);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = "data-v-6876c40c";
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$3 = {
  name: "FileCardPlaceholder",
  components: {
    DragDropArea: __vue_component__$5,
    VProgressCircular: VProgressCircular,
    VCard: VCard
  },
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    }
  },

  data() {
    return {
      isLoading: false
    };
  }

};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    staticClass: "flex d-flex flex-column",
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function () {
        return undefined;
      },
      proxy: true
    }])
  }, [_vm.isLoading ? _c('v-progress-circular', {
    staticClass: "d-flex flex align-self-center justify-center",
    attrs: {
      "indeterminate": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('DragDropArea', _vm._b({
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isLoading,
      expression: "!isLoading"
    }],
    on: {
      "fileLoaded": function (data) {
        return _vm.$emit('addFile', data);
      },
      "isLoading": function (val) {
        return _vm.isLoading = val;
      }
    }
  }, 'DragDropArea', _vm.$props, false))], 1);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = "data-v-1f108d68";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

var script$2 = {
  name: "FileCard",
  components: {
    FileCardPlaceholder: __vue_component__$3,
    VCardTitle: VCardTitle,
    VCardSubtitle: VCardSubtitle,
    VImg: VImg,
    VCard: VCard
  },
  props: {
    file: {
      type: Object,
      default: null
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    },
    imageHeight: {
      type: [String, Number],
      default: 200
    },
    imageAlt: {
      type: String,
      default: "Picture could not be load"
    },
    contain: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6",
      internalFile: null
    };
  },

  watch: {
    file(oldVal, newVal) {
      if (oldVal !== newVal) this.internalFile = Object.assign(this.file);
    }

  },

  mounted() {
    if (this.file) this.internalFile = Object.assign(this.file);
  },

  methods: {
    addFile({
      title,
      type,
      imageSrc
    }) {
      this.internalFile = {
        title,
        type,
        imageSrc
      };
      this.$emit("addFile", {
        title,
        type,
        imageSrc
      });
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function () {
        return undefined;
      },
      proxy: true
    }])
  }, [_vm.internalFile ? _c('v-img', {
    staticClass: "align-end",
    attrs: {
      "src": _vm.internalFile.imageSrc,
      "lazy-src": _vm.internalFile.imageLazySrc ? _vm.internalFile.imageLazySrc : _vm.defaultImageLazySrc,
      "gradient": "to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",
      "height": _vm.imageHeight,
      "alt": _vm.internalFile.imageAlt,
      "contain": _vm.contain
    },
    scopedSlots: _vm._u([{
      key: "placeholder",
      fn: function () {
        return [_c('v-card-title', [_vm._v("No preview available")])];
      },
      proxy: true
    }], null, false, 1656814713)
  }, [_vm._v(" "), _vm._t("title", [_c('v-card-title', {
    staticClass: "white--text",
    domProps: {
      "textContent": _vm._s(_vm.internalFile.title)
    }
  })]), _vm._v(" "), _vm._t("subtitle", [_c('v-card-subtitle', {
    staticClass: "white--text",
    domProps: {
      "textContent": _vm._s(_vm.internalFile.type)
    }
  })])], 2) : _vm.showPlaceholder ? _c('FileCardPlaceholder', _vm._b({
    attrs: {
      "image-height": _vm.imageHeight
    },
    on: {
      "addFile": _vm.addFile
    }
  }, 'FileCardPlaceholder', _vm.$props, false)) : _vm._e()], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = "data-v-7c3bc602";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

var script$1 = {
  name: "FileCardList",
  components: {
    FileCard: __vue_component__$2,
    FileCardPlaceholder: __vue_component__$3,
    VCol: VCol,
    VRow: VRow
  },
  props: {
    listLayout: {
      type: String,
      default: "grid"
    },
    files: {
      type: Array,
      default: () => []
    },
    gridCols: {
      type: [String, Number],
      default: 6
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    },
    imageHeight: {
      type: [String, Number],
      default: 200
    },
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    },
    contain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listLayouts() {
      return utils.listLayouts();
    }

  },
  watch: {
    internalFiles(oldVal, newVal) {
      if (oldVal !== newVal) this.internalFiles = Object.assign(this.files);
    }

  },

  mounted() {
    this.internalFiles = Object.assign(this.files);
  },

  data() {
    return {
      internalFiles: []
    };
  },

  methods: {
    addFile({
      title,
      type,
      imageSrc
    }) {
      this.internalFiles.push({
        title,
        type,
        imageSrc
      });
      this.$emit("addFile", {
        title,
        type,
        imageSrc
      });
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "file-uploader-card-list"
  }, [_vm.listLayout === _vm.listLayouts.GRID ? [_c('v-row', [_vm._l(_vm.files, function (file) {
    return _c('v-col', {
      key: file.id ? file.id : file.title,
      attrs: {
        "cols": "12",
        "sm": _vm.gridCols
      }
    }, [_c('FileCard', {
      attrs: {
        "file": file,
        "contain": _vm.contain,
        "image-height": _vm.imageHeight
      },
      scopedSlots: _vm._u([_vm._l(_vm.$slots, function (index, name) {
        return {
          key: name,
          fn: function () {
            return [_vm._t(name)];
          },
          proxy: true
        };
      })], null, true)
    })], 1);
  }), _vm._v(" "), _vm.showPlaceholder ? _c('v-col', {
    staticClass: "d-flex flex-column"
  }, [_c('FileCardPlaceholder', _vm._b({
    attrs: {
      "image-height": _vm.imageHeight
    },
    on: {
      "addFile": _vm.addFile
    }
  }, 'FileCardPlaceholder', _vm.$props, false))], 1) : _vm._e()], 2)] : _vm._e()], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = "data-v-7380535d";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var script = {
  name: "FileUploader",
  components: {
    FileCard: __vue_component__$2,
    FileCardList: __vue_component__$1,
    AvatarUploader: __vue_component__$4
  },
  props: {
    //general
    files: {
      type: Array,
      default: () => []
    },
    file: {
      type: Object,
      default: null
    },
    layout: {
      type: String,
      default: "card"
    },
    allowedFileTypes: {
      type: [String, Array],
      default: "image/"
    },
    maxSize: {
      type: [String, Number],
      default: 2048
    },
    contain: {
      type: Boolean,
      default: false
    },
    imageAlt: {
      type: String,
      default: "Picture could not be load"
    },
    //FileCardList props
    listLayout: {
      type: [String],
      default: "grid"
    },
    gridCols: {
      type: [String, Number],
      default: 6
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    },
    imageHeight: {
      type: [String, Number],
      default: 200
    },
    //AvatarUploader
    minWidth: {
      type: [String, Number],
      default: 265
    },
    minHeight: {
      type: [String, Number],
      default: 265
    },
    color: {
      type: String,
      default: "grey"
    }
  },

  data() {
    return {};
  },

  computed: {
    layouts() {
      return utils.layouts();
    }

  },
  methods: {}
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "file-uploader"
  }, [_vm.layout === _vm.layouts.CARD ? _c('FileCard', _vm._b({
    on: {
      "addFile": function (data) {
        return _vm.$emit('addFile', data);
      }
    },
    scopedSlots: _vm._u([_vm._l(_vm.$slots, function (index, name) {
      return {
        key: name,
        fn: function () {
          return [_vm._t(name)];
        },
        proxy: true
      };
    })], null, true)
  }, 'FileCard', _vm.$props, false)) : _vm._e(), _vm._v(" "), _vm.layout === _vm.layouts.CARD_LIST ? _c('FileCardList', _vm._b({
    on: {
      "addFile": function (data) {
        return _vm.$emit('addFile', data);
      }
    },
    scopedSlots: _vm._u([_vm._l(_vm.$slots, function (index, name) {
      return {
        key: name,
        fn: function () {
          return [_vm._t(name)];
        },
        proxy: true
      };
    })], null, true)
  }, 'FileCardList', _vm.$props, false)) : _vm.layout === _vm.layouts.AVATAR ? _c('AvatarUploader', _vm._b({
    on: {
      "addFile": function (data) {
        return _vm.$emit('addFile', data);
      }
    }
  }, 'AvatarUploader', _vm.$props, false)) : _vm._e()], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = "data-v-c8799f48";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FileUploader: __vue_component__,
  AvatarUploader: __vue_component__$4,
  FileCard: __vue_component__$2,
  FileCardList: __vue_component__$1
});

// Import vue components

const install = function installVuetifyFileUploader(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__$4 as AvatarUploader, __vue_component__$2 as FileCard, __vue_component__$1 as FileCardList, __vue_component__ as FileUploader, index as Utils };
