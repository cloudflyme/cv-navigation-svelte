# deploy.sh
#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
npm run build
# 进入生成的文件夹目录
# cd docs/.vuepress/dist
# git init
# 添加当前文件
git add .
# 读取终端输入的信息
# read -p "input commit message: " msg
# git commit -m "$msg"
git commit -m "push"
# 推送到指定仓库
git push
echo 'push success'