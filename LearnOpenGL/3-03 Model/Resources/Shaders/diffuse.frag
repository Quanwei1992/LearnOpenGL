#version 330 core

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;
in vec3 LightPos;
out vec4 color;

uniform sampler2D texture_diffuse1;


void main()
{    


	vec3 lightColor = vec3(1.0f,1.0f,1.0f);
	vec3 objectColor = vec3(0.3f,0.3f,0.3f);

	// 环境光
	float ambientStrength = 0.1f;
	vec3 ambient = ambientStrength * lightColor;
	// 漫反射光
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(LightPos - FragPos);
	float diff = max(dot(norm,lightDir),0.0f);
	vec3 diffuse = diff * lightColor;

	//计算镜面光
	float specularStrength = 0.5f;
	vec3 viewDir = normalize(-FragPos);
	vec3 reflecDir = reflect(-lightDir,norm);
	float spec = pow(max(dot(viewDir,reflecDir),0.0),32);
	vec3 specular = specularStrength * spec * lightColor;

	
	vec3 result = (ambient + diffuse + specular) * objectColor;
    color = vec4(result,1.0f);
}