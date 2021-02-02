varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D lut;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord.xy);

    highp float blueColor = color.b * 63.0;
  
    //向下取值
    highp vec2 quad1;
    quad1.y = floor(floor(blueColor) / 8.0); 
    quad1.x = floor(blueColor) - (quad1.y * 8.0);
  
    //向上取值
    highp vec2 quad2;
    quad2.y = floor(ceil(blueColor) / 8.0); 
    quad2.x = ceil(blueColor) - (quad2.y * 8.0);
     
    //根据小正方形格子和RG通道，获取纹理坐标，每个大格子的大小:1/8=0.125，每个小格子的大小:1/512
    highp vec2 texPos1;
    texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
    texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
     
    highp vec2 texPos2;
    texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
    texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
     
    lowp vec4 newColor1 = texture2D(lut, texPos1);
    lowp vec4 newColor2 = texture2D(lut, texPos2);
    
    lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));

    gl_FragColor = vec4(newColor.rgb, color.w);
}