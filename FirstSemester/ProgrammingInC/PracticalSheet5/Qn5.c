#include<stdio.h>

// Practical Sheet 5, Qn5

// @author Sagar Chaulagain

void swapByValue(int a, int b){

    int temp = a;

    a = b;

    b = temp;

    printf("Swaped value of a is %d and b is %d\n",a,b);

}

void swapByRef(int *a, int *b){

    int temp = *a;

    *a = *b;

    *b = temp;

}

int main(){

    int a,b;

    printf("Enter two numbers \n");

    scanf("%d %d", &a, &b);

    

    // Swap By value

    swapByValue(a,b);

    

    // Swap By Reference

    swapByRef(&a, &b);

    printf("The value of a is %d and b is %d", a,b);

    return 0;

}
