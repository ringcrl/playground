# 编译可执行文件

```sh
g++ main.cpp -o main
```

# 语法基础

## iostream 输入输出

```cpp
// 引入输入输出
#include <iostream>

// std 是命名空间
// << 表示插入运算符
// endl 表示换行
std::cout << "打印的内容" << std:endl;

// 使用命名空间后，后面就是可以使用 cout 而不是 std:cout
using namespace std;
```

## 双冒号作用域符

- 1)global scope(全局作用域符），用法（::name)
- 2)class scope(类作用域符），用法(class::name)
- 3)namespace scope(命名空间作用域符），用法(namespace::name)

- 1.如在程序中的某一处你想调用全局变量a，那么就写成::a；（也可以是全局函数）
- 2.如果想调用class A中的成员变量a，那么就写成A::a；
- 3.另外一个如果想调用namespace std中的cout成员，你就写成std::cout（相当于using namespace std；cout）意思是在这里我想用cout对象是命名空间std中的cout（即就是标准库里边的cout）；
