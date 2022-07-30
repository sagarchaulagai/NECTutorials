#include<stdio.h>
#include<conio.h>
#include<string.h>

// Practical Sheet 5, Qn 1
// By Sagar Chaulagain 

void mesPerLength(char *str){
    int i;
    for(i=0; i<strlen(str); i++)
        printf("%s\n", str);
}
void staircase(char *str){
    int i,j;
    for(i=0; i<strlen(str); i++){
        for(j=0; j<i; j++){
            printf("  ");
        }
        printf("%c\n", *(str+i));
    }
        
}

void upAndLow(char *str){
    int i;
    char c;
    for(i=0; i<strlen(str); i++){
        c = *(str+i);
        if(c >= 'A' && c <= 'Z'){
            printf("%c", c + 32);
        }else{
            printf("%c", c-32 );
        }
    }
}

void reverse(char *str){
    char rev[20];
    strcpy(rev, str);
    strrev(rev);
    printf("%s", rev);
}

int main() {
    
    char arr[20];
    printf("Enter a string \n");
    scanf("%s", arr);
    
    int n;
    printf("Enter the menu\n");
    scanf("%d", &n);
    
   
    
    switch(n){
        case 1 : mesPerLength(arr); break;
        case 2 : reverse(arr); break;
        case 3 : staircase(arr); break;
        case 4 : upAndLow(arr); break;
        default: exit(0);
    }
    
    
  
    return 0;
}
