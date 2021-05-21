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

    <template #footer></template>
  </v-card>
</template>

<script>
import DragDropArea from "@/lib-components/DragDropArea";
export default {
  name: "FileCardPlaceholder",
  components: { DragDropArea },
  props: {
    allowedFileTypes: {
      type: [String, Array],
      default: "image/",
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
