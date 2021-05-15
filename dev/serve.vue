<script>
import Vue from 'vue';
import VuetifyFileUploaderSample from "../src/lib-components/file-uploader";
import FileUploader from "../src/lib-components/file-uploader";
export default Vue.extend({
  name: 'ServeDev',
  components: {FileUploader, VuetifyFileUploaderSample},
});
</script>

<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <v-card>
            <v-card-title>File uploader</v-card-title>
            <v-card-text>
              <FileUploader></FileUploader>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
