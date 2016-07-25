const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const autoprefixOption = [
  'ie >= 9',
  'ff >= 34',
  'Chrome >= 39',
  'Android >= 4',
  'iOS >= 7'
];

const glob = require('glob');

const postcssPlugins = [
  autoprefixer(autoprefixOption),
  stylelint(),
  cssnano()
];

const build = function (files) {
  const fileList = glob(files,buildCss);
};


const buildCss = function(err,files){
  files.forEach((item)=> {
    const processor = postcss(postcssPlugins);
    processor.process(fs.readFileSync(item))
      .then(function (result) {
        fs.writeFileSync(item.replace('src/', 'build/'), result.css);
        if (result.map) fs.writeFileSync(item.replace('src/', 'build/').replace('.css', '.css.map'), result.map);
        console.log('done!');
      });
  });
};

build('src/*.css');




