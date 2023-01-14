const axios = require("axios");
const AdmZip = require("adm-zip");

(async function () {
  // seasons and episodes for each season
  // a few episodes more per season,
  // so we're sure to get all (some episodes are merged)
  // first one is dummy, so I don't need to +1 every season
  const office = [-1, 10, 25, 25, 20, 32, 32, 28, 28, 28];
  // regex for first subtitle download button in list with url of the subtitle
  const regex = /href="(.+?)".*\n.*\n.*title=\"Prenesi podnapis.\".*/;

  for (let season = 1; season < office.length; season++) {
    for (let episode = 1; episode <= office[season]; episode++) {
      await downloadEpisode(season, episode, regex).catch((error) => {
        console.log(`error s${season}e${episode}`, error.message);
      });
    }
  }

  async function downloadEpisode(season, episode, regex) {
    const path = `./output/s0${season}`;
    const seasonEpisodeTag = `s0${season}/e${String(episode).padStart(2, "0")}`;
    console.log("start", seasonEpisodeTag);

    // download podnapisi.net html for the current season and episode of The Office
    const request = `https://www.podnapisi.net/subtitles/search/the-office-2005/t4s?keywords=the%20office&seasons=!${season}&episodes=!${episode}&language=!en&sort=stats.downloads&order=desc`;
    const response = await axios.get(request);

    // download the subtitle with most downloads
    const url = `https://www.podnapisi.net${response.data.match(regex)[1]}`;
    const { data } = await axios.get(url, { responseType: "stream" });

    const buffer = await streamToBuffer(data);
    const zip = new AdmZip(buffer);
    zip.extractAllTo(path);

    console.log("end", seasonEpisodeTag);
  }

  function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const _buf = [];
      stream.on("data", (chunk) => _buf.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(_buf)));
      stream.on("error", (err) => reject(err));
    });
  }
})();
