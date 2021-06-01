<template>
  <div class="file-uploader-card-list">
    <template v-if="listLayout === listLayouts.GRID">
      <v-row>
        <v-col v-for="(file, i) in files" :key="i" cols="12" :sm="gridCols">
          <FileCard :file="file" :contain="contain" :image-height="imageHeight">
            <template v-for="(index, name) in $slots" v-slot:[name]>
              <slot :name="name" />
            </template>
          </FileCard>
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
import utils from "@/utils";
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
      default: () => [],
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
      return utils.listLayouts();
    },
  },
  watch: {
    internalFiles(newVal, oldVal) {
      if (newVal !== oldVal) this.internalFiles = newVal;
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
    addFile({ id, src, file }) {
      this.internalFiles.push({
        id,
        src,
        file,
      });
      this.$emit("addFile", { id, src, file });
    },
  },
};
</script>

<style scoped></style>
