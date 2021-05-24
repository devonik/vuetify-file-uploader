'use strict';var lib=require('vuetify/lib');function _slicedToArray(arr, i) {
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
}var helper = {
  layouts: function layouts() {
    return {
      CARD: "card",
      CARD_LIST: "card-list",
      AVATAR: "avatar"
    };
  },
  listLayouts: function listLayouts() {
    return {
      GRID: "grid"
    };
  },
  commonFileTypes: function commonFileTypes() {
    return ["text/csv", "application/msword", "image/", "image/gif", "image/jpeg", "text/calendar", "application/json", "audio/mpeg", "video/mp4", "video/mpeg", "audio/ogg", "video/ogg", "font/otf", "image/png", "application/pdf", "font/ttf", "text/plain", "audio/wav", "audio/webm", "video/webm", "image/webp", "font/woff", "font/woff2", "application/zip", "video/3gpp", "audio/3gpp", "video/3gpp2", "audio/3gpp2", "application/x-7z-compressed"];
  }
};//
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
  data: function data() {
    return {
      isFileInputLoading: false
    };
  },
  computed: {
    isLoading: {
      get: function get() {
        return this.isFileInputLoading;
      },
      set: function set(val) {
        this.isFileInputLoading = val;
        this.$emit("isLoading", val);
      }
    }
  },
  methods: {
    browseFile: function browseFile() {
      this.$refs.fileInput.click();
    },
    selectFile: function selectFile(field, files) {
      var _files = _slicedToArray(files, 1),
          file = _files[0];

      var isFileTypeAllowed = false;

      if (files.length > 0) {
        var size = file.size / 1024; //Check if file type is allowed

        if (typeof this.allowedFileTypes === "string") isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(function (type) {
            return file.type.indexOf(type) >= 0;
          });
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
    upload: function upload(file) {
      var _this = this;

      console.log("manage upload", file);
      this.isLoading = true;
      var reader = new FileReader();

      reader.onload = function (f) {
        _this.$emit("fileLoaded", {
          title: file.name,
          type: file.type,
          imageSrc: f.target.result
        });

        _this.isDragging = false;
        _this.isLoading = false;
      };

      reader.readAsDataURL(file);
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
}/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
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
      "change": function change($event) {
        return _vm.selectFile($event.target.name, $event.target.files);
      }
    }
  }, []);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = "data-v-4f952800";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-4f952800";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);var script$5 = {
  name: "DragDropArea",
  components: {
    FileInput: __vue_component__$6,
    VCardTitle: lib.VCardTitle
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
  data: function data() {
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
    getClasses: function getClasses() {
      return {
        isDragging: this.isDragging
      };
    },
    isLoading: {
      get: function get() {
        return this.isDragDropLoading;
      },
      set: function set(val) {
        this.isDragDropLoading = val;
        this.$emit("isLoading", val);
      }
    }
  },
  methods: {
    dragOver: function dragOver() {
      this.isDragging = true;
    },
    dragLeave: function dragLeave() {
      this.isDragging = false;
    },
    drop: function drop(e) {
      var _this = this;

      this.resetErrors();
      this.isLoading = true;
      var files = e.dataTransfer.files;
      var isFileTypeAllowed = false; // allows only 1 file

      if (files.length === 1) {
        var file = files[0];
        console.log("want to drag drop file with size", file.size);
        console.log("maxSize", this.maxSize);
        var size = file.size / 1024; //Check if file type is allowed

        if (typeof this.allowedFileTypes === "string") isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(function (type) {
            return file.type.indexOf(type) >= 0;
          });
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
          var reader = new FileReader();

          reader.onload = function (f) {
            _this.$emit("fileLoaded", {
              title: file.name,
              type: file.type,
              imageSrc: f.target.result
            });

            _this.isDragging = false;
            _this.isLoading = false;
          };

          reader.readAsDataURL(file);
        }
      }
    },
    onRequestUploadFiles: function onRequestUploadFiles() {},
    resetErrors: function resetErrors() {
      this.errors = {
        fileTypeNotAllowed: false,
        fileSizeExceeded: false,
        fileEmpty: false
      };
    }
  }
};function createInjectorSSR(context) {
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
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drop",
    class: _vm.getClasses,
    on: {
      "dragover": function dragover($event) {
        $event.preventDefault();
        return _vm.dragOver($event);
      },
      "dragleave": function dragleave($event) {
        $event.preventDefault();
        return _vm.dragLeave($event);
      },
      "drop": function drop($event) {
        $event.preventDefault();
        return _vm.drop($event);
      },
      "click": function click($event) {
        return _vm.$refs.fileInput.browseFile();
      }
    }
  }, [_vm.errors.fileTypeNotAllowed ? _c('v-card-title', [_vm._v("Wrong file type")]) : _vm.errors.fileSizeExceeded ? _c('v-card-title', [_vm._v("File size exceeded")]) : _vm.errors.fileSizeExceeded ? _c('v-card-title', [_vm._v("No file selected")]) : !_vm.isDragging ? _c('v-card-title', [_vm._v("Drop a file or click here")]) : _vm._e(), _vm._ssrNode(" "), _c('FileInput', _vm._b({
    ref: "fileInput",
    on: {
      "isLoading": function isLoading(val) {
        return _vm.$emit('isLoading', val);
      },
      "fileLoaded": function fileLoaded(data) {
        return _vm.$emit('fileLoaded', data);
      },
      "errorType": function errorType($event) {
        _vm.errors.fileTypeNotAllowed = true;
      },
      "errorSize": function errorSize($event) {
        _vm.errors.fileSizeExceeded = true;
      },
      "errorEmpty": function errorEmpty($event) {
        _vm.errors.fileEmpty = true;
      }
    }
  }, 'FileInput', _vm.$props, false))], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-78f4e455_0", {
    source: ".drop[data-v-78f4e455]{cursor:pointer;width:100%;height:100%;background-color:#eee;border:10px solid #eee;display:flex;align-items:center;justify-content:center;padding:1rem;transition:background-color .2s ease-in-out;font-family:sans-serif}.isDragging[data-v-78f4e455]{background-color:#999;border-color:#fff}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-78f4e455";
