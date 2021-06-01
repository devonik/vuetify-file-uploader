<template>
  <div id="app">
    <v-app>
      <v-app-bar dark app flat clipped-left>
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
      <v-main>
        <v-container>
          <v-card class="mb-3">
            <v-card-title>Configure</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="settings.layout"
                    :items="settingsLayouts"
                    label="Layout"
                    hide-details
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="settings.maxSize"
                    type="number"
                    suffix="KB"
                    label="Max file Size"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    v-model="settings.allowedFileTypes"
                    :items="commonFileTypes"
                    multiple
                    chips
                    label="Allowed file types"
                    hide-details
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="setMockData"
                >Set mockup data</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="resetMockData"
                >Reset mockup data</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-expansion-panels
            v-if="settings.layout === layouts.CARD"
            multiple
            focusable
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                Single card props
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row align="end">
                  <v-col>
                    <v-text-field
                      v-model="settings.imageHeight"
                      type="number"
                      suffix="px"
                      label="Card image height"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      v-model="settings.contain"
                      label="Contain image"
                      hide-details
                    >
                    </v-switch>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels
            v-if="settings.layout === layouts.CARD_LIST"
            multiple
            focusable
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                Card list props
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row align="end">
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="settings.listLayout"
                      :items="settingsListLayouts"
                      label="Layout"
                      hide-details
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="settings.imageHeight"
                      type="number"
                      suffix="px"
                      label="Card image height"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-slider
                      v-model="settings.gridCols"
                      label="Grid cols per card"
                      thumb-label="always"
                      max="12"
                      hide-details
                    ></v-slider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-switch
                      v-model="settings.showPlaceholder"
                      label="Show placeholder card"
                      hide-details
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Available slots
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" sm="6">
                    <h4>Slots for single card (examples)</h4>
                    <pre><code v-text="cardSlotsExample"></code></pre>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels
            v-if="settings.layout === layouts.AVATAR"
            multiple
            focusable
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                Avatar props
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row align="end">
                  <v-col>
                    <v-text-field
                      v-model="settings.minWidth"
                      type="number"
                      suffix="px"
                      label="Avatar image minimum width"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="settings.minHeight"
                      type="number"
                      suffix="px"
                      label="Avatar image minimum height"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      v-model="settings.contain"
                      label="Contain image"
                      hide-details
                    >
                    </v-switch>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="settings.color"
                      label="Color"
                      hide-details
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <FileUploader class="mt-6" v-bind="settings" />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import FileUploader from "@/lib-components/FileUploader";
import utils from "@/utils";
function defaultSettings() {
  return {
    layout: "card",
    maxSize: 2048,
    allowedFileTypes: ["image/"],
    imageHeight: 200,
    listLayout: "grid",
    gridCols: 6,
    showPlaceholder: true,
    contain: false,
    color: "grey",
    minWidth: 265,
    minHeight: 265,
    file: null,
    files: [],
  };
}

export default {
  name: "ServeDev",
  components: { FileUploader },
  data() {
    return {
      settings: defaultSettings(),
      isSettingsOpen: false,
      cardSlotsExample: `
            <template #title>
              <v-card-title class="white--text"> Another title </v-card-title>
            </template>

            <template #subtitle>
              <v-card-subtitle class="white--text">Another subtitle</v-card-subtitle>
            </template> `,
    };
  },
  computed: {
    commonFileTypes() {
      return utils.commonFileTypes().sort();
    },
    settingsLayouts() {
      let array = [];
      Object.keys(this.layouts).forEach((key) => {
        array.push(this.layouts[key]);
      });
      return array;
    },
    settingsListLayouts() {
      let array = [];
      Object.keys(this.listLayouts).forEach((key) => {
        array.push(this.listLayouts[key]);
      });
      return array;
    },
    layouts() {
      return utils.layouts();
    },
    listLayouts() {
      return utils.listLayouts();
    },
  },
  methods: {
    resetMockData() {
      this.settings.file = defaultSettings().file;
      this.settings.files.splice(0);
    },
    setMockData() {
      switch (this.settings.layout) {
        case this.layouts.CARD:
          this.setMockFile();
          break;
        case this.layouts.CARD_LIST:
          this.setMockFiles();
          break;
        case this.layouts.AVATAR:
          this.setMockAvatar();
          break;
      }
    },
    setMockFile() {
      this.settings.file = Object.assign(
        {},
        {
          title: "Best airlines",
          type: "image/",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        }
      );
    },
    setMockFiles() {
      [
        {
          title: "Pre-fab homes",
          type: "image/",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          title: "Favorite road trips",
          type: "image/",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          id: 1,
          title: "Remote Picture with ID",
          type: "image/",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          id: 2,
          title: "Remote Picture with ID",
          type: "image/",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
      ].forEach((item) => this.settings.files.push(item));
    },
    setMockAvatar() {
      this.settings.file = {
        title: "devnik",
        type: "dummy",
        src: "https://avatars.githubusercontent.com/u/16446467?s=400&v=4",
      };
    },
  },
};
</script>
