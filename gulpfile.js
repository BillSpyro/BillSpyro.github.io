const { parallel, src, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const htmlLint = require('gulp-html-linter');
const cssLint = require('gulp-csslint');


// Static server
const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
};
const reload = (cb) => {
  browserSync.reload();
  cb();
}

// HTML Linting
const html = (cb) => {
  src(['**/*.html', '!node_modules/**/*.html' ])
    .pipe(htmlLint())
    .pipe(htmlLint.format());

  cb();
};

// CSS Linting
const css = (cb) => {
  src(['**/*.css', '!node_modules/**/*.css' ])
    .pipe(cssLint())
    .pipe(cssLint.formatter());
  
  cb();
}

exports.css = css;
exports.html = html;
exports.lint = parallel(html, css);
exports.default = () => {
  serve();

  watch(['**/*.css', '!node_modules/**/*.css' ], series(css, reload));
  watch(['**/*.html', '!node_modules/**/*.html' ], series(html, reload));
};
