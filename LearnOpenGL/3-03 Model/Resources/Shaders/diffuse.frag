#version 330 core

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;

out vec4 color;

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_specular1;
uniform vec3 viewPos;

struct Light
{

    vec3 position;
    vec3 direction;
    float cutOff;
    
    float constant;
    float linear;
    float quadratic;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

uniform Light light;

void main()
{    

	// 光的方向 片元->光
	vec3 lightDir = normalize(light.position - FragPos);
	float theta = dot(lightDir,normalize(-light.direction));

	vec3 texColor = vec3(texture(texture_diffuse1,TexCoords));
	// 环境光
	vec3 ambient = light.ambient * texColor;

	if(theta > light.cutOff)
	{
		// 漫反射
		vec3 norm = normalize(Normal);
		float diff = max(dot(lightDir,norm),0.0f);
		vec3 diffuse = light.diffuse * diff * texColor;

		// 镜面反射
		vec3 viewDir = normalize(viewPos - FragPos);
		vec3 reflectDir = reflect(-lightDir,norm);
		vec3 specular = pow(max(dot(viewDir,reflectDir),0.0f),32.0f) * vec3(texture(texture_specular1,TexCoords));

		vec3 result = ambient + diffuse + specular;

		color = vec4(result,1.0f);
	}else{
		color = vec4(ambient,1.0f);
	}
}