# vscode插件
## 1.background  
这款插件可以自定义vscode的背景，优化vscode的美观程度  
## setting.json中的代码
```json
{
    "workbench.colorTheme": "Monokai",
    "security.workspace.trust.untrustedFiles": "open",
    "workbench.editorAssociations": {
        "*.ipynb": "jupyter-notebook"
    },
    "notebook.cellToolbarLocation": {
        "default": "right",
        "jupyter-notebook": "left"
    },
    //background 的相关配置
    "update.enableWindowsBackgroundUpdates": true,
    "background.style": {
        "content":"''",
        "pointer-events":"none",
        "position":"fixed",//图片位置居中
        "width":"100%",
        "height":"100%",
        "z-index":"99999",
        "top":"0px",
        "left":"0px",
        "background.repeat":"no-repeat",
        "background-size":"cover",//图片大小为全屏
        "opacity":0.2 //透明度
    },
    "background.useFront": true,
    "background.useDefault": false,
    "background.fullscreen": {
        "images": [],
        "opacity": 0.91,
        "size": "cover",
        "position": "center",
        "interval": 0
    },
    "editor.wordWrap": "on",
    "background.customImages": [
        "https://iknow-pic.cdn.bcebos.com/024f78f0f736afc36cf0dbf8a119ebc4b64512aa"
    ],
    "workbench.editor.enablePreview": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "http.proxyAuthorization": null, //是否使用默认图片
}
```
## 2.Chinese(Simplified)(简体中文)  
这个插件将vscode的英文翻译为中文  
## 3.Vetur  
这个插件可以快速的生成vue代码的模板  
## 4.Project Manager  
这个插件可以在vscode中生成项目目录，实现快速切换项目，极大的提高了打开项目的效率  
## 5.Live Server  
这个插件可以快速的打开html网页

## 6. Image preview
这个插件能在vscode中快速的预览图片,查看图片的宽度和高度，在前端开发中可以提高开发的效率。
## 7. any-rule
这个插件提供了很多的正则表达式，可以快速的找到合适的正则表达式

## 8. Draw.io Integration
这个插件是用来绘图的，新建一个dio或drawio后缀的文件，就可以开始绘图了