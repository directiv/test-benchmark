/**
 * Module dependencies
 */

var now = require('performance-now');

exports = module.exports = benchmark;

exports.enabled = function(fn) {
  if (!process.env.DISABLE_BENCHMARKS) fn();
};

function benchmark(iterations, length, fn) {
  if (process.env.DISABLE_BENCHMARKS) return;
  var start = now();
  for (var i = 0; i < iterations; i++) {
    fn();
  }
  var end = now();
  print(iterations * length, start, end);
}

function print(iterations, start, end) {
  var ms = end - start;
  var ops = prettyNumber(iterations / (ms / 1000));
  it(ops + ' ops/s', function() {});
  it(ms / iterations + ' ms/iteration', function() {});
}

function prettyNumber(x) {
  return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
