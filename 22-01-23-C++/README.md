# 编译可执行文件

```sh
# 方法1：命令行编译
g++ main.cpp -o main

# 方法2：使用 VSCode 插件 Code Runner 直接运行

# 方法3：shift + cmd + B
./main
```

# VSCode 配置

```sh
# 1、配置语法：输入 edit config 找到 C++ 配置，根据系统点击添加
# 2、配置编译：顶部终端 -> 配置默认生成任务
# 3、配置调试：顶部运行 -> 启动调试
```


# 语法基础

## base 基础

```cpp
#include <iostream>

int main() {
    std::cout << "测试" << std::endl;
    return 0;
}
```

## 数据类型

```cpp
#include <iostream>

int main()
{
    // sizeof 获取字节

    // 整形
    std::cout << "int 整形 32位 字节：" << sizeof(int) << std::endl;
    std::cout << "int 整形 32位 最大值：" << INT_MAX << std::endl;
    std::cout << "short int 短整形 16位 字节：" << sizeof(short int) << std::endl;
    std::cout << "long int 长整形 32位 字节：" << sizeof(long int) << std::endl;
    std::cout << "char 字符型(隶属于整形) 8位 字节：" << sizeof(char) << std::endl;
    std::cout << "char 字符型 最大值：" << CHAR_MAX << std::endl;
    std::cout << "char 字符型 最小值：" << CHAR_MIN << std::endl;
    std::cout << "bool 布尔型(隶属于整形) 8位 字节：" << sizeof(bool) << std::endl;

    // 浮点型
    std::cout << "float 浮点型 32位 字节：" << sizeof(float) << std::endl; // 不要使用，只能表示6-7位
    std::cout << "double 浮点型 64位 字节：" << sizeof(double) << std::endl;

    // string 类型
    std::cout << "string 字符串型 字节：" << sizeof(std::string) << std::endl;

    // 定义类型别名
    typedef std::string my_string;
    my_string text = "我自己定义的 string 类型别名";
    std::cout << text << std::endl;

    // 定义常量，代替 C 语言的 #define，性能不好
    const float PI = 3.1415926;
}

```

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

## :: 双冒号作用域符

```cpp
// 1、global scope(全局作用域符）
// 如在程序中的某一处你想调用全局变量a，那么就写成::a；（也可以是全局函数）
// ::name

// 2、class scope(类作用域符）
// 如果想调用class A中的成员变量a，那么就写成A::a
// namespace::name

// 3、namespace scope(命名空间作用域符）
// 另外一个如果想调用namespace std中的cout成员，你就写成std::cout
// namespace::name
```

## cmath 数学计算

```cpp
#include <iostream>
#include <cmath>

int main()
{
    // 强制以小数展示
    std::cout << std::fixed;
    double infiniteNum = 10.0 / 3.0;
    std::cout << infiniteNum << std::endl;

    // pow 计算平方
    double width = 3.0;
    double area = pow(width, 2);
    std::cout << "Area of a square with width " << width << " is " << area << std::endl;
}

```

## int arr[5] 数组

```cpp
#include <iostream>

int main()
{
    int arr[5] = {1, 2, 3, 4, 5};
    // 数组赋值
    arr[4] = 2;
    // 访问数组
    int arr2 = arr[2];
    std::cout << arr2 << std::endl;
}

```

## std::string 字符串

```cpp
#include <iostream>

int main()
{
    std::string str1 = "hello";
    std::string str2 = "world";
    std::string str3;
    int len;
    // 赋值 str1 到 str3
    str3 = str1;
    // 连接 str1 和 str2
    str3 = str1 + str2;
    // 获取 str3 总长度
    std::cout << "str3 length: " << str3.length() << std::endl;
}

```

## *ptr 指针

