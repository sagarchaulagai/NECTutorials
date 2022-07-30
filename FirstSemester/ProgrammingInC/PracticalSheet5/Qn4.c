#include<stdio.h>

// Practical Sheet 5, Qn4

// @author Sagar Chaulagain

int fact(int n){

    if(n==1 || n==0) return 1;

    return n * fact(n-1) ;

}

int main(){

    int n;

    printf("Enter the number \n");

    scanf("%d", &n);

    

    printf("The factorial is %d", fact(n));

    return 0;

}
