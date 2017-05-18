/**
 * SubsController
 *
 * @description :: Server-side logic for managing subs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  function(req, res) {
    return res.send('Hi there!');
  },
  movie: function(req, res) {
    const OpenSubtitles = require('opensubtitles-api');
    const OS = new OpenSubtitles('OSTestUserAgentTemp');
    OS.search({
      //imdbid: 'tt0314979',
      //sublanguageid: 'es', // Set language to 'eng' only receive movies that are in english.
      hash: req.query.hash, // Defined the hash with a fixed variable
      gzip: false
    }).then(subtitles => {
      if (subtitles) {
        //console.log('Subtitle found:', subtitles);
        return res.json({
          movieHash: subtitles
        });
        require('request')({
          url: subtitles.es.url,
          encoding: null
        }, (error, response, data) => {
          if (error) throw error;
          require('zlib').unzip(data, (error, buffer) => {
            if (error) throw error;
            const subtitle_content = buffer.toString(subtitles.en.encoding);
            // console.log('Subtitle content:', subtitle_content);
          });
        });
      } else {
        throw 'no subtitle found';
        return res.json({
          noMovie: 'Sorry, no matching subtitles were found.'
        });
      }
    }).catch(console.error);
    // return res.json({movieHash: req.query.rolo,
    //                 movieName: 'This the name'
    //  });
  },
  bye: function(req, res) {
    return res.redirect('http://www.danielrojkind.com');
  }
};
