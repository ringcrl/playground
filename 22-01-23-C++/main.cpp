#include <iostream>  
#include <string> 
#include<stdio.h>
#include<unistd.h>
#include <sys/uio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <cmath>
#include <ctime>

using namespace std;

extern int optind, opterr, optopt;
extern char *optarg;

// extern 全局变量比 static 高级，所有程序文件都是可见的
// 函数外声明的变量叫做全局变量
extern int extern_a;

// 定义常量1
#define NEWLINE '\n'
// 定义常量2
const int WIDTH = 5;

// 函数声明可以在任何地方
int func();

// 在写函数时应习惯性的先声明函数，然后在定义函数
void getSeconds(unsigned long *par);

// 函数声明
void swap(int& x, int& y);

// 声明一个结构体类型 Books 
struct Books {
   char title[50];
   char author[50];
   char subject[100];
   int book_id;
};
void printBook( struct Books book );

// 参数中声明的变量，叫做形参
// 形式参数就像函数内的其他局部变量，在进入函数时被创建，退出函数时被销毁
int main(int argc,char *argv[])
{
    // 1、hello world
    // cout 是标准输出流的意思，从 <iostream> 头文件中定义
    cout << "Hello World!\n";

    // 2、从完整路径中提取文件名
    // // 获取不带路径的文件名
    // string path = "/home/user/file.txt";
	// string::size_type iPos = path.find_last_of('/') + 1;
	// string filename = path.substr(iPos, path.length() - iPos);
    // printf("%s\n", filename.c_str());
    // // 获取目录路径
    // string dirpath = path.substr(0, iPos);
    // printf("%s\n", dirpath.c_str());
    // // 获取不带后缀的文件名
	// string name = filename.substr(0, filename.rfind("."));
    // printf("%s\n", name.c_str());

    // 3、解析命令行参数
    // int c = 0; // 用于接收选项
    // std::string input_i;
    // // 循环处理参数
    // while(EOF != (c = getopt(argc, argv, "i:")))
    // {
    //     //打印处理的参数
    //     printf("start to process %d para\n", optind);
    //     switch(c)
    //     {
    //         // 入参地址，带有冒号为必填参数
    //         case 'i':
    //             printf("we get option -i, para is %s\n", optarg);
    //             input_i = std::string(optarg);;
    //             break;
    //         //表示选项不支持
    //         case '?':
    //             printf("unknow option: %c\n", optopt);
    //             break;
    //         default:
    //             break;
    //     }    
    // }
    // printf("input_i is %s\n", input_i.c_str());

    // 4、不存在则创建文件夹
    // std::string prefix = "./dir";
	// if (access(prefix.c_str(), 0) == -1)	// 如果文件夹不存在
	// 	mkdir(prefix.c_str(), S_IRWXU);		// 则创建

    // 5、数据类型
    // printf("bool 所占字节数：%ld\n", sizeof(bool));
    // printf("char 所占字节数：%ld\n", sizeof(char));
    // printf("int 所占字节数：%ld\n", sizeof(int));
    // printf("int 最大值：%d\n", (numeric_limits<int>::max)());
    // // 函数内声明的变量叫做局部变量，局部变量可以和全局变量同名，局部覆盖全局
    // // 枚举类型
    // enum color { red, green, blue } c;
    // c = blue; // 2
    // // 变量定义
    // int extern_a;
    // // 变量实际初始化
    // extern_a = 10;
    // // 函数调用
    // int funcRes = func();
    // printf("funcRes is %d\n", funcRes);
    // // 宽字符变量，单引号前面加L
    // wchar_t wc = L'a';
    // // 有无符号整数区别
    // short int i;           // 有符号短整数
    // short unsigned int j;  // 无符号短整数
    // j = 50000;
    // i = j;
    // printf("i is %d\n", i);
    // printf("j is %d\n", j);
    // // 局部静态变量，不需要在每次进入和离开作用域的使用进行创建和销毁
    // static int count = 5;

    // 6、循环
    // 无限循环
    // for(;;) {
    //   printf("This loop will run forever.\n");
    // }

    // 7、math 方法
    // int pow5 = pow(5, 2);
    // int abs5 = abs(-5);
    // int floor5 = floor(5.5);

    // 8、随机数
    // 设置种子
    // srand((unsigned)time(NULL));
    // int i,j;
    // for( i = 0; i < 10; i++ ) {
    //   // 生成实际的随机数
    //   j= rand();
    //   cout <<"随机数： " << j << endl;
    // }

    // 9、数组
    // int arr[5] = {1,2,3,4,5};
    // // 数组赋值
    // arr[4] = 2;
    // // 访问数组
    // int arr2 = arr[2];

    // 10、字符串
    // string str1 = "hello";
    // string str2 = "world";
    // string str3;
    // int len;
    // // 赋值 str1 到 str3
    // str3 = str1;
    // // 连接 str1 和 str2
    // str3 = str1 + str2;
    // // 获取 str3 总长度
    // printf("str3 length %d\n", str3.size());

    // 11、指针
    // int var = 20; // 实际变量声明
    // int *ip; // 变量指针声明
    // ip = &var; // 在指针变量中存储 var 的地址
    // cout << "变量 var 的值为：" << var << endl;
    // cout << "变量 var 在内存中的地址为：" << &var << endl;
    // cout << "变量 ip 在内存中的地址为：" << ip << endl;
    // cout << "变量 ip 指向的内存区域的值为：" << *ip << endl;
    // int *ptr = NULL;
    // cout << "变量 ptr 的值为：" << ptr << endl;

    // 12、指向指针的指针
    // int  var;
    // int  *ptr;
    // int  **pptr;
    // var = 3000;
    // // 获取 var 的地址
    // ptr = &var;
    // // 使用运算符 & 获取 ptr 的地址
    // pptr = &ptr;
    // // 使用 pptr 获取值
    // cout << "var 值为 :" << var << endl;
    // cout << "*ptr 值为:" << *ptr << endl;
    // cout << "**pptr 值为:" << **pptr << endl;

    // 13、函数参数指针
    // unsigned long sec;
    // getSeconds(&sec);
    // cout << "Number of seconds :" << sec << endl;

    // 14、引用
    // // 声明简单的变量
    // int    i;
    // double d;
    // // 声明引用变量
    // int&    r = i;
    // double& s = d;
    // i = 5;
    // cout << "Value of i : " << i << endl;
    // cout << "Value of i reference : " << r  << endl;
    // d = 11.7;
    // cout << "Value of d : " << d << endl;
    // cout << "Value of d reference : " << s  << endl;

    // 15、引用作为函数参数
    // // 局部变量声明
    // int a = 100;
    // int b = 200;
    // cout << "交换前，a 的值：" << a << endl;
    // cout << "交换前，b 的值：" << b << endl;
    // /* 调用函数来交换值 */
    // swap(a, b);
    // cout << "交换后，a 的值：" << a << endl;
    // cout << "交换后，b 的值：" << b << endl;

    // 16、日期与时间
    // // 基于当前系统的当前日期/时间
    // time_t now = time(0);
    // // 把 now 转换为字符串形式
    // char* dt = ctime(&now);
    // cout << "本地日期和时间：" << dt << endl;
    // // 把 now 转换为 tm 结构
    // tm *gmtm = gmtime(&now);
    // dt = asctime(gmtm);
    // cout << "UTC 日期和时间："<< dt << endl;
    // cout << "1970 到目前经过秒数:" << now << endl;
    // // 使用结构 tm 故事化时间
    // tm *ltm = localtime(&now);
    // // 输出 tm 结构的各个组成部分
    // cout << "年: "<< 1900 + ltm->tm_year << endl;
    // cout << "月: "<< 1 + ltm->tm_mon<< endl;
    // cout << "日: "<<  ltm->tm_mday << endl;
    // cout << "时: "<< ltm->tm_hour << endl;
    // cout << "分: " << ltm->tm_min << endl;
    // cout << "秒: " << ltm->tm_sec << endl;

    // 17、基本输入输出
    // // 标准输入流 cin
    // char name[50];
    // cout << "请输入您的名称： ";
    // cin >> name;
    // cout << "您的名称是： " << name << endl;
    // // 标准错误流 cerr
    // char str[] = "Unable to read...."; 
    // cerr << "Error message : " << str << endl;
    // // 标准日志流 clog
    // char str[] = "Unable to read....";
    // clog << "Error message : " << str << endl;

    // 18、数据结构
    Books Book1;        // 定义结构体类型 Books 的变量 Book1
    Books Book2;        // 定义结构体类型 Books 的变量 Book2
   // Book1 详述
   strcpy( Book1.title, "C++ 教程");
   strcpy( Book1.author, "Chenng"); 
   strcpy( Book1.subject, "编程语言");
   Book1.book_id = 0;
   // Book2 详述
   strcpy( Book2.title, "JS 教程");
   strcpy( Book2.author, "Chenng");
   strcpy( Book2.subject, "编程语言");
   Book2.book_id = 1;
   // 输出 Book1 信息
   cout << "第一本书标题 : " << Book1.title <<endl;
   cout << "第一本书作者 : " << Book1.author <<endl;
   cout << "第一本书类目 : " << Book1.subject <<endl;
   cout << "第一本书 ID : " << Book1.book_id <<endl;
   // 输出 Book2 信息
   cout << "第二本书标题 : " << Book2.title <<endl;
   cout << "第二本书作者 : " << Book2.author <<endl;
   cout << "第二本书类目 : " << Book2.subject <<endl;
   cout << "第二本书 ID : " << Book2.book_id <<endl;
   // 把结构作为函数参数
   printBook(Book1);
}

