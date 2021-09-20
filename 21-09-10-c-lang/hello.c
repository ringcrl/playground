#include <stdio.h>

// printf()是在标准库的头文件stdio.h定义的。使用这个函数之前，必须在源码文件头部引入这个头文件

void increment(int* p) {
  *p = *p + 1;
}

int x = 1;

int main(void) {

  increment(&x);
  printf("%d\n", x); // 2

  printf("Hello World\n");

  // 占位符，%i代表整数，%s代表字符串
  printf("There are %i apples\n", 3);

  // 多个占位符
  printf("%s says it is %i o'clock\n", "Ben", 21);

  // 总是显示正负号
  printf("%+d\n", 12); // 输出 +12
  printf("%+d\n", -12); // 输出 -12

  // 限定保留两位小数
  printf("Number is %.2f\n", 0.5);

  // 两个下划线开头的变量名，以及一个下划线 + 大写英文字母开头的变量名
  // 都是系统保留的，自己不应该起这样的变量名

  int num = 1;
  printf("%i\n", num);

  // 比较特殊的是，for的循环条件部分是一个单独的作用域，跟循环体内部不是同一个作用域
  for (int i = 0; i < 5; i++) {
    // int i = 999;
    printf("%d\n", i);
  }

  unsigned a = -100;
  printf("%d\n", a); // -100

  int x = 1;
  printf("x's address is %p\n", &x); // &运算符取出一个变量所在的内存地址

  return 0;
}

