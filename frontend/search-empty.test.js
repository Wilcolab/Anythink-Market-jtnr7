/* eslint-disable */
const puppeteer = require("puppeteer");

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
  await browser.close();
});

it("Shows the empty placeholder only after unsuccessful search", async () => {
  await page.goto("http://localhost:3001", {
    waitUntil: "load",
    timeout: 60000,
  });

  const isEmptyViewVisible = async (page) => {
    try {
      await page.waitForSelector("#empty", {
        visible: true,
        timeout: 9500,
      });
      return true;
    } catch (e) {
      return false;
    }
  };


  const emptyVisibleBefore = await isEmptyViewVisible(page);

  console.log('what is this', emptyVisibleBefore)


  await expect(emptyVisibleBefore).toBe(false);

  await page.focus("#search-box");
  await page.keyboard.type("zzz"); // some non-existing item

  const emptyVisibleAfter = await isEmptyViewVisible(page);


    console.log(emptyVisibleAfter)


  await expect(emptyVisibleAfter).toBe(true);
}, 60000);
