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
   <FileUploader layout-mode="avatar"></FileUploader>
   ```
   
### configuration
| Prop        | Type   | Default | Options       | Enum                   |   |
|-------------|--------|---------|---------------|------------------------|---|
| layout-mode | String | card    | card / avatar | TODO helper function ? |   |
|             |        |         |               |                        |   |
|             |        |         |               |                        |   |

## Dependecies (as peer dependecies)
- vue
  - 2.6.x
- vuetify
  - 2.5.x
- mdi/font
  - 5.9.x
  
More Coming soon...
