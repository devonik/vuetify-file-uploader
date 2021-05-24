> This project is built with vue and vuetify
> Make sure your project has already vue and vuetify installed

# Quick Start
## Install using npm
``` npm install filepond ```

## import component
> You can decide for yourself whether to use FileUploader with the layout prop or directly one of the [component](#components) listed below.
### Options 1: register global
```js
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import FileUploader from 'vuetify-file-uploader'

Vue.config.productionTip = false

Vue.use(FileUploader)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
```
And use it everywhere 
```js
<FileUploader></FileUploader>
```

### Options 2: use local
```js
import { FileUploader } from 'vuetify-file-uploader'
export default {
    name: 'app',
    components: {
      FileUploader
    }
}
```

And use it local
```js
<FileUploader></FileUploader>
```

## Configuration
### Components
You can decide for yourself whether to use FileUploader or directly one of the other components. All props listed in the other components can also be passed to FileUploader
#### FileUploader
##### Props
> You can also pass all props from the components [FileCard](#filecard), [FileCardList](#filecardlist) and [AvatarUploader](#avataruploader)

| Prop   | Type   | Default |
|--------|--------|---------|
| layout | String | "card"  |

##### Slots
> Can be passed to [FileUploader](#fileuploader) ,[FileCard](#filecard) and [FileCardList](#filecardlist)
```html

<template #title>
  <v-card-title class="white--text"> Another title </v-card-title>
</template>
<template #subtitle>
  <v-card-subtitle class="white--text">Another subtitle</v-card-subtitle>
</template>
```

##### Events
| Name    | Payload                |
|---------|------------------------|
| addFile | {title, type, imageSrc}|

#### FileCard
##### Props
| Prop            | Type             | Default                     |
|-----------------|------------------|-----------------------------|
| file            | Object           | null                        |
| showPlaceholder | Booolean         | true                        |
| imageHeight     | String \| Number | 200                         |
| imageAlt        | String           | "Picture could not be load" |
| contain         | Boolean          | false                       |

##### Slots
> Can be passed to [FileUploader](#fileuploader) ,[FileCard](#filecard) and [FileCardList](#filecardlist)
```html

<template #title>
  <v-card-title class="white--text"> Another title </v-card-title>
</template>
<template #subtitle>
  <v-card-subtitle class="white--text">Another subtitle</v-card-subtitle>
</template>
```

##### Events
| Name    | Payload                |
|---------|------------------------|
| addFile | {title, type, imageSrc}|

#### FileCardList
##### Props
| Prop             | Type             | Default  | Options        | Comment                  |
|------------------|------------------|----------|----------------|--------------------------|
| file             | Object           | null     |                |                          |
| files            | Array            | null     |                |                          |
| gridCols         | String \| Number | 6        |                |                          |
| showPlaceholder  | String           | true     |                |                          |
| imageHeight      | String \| Number | 200      |                |                          |
| allowedFileTypes | String \| Number | "image/" | See #fileTypes |                          |
| maxSize          | String \| Number | 2048     |                | Max file size (Kilobyte) |
| contain          | Boolean          | false    |                | Image contain crop       |

##### Slots
> Can be passed to [FileUploader](#fileuploader) ,[FileCard](#filecard) and [FileCardList](#filecardlist)
```html

<template #title>
  <v-card-title class="white--text"> Another title </v-card-title>
</template>
<template #subtitle>
  <v-card-subtitle class="white--text">Another subtitle</v-card-subtitle>
</template>
```

##### Events
| Name    | Payload                |
|---------|------------------------|
| addFile | {title, type, imageSrc}|

#### AvatarUploader
##### Props
| Prop             | Type             | Default                     | Options                             | Comment                                      |
|------------------|------------------|-----------------------------|-------------------------------------|----------------------------------------------|
| file             | Object           | null                        | {id: "",title: "", type: "", imageSrc: ""} | Set initial file                             |
| minWidth         | String \| Number | 265                         |                                     | Min width of avatar wrapper and image        |
| minWidth         | String \| Number | 265                         |                                     | Min height of avatar wrapper and image       |
| color            | String           | "grey"                        |                                     | Color in avatar wrapper if no image is given |
| imageAlt         | String           | "Picture could not be load" |                                     | Text shown if the image could not be load    |
| allowedFileTypes | String \| Number | "image/"                    | See #fileTypes                      |                                              |
| maxSize          | String \| Number | 2048                        |                                     | Max file size (Kilobyte)                     |
| contain          | Boolean          | false                       |                                     | Set image contain                            |

##### Events
| Name    | Payload                |
|---------|------------------------|
| addFile | {title, type, imageSrc}|

## Dependencies (as peer dependencies)
- vue
  - 2.6.x
- vuetify
  - 2.5.x
- mdi/font
  - 5.9.x
  
More Coming soon...
