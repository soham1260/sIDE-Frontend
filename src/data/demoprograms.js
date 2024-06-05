// demoprograms.js

const demoprograms = {
    c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
    cpp: `#include <iostream>
int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}
`,
    java: `public class main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
`,
    python: `print("Hello, World!")
`,
    javascript: `//let input = process.argv[2];
console.log("Hello, World!");
`
  };
  
  export default demoprograms;
  