<script>
import Vue from "vue";
import VuetifyFileUploaderSample from "@/lib-components/FileUploader";
import FileUploader from "@/lib-components/FileUploader";
export default Vue.extend({
  name: "ServeDev",
  components: { FileUploader, VuetifyFileUploaderSample },
});
</script>

<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <v-card-title>File uploader</v-card-title>
          <FileUploader layout-mode="avatar"></FileUploader>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
