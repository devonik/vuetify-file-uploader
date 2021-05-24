> This project is built with vue and vuetify
> Make sure your project has already vue and vuetify installed

# Quick Start
## Install using npm
```shell
npm install vuetify-file-uploader 
```

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

### Options 2: register local
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
[Global](#options-1-register-global) use
> FileUploader can be used out of the box

[Local](#options-2-register-local) use
```js
import { FileUploader } from 'vuetify-file-uploader'
export default {
  name: 'app',
  components: {
    FileUploader
  }
}
```
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

##### Enums
```js
function layouts() {
  return {
    CARD: "card",
    CARD_LIST: "card-list",
    AVATAR: "avatar",
  };
}

```

#### FileCard

[Global](#options-1-register-global) use
> FileCard can be used out of the box

[Local](#options-2-register-local) use
```js
import { FileCard } from 'vuetify-file-uploader'
export default {
  name: 'app',
  components: {
    FileCard
  }
}
```

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
[Global](#options-1-register-global) use
> FileCardList can be used out of the box

[Local](#options-2-register-local) use
```js
import { FileCardList } from 'vuetify-file-uploader'
export default {
  name: 'app',
  components: {
    FileCardList
  }
}
```
##### Props
| Prop             | Type             | Default  | Options        | Comment                  |
|------------------|------------------|----------|----------------|--------------------------|
| file             | Object           | null     |                |                          |
| files            | Array            | null     |                |                          |
| gridCols         | String \| Number | 6        |                |                          |
| showPlaceholder  | String           | true     |                |                          |
| imageHeight      | String \| Number | 200      |                |                          |
| allowedFileTypes | String \| Number | "image/" | See [Common file types](#common-file-types) |                          |
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

##### Enums
```js
function listLayouts() {
  return {
    GRID: "grid",
  };
}
```

#### AvatarUploader
[Global](#options-1-register-global) use 
> AvatarUploader can be used out of the box

[Local](#options-2-register-local) use
```js
import { AvatarUploader } from 'vuetify-file-uploader'
export default {
  name: 'app',
  components: {
    AvatarUploader
  }
}
```
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

### Helpers
#### Common file types
> If you miss one just google for the content type of you file

```js
function commonFileTypes() {
  return [
    "text/csv",
    "application/msword",
    "image/",
    "image/gif",
    "image/jpeg",
    "text/calendar",
    "application/json",
    "audio/mpeg",
    "video/mp4",
    "video/mpeg",
    "audio/ogg",
    "video/ogg",
    "font/otf",
    "image/png",
    "application/pdf",
    "font/ttf",
    "text/plain",
    "audio/wav",
    "audio/webm",
    "video/webm",
    "image/webp",
    "font/woff",
    "font/woff2",
    "application/zip",
    "video/3gpp",
    "audio/3gpp",
    "video/3gpp2",
    "audio/3gpp2",
    "application/x-7z-compressed",
  ];
};

```

## Dependencies (as peer dependencies)
- vue
  - 2.6.x
- vuetify
  - 2.5.x
- mdi/font
  - 5.9.x
  
More Coming soon...
