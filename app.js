const fs = require('fs');
const puppeteer = require('puppeteer');
const lib = require('./lib/index.js');
let page;
let result = [];
async function newPage(url) {
    await page.goto(url);
    return await page.evaluate(() => {
        let url
        const next = $('.pagination .disabled.active').next().find('a').attr('href');
        if (next) {
            url = location.origin + next;
        } else {
            url = false;
        }
        let arr = [];
        $('#topic_list .topic_title').each((i, v) => {
            const dom = $(v);
            arr.push(dom.html())
        })
        return {
            url,
            arr
        }
    });
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: false
    });
    page = await browser.newPage();
    let next = true;
    let url = 'https://cnodejs.org/';
    while (next) {
        const resonseData = await newPage(url);
        result = result.concat(resonseData.arr);
        if (resonseData.url) {
            url = resonseData.url;
        } else {
            next = false;
        }
    }
    fs.writeFileSync('result.json', JSON.stringify(result), { encoding: 'utf-8' })
    // browser.close();
})()
