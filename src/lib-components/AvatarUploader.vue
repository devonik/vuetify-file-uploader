<template>
  <v-avatar :color="color" :min-width="minWidth" :min-height="minHeight">
    <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
    <v-img
      v-else-if="isImgReady"
      :contain="contain"
      :min-width="minWidth"
      :min-height="minHeight"
      :src="fileSrc"
      :alt="alt"
    />
    <div v-else-if="fileSrc && !isLoading">No preview for this file type</div>
    <DragDropArea
      v-show="!fileSrc && !isLoading"
      v-bind="$props"
      @fileLoaded="dragDropFileLoaded"
      @isLoading="(val) => (isLoading = val)"
    />
  </v-avatar>
</template>

<script>
import DragDropArea from "@/lib-components/DragDropArea";
export default {
  name: "AvatarUploader",
  components: { DragDropArea },
  props: {
    minWidth: {
      type: [String, Number],
      default: 265,
    },
    minHeight: {
      type: [String, Number],
      default: 265,
    },
    color: {
      type: String,
      default: "grey",
    },
    contain: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: "Picture could not be load",
    },
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
    },
    manageUpload: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: [String, Number],
      default: 2048,
    },
  },
  data() {
    return {
      isLoading: false,
      dragDropSrc: null,
      dragDropFileType: null,
    };
  },
  computed: {
    isImgReady() {
      return (
        this.dragDropSrc &&
        (this.dragDropFileType === null ||
          this.dragDropFileType.indexOf("image/") >= 0)
      );
    },
    fileSrc() {
      return this.dragDropSrc || this.src;
    },
  },
  methods: {
    dragDropFileLoaded({ type, src }) {
      console.log("drop done", type, src);
      this.dragDropSrc = src;
      this.dragDropFileType = type;
    },
  },
};
</script>

<style scoped></style>
