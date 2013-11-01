horn-sat
========
[HORNSAT](http://en.wikipedia.org/wiki/Horn-satisfiability) is a restricted version of the [boolean satisfiability problem](http://en.wikipedia.org/wiki/Boolean_satisfiability_problem) where all clauses are written in [Horn normal form](http://en.wikipedia.org/wiki/Horn_clause).  The programming lanugage [Prolog](http://en.wikipedia.org/wiki/Prolog) uses HORNSAT internally to solve many constraint problems.  This modules implements Dowling and Gallier's linear time algorithm:

* Dowling W., Gallier J.  "Linear time algorithms for testing the satisfiability of propositional Horn formulae" (1984) Journal of Logic Programming

This code should work both in node.js and in the browser via [browserify](https://github.com/substack/node-browserify).

## Example

```javascript
var hornSAT = require("horn-sat")

// Horn clauses are encoded as pairs.  For example, the clause:
//  (x1 & x2 => x3)    
// Becomes:
//  [ [0,1], 2 ]
// For clauses that map to false, use -1 for the head of the clause:
//  (x1 => 0)
// Becomes:
//  [[0], -1]
//
//
// For example, let's solve the problem:
//
//  x1 & (x1 & x3 => x2) & (x1 => x2) & (x1 & x2 & x3 => 0) & (x1 & x3 & x4 => 0) & (x3 & x2 => x4) & (x4 & x5 => 0)
//

console.log(hornSAT(5,
  [ 
    [[], 0],        // x1
    [[0,2], 1],     // x1 & x3 => x2
    [[0], 1],       // x1 => x2
    [[0,1,2], -1],  // x1 & x2 & x3 => 0
    [[0,2,3], -1],  // x1 & x3 & x4 => 0
    [[2,1], 3],     // x3 & x2 => x4
    [[3,4], -1]     // x4 & x5 => 0
  ]
))

// Prints out:
// 
//  [ true, true, false, false, false ]
//
```

## Install

    npm install horn-sat

## API

### `require("horn-sat")(numVariables, clauses)`
Finds a satisfying assignment of variables to the HORNSAT instance

* `numVariables` is the number of variables in the problem
* `clauses` is an array of clauses, encoded as described in the example

**Returns** An assignment of variables that solves the Horn SAT instance, or else `false` if the problem is not satisfiable.

## Credits
(c) 2013 Mikola Lysenko. MIT License