/* module identifier */

var __vue_module_identifier__$5 = "data-v-78f4e455";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, createInjectorSSR, undefined);var script$4 = {
  name: "AvatarUploader",
  components: {
    DragDropArea: __vue_component__$5,
    VCardTitle: lib.VCardTitle,
    VImg: lib.VImg,
    VAvatar: lib.VAvatar
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
  data: function data() {
    return {
      isLoading: false,
      internalFile: null,
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6"
    };
  },
  watch: {
    file: function file(oldVal, newVal) {
      console.log("item oldVal, newVal", oldVal, newVal);
      if (oldVal !== newVal) this.internalFile = Object.assign(this.file);
    }
  },
  mounted: function mounted() {
    if (this.file) this.internalFile = Object.assign(this.file);
  },
  computed: {
    isImgReady: function isImgReady() {
      return this.file && (this.file.type === null || this.file.type.indexOf("image/") >= 0);
    }
  },
  methods: {
    addFile: function addFile(_ref) {
      var title = _ref.title,
          type = _ref.type,
          imageSrc = _ref.imageSrc;
      console.log("drop done", title, type, imageSrc);
      this.internalFile = {
        title: title,
        type: type,
        imageSrc: imageSrc
      };
      this.$emit("addFile", {
        title: title,
        type: type,
        imageSrc: imageSrc
      });
    }
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
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
      fn: function fn() {
        return [_c('v-card-title', [_vm._v("No preview available")])];
      },
      proxy: true
    }], null, false, 1656814713)
  }) : _c('DragDropArea', _vm._b({
    on: {
      "fileLoaded": _vm.addFile,
      "isLoading": function isLoading(val) {
        return _vm.isLoading = val;
      }
    }
  }, 'DragDropArea', _vm.$props, false))], 1);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = "data-v-91620456";
/* module identifier */

