<template>
  <div class="file-uploader">
    <FileCardList v-if="layout === layouts.CARD" />
    <AvatarUploader v-else-if="layout === layouts.AVATAR" />
    <input
      type="file"
      class="d-none"
      @change="selectFile($event.target.name, $event.target.files)"
    />
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
      default: "card",
    },
    manageUpload: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: Number,
      required: false,
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
  methods: {
    selectFile(field, file) {
      const [image] = file;
      if (file.length > 0) {
        const size = image.size / 1024;
        if (!image.type.match("image.*")) {
          this.$emit("error-type");
        } else if (size > this.maxSize) {
          this.$emit("error-size");
        } else {
          if (!this.manageUpload) this.$emit("upload", image);
          else this.upload(image);
        }
      } else {
        this.$emit("error-empty");
      }
    },
    upload(image) {
      console.log("manage upload", image);
    },
  },
};
</script>

<style scoped></style>
