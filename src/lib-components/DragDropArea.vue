<template>
  <div
    class="drop"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <h1 v-if="wrongFile">Wrong file type</h1>
    <h1 v-if="!isDragging && !wrongFile">Drop a file</h1>
  </div>
</template>

<script>
export default {
  name: "DragDropArea",
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
    },
  },
  data() {
    return {
      isDragDropLoading: false,
      isDragging: false,
      wrongFile: false,
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
      this.isLoading = true;
      let files = e.dataTransfer.files;
      this.wrongFile = false;
      let isFileTypeAllowed = false;
      // allows only 1 file
      if (files.length === 1) {
        let file = files[0];
        // allows image only
        if (typeof this.allowedFileTypes === "string")
          isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;
        else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(
            (type) => file.type.indexOf(type) >= 0
          );
        }

        console.log("file.type", file.type);
        console.log("isFileTypeAllowed", isFileTypeAllowed);
        if (isFileTypeAllowed) {
          const reader = new FileReader();
          reader.onload = (f) => {
            this.$emit("fileLoaded", { type: file.type, src: f.target.result });
            this.isDragging = false;
            this.isLoading = false;
          };
          reader.readAsDataURL(file);
        } else {
          //this.$emit("loaded", { type: file.type, src: null });
          this.wrongFile = true;
          this.isDragging = false;
          this.isLoading = false;
        }
      }
    },
    onRequestUploadFiles() {},
  },
};
</script>

<style scoped>
.drop {
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
