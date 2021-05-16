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
<script>
import FileUploader from "@/lib-components/FileUploader";
export default {
  name: "ServeDev",
  components: { FileUploader },
};
</script>
