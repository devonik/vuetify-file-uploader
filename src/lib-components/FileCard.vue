<template>
  <v-card>
    <v-img
      :src="item.src"
      :lazy-src="item.lazySrc ? item.lazySrc : defaultLazySrc"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :height="contentHeight"
      :alt="item.alt"
    >
      <template #placeholder>
        <v-card-title>No preview available</v-card-title>
      </template>
      <v-card-title class="white--text" v-text="item.title"></v-card-title>
      <v-card-subtitle class="white--text" v-text="item.type"></v-card-subtitle>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FileCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
    contentHeight: {
      type: [String, Number],
      default: 200,
    },
  },
  data() {
    return {
      defaultLazySrc: "https://picsum.photos/id/11/10/6",
    };
  },
};
</script>

<style scoped></style>