```cpp
#include <iostream>
using namespace std;

int main()
{
    // int* p 的写法偏向于地址，即 p 就是一个地址变量，表示一个十六进制地址
    // int *p 的写法偏向于值，*p 是一个整形变量，能够表示一个整型值
    // 声明中的 * 号和使用中的 * 号含义完全不同

    int num = 1024;
    // 给指针赋值，只能使用 & 符号
    int* ptr_num = &num;
    cout << "num = " << num << endl;
    cout << "*ptr_num = " << *ptr_num << endl;
    cout << "ptr_num = " << ptr_num << endl;

    // 不给指针值，会有默认值，就是野指针，非常危险，会导致很深的bug
    double* ptr_double;
    cout << "ptr_double = " << ptr_double << endl;
    // 所以初始化为 nullptr
    int* ptr1 = nullptr;

    // void* 可以指定任何类型，但是不能使用 void* 来修改值，一般用来和别的指针进行比较
}

```

## & 引用

```cpp
#include <iostream>

int main()
{
    // 引用是对指针的简单封装，底层仍然是指针
    // 获取引用地址的时候，编译器会进行内部转换
    int num = 108;
    int& ref_num = num;
    ref_num = 118;
    std::cout << &num << '\t' << &ref_num << std::endl;
    // 等价于
    int num2 = 108;
    int* ref_num2 = &num2;
    *ref_num2 = 118;
    std::cout << &num2 << '\t' << ref_num2 << std::endl;

    // 声明简单的变量
    int i = 5;
    double d = 11.7;
    // 声明引用变量
    int& r = i;
    double& s = d;
    std::cout << "i 的值: " << i << std::endl;
    std::cout << "i 的引用: " << r << std::endl;
    std::cout << "d 的值: " << d << std::endl;
    std::cout << "d 的引用: " << s << std::endl;
}

```

## 函数

### 参数指针

```cpp
#include <iostream>

void getSeconds(unsigned long *par)
{
    // 获取当前的秒数
    *par = time(NULL);
    return;
}

int main()
{
    unsigned long sec;
    getSeconds(&sec);
    std::cout << "Number of seconds :" << sec << std::endl;
}

```

## time 时间

```cpp
#include <iostream>

int main()
{
    // 日期与时间
    // 基于当前系统的当前日期/时间
    time_t now = time(0);
    // 把 now 转换为字符串形式
    char *dt = ctime(&now);
    std::cout << "本地日期和时间：" << dt << std::endl;
    // 把 now 转换为 tm 结构
    tm *gmtm = gmtime(&now);
    dt = asctime(gmtm);
    std::cout << "UTC 日期和时间：" << dt << std::endl;
    std::cout << "1970 到目前经过秒数:" << now << std::endl;
    // 使用结构 tm 故事化时间
    tm *ltm = localtime(&now);
    // 输出 tm 结构的各个组成部分
    std::cout << "年: " << 1900 + ltm->tm_year << std::endl;
    std::cout << "月: " << 1 + ltm->tm_mon << std::endl;
    std::cout << "日: " << ltm->tm_mday << std::endl;
    std::cout << "时: " << ltm->tm_hour << std::endl;
    std::cout << "分: " << ltm->tm_min << std::endl;
    std::cout << "秒: " << ltm->tm_sec << std::endl;
}

```

## struct 结构体

```cpp
#include <iostream>

struct Books
{
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
};

int main()
{
    // 结构
    Books Book1; // 定义结构体类型 Books 的变量 Book1
    // Book1 详述
    strcpy(Book1.title, "C++ 教程");
    strcpy(Book1.author, "Chenng");
    strcpy(Book1.subject, "编程语言");
    Book1.book_id = 0;
    // 输出 Book1 信息
    std::cout << "第一本书标题 : " << Book1.title << std::endl;
    std::cout << "第一本书作者 : " << Book1.author << std::endl;
    std::cout << "第一本书类目 : " << Book1.subject << std::endl;
    std::cout << "第一本书 ID : " << Book1.book_id << std::endl;
}

```

## class 类

