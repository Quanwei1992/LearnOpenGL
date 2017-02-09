#pragma once
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

#include <GL/glew.h>

class Shader
{
public:
	// ≥Ã–ÚID
	GLuint Program;
	Shader(const GLchar* vertexPath,const GLchar*fragmentPath);
	void Use();
};

