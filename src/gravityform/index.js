import puppeteer from "puppeteer";

export default {

    async getGravityformChangelog() {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.tracing.start({
            path: 'trace.json',
            categories: ['devtools.timeline']
        })
        await page.goto('https://docs.gravityforms.com/gravityforms-change-log/');

        const title = await page.title()

        const name = await page.$eval('h3', el => el.innerText);

        const stories = await page.$$eval('h3', anchors => {
            return anchors.map(anchor => anchor.textContent).slice(0, 10)
        })

        // console.log(stories)
        console.log('last data for ' + title + ' : ' + name);


        await page.tracing.stop()
        await browser.close();

        return stories
    }
}