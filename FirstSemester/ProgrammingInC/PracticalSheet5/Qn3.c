#include<stdio.h>
#include<math.h>

#define PI 3.14

// Practical Sheet 5, Qn no.3
// @author Sagar Chaulagain 

void areaOfCircle(){
    float rad;
    printf("Enter the radius of circle\n");
    scanf("%f", &rad);
    
    float area = PI * pow(rad,2);
    printf("Area of circle is %f", area);
    
}

void areaOfSquare(){
    float length;
    printf("Enter the length of square\n");
    scanf("%f", &length);
    
    float area = pow(length, 2);
    printf("The area of square is %f", area);
}

void areaOfTriangle(){
    float a,b,c, sum, area;
    printf("Enter three sides of triangle\n");
    scanf("%f %f %f", &a, &b, &c);
    
    sum = (a+b+c)/2;
    
    area = pow((sum*(sum-a)*(sum-b)*(sum-c)), 0.5);
    printf("Area of triangle is %f", area);
}

void areaOfEllipse(){
    float r1,r2, area;
    printf("Enter radii\n");
    scanf("%f %f", &r1, &r2);
    
    area = PI * r1 * r2;
    printf("Area of ellipse is %f", area);
    
}
void areaOfTrapezoid(){
    float s1, s2, height, area;
    printf("Enter size 1, size 2 and height\n");
    scanf("%f %f", s1, s2, height);
    
    area = height * ((s1+s2)/2);
    printf("Area of trapezoid is %f", area);
}
int main(){
    int menu;
    printf("Enter the menu\n");
    scanf("%d", &menu);
    
    switch(menu){
        case 1 : areaOfCircle(); break;
        case 2 : areaOfSquare(); break;
        case 3 : areaOfTriangle(); break;
        case 4 : areaOfEllipse(); break;
        case 5 : areaOfTrapezoid(); break;
        default : exit(0); 
    }
    return 0;
}
