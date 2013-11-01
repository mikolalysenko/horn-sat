"use strict"

var bounds = require("binary-search-bounds")

module.exports = solveHornSAT

function contains(seq, x) {
  var i = bounds.le(seq, x)
  if(i > 0 && seq[i] === x) {
    return true
  }
  return false
}

function solveHornSAT(numVariables, clauses) {
  var numClauses = clauses.length
  var solution = new Array(numVariables)
  var adj = new Array(numVariables)
  for(var i=0; i<numVariables; ++i) {
    solution[i] = false
    adj[i] = []
  }
  var to_visit = []
  var margin = new Array(numClauses)
  for(var i=0; i<numClauses; ++i) {
    var c = clauses[i]
    var t = c[0]
    var h = c[1]
    var m = t.length
    margin[i] = m
    if(m === 0) {
      to_visit.push(i)
    }
    for(var j=0; j<m; ++j) {
      adj[t[j]].push(i)
    }
  }
  while(to_visit.length > 0) {
    var i = to_visit[to_visit.length-1]
    to_visit.pop()
    var c = clauses[i]
    var h = c[1]
    if(h < 0) {
      return false
    }
    if(solution[h]) {
      continue
    }
    solution[h] = true
    var t = adj[h]
    for(var j=0, n=t.length; j<n; ++j) {
      var x = t[j]
      if(--margin[x] === 0) {
        to_visit.push(x)
      }
    }
  }
  return solution
}