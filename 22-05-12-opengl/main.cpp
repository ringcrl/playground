#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

void processInput(GLFWwindow *window)
{
  if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
    glfwSetWindowShouldClose(window, true);
}


int main(void)
{
  GLFWwindow *window;
  // 使用 glfwInit 初始化 GLFW
  if (!glfwInit())
    return -1;

  // 创建一个窗口模式窗口及其OpenGL上下文
  window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
  if (!window)
  {
    glfwTerminate();
    return -1;
  }
  // 告诉 GLFW 将我们窗口的上下文作为当前线程的主上下文
  glfwMakeContextCurrent(window);

  // 循环直到用户关闭窗口
  while (!glfwWindowShouldClose(window))
  {
    // 搞一个绿色背景
    glClear(GL_COLOR_BUFFER_BIT);
    glClearColor(0.2f, 0.3f, 0.3f, 1.0f);

    // 画一个三角形
    glClear(GL_COLOR_BUFFER_BIT);
    glBegin(GL_TRIANGLES);
    glVertex2f(-0.5f, -0.5f);
    glVertex2f(0.0f, 0.5f);
    glVertex2f(0.5f, -0.5f);
    glEnd();

    // 注册键盘事件
    processInput(window);
    // 交换前后缓冲区
    glfwSwapBuffers(window);
    // glfwPollEvents 函数检查是否触发了任何事件（如键盘输入或鼠标移动事件），更新窗口状态，并调用相应的函数
    glfwPollEvents();
  }

  glfwTerminate();
  return 0;
}
