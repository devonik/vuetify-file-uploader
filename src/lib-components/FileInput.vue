<template>
  <input
    type="file"
    ref="fileInput"
    class="d-none"
    @change="selectFile($event.target.name, $event.target.files)"
  />
</template>

<script>
export default {
  props: {
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
  name: "FileInput",
  data() {
    return {
      isFileInputLoading: false,
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.isFileInputLoading;
      },
      set(val) {
        this.isFileInputLoading = val;
        this.$emit("isLoading", val);
      },
    },
  },
  methods: {
    browseFile() {
      this.$refs.fileInput.click();
    },
    selectFile(field, files) {
      const [file] = files;
      let isFileTypeAllowed = false;
      if (files.length > 0) {
        const size = file.size / 1024;

        //Check if file type is allowed
        if (typeof this.allowedFileTypes === "string")
          isFileTypeAllowed = file.type.indexOf(this.allowedFileTypes) >= 0;
        else if (this.allowedFileTypes.length > 0) {
          isFileTypeAllowed = this.allowedFileTypes.some(
            (type) => file.type.indexOf(type) >= 0
          );
        }

        if (!isFileTypeAllowed) {
          this.$emit("errorType");
        } else if (this.maxSize && size > this.maxSize) {
          this.$emit("errorSize");
        } else {
          if (!this.manageUpload) this.$emit("upload", file);
          else this.upload(file);
        }
      } else {
        this.$emit("errorEmpty");
      }
    },
    upload(file) {
      this.isLoading = true;
      const reader = new FileReader();
      reader.onload = (f) => {
        this.$emit("fileLoaded", {
          title: file.name,
          type: file.type,
          imageSrc: f.target.result,
        });
        this.isDragging = false;
        this.isLoading = false;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped></style>
