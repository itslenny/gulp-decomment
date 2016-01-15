'use strict';

var through = require('through2');
var decomment = require('decomment');
var PluginError = require('gulp-util').PluginError;

function main(options, func) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError("gulp-decomment", "Streaming not supported."));
        }
        var newFile = file.clone();
        newFile.contents = new Buffer(func(file.contents.toString(), options));
        this.push(newFile);
        return cb();
    });
}

function gulpDecomment(options) {
    return main(options, decomment);
}

gulpDecomment.text = function (options) {
    return main(options, decomment.text);
};

gulpDecomment.html = function (options) {
    return main(options, decomment.html);
};

module.exports = gulpDecomment;
