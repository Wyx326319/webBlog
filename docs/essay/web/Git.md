# Git
## 1.git如何合并、拉取代码？

拉取代码 git pull '仓库地址'

查看状态 git sattus 

提交到本地缓存区  git add .

提交本地仓库 git commit -m '修改描述'

提交到远程仓库 git push '仓库地址' master

创建分支 git branch -b xxx

合并分支 git merge '合并分支的名字'

## 2.git如何解决冲突问题？

1.两个分支中修改了同一个文件

2.两个分支中修改了同一个文件的名字

1.解决：当前分支上，直接修改代码  add  commit

2.解决：在本地当前分支上，修改冲突代码 add commit push
