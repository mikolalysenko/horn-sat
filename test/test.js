"use strict"

var hornSAT = require("../hornsat")

console.log(hornSAT(5, 
  [ 
    [[], 0],        // x1
    [[0,2], 1],     // x1 & x3 => x2
    [[0], 1],       // x1 => x2
    [[0,1,2], -1],  // x1 & x2 & x3 => 0
    [[0,2,3], -1],  // x1 & x3 & x4 => 0
    [[2,1], 3],     // x3 & x2 => x4
    [[3,4], -1]     // x4 & x5 => 0
  ]))
