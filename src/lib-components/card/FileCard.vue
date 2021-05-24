<template>
  <v-card>
    <v-img
      v-if="internalFile"
      :src="internalFile.imageSrc"
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
      <template #title>
        <v-card-title
          class="white--text"
          v-text="internalFile.title"
        ></v-card-title>
      </template>
      <template #subtitle>
        <v-card-subtitle
          class="white--text"
          v-text="internalFile.type"
        ></v-card-subtitle>
      </template>
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
  data() {
    return {
      defaultImageLazySrc: "https://picsum.photos/id/11/10/6",
      internalFile: null,
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
  methods: {
    addFile({ title, type, imageSrc }) {
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
