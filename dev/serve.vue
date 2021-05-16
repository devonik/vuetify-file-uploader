<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col>
              <v-card-title>File uploader</v-card-title>
            </v-col>
            <v-col>
              <FileUploader layout-mode="avatar"></FileUploader>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import FileUploader from "@/lib-components/FileUploader";
export default {
  name: "ServeDev",
  components: { FileUploader },
  data() {
    return {
      layout: "avatar",
    };
  },
};
</script>
