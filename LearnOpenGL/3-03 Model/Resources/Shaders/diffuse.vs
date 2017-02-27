#version 330 core
layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec2 texCoords;

out vec2 TexCoords;
out vec3 FragPos;
out vec3 Normal;
out vec3 LightPos;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform vec3 lightPos;

void main()
{
    gl_Position = projection * view * model * vec4(position, 1.0f);
    TexCoords = texCoords;
    FragPos = vec3(view * model * vec4(position,1.0f));
    LightPos = vec3(view  *  vec4(lightPos,1.0f));
    //计算法向量的坐标，需要得到model矩阵的正规矩阵，model矩阵的逆矩阵的转置矩阵就是正规矩阵
    Normal = mat3(transpose(inverse(view * model)))  * normal;
}