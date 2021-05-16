<template>
  <v-card class="flex d-flex flex-column">
    <v-progress-circular
      class="d-flex flex align-self-center justify-center"
      v-if="isLoading"
      indeterminate
    ></v-progress-circular>
    <DragDropArea
      v-show="!isLoading"
      v-bind="$props"
      @fileLoaded="(data) => $emit('addFile', data)"
      @isLoading="(val) => (isLoading = val)"
    />

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn>Add file</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DragDropArea from "@/lib-components/DragDropArea";
export default {
  name: "FileCardPlaceholder",
  components: { DragDropArea },
  props: {
    contentHeight: {
      type: [String, Number],
      default: 200,
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
    return {
      isLoading: false,
    };
  },
};
</script>

<style scoped></style>
