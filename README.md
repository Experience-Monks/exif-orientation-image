# exif-orientation-image

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Properly displays an image via canvas based on the exif orientation data. Uses [exif-orientation](https://www.npmjs.com/package/exif-orientation).

## Install

```sh
npm install exif-orientation-image --save
```

## Example

The following example reacts to the `onChange` event of a file upload html input

```js
var getOrientedImage = require('exif-orientation-image');

fileUpload.addEventListener('change',function(e) {
  var file = e.target.files[0];
  getOrientedImage(file,function(err,canvas) {
    if (!err) {
      document.body.appendChild(canvas);
    }
  });
});
```

## Usage

[![NPM](https://nodei.co/npm/exif-orientation-image.png)](https://www.npmjs.com/package/exif-orientation-image)

#### `getOrientedImage(file,callback)`  

```file``` A file object from a file upload html input  
```callback``` A function to be called once the image is rendered in its proper position. The callback is passed 2 arguments `(err,canvas)`. If `err` is undefined, canvas will be an HTML canvas element with the correctly oriented image, otherwise err will be an `Error` object with the message of the error.

#### `orientation.translate(image,orientation,options)`  

```image``` A loaded html image element  
```orientation``` Orientation object returned from [exif-orientation](https://www.npmjs.com/package/exif-orientation). Contains scale.x, scale.y, and rotation. Rotation is a number in degrees, scale.x and scale.y are numbers.  
```options``` Custom options, right now the only options are `width` and `height` which determines the size of the returned canvas. It will use the image dimensions if not provided. 

#### `orientation.orientation()`  

Exposes the [exif-orientation](https://www.npmjs.com/package/exif-orientation) function in case you want to handle that manually.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/exif-orientation-image/blob/master/LICENSE.md) for details.
