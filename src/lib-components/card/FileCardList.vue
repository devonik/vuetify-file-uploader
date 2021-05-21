<template>
  <div class="file-uploader-card-list">
    <template v-if="listLayout === listLayouts.GRID">
      <v-row>
        <v-col v-for="file in files" :key="file.title" cols="12" :sm="gridCols">
          <FileCard
            :file="file"
            :contain="contain"
            :image-height="imageHeight"
          />
        </v-col>
        <v-col class="d-flex flex-column" v-if="showPlaceholder">
          <FileCardPlaceholder
            v-bind="$props"
            :image-height="imageHeight"
            @addFile="addFile"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import helper from "@/assets/helper";
import FileCardPlaceholder from "@/lib-components/card/FileCardPlaceholder";
import FileCard from "@/lib-components/card/FileCard";
export default {
  name: "FileCardList",
  components: { FileCard, FileCardPlaceholder },
  props: {
    listLayout: {
      type: String,
      default: "grid",
    },
    files: {
      type: Array,
      default: null,
    },
    gridCols: {
      type: [String, Number],
      default: 6,
    },
    showPlaceholder: {
      type: Boolean,
      default: true,
    },
    imageHeight: {
      type: [String, Number],
      default: 200,
    },
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
    },
    maxSize: {
      type: [String, Number],
      default: 2048,
    },
    contain: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listLayouts() {
      return helper.listLayouts();
    },
  },
  watch: {
    internalFiles(oldVal, newVal) {
      console.log("item oldVal, newVal", oldVal, newVal);
      if (oldVal !== newVal) this.internalFiles = Object.assign(this.files);
    },
  },
  mounted() {
    this.internalFiles = Object.assign(this.files);
  },
  data() {
    return {
      internalFiles: [],
    };
  },
  methods: {
    addFile({ title, type, imageSrc }) {
      console.log("addFile", { title, type, imageSrc });
      this.files.push({
        title,
        type,
        imageSrc,
      });
      this.$emit("addFile", { title, type, imageSrc });
    },
  },
};
</script>

<style scoped></style>
