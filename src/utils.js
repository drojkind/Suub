/*
Find the hash for the selected movie.
Based on the Open Subtitles JS Implementationß
*/
/* eslint-disable */

// utils.js

export function getSubtitles(subtitles) {
  return Object.keys(subtitles).map(key => {
      return {
          lang: subtitles[key].lang,
          url: subtitles[key].url
      };
  });
}

export function hashIt(callback) {
  console.log("its working");
  var videoFile;
  var fs;

  var files = document.getElementById("files").files;

  handleFiles(files[0]);

  function isBrowserSupported() {
    return !(window.File && window.FileReader && window.Blob) ? false : true
  }

  function handleFiles(d) {
    var b = 65536;
    if (!isBrowserSupported()) {
      console.log("You must have HTML 5 enabled browser!");
      return
    }
    if (d == null || d.length <= 0) {
      console.log("Please, select a file!");
      return
    }
    if (d.length > 1) {
      console.log("Please select only one file.");
      return
    }
    var e = Array(8);
    videoFile = files[0];
    if (videoFile.fileSize) fs = videoFile.fileSize;
    else fs = videoFile.size;
    for (var a = fs, f = 0; f < 8; f++) {
      e[f] = a & 255;
      a  >>= 8
    }
    a = fs;
    if (videoFile.slice) var c = videoFile.slice(0, b);
    else if (videoFile.mozSlice) var c = videoFile.mozSlice(0, b);
    else if (videoFile.webkitSlice) var c = videoFile.webkitSlice(0, b);
    var g = new FileReader();
    g.onloadend = function(h) {
      if (h.target.readyState == FileReader.DONE) {
        for (var f = h.target.result, d = 0; d < f.length; d++) e[(d + 8) % 8] += f.charCodeAt(d);
        if (videoFile.slice) c = videoFile.slice(a - b);
        else if (videoFile.mozSlice) c = videoFile.mozSlice(a - b, a);
        else if (videoFile.webkitSlice) c = videoFile.webkitSlice(a - b, a);
        var g = new FileReader;
        g.onloadend = function(c) {
          var b = "languages";
          if (c.target.readyState == FileReader.DONE) {
            f = c.target.result;
            for (d = 0; d < f.length; d++) e[(d + 8) % 8] += f.charCodeAt(d);
            a = 'all';
            //document.location = "http://www.opensubtitles.org/search/sublanguageid-" + a + "/moviehash-" + binl2hex(e);
            var movieHash = binl2hex(e);
            localStorage.setItem('myHash', binl2hex(e));
            console.log("MovieHash - " + movieHash);
            localStorage.setItem('myMovie', videoFile.name);
            console.log("MovieName - " + videoFile.name);
            console.log("MovieSize - " + videoFile.size);
            callback(); // at this point, everything should be done
          }
        };
        g.readAsBinaryString(c)
      }
    };
    g.readAsBinaryString(c)
  }

  function binl2hex(a) {
    var b = 255;
    a[1] += a[0] >> 8;
    a[0] = a[0] & b;
    a[2] += a[1] >> 8;
    a[1] = a[1] & b;
    a[3] += a[2] >> 8;
    a[2] = a[2] & b;
    a[4] += a[3] >> 8;
    a[3] = a[3] & b;
    a[5] += a[4] >> 8;
    a[4] = a[4] & b;
    a[6] += a[5] >> 8;
    a[5] = a[5] & b;
    a[7] += a[6] >> 8;
    a[6] = a[6] & b;
    a[7] = a[7] & b;
    for (var d = "0123456789abcdef", e = "", c = 7; c > -1; c--) e += d.charAt(a[c] >> 4 & 15) + d.charAt(a[c] & 15);
    return e
  }

 //return movieHash;
};
