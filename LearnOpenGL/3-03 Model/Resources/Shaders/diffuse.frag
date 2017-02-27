#version 330 core

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;
in vec3 LightPos;
out vec4 color;

uniform sampler2D texture_diffuse1;


struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};


void main()
{    





	vec3 lightColor = vec3(0.8f,0.8f,0.6f);


	// 材质 Gold
	struct Material material;
	material.ambient = vec3(0.0f, 0.1f, 0.06f);
	material.diffuse = vec3(0.0f, 0.50980392f, 0.50980392f);
	material.specular = vec3(0.50196078f, 0.50196078f, 0.50196078f);
	material.shininess = 32.0f;

	// 环境光
	vec3 ambient = material.ambient * lightColor;
	// 漫反射光
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(LightPos - FragPos);
	float diff = max(dot(norm,lightDir),0.0f);
	vec3 diffuse = diff * lightColor * material.diffuse;


	//计算镜面光
	vec3 viewDir = normalize(-FragPos);
	vec3 reflecDir = reflect(-lightDir,norm);
	float spec = pow(max(dot(viewDir,reflecDir),0.0),material.shininess);
	vec3 specular = spec * lightColor * material.specular;

	
	vec3 result = ambient + diffuse + specular;
    color = vec4(result,1.0f);
}