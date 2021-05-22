@echo off

echo Deploying site to GitHub!

echo Repository link: https://github.com/ThisBubblyBoi/thisbubblyboi.github.io.git

git add --all

git commit -m Edited site, deployed changes"

git push -u origin main

echo Successfully updated site with new changes!

set "reply=y"

set /p "reply=Do you want to visit the site? [y|n]: "

if /i not "%reply%" == "y" goto :eof

start chrome https://thisbubblyboi.github.io/

pause

