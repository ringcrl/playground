#include <iostream>  
#include <string> 
#include<stdio.h>
#include<unistd.h>
#include <sys/uio.h>
#include <sys/stat.h>
#include <sys/types.h>
using namespace std;
extern int optind,opterr,optopt;
extern char *optarg;

int main(int argc,char *argv[])
{
    // 1、hello world
    // std::cout << "Hello World!\n";
    // return 0;

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
    std::string prefix = "./dir";
	if (access(prefix.c_str(), 0) == -1)	// 如果文件夹不存在
		mkdir(prefix.c_str(), 777);		    // 则创建

}
