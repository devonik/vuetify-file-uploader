<template>
  <v-avatar :color="color" :min-width="minWidth" :min-height="minHeight">
    <v-img
      v-if="internalFile"
      :min-width="minWidth"
      :min-height="minHeight"
      :src="internalFile.imageSrc"
      :lazy-src="
        internalFile.imageLazySrc
          ? internalFile.imageLazySrc
          : defaultImageLazySrc
      "
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :alt="imageAlt"
      :contain="contain"
    >
      <template #placeholder>
        <v-card-title>No preview available</v-card-title>
      </template>
    </v-img>

    <DragDropArea
      v-else
      v-bind="$props"
      @fileLoaded="addFile"
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
    file: {
      type: Object,
      default: null,
    },
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
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
    },
    maxSize: {
      type: [String, Number],
      default: 2048,
    },
    imageAlt: {
      type: String,
      default: "Picture could not be load",
    },
  },
  data() {
    return {
      isLoading: false,
      internalFile: null,
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6",
    };
  },
  watch: {
    file(oldVal, newVal) {
      console.log("item oldVal, newVal", oldVal, newVal);
      if (oldVal !== newVal) this.internalFile = Object.assign(this.file);
    },
  },
  mounted() {
    if (this.file) this.internalFile = Object.assign(this.file);
  },
  computed: {
    isImgReady() {
      return (
        this.file &&
        (this.file.type === null || this.file.type.indexOf("image/") >= 0)
      );
    },
  },
  methods: {
    addFile({ title, type, imageSrc }) {
      console.log("drop done", title, type, imageSrc);
      this.internalFile = {
        title,
        type,
        imageSrc,
      };
      this.$emit("addFile", { title, type, imageSrc });
    },
  },
};
</script>

<style scoped></style>
