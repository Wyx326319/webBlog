# nvm(node版本管理工具)
官网地址： [https://nvm.uihtm.com/](https://nvm.uihtm.com/)  
nvm可以通过命令行快速的切换node版本

#### 安装步骤
1. 卸载node  
若之前已安装 Node，则需要先卸载,确保已删除 Node 的安装目录以及相关环境变量
2. 之后可以检查以下文件是否存在，若存在也删除：  
（此处默认安装路径为C:\Program Files\nodejs)  
C:\Program Files\nodejs  
C:\Program Files (x86)\nodejs  
C:\Users\{User}\AppData\Roaming\npm  
C:\Users\{User}\AppData\Roaming\npm-cache  
3. cmd命令行检测系统中是否还存在nodejs
``` html
node -v
```
4. 下载nvm  
GitHub下载：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)  
下载exe能自动配置环境变量
5. 配置nvm镜像源  
① cmd命令行查看nvm的安装根路径  
```html
nvm root
```
直接复制路径去文件管理器地址栏粘贴地址进行访问，AppData文件夹可能为隐藏文件夹  
② 找到setting.txt文件
在最后添加如下代码:
```html
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
#### 下面是一些nvm常用的命令
```html
nvm off                     // 禁用node.js版本管理(不卸载任何东西)
nvm on                      // 启用node.js版本管理
nvm install <version>       // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
nvm uninstall <version>     // 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
nvm ls                      // 显示所有安装的node.js版本
nvm list available          // 显示可以安装的所有node.js的版本
nvm use <version>           // 切换到使用指定的nodejs版本
nvm v                       // 显示nvm版本
nvm install stable          // 安装最新稳定版
```