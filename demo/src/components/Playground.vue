<template>
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
                  <v-col
                  ><v-btn color="primary" @click="setDummyFile"
                  >Set dummy file</v-btn
                  ></v-col
                  >
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
                  <v-col>
                    <v-btn color="primary" @click="setDummyFiles"
                    >Set dummy files</v-btn
                    >
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
                  <v-col>
                    <v-btn color="primary" @click="setDummyAvatar"
                    >Set dummy avatar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <FileUploader class="mt-6" v-bind="settings" />
        </v-container>
</template>
<script>
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
  name: "Playground",
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
    setDummyFile() {
      this.settings.file = {
        title: "Best airlines",
        type: "dummy",
        imageSrc: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      };
    },
    setDummyFiles() {
      this.settings.files = [
        {
          title: "Pre-fab homes",
          type: "dummy",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          title: "Favorite road trips",
          type: "dummy",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          title: "Best airlines",
          type: "dummy",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          id: 1,
          title: "Remote Picture with ID",
          type: "dummy",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          id: 2,
          title: "Remote Picture with ID",
          type: "dummy",
          imageSrc: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
      ];
    },
    setDummyAvatar() {
      this.settings.file = {
        title: "devnik",
        type: "dummy",
        imageSrc: "https://avatars.githubusercontent.com/u/16446467?s=400&v=4",
      };
    },
  },
};
</script>
