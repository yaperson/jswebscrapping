const puppeteer = require('puppeteer');

scrap()

async function scrap() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({
        path: 'trace.json',
        categories: ['devtools.timeline']
    })
    await page.goto('https://codeforgeek.com/');

    const articles = await page.$$eval('article > div', anchors => {
        let tags = anchors.map(anchor =>
            anchor = anchor.getElementsByTagName('li')
        )
        let links = anchors.map(anchor =>
            anchor.getElementsByTagName('a')
        )

        // elements[elem][data]
        // tag = tag[0][2].innerText // 0 -> tag, 1 -> author, 2 -> date
        // link = link[0][2].getAttribute('href') // 0 -> tag link, 1 -> article link, 2 -> author link
        let tag = [];
        let link = [];
        for(let elem in tags) {
            tag = elem
        } for (let elem in link) {
            link = elem
        }
        return { tag, link }
    })

    console.log(articles)

    await page.tracing.stop()
    await browser.close();
}