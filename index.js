const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sites.weezevent.com/mergueztuningshow/');

    const soldOut = await page.waitForSelector('div > .soldOut');

    console.log(soldOut);
})();