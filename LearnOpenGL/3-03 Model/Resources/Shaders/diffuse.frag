#version 330 core

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;

out vec4 color;

uniform sampler2D texture_diffuse1;

void main()
{    

	vec3 lightPos = vec3(0.0f,10.0f,5.0f);



	vec3 lightColor = vec3(1.0f,1.0f,1.0f);
	vec3 objectColor = vec3(1.0f,0.5f,0.31f);

	// 环境光
	float ambientStrength = 0.1f;
	vec3 ambient = ambientStrength * lightColor;
	// 漫反射光
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm,lightDir),0.0f);
	vec3 diffuse = diff * lightColor;
	
	vec3 result = (ambient + diffuse) * objectColor;
    color = vec4(result,1.0f);
}