## 安装依赖

```sh
# OpenGL 和 OpenGL ES 本身并没有提供任何机制来创建必要的上下文、管理窗口、用户输入、定时等
brew install glfw3

# 一个跨平台的开源C/C++扩展加载库。GLEW提供了高效的运行时机制，用于确定目标平台上支持哪些OpenGL扩展
brew install glew

# 查找 brew 安装路径
brew info glfw3

# 查找依赖
find /opt -name glew.h
```

## 编译

配置 CMAKELists.txt

## 编译脚本

```sh
function cppcompile()
{
  filename=$1
  re="^\#include \""
  while read line
  do
    if [[ $line =~ $re ]]; then
      temp=${line:9}
      temp1=${temp#\"}
      temp2=${temp1%\.*\"}
      g++ -std=c++11 -c $temp2.cpp
    fi
  done < $filename.cpp
  g++ -std=c++11 -c $filename.cpp
  g++ -o $filename *.o
  ./$filename
  rm *.o
}
```

## GLFW 创建窗口

https://www.glfw.org/download.html

## GLAD 自动生成指定 OPENGL 版本的驱动程序

https://github.com/Dav1dde/glad
