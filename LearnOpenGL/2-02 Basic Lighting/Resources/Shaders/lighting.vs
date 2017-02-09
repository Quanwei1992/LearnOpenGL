#version 330 core
layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec3 Ambient;
out vec3 Diffuse;
out vec3 Specular;

uniform vec3 lightColor;
uniform vec3 lightPos;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    gl_Position = projection * view *  model * vec4(position, 1.0f);
    vec3 FragPos = vec3(view * model * vec4(position, 1.0f));
    vec3 LightPos = vec3(view * model * vec4(lightPos,1.0f));
    vec3 Normal = mat3(transpose(inverse(view * model))) * normal;

    // Gouraud 光照

    // Ambient
    float ambientStrength = 0.1f;
    vec3 ambient = ambientStrength * lightColor;
  	
    // Diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(LightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    // Specular
    float specularStrength = 0.5f;
    vec3 viewDir = normalize(-FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128);
    vec3 specular = specularStrength * spec * lightColor;  

    Ambient = ambient;
    Diffuse = diffuse;
    Specular = specular;

} 