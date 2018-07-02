var gulp = require("gulp");
var watch = require("gulp-watch");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");

gulp.task("minify-css", function () {
    return gulp.src("src/css/styles.css")
        .pipe(cleanCSS())
        .pipe(rename("styles-min.css"))
        //.pipe(gulp.dest("./src/css"))
        .pipe(gulp.dest("../build/css"));
});

gulp.task("copyAssets", function () {
    console.log("started default...");
    watch("src/css/*.css", function (vinyl) {
        console.log(vinyl.path + " changed");
        if (vinyl.path.indexOf("styles.css") > -1) {
            gulp.src("src/css/styles.css")
                .pipe(gulp.dest("../build/css"))
                .pipe(cleanCSS())
                .pipe(rename("styles-min.css"))
                .pipe(gulp.dest("../build/css"));
        } else {
            gulp.src("src/css/*.css")
                .pipe(gulp.dest("../build/css"));
        }
    });
    watch("src/js/*.js", function (vinyl) {
        console.log(vinyl.path + " changed");
        gulp.src("src/js/*.js")
            .pipe(gulp.dest("../build/js"));
    });

});

gulp.task("default", ["minify-css","copyAssets"]);