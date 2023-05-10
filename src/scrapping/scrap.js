import puppeteer from "puppeteer";

export default {
  scrap: scrap()
}

async function scrap() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({
      path: 'trace.json',
      categories: ['devtools.timeline']
    })
    await page.goto('https://codeforgeek.com/');
  
    const articles = await page.$$eval('article > div', anchors => {
      let elements = anchors.map(anchor =>
        anchor = anchor.getElementsByTagName('li')
      )
      let links = anchors.map(anchor =>
        anchor.getElementsByTagName('a')
      )
  
      // elements[elem][data]
  
      // let tag = elements[0][0].innerText // 0 -> tag, 1 -> author, 2 -> date
      // links = links[0][1].getAttribute('href') // 0 -> tag link, 1 -> article link, 2 -> author link
      
      console.log(elements)
      let tags = {
        tagName: elements[0][0].innerText,
        tagLink: links[0][0].getAttribute('href')
      }
      let author = {
        authorName: elements[0][1].innerText,
        authorLink: links[0][2].getAttribute('href')
      }
      let article = {
        articleDate: elements[0][2].innerText,
        articleLink: links[0][1].getAttribute('href')
      }
      
      return { article, author, tags }
    })

    
    await page.tracing.stop()
    await browser.close();

    return articles;
}
