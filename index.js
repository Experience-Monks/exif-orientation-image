'use strict';
var findOrientation = require('exif-orientation');
function load(file,cb) {
  findOrientation(file,function(err,orientation) {
    if (!err) {
      loadImage(URL.createObjectURL(file),function(img) {
        if (img) {
          cb(undefined,translate(img,orientation));
        } else {
          cb(new Error('Could not load image.'));
        }
      });
    } else {
      cb(err);
    }
  });
};

function translate(image,orientation,opts) {
  orientation = orientation || {};
  opts = opts || {};
  var c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  c.width = opts.width || image.naturalWidth;
  c.height = opts.height || image.naturalHeight;
  if (orientation.scale.x===-1 && orientation.scale.y===-1) {
    ctx.translate(c.width,c.height);
    ctx.scale(orientation.scale.x,orientation.scale.y);
  } else if (orientation.scale.x!==1) {
    ctx.translate(c.width,0);
    ctx.scale(orientation.scale.x,1);
  } else if (orientation.scale.y!==1) {
    ctx.translate(0,c.height);
    ctx.scale(1,orientation.scale.y);
  }
  if (orientation.rotate) {
    ctx.translate(c.width*0.5,c.height*0.5);
    ctx.rotate(orientation.rotate*(Math.PI / 180));
    ctx.translate(-c.width*0.5,-c.height*0.5);
  }
  ctx.drawImage(image,0,0,image.naturalWidth,image.naturalHeight,0,0,c.width,c.height);
  return c;
};

function loadImage(src,cb) {
  var img = new Image();
  img.onload = function() { cb(img); };
  img.onerror = function() { cb(); };
  img.src = src;
}

module.exports = load;
module.exports.orientation = findOrientation;
module.exports.translate = translate;