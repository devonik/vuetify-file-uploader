<template>
  <v-card class="flex d-flex flex-column">
    <DragDropArea
      :allowed-file-types="['image/', 'video/mp4']"
      @fileLoaded="(data) => $emit('addFile', data)"
      @isLoading="(val) => (isLoading = val)"
    />

    <v-card-actions class="d-flex justify-center">
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
  },
};
</script>

<style scoped></style>
