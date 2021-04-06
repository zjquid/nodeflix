const puppeteer = require('puppeteer');
const CloudflareBypasser = require('cloudflare-bypasser');

(async function main() {
    try {
        
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0');
/*

        await page.goto('https://soapgate.org/');
        await page.waitForSelector('.row');
    
        const rows = await page.$$('.row');

        console.log('poop');
        console.log(rows.length);

        for (const row of rows) {
            const button = await row.$('a.btn');
            button.click();
        }
*/

        let cf = new CloudflareBypasser();

        cf.request('https://apple.com')
        .then(res => {
            // res - full response
        });

        await page.goto('https://soap2day.to');

        cf.request('https://soap2day.to')
        .then(res => {
        });

        setTimeout(() => { page.waitForSelector('sections'); }, 5000);

        const test = await page.$$('.sections');
        console.log(test.length);

    } catch (e) {
        console.log('our error', e);
    }


})();
