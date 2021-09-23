// Imports
const youtubedl = require("youtube-dl-exec")
const got = require("got")
const fetch = require("node-fetch")
const fs = require("fs")
const api = require("./api")

async function getLink(link){
    const twitchLinkInfo = youtubedl(link, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: link
      })
    //console.log(await twitchLinkInfo)
    return await twitchLinkInfo
}

async function getNftStore(file){
    const res = await fetch('https://api.nft.storage/upload',{
          body: file,
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIwZDViYkMzQzgxQTJENUM1OTRGMDYyNTk0MTU1NzNGODk5ZWRiMjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODgyMDc3MTc0MCwibmFtZSI6ImF1dG9ORlQifQ.0cYZwiubqYaBh3XN34ymg9RXgk0tJ4NJjvi-YNy204E"
          },
          method: 'POST',
        })
    return res.json()
  }
module.exports = {
  /** 
  *@return {string}
  */
  linkConverter: async function (link){
    try{
      const jsonInfo = await getLink(link)
      console.log(jsonInfo.formats[0].url)
      const stream = got.stream(jsonInfo.formats[0].url)
      const cidInfo = await getNftStore(stream)
      return await cidInfo.value.cid
    }catch(e){
      api.reject(e);
    }
    

}
}
