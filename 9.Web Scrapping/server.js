const express = require("express");
const app = express();
const path = require("path");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

let browser;
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

async function getData(url, page) {
  try {
  } catch (error) {
    console.log(error);
  }
}

async function getResults() {
  browser = await puppeteer.launch({ headless: false });
}
