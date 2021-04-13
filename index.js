// nodeflix - fake netflix
// now with working cloudflare bypass!

(async function main() {

    const puppeteerExtra = require('puppeteer-extra');
    const pluginStealth = require('puppeteer-extra-plugin-stealth');

    puppeteerExtra.use(pluginStealth());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://soap2day.to';

    await page.goto(url);
    await page.setViewport({ width: 1250, height: 676 })
    await page.waitForSelector('.navbar #txtSearch')
    await page.click('.navbar #txtSearch')
    
    // prompt the terminal to get the search target
    const show = 'twin peaks';

    await page.type('#txtSearch', show);

    await page.waitForSelector('.collapse > .navbar-form > .form-group > #btnSearch > .fa')
    await page.click('.collapse > .navbar-form > .form-group > #btnSearch > .fa')
  
    // here is where it gets messy
    // the program needs to know which item to select
    // click title first...
    await page.waitForSelector('.panel:nth-child(2) > .panel-body:nth-child(2) > .row:nth-child(1) > .col-sm-12:nth-child(1) > .row:nth-child(1) > .col-sm-12:nth-child(1) > .col-xs-12:nth-child(1) > .col-lg-2:nth-child(2) > .thumbnail:nth-child(1) img:nth-child(1)')
    await page.click('.panel:nth-child(2) > .panel-body:nth-child(2) > .row:nth-child(1) > .col-sm-12:nth-child(1) > .row:nth-child(1) > .col-sm-12:nth-child(1) > .col-xs-12:nth-child(1) > .col-lg-2:nth-child(2) > .thumbnail:nth-child(1) img:nth-child(1)')
    
    // ...then click episode
    await page.waitForSelector('.col-sm-12 > .alert:nth-child(4) > .col-sm-12 > .col-sm-12:nth-child(8) > a')
    await page.click('.col-sm-12 > .alert:nth-child(4) > .col-sm-12 > .col-sm-12:nth-child(8) > a')
  
    // once we end up on the episode page,
    // we need to go to...
    // inspect element > network > media sources > refresh > get link to media source (should only be one)
    // now that we have the link to the .mp4 file, we plug the link into a bash script with vlc/mpv
    // this might be helpful --> https://chromedevtools.github.io/devtools-protocol/

    await page.waitFor(10000);

    await browser.close();

})();
