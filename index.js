const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({
        path: 'trace.json',
        categories: ['devtools.timeline']
    })
    await page.goto('https://codeforgeek.com/');

    const title = await page.title()

    const name = await page.$eval('h2', el => el.innerText);

    const stories = await page.$$eval('article > div > ul', anchors => {
        return anchors.map(anchor => anchor.textContent).slice(0, 10)
    })

    const articles = await page.$$eval('article > div', anchors => {
        let tag = anchors.map(anchor =>
            anchor = anchor.getElementsByTagName('li')
        )
        let link = anchors.map(anchor =>
            anchor.getElementsByTagName('a')
        )
        
        // elements[elem][data]
        tag = tag[0][2].innerText // 0 -> tag, 1 -> author, 2 -> date
        link = link[0][2].getAttribute('href') // 0 -> tag link, 1 -> article link, 2 -> author link

        return { tag, link }
    })

    const linkArray = await page.$$eval('article > div > h2 > a', anchors => {
        let link = anchors.map(anchor =>
            anchor.getAttribute('href')
        )
        let text = anchors.map(anchor =>
            anchor.textContent
        )
        return { link, text }
    })

    console.log(articles)
    console.log('last data for ' + title + ' : ' + name);

    await page.tracing.stop()
    await browser.close();
})();
