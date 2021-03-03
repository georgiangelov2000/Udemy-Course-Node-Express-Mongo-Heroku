const express = require("express");
const app = express();
const path = require("path");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

let browser;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


async function getData(url, page) {
  try {
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ =await cheerio.load(html);
   
    let title = $("h2").text();
    let releaseDate = $(".release_date").text();
    let overview = $("#original_header > div.header_poster_wrapper.false > section > div.header_info > div > p").text();
    let userScore = $(".user_score_chart").attr("data-percent");
    let imgUrl = $("#original_header > div.poster_wrapper.false > div > div.image_content.backdrop > img").attr("src");
    let crewLength = $("div.header_info > ol > li").length;
    let crew =[];
    
    for(let i=1; i<=crewLength; i++) {
      let name = $("div.header_info > ol > li:nth-child("+i+") > p:nth-child(1)").text();
      let role = $("div.header_info > ol > li:nth-child("+i+") > p.character").text();

      crew.push({
          "name" : name,
          "role" : role
      });
  }

    browser.close();

    return {
      title,
            releaseDate,
            overview,
            userScore,
            imgUrl,
            crew
    }
  } catch (error) {
    console.log(error);
  }
}

app.get("/results", async function (req, res) {
    let url=req.query.search;

      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      let data = await getData(url,page);
      res.render('result',{data:data})  ; 
});

app.get("/", (req, res) => {
  res.render("search");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
