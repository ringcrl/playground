# 环境配置

```sh
# OpenGL 和 OpenGL ES 本身并没有提供任何机制来创建必要的上下文、管理窗口、用户输入、定时等
brew install glfw3 && brew info glfw # 然后将内容复制到 deps/GLFW 目录下

# 一个跨平台的开源C/C++扩展加载库。GLEW提供了高效的运行时机制，用于确定目标平台上支持哪些OpenGL扩展
brew install glew && brew info glew # 然后将内容复制到 deps/GLEW 目录下

# 配置 CMAKELists.txt
```

# 文档

https://docs.gl/

# 基础概念

- vertex：顶点不是一个位置，是包含顶点的所有数据，可能包含位置、纹理坐标、法线、颜色、切线等等，所有内容包含在一个顶点，这些内容都是顶点的属性。
- stride：每个顶点包含的字节量，跳到下个顶点要偏移相应字节。

# 教程

- [编写 Shader 程序](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=7)
- [从文件中解析 Shader 字符串](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=8)
- [使用索引缓冲(IBO)画正方形](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=9)
- [封装 glGetError 捕获错误](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=10)
- [使用 uniform](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=11)
- [vertex array 顶点数组对象(VAO)使用](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=12)
- [抽象类-顶点索引缓冲区](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=13)
- [抽象类-缓冲区和布局](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=14)
- [抽象类-着色器](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=15)
- [抽象类-渲染器](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=16)
- [纹理](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=17)
- [blend 混合](https://www.bilibili.com/video/BV1Ni4y1o7Au?p=18)
