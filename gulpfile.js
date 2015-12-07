'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');

var code = ['*.js', 'lib/*.js'];

gulp.task('coverage', function() {
  return gulp.src(code)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], function() {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('eslint', function() {
  return gulp.src(['gulpfile.js', 'test/*.js'].concat(code))
    .pipe(eslint())
});

gulp.task('default', ['mocha', 'eslint']);
