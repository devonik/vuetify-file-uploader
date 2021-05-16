<template>
  <div class="file-uploader-card-list">
    <template v-if="listLayout === listLayouts.GRID">
      <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" :sm="gridCol">
          <FileCard :item="card" :content-height="contentHeight" />
        </v-col>
        <v-col class="d-flex flex-column" v-if="placeholder">
          <FileCardPlaceholder
            v-bind="$props"
            :content-height="contentHeight"
            @addFile="addFile"
          />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import helper from "@/assets/helper";
import FileCardPlaceholder from "@/lib-components/FileCardPlaceholder";
import FileCard from "@/lib-components/FileCard";
export default {
  name: "FileCardList",
  components: { FileCard, FileCardPlaceholder },
  props: {
    listLayout: {
      type: [String],
      default: "grid",
    },
    gridCol: {
      type: Number,
      default: 6,
    },
    placeholder: {
      type: Boolean,
      default: true,
    },
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
  computed: {
    listLayouts() {
      return helper.listLayouts();
    },
  },
  data() {
    return {
      cards: [
        {
          title: "Pre-fab homes",
          type: "dummy",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          title: "Favorite road trips",
          type: "dummy",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          title: "Best airlines",
          type: "dummy",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
      ],
    };
  },
  methods: {
    addFile({ type, src }) {
      this.cards.push({
        title: "New file",
        type,
        src,
      });
    },
  },
};
</script>

<style scoped></style>
