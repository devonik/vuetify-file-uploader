<template>
  <div class="file-uploader">
    <CardPlaceholder v-if="layoutMode === layoutModes.CARD" />
    <AvatarUploader v-else-if="layoutMode === layoutModes.AVATAR" />
    <input
      type="file"
      class="d-none"
      @change="selectFile($event.target.name, $event.target.files)"
    />
  </div>
</template>

<script>
import CardPlaceholder from "@/lib-components/CardPlaceholder";
import helper from "@/assets/helper";
import AvatarUploader from "@/lib-components/AvatarUploader";

export default {
  name: "FileUploader",
  components: { AvatarUploader, CardPlaceholder },
  props: {
    layoutMode: {
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
    layoutModes() {
      return helper.layoutModes();
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