```cpp
#include <iostream>

class Box
{
    // 私有成员，默认情况下类所有成员都是私有的，例如
    int border;

    // 公有成员
public:
    double length;  // 盒子的长度
    double breadth; // 盒子的宽度
    double height;  // 盒子的高度

    // 构造函数
    // Box(double len, double bre, double hei)
    // {
    //     length = len;
    //     breadth = bre;
    //     height = hei;
    // }

    // 成员函数声明
    double get(void);
    void set(double len, double bre, double hei);

    // 类内部定义函数
    double getVolume(void)
    {
        return length * breadth * height;
    }
    void setPrivateWidth(double width)
    {
        privateWidth = width;
    }
    double getPrivateWidth()
    {
        return privateWidth;
    }
    // 受保护成员，在子类可以被访问
protected:
    double protectedWidth;
    // 私有成员
private:
    double privateWidth;
};
// 类外部定义函数，使用范围解析运算符::
double Box::get(void)
{
    return length * breadth * height;
}
// 类外部定义函数
void Box::set(double len, double bre, double hei)
{
    length = len;
    breadth = bre;
    height = hei;
}

// SubBox 是派生类
class SubBox : Box
{
public:
    void setSubBoxWidth(double wid)
    {
        protectedWidth = wid;
    }
    double getSubBoxWidth(void)
    {
        return protectedWidth;
    }
};

int main()
{
    // 类
    Box Box1;            // 声明 Box1，类型为 Box
    double volume = 0.0; // 用于存储体积
    Box1.height = 5.0;
    Box1.length = 6.0;
    Box1.breadth = 7.0;
    volume = Box1.getVolume();
    std::cout << "Box1 的体积：" << volume << std::endl;
    // 私有属性
    Box1.setPrivateWidth(10.0);
    std::cout << "Box1 的私有属性：" << Box1.getPrivateWidth() << std::endl;

    // 子类
    SubBox subBox;
    subBox.setSubBoxWidth(0.5);
    std::cout << "subBox 的 protected 属性：" << subBox.getSubBoxWidth() << std::endl;
}

```

## vector 数组代替品

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<double> vecDouble = {1.0, 2.0, 3.0, 4.0, 5.0};

    // 向数组插入数字
    vecDouble.push_back(6.0);

    // 遍历所有元素
    for (int i = 0; i < vecDouble.size(); i++) {
        cout << "vecDouble[" << i << "] = " << vecDouble[i] << endl;
    }

    // 得到迭代器对象
    vector<double>::iterator it;
    // 从第一个元素开始迭代
    // ++ 写在前面避免缓存，写在后面会产生缓存问题
    for (it = vecDouble.begin(); it != vecDouble.end(); ++it) {
        cout << "*it = " << *it << endl;
    }

    // 正序排序
    sort(vecDouble.begin(), vecDouble.end());
    // 逆序排序
    reverse(vecDouble.begin(), vecDouble.end());
}

```

# 应用

## 获取文件路径

```cpp
#include <iostream>

std::string path = "/home/user/file.txt";
std::string::size_type iPos = path.find_last_of('/') + 1;
std::string filename = path.substr(iPos, path.length() - iPos);
std::cout << "文件名字：" << filename.c_str() << std::endl;

std::string dirpath = path.substr(0, iPos);
std::cout << "文件所在目录：" << dirpath.c_str() << std::endl;

std::string filenameWithouPostfix = filename.substr(0, filename.find_last_of('.'));
std::cout << "不带后缀的文件名：" << filenameWithouPostfix.c_str() << std::endl;
```

## 解析命令行参数

```cpp
#include <iostream>
#include <unistd.h>

int main(int argc, char *argv[])
{
    int c = 0;
    std::string input_i;
    // 循环处理参数
    while (EOF != (c = getopt(argc, argv, "i:")))
    {
        switch (c)
        {
        // 入参地址，带有冒号为必填参数
        case 'i':
            printf("获取 -i, 值是 %s\n", optarg);
            input_i = std::string(optarg);
            break;
        //表示选项不支持
        case '?':
            printf("未知参数: %c\n", optopt);
            break;
        default:
            break;
        }
    }
}
```

## 不存在则创建文件夹

```cpp
#include <iostream>
#include <unistd.h>
#include <sys/stat.h>

int main()
{
    std::string prefix = "./dir";
    if (access(prefix.c_str(), 0) == -1) // 如果文件夹不存在
        mkdir(prefix.c_str(), S_IRWXU);  // 则创建
}
```
