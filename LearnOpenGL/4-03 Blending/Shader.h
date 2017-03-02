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
	GLuint GetUniformLocation(const GLchar* name);
	void SetUniformValue(const GLchar* name, GLfloat v)
	{
		glUniform1f(GetUniformLocation(name),v);
	}
	void SetUniformValue(const GLchar* name, GLfloat v1, GLfloat v2, GLfloat v3)
	{
		glUniform3f(GetUniformLocation(name), v1,v2,v3);
	}
	void Use();
};

