<template>
  <v-card :max-width="maxWidth">
    <v-card-text class="d-flex justify-center">Drag Drop area</v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn>Add file</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardPlaceholder",
  props: {
    maxWidth: {
      type: [String, Number],
      default: 265,
    },
  },
};
</script>

<style scoped></style>
