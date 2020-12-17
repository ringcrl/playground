const { mat4 } = glMatrix;

const vsSource = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

// 初始化着色器程序，让WebGL知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 创建着色器程序
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // 创建失败， alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${
        gl.getProgramInfoLog(shaderProgram)}`,
    );
    return null;
  }

  return shaderProgram;
}

// 创建指定类型的着色器，上传source源码并编译
function loadShader(gl, type, source) {
  // 创建一个新的着色器
  const shader = gl.createShader(type);

  // 将源代码发送到着色器
  gl.shaderSource(shader, source);

  // 进行编译
  gl.compileShader(shader);

  // 指定着色器和我们想要检查的参数的名字
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// 在画正方形前，我们需要创建一个缓冲器来存储它的顶点
function initBuffers(gl) {
  // 它调用 gl 的成员函数 createBuffer() 得到了缓冲对象并存储在顶点缓冲器
  const positionBuffer = gl.createBuffer();
  // 调用 bindBuffer() 函数绑定上下文
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 创建一个Javascript 数组去记录每一个正方体的每一个顶点
  const vertices = [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0,
  ];

  // 将其转化为 WebGL 浮点型类型的数组，并将其传到 gl 对象的  bufferData() 方法来建立对象的顶点
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 黑色，完全不透明
  gl.clearDepth(1.0); // 清除所有内容
  gl.enable(gl.DEPTH_TEST); // 启用深度测试
  gl.depthFunc(gl.LEQUAL); // 近处的事物遮盖了远处的事物

  // 在开始在其上绘制之前，清除画布
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 建立摄像机透视矩阵。
  // 设置45度的视图角度，并且设置一个适合实际图像的宽高比
  // 指定在摄像机距离0.1到100单位长度的范围内的物体可见
  const fieldOfView = 45 * Math.PI / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]); // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 3; // pull out 3 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition,
    );
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

// 从这里开始
function main() {
  const canvas = document.querySelector('#glcanvas');
  // 初始化WebGL上下文
  const gl = canvas.getContext('webgl');

  // 确认WebGL支持性
  if (!gl) {
    alert('无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。');
    return;
  }

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    // 属性从缓冲区接收值。顶点着色器的每次迭代都从分配给该属性的缓冲区接收下一个值
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    // uniforms类似于JavaScript全局变量。它们在着色器的所有迭代中保持相同的值
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const buffer = initBuffers(gl);

  drawScene(gl, programInfo, buffer);
}
