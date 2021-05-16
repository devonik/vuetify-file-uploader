<template>
  <div class="file-uploader">
    <FileCardList v-bind="$props" v-if="layout === layouts.CARD" />
    <AvatarUploader v-bind="$props" v-else-if="layout === layouts.AVATAR" />
  </div>
</template>

<script>
import helper from "@/assets/helper";
import AvatarUploader from "@/lib-components/AvatarUploader";
import FileCardList from "@/lib-components/FileCardList";

export default {
  name: "FileUploader",
  components: { FileCardList, AvatarUploader },
  props: {
    layout: {
      type: String,
      required: true,
      default: "card",
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