// 函数实际定义
int func() {
    return 0;
}

// 返回较大数函数
// 有三种向函数传递参数的方式：
// 1、传值调用：该方法把参数的实际值赋值给函数的形式参数。在这种情况下，修改函数内的形式参数对实际参数没有影响
// 2、指针调用：该方法把参数的地址赋值给形式参数。在函数内，该地址用于访问调用中要用到的实际参数。修改形式参数会影响实际参数
// 3、引用调用：该方法把参数的引用赋值给形式参数。在函数内，该引用用于访问调用中要用到的实际参数。修改形式参数会影响实际参数
// 一般情况下使用传值调用来传递参数
// 可以使用默认值，未传的参数使用默认值
int max(int a, int b = 10) {
    int res;
    if (a > b) {
        res = a;
    } else {
        res = b;
    }
    return res;
}

void getSeconds(unsigned long *par) {
   // 获取当前的秒数
   *par = time(NULL);
   return;
}

// 函数定义
void swap(int& x, int& y) {
   int temp;
   temp = x; /* 保存地址 x 的值 */
   x = y;    /* 把 y 赋值给 x */
   y = temp; /* 把 x 赋值给 y  */
  
   return;
}

void printBook( struct Books book ) {
   cout << "书标题 : " << book.title <<endl;
   cout << "书作者 : " << book.author <<endl;
   cout << "书类目 : " << book.subject <<endl;
   cout << "书 ID : " << book.book_id <<endl;
}