var __vue_module_identifier__$4 = "data-v-91620456";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);var script$3 = {
  name: "FileCardPlaceholder",
  components: {
    DragDropArea: __vue_component__$5,
    VProgressCircular: lib.VProgressCircular,
    VCard: lib.VCard
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
  data: function data() {
    return {
      isLoading: false
    };
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    staticClass: "flex d-flex flex-column",
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function fn() {
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
      "fileLoaded": function fileLoaded(data) {
        return _vm.$emit('addFile', data);
      },
      "isLoading": function isLoading(val) {
        return _vm.isLoading = val;
      }
    }
  }, 'DragDropArea', _vm.$props, false))], 1);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = "data-v-1f108d68";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-1f108d68";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);var script$2 = {
  name: "FileCard",
  components: {
    FileCardPlaceholder: __vue_component__$3,
    VCardTitle: lib.VCardTitle,
    VCardSubtitle: lib.VCardSubtitle,
    VImg: lib.VImg,
    VCard: lib.VCard
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
  data: function data() {
    return {
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6",
      internalFile: null
    };
  },
  watch: {
    file: function file(oldVal, newVal) {
      console.log("item oldVal, newVal", oldVal, newVal);
      if (oldVal !== newVal) this.internalFile = Object.assign(this.file);
    }
  },
  mounted: function mounted() {
    if (this.file) this.internalFile = Object.assign(this.file);
  },
  methods: {
    addFile: function addFile(_ref) {
      var title = _ref.title,
          type = _ref.type,
          imageSrc = _ref.imageSrc;
      this.internalFile = {
        title: title,
        type: type,
        imageSrc: imageSrc
      };
      this.$emit("addFile", {
        title: title,
        type: type,
        imageSrc: imageSrc
      });
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function fn() {
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
      fn: function fn() {
        return [_c('v-card-title', [_vm._v("No preview available")])];
      },
      proxy: true
    }, {
      key: "title",
      fn: function fn() {
        return [_c('v-card-title', {
          staticClass: "white--text",
          domProps: {
            "textContent": _vm._s(_vm.internalFile.title)
          }
        })];
      },
      proxy: true
    }, {
      key: "subtitle",
      fn: function fn() {
        return [_c('v-card-subtitle', {
          staticClass: "white--text",
          domProps: {
            "textContent": _vm._s(_vm.internalFile.type)
          }
        })];
      },
      proxy: true
    }], null, false, 1382629025)
  }) : _vm.showPlaceholder ? _c('FileCardPlaceholder', _vm._b({
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

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = "data-v-4208a2e4";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-4208a2e4";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var script$1 = {
  name: "FileCardList",
  components: {
    FileCard: __vue_component__$2,
    FileCardPlaceholder: __vue_component__$3,
    VCol: lib.VCol,
    VRow: lib.VRow
  },
  props: {
    listLayout: {
      type: String,
      default: "grid"
    },
    files: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    listLayouts: function listLayouts() {
      return helper.listLayouts();
    }
  },
  watch: {
    internalFiles: function internalFiles(oldVal, newVal) {
      console.log("item oldVal, newVal", oldVal, newVal);
      if (oldVal !== newVal) this.internalFiles = Object.assign(this.files);
    }
  },
  mounted: function mounted() {
    this.internalFiles = Object.assign(this.files);
  },
  data: function data() {
    return {
      internalFiles: []
    };
  },
  methods: {
    addFile: function addFile(_ref) {
      var title = _ref.title,
          type = _ref.type,
          imageSrc = _ref.imageSrc;
      console.log("addFile", {
        title: title,
        type: type,
        imageSrc: imageSrc
      });
      console.log("this.files", this.files);
      this.internalFiles.push({
        title: title,
        type: type,
        imageSrc: imageSrc
      });
      this.$emit("addFile", {
        title: title,
        type: type,
        imageSrc: imageSrc
      });
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
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
      }
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

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = "data-v-af853a80";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-af853a80";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script = {
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
      default: function _default() {
        return [];
      }
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
  data: function data() {
    return {};
  },
  computed: {
    layouts: function layouts() {
      return helper.layouts();
    }
  },
  methods: {}
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "file-uploader"
  }, [_vm.layout === _vm.layouts.CARD ? _c('FileCard', _vm._b({
    on: {
      "addFile": function addFile(data) {
        return _vm.$emit('addFile', data);
      }
    }
  }, 'FileCard', _vm.$props, false)) : _vm._e(), _vm._ssrNode(" "), _vm.layout === _vm.layouts.CARD_LIST ? _c('FileCardList', _vm._b({
    on: {
      "addFile": function addFile(data) {
        return _vm.$emit('addFile', data);
      }
    }
  }, 'FileCardList', _vm.$props, false)) : _vm.layout === _vm.layouts.AVATAR ? _c('AvatarUploader', _vm._b({
    on: {
      "addFile": function addFile(data) {
        return _vm.$emit('addFile', data);
      }
    }
  }, 'AvatarUploader', _vm.$props, false)) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-5105b535";
/* module identifier */

var __vue_module_identifier__ = "data-v-5105b535";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var components$1=/*#__PURE__*/Object.freeze({__proto__:null,FileUploader: __vue_component__});var install = function installVuetifyFileUploader(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,FileUploader: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== "default") {
    install[componentName] = component;
  }
});module.exports=install;