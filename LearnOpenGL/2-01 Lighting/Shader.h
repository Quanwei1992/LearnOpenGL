#pragma once
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

#include <GL/glew.h>

class Shader
{
public:
	// ����ID
	GLuint Program;
	Shader(const GLchar* vertexPath,const GLchar*fragmentPath);
	void Use();
};

