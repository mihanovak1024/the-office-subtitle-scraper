# the-office-subtitle-scraper

The Office (US) series I got on my disc is without subtitles and I really enjoy having them since I can overhear some words.

Downloading subtitles for each episode of each season can be tedious work.... so why not automate it?

---

## What it does

It downloads the subtitles from podnapisi.net for all episodes and sorts them by seasons.
The downloaded subtitles are the one that are most downloaded by others.

The output is present in `/output/<season>/<subtitleNameFromSite>` (eg. `/output/s09/HDTV.x264-LOL.ThOffUS.S09E03.srt`).

You'll need to copy/paste and rename yourself.

*Note*: If episode download fails, the script doesn't retry, so you should manually try it yourself. Room for improvement

## How to use

Install Node.js, clone the repo and `cd` into it. 

```bash
npm install
node office-subs.js
``` 

