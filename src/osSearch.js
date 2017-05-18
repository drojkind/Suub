const OpenSubtitles = require('opensubtitles-api');
const OS = new OpenSubtitles('OSTestUserAgentTemp');
OS.search({
    //imdbid: 'tt0314979',
    //sublanguageid: 'es', // Set language to 'eng' only receive movies that are in english.
    hash: '9d53a62249ded1d7', // Defined the hash with a fixed variable
    gzip: true
}).then(subtitles => {
    if (subtitles) {
        console.log('Subtitle found:', subtitles);
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
        console.log("Movie Hash Const: " + moviehashConst)
        throw 'no subtitle found';
    }
}).catch(console.error);
