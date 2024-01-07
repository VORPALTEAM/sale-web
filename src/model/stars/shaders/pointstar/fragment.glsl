#version 330 core
out vec4 FragColor;

void main()
{
    float dist = length(gl_PointCoord - vec2(0.5, 0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Здесь вы можете изменить цвет
    vec3 color = vec3(1.0, 1.0, 1.0); // Белый цвет

    FragColor = vec4(color, alpha);
}