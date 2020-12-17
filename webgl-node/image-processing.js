const width = 1080;
const height = 1920;
const gl = require('gl')(width, height, { preserveDrawingBuffer: true });
const path = require('path');
const fs = require('fs');
const glMatrix = require('gl-matrix');
const Image = require('image-raub');
const imageOutput = require('image-output');
const imageEncode = require('image-encode');
const pxls = require('pxls');

const VS_SOURCE = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;

  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    // convert the rectangle from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // pass the texCoord to the fragment shader
    // The GPU will interpolate this value between points.
    v_texCoord = a_texCoord;
  }
`;

const FS_SOURCE = `
  precision mediump float;
      
  // our texture
  uniform sampler2D u_image;

  // the texCoords passed in from the vertex shader.
  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord).bgra;
  }
`;

function createProgram(
  gl, shaders, opt_attribs, opt_locations,
) {
  const program = gl.createProgram();
  shaders.forEach((shader) => {
    gl.attachShader(program, shader);
  });
  if (opt_attribs) {
    opt_attribs.forEach((attrib, ndx) => {
      gl.bindAttribLocation(
        program,
        opt_locations ? opt_locations[ndx] : ndx,
        attrib,
      );
    });
  }
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link

    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function loadShader(gl, shaderSource, shaderType) {
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function render(image) {
  const shaders = [];
  shaders.push(
    loadShader(gl, VS_SOURCE, gl.VERTEX_SHADER),
    loadShader(gl, FS_SOURCE, gl.FRAGMENT_SHADER),
  );

  // setup GLSL program
  const program = createProgram(gl, shaders);

  // webglUtils.createProgramFromScripts(gl, ['vertex-shader-2d', 'fragment-shader-2d']);

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const texcoordLocation = gl.getAttribLocation(program, 'a_texCoord');

  // Create a buffer to put three 2d clip space points in
  const positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Set a rectangle the same size as the image.
  setRectangle(gl, 0, 0, image.width, image.height);

  // provide texture coordinates for the rectangle.
  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]), gl.STATIC_DRAW);

  // Create a texture.
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // lookup uniforms
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

  // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, width, height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionLocation, size, type, normalize, stride, offset,
  );

  // Turn on the texcoord attribute
  gl.enableVertexAttribArray(texcoordLocation);

  // bind the texcoord buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    texcoordLocation, size, type, normalize, stride, offset,
  );

  // set the resolution
  gl.uniform2f(resolutionLocation, width, height);

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES;
  var offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

async function readPixelsAndWriteFile() {
  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  const outputPath = path.resolve(__dirname, './test.png');

  // imageOutput({
  //   data: pixels,
  //   width,
  //   height,
  // }, outputPath);

  const res = {};
  imageOutput({
    data: pixels,
    width,
    height,
  }, res);

  const pixelsImage = pxls(res, [res.width, res.height]);

  const encodeObj = {
    height: res.height,
    quality: null,
    type: 'image/png',
    width: res.width,
  };

  const outputBuffer = Buffer.from(imageEncode(pixelsImage, encodeObj));
  return outputBuffer;

  // fs.writeFileSync(outputPath, outputBuffer);
}

function main() {
  console.time('image-load');
  const image = new Image();
  image.src = path.resolve(__dirname, './01.jpg');
  image.onload = () => {
    console.timeEnd('image-load');
    console.time('render');
    render(image);
    console.timeEnd('render');
    console.time('writeFile');
    readPixelsAndWriteFile();
    console.timeEnd('writeFile');
  };
}

main();
