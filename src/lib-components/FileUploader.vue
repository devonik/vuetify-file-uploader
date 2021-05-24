<template>
  <div class="file-uploader">
    <FileCard
      v-bind="$props"
      v-if="layout === layouts.CARD"
      @addFile="(data) => $emit('addFile', data)"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </FileCard>
    <FileCardList
      v-bind="$props"
      v-if="layout === layouts.CARD_LIST"
      @addFile="(data) => $emit('addFile', data)"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </FileCardList>
    <AvatarUploader
      v-bind="$props"
      v-else-if="layout === layouts.AVATAR"
      @addFile="(data) => $emit('addFile', data)"
    />
  </div>
</template>

<script>
import helper from "@/utils";
import AvatarUploader from "@/lib-components/avatar/AvatarUploader";
import FileCardList from "@/lib-components/card/FileCardList";
import FileCard from "@/lib-components/card/FileCard";

export default {
  name: "FileUploader",
  components: { FileCard, FileCardList, AvatarUploader },
  props: {
    //general
    files: {
      type: Array,
      default: () => [],
    },
    file: {
      type: Object,
      default: null,
    },
    layout: {
      type: String,
      default: "card",
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
    imageAlt: {
      type: String,
      default: "Picture could not be load",
    },
    //FileCardList props
    listLayout: {
      type: [String],
      default: "grid",
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
    //AvatarUploader
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
  },
  data() {
    return {};
  },
  computed: {
    layouts() {
      return helper.layouts();
    },
  },
  methods: {},
};
</script>

<style scoped></style>
