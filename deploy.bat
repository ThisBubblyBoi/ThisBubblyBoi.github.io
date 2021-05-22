@echo off

echo Deploying site to GitHub!

echo Repository link: https://github.com/thisbubblyboi/thisbubblyboi.github.io

git Pushing to repository...

git init -b main

git add 

git commit -m "Edited site, deployed changes"

git remote add origin https://github.com/thisbubblyboi/thisbubblyboi.github.io

git remote -v

git push origin main

echo Repository updated, deploying to Github pages...

git add --all

git commit -m "Edited site, deployed changes"

git push -u origin main

echo Successfully updated site with new changes!

set "reply=y"

set /p "reply=Do you want to visit the site? [y|n]: "

if /i not "%reply%" == "y" goto :eof

start chrome https://thisbubblyboi.github.io/

pause

