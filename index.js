var metalsmith = require("metalsmith");
var watch = require("metalsmith-watch");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var permalinks = require("metalsmith-permalinks");
var partial = require("metalsmith-partial");
var msMoment = require("metalsmith-moment");
var collections = require("metalsmith-collections");
var pageTitles = require("metalsmith-page-titles");
var sitemap = require("metalsmith-sitemap");
var truncateHTML = require("truncate-html");
var url = require("url");
var util = require("util");
var fs = require("fs");
truncateHTML.setup({
    byWords: true
});

var tags = /<[^>]+>/ig;
function stripTags(input) {
    if (input) {
        input = input.replace(tags, "");
        return input;
    }
    return false;
}


function truncate(html,removeTags) {
    if(removeTags){
        html = stripTags(html);
    }
    var output = truncateHTML(html, 50);

    return output;
}
var extReg = /\.[^/.]+$/;
function metaAdd(files, metalsmith, done) {
    var defImg = "/img/classmates-handsup-header.jpg";
    var meta = metalsmith.metadata();
    var homeUrl = meta.site.url;
    Object.keys(files).forEach(function (file) {
        var item = files[file];
        if (item.layout) {
            var img = item.img || item.image || item.imageright || item.imageleft || defImg;
            item.image = img;
            var altArr = img.split("/");
            var alt = "";
            if(altArr.length > 0){
                alt = altArr[altArr.length-1];
                alt = alt.replace(extReg, "").replace(/-/g," ");
                alt = alt.charAt(0).toUpperCase() + alt.slice(1);
            }
            item.alt = item.alt || alt;
            if (item.contents) {
                item.excerpt = truncate(item.contents);
                item.description = item.description || stripTags(item.excerpt);
            }
            item.url = url.resolve(homeUrl, item.path);
            item.relativeUrl = "/" + item.path.replace(/\\/, "/");
            var sections = item.path.split(/\\|\//);
            var slug = sections[sections.length - 1];
            item.slug = slug;
        }

    });
    done();
}


metalsmith(__dirname)
    .metadata({
        site: {
            title: "Tutor Interventions",
            introText: "Kent Based Tutor With 20 Years Experience",
            introSubText: "",
            subtitle: "",
            email: "contact@tutorinterventions.co.uk",
            tel: "",
            description: "Something about your website",
            keywords: "Joe Blogs, developer, programmer, javascript, nodejs, node.js, blog",
            author: "Joe Blogs",
            homeImage: "/img/stevemcarthur-homepage.jpg",
            generator: "Metalsmith",
            url: "https://www.website.com"
        },
        mincss: false,
        combinedcss: false,
        writeObject: function(obj){
            fs.writeFileSync("obj.json",util.inspect(obj),'utf-8');
        }
    })
    .use(pageTitles())
    .source("./src")
    .destination("../build")
    .use(collections({
        articles: {
            pattern: '*.md',
            sortBy: "date",
            reverse: true
        },
        privateDocs: {
            sortBy: "date",
            reverse: true
        }
    }))
    .clean(false)
    .use(msMoment(["date"]))
    .use(markdown())
    .use(permalinks({
        relative: false
    }))
    .use(metaAdd)
    .use(partial({
        directory: "./partials",
        engine: "ect"
    }))
    .use(layouts({
        engine: "ect",
        root: "./layouts"
    }))
    .use(
        sitemap({
            hostname: "https://www.website.com",
            omitIndex: true

        })
    )
    .use(
        watch({
            paths: {
                "layouts/**/*": "**/*",
                "partials/**/*": "**/*",
                "src/*.md": true,
                "src/*.html": true,
                "src/css/**/*": true,
                "src/js/**/*": true,
                "src/blog/*.md": true
            },
            livereload: false
        })
    )
    .build(function (err) {
        if (err) {
            throw err;
        }
        console.log("Build completed without error...");
    });