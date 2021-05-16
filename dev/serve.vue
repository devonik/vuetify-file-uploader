<template>
  <div id="app">
    <v-app>
      <v-app-bar color="deep-purple accent-4" dark app flat clipped-left>
        <v-app-bar-nav-icon
          @click.stop="isSettingsOpen = !isSettingsOpen"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Vuetify file uploader</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="isSettingsOpen" app>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <v-card>
            <v-card-title>Configure</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="settings.layout"
                    :items="settingsLayouts"
                    label="Layout"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="settings.maxSize"
                    type="number"
                    suffix="KB"
                    label="Max file Size"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    v-model="settings.allowedFileTypes"
                    :items="commonFileTypes"
                    multiple
                    chips
                    label="Allowed file types"
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <FileUploader class="mt-6" v-bind="settings"></FileUploader>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import FileUploader from "@/lib-components/FileUploader";
import helper from "@/assets/helper";
function defaultSettings() {
  return {
    layout: "card",
    maxSize: 2048,
    allowedFileTypes: ["image/"],
  };
}

export default {
  name: "ServeDev",
  components: { FileUploader },
  data() {
    return {
      settings: defaultSettings(),
      isSettingsOpen: false,
    };
  },
  computed: {
    commonFileTypes() {
      return helper.commonFileTypes().sort();
    },
    settingsLayouts() {
      let array = [];
      Object.keys(this.layouts).forEach((key) => {
        console.log("key", this.layouts[key]);
        array.push(this.layouts[key]);
      });
      return array;
    },
    layouts() {
      return helper.layouts();
    },
  },
};
</script>
