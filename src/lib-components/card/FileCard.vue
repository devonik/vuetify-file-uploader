<template>
  <v-card>
    <v-img
      v-if="internalFile"
      :src="internalFile.src"
      :lazy-src="
        internalFile.imageLazySrc
          ? internalFile.imageLazySrc
          : defaultImageLazySrc
      "
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :height="imageHeight"
      :alt="internalFile.imageAlt"
      :contain="contain"
    >
      <template #placeholder>
        <v-card-title>No preview available</v-card-title>
      </template>
      <slot name="title">
        <v-card-title class="white--text" v-text="fileName"></v-card-title>
      </slot>
      <slot name="subtitle">
        <v-card-subtitle
          class="white--text"
          v-text="fileType"
        ></v-card-subtitle>
      </slot>
    </v-img>
    <FileCardPlaceholder
      v-else-if="showPlaceholder"
      v-bind="$props"
      :image-height="imageHeight"
      @addFile="addFile"
    />

    <template #footer></template>
  </v-card>
</template>

<script>
import FileCardPlaceholder from "@/lib-components/card/FileCardPlaceholder";
import clonedeep from "lodash.clonedeep";
export default {
  name: "FileCard",
  components: { FileCardPlaceholder },
  props: {
    file: {
      type: Object,
      default: null,
    },
    showPlaceholder: {
      type: Boolean,
      default: true,
    },
    imageHeight: {
      type: [String, Number],
      default: 200,
    },
    imageAlt: {
      type: String,
      default: "Picture could not be load",
    },
    contain: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fileName() {
      return this.internalFile.title || this.internalFile.file.name;
    },
    fileType() {
      return this.internalFile.type || this.internalFile.file.type;
    },
  },
  data() {
    return {
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6",
      internalFile: null,
    };
  },
  watch: {
    file(oldVal, newVal) {
      if (oldVal !== newVal) this.internalFile = clonedeep(newVal);
    },
  },
  mounted() {
    if (this.file) this.internalFile = clonedeep(this.file);
  },
  methods: {
    addFile({ id, src, file }) {
      this.internalFile = {
        id,
        src,
        file,
      };
      this.$emit("addFile", { id, src, file });
    },
  },
};
</script>

<style scoped></style>
