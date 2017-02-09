#version 330 core
out vec4 color;

in vec3 Ambient;
in vec3 Diffuse;
in vec3 Specular;


uniform vec3 objectColor;

void main()
{      
    vec3 result = (Ambient + Diffuse + Specular) * objectColor;
    color = vec4(result, 1.0f);
} 