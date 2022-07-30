#include<stdio.h>
#include<conio.h>
#include<stdlib.h>

// Tutorial Sheet 5, Qn no. 2
// Using Array of Pointer Concept
// @author Sagar Chaulagain

int size ; // size of the matrix as global variable
int sumOfRow(int **mat){
    int rowNum, i, sum=0;
    
    
    printf("Enter ith row number\n");
    scanf("%d", &rowNum);
    for(i=0; i < size ; i++){
        sum = sum + *(*(mat + (rowNum-1)) + i);
    }
    return sum;
    
}
int sumOfCol(int **mat){
    int colNum, i, sum=0;
    
    
    printf("Enter jth column number\n");
    scanf("%d", &colNum);
    for(i=0; i < size ; i++){
        sum = sum + *(*(mat + i) + (colNum-1));
    }
    return sum;
    
}
int sumOfDiagFromLeft(int **mat){
    int i,j,sum=0;
    for(i=0; i < size ; i++){
        for(j=0; j < size ; j++){
            if(i==j) sum += *(*(mat+i)+j) ;
        }
    }
    return sum;
}
int sumOfDiagFromRight(int **mat){
    int i,j,sum=0;
    for(i=0; i < size ; i++){
        for(j=0; j < size ; j++){
            if((i+j) == (size-1)) sum += *(*(mat+i)+j);
        }
    }
    return sum;
}
int sumOfAllElements(int **mat){
    int i,j,sum=0;
    for(i=0; i < size ; i++){
        for(j=0; j < size ; j++){
            sum += *(*(mat+i)+j);
        }
    }
    return sum;
}
int main(){
    int **mat;
    int i, j,k;
    
    printf("Enter the size of the square matrix \n");
    scanf("%d", &size);
    mat = (int **) malloc(size * sizeof(int *));
 
    //allocation of memory for each row
    for (int i = 0; i < size; i++) {
        mat[i] = (int *) malloc(size * sizeof(int));
    }
    
    // ask user for the value
    for(j=0; j < size ; j++){
        for(k=0; k < size; k++){
            printf("Enter the %d * %d element\n", j+1, k+1);
            scanf("%d", (*(mat+j)+k));
        }
    }
    
    // printing each elements as matrix
    printf("\nMatrix you provided is \n");
    for(j=0; j < size ; j++){
        for(k=0; k < size; k++){
            printf("%d \t", *(*(mat+j)+k));
        }
        printf("\n");
    }
    
    
    int menu;
    printf("\nEnter the menu \n");
    scanf("%d", &menu);
    switch(menu){
        case 1 : 
        printf("Sum is %d", sumOfRow(mat)); break;
        
        case 2 : 
        printf("Sum is %d", sumOfCol(mat)); break;
        
        case 3 :
        printf("Sum is %d", sumOfDiagFromLeft(mat)); break;
        
        case 4 :
        printf("Sum is %d", sumOfDiagFromRight(mat)); break;
        
        case 5 :
        printf("Sum is %d", sumOfAllElements(mat)); break;
        
        default : exit(0);
    }
    
    // To free the memory
    for (i = 0; i < size; i++) {
        free(mat[i]);
    }
    free(mat);
    
    return 0;
}
