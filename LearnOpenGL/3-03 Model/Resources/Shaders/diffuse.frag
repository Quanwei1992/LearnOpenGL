#version 330 core

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;
in vec3 LightPos;
out vec4 color;

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_specular1;

struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};


struct Light
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;

	float constant;
	float linear;
	float quadratic;
};


void main()
{    




    // 点光
	struct Light light;
	light.ambient = vec3(0.2f, 0.2f, 0.2f);
	light.diffuse = vec3(0.5f, 0.5f, 0.5f);
	light.specular = vec3(1.0f, 1.0f, 1.0f);

	light.constant = 1.0f;
	light.linear = 0.09f;
	light.quadratic = 0.032f;



	// 材质 Gold
	struct Material material;
	material.ambient = vec3(0.24725f, 0.1995f, 0.0745f);
	material.diffuse = vec3(0.75164f, 0.60648f, 0.22648f);
	material.specular = vec3(0.628281f, 0.555802f, 0.366065f);
	material.shininess = 51.2f;

	// 环境光
	vec3 ambient = light.ambient * vec3(texture(texture_diffuse1,TexCoords));
	// 漫反射光
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(LightPos - FragPos);
	float diff = max(dot(norm,lightDir),0.0f);
	vec3 diffuse =  light.diffuse * vec3(texture(texture_diffuse1,TexCoords)) * diff;


	//计算镜面光
	vec3 viewDir = normalize(-FragPos);
	vec3 reflecDir = reflect(-lightDir,norm);
	float spec = pow(max(dot(viewDir,reflecDir),0.0),material.shininess);
	vec3 specular = light.specular * vec3(texture(texture_specular1,TexCoords)) * spec;

	// 计算点光衰减
	float distance = length(LightPos - FragPos);
	float attenuation = 1.0f/(light.constant + light.linear*distance+light.quadratic*distance*distance);

	ambient *= attenuation;
	diffuse *= attenuation;
	specular *= attenuation;


	vec3 result = ambient + diffuse + specular;
    color = vec4(result,1.0f);
}