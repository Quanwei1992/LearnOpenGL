#version 330 core
in vec4 vertexColor;
in vec2 TexCoord;
out vec4 color;
uniform sampler2D ourTexture1;
uniform sampler2D ourTexture2;
void main()
{
	
	color = mix(texture(ourTexture1,TexCoord),texture(ourTexture2,vec2(TexCoord.x*2,TexCoord.y*2)),0.2);
}