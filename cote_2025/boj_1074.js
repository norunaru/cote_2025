/*
Z

[프로세스]
width = N부터
1아니면
recur(N/2,0) //사분면
recur(N/2,1)
recur(N/2,2)
recur(N/2,3)



*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
