/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Spartans(holding){
  var self = this;
  EventEmitter.call(this);
  this._holding = holding;
  if(typeof(this._holding)!='boolean'){
    this._holding = true;
  }
  this.fns = [];
}

module.exports = Spartans;

util.inherits(Spartans, EventEmitter);

Spartans.prototype.flush = function(mode){
  this.fns.forEach(function(fn){
    fn();
  })
  this.fns = [];
}

Spartans.prototype.add = function(fn){
  if(!this._holding){
    fn();
    return this;
  }
  this.fns.push(fn);
  this.emit('add');
  return this;
}

Spartans.prototype.hold = function(mode){
  var changed = this._holding!=mode;
  this._holding = mode;
  if(changed){
    this.flush();
    this.emit('change');
  }
  return this;
}