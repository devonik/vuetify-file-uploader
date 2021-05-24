<template>
  <div
    class="drop"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
    @click="$refs.fileInput.browseFile()"
  >
    <v-card-title v-if="errors.fileTypeNotAllowed"
      >Wrong file type</v-card-title
    >
    <v-card-title v-else-if="errors.fileSizeExceeded"
      >File size exceeded</v-card-title
    >
    <v-card-title v-else-if="errors.fileSizeExceeded"
      >No file selected</v-card-title
    >
    <v-card-title v-else-if="!isDragging"
      >Drop a file or click here</v-card-title
    >
    <FileInput
      v-bind="$props"
      ref="fileInput"
      @isLoading="(val) => $emit('isLoading', val)"
      @fileLoaded="(data) => $emit('fileLoaded', data)"
      @errorType="errors.fileTypeNotAllowed = true"
      @errorSize="errors.fileSizeExceeded = true"
      @errorEmpty="errors.fileEmpty = true"
    />
  </div>
</template>

<script>
import FileInput from "@/lib-components/FileInput";
export default {
  name: "DragDropArea",
  components: { FileInput },
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
    },
    maxSize: {
      type: [String, Number],
      default: 2048,
    },
  },
  data() {
    return {
      isDragDropLoading: false,
      isDragging: false,
      errors: {
        fileTypeNotAllowed: false,
        fileSizeExceeded: false,
        fileEmpty: false,
      },
    };
  },
  computed: {
    getClasses() {
      return { isDragging: this.isDragging };
    },
    isLoading: {
      get() {
        return this.isDragDropLoading;
      },
      set(val) {
        this.isDragDropLoading = val;
        this.$emit("isLoading", val);
      },
    },
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
      let isFileTypeAllowed = false;
      // allows only 1 file
      if (files.length === 1) {
        let file = files[0];
        const size = file.size / 1024;

        //Check if file type is allowed
        if (typeof this.allowedFileTypes === "string")
          isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;
        else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(
            (type) => file.type.indexOf(type) >= 0
          );
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
          reader.onload = (f) => {
            this.$emit("fileLoaded", {
              title: file.name,
              type: file.type,
              imageSrc: f.target.result,
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
        fileEmpty: false,
      };
    },
  },
};
</script>

<style scoped>
.drop {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eee;
  border: 10px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  font-family: sans-serif;
}
.isDragging {
  background-color: #999;
  border-color: #fff;
}
</style>
