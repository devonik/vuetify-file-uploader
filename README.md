# How to use
## get package
TODO npm install ...

## import component
1. ```js
   import FileUploader from "vuetify-file-uploader/FileUploader";
   export default {
    name: "app",
    components: { FileUploader },
   };
   ```
2. Call it in the template
    ```js
   <FileUploader></FileUploader>
   ```

## configuration
### Props
#### FileUploader
| Prop   | Type   | Default |
|--------|--------|---------|
| layout | String | "card"  |

> You can decide for yourself whether to use FileUploader or directly one of the components listed below. All props listed in the lower components can also be passed to FileUploader

#### FileCard
| Prop            | Type             | Default                     |
|-----------------|------------------|-----------------------------|
| file            | Object           | null                        |
| showPlaceholder | Booolean         | true                        |
| imageHeight     | String \| Number | 200                         |
| imageAlt        | String           | "Picture could not be load" |
| contain         | Boolean          | false                       |

#### FileCardList
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

#### AvatarUploader
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

### Events

| Name    | Payload                 | Availability                                         |
|---------|-------------------------|------------------------------------------------------|
| addFile | {title, type, imageSrc} | FileUploader, FileCard, FileCardList, AvatarUploader |

### Slots
#### FileCard
> Can be passed to FileUploader, FileCard, FileCardList
```js

<template #title>
  <v-card-title class="white--text"> Another title </v-card-title>
</template>
<template #subtitle>
  <v-card-subtitle class="white--text">Another subtitle</v-card-subtitle>
</template>
```

## Dependecies (as peer dependecies)
- vue
  - 2.6.x
- vuetify
  - 2.5.x
- mdi/font
  - 5.9.x
  
More Coming soon...
