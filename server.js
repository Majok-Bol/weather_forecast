//server.js
/* This brings in (or "requires") the Express library, which helps you create a web server easily in Node.js.*/
//const express = require("express");
import express from "express";
//const fetch = require("node-fetch");
/* This brings in the node-fetch library. It lets your server talk to other websites or APIs, just like how the browser can fetch data from a URL*/
const fetch = require("node-fetch");
/*This reads the file called .env.local and loads secret values like your API key into a safe place so your code can use them (without hardcoding them directly).*/
require("dotenv").config({ path: ".env.local" });
/* This creates your web server using Express. You’ll use app to define what your server should do when people visit different pages.*/
//const PORT = 3000;
/*This says: "Run the server on port 3000." You’ll open your browser at http://localhost:3000 to see the app. */

const PORT = 3000;
/*This tells the server to show files from the public/ folder (like your HTML, CSS, and JavaScript).
So if someone visits /, it will serve public/index.html. */
application.use(express.static("public"));
/* When someone visits /weather (like /weather?city=Nairobi), this function will run.
It’s using async because it will wait for data from the weather API.*/
application.get("/weather",async(req,res)=>{
    /* This gets the city name from the URL.
If someone visits /weather?city=paris, this will be "paris".*/  
    const city = req.query.city;
//This reads your hidden API key from .env.local. It's like saying "get the secret password safely."
    const apiKey=process.env.API_KEY;
    //If no city was typed in the URL, send back an error message with status code 400 (which means “Bad Request”).
  if (!city) return res.status(400).json({ error: "City required" });
  try {

    //Start trying to fetch weather data. If anything goes wrong, we’ll catch the error below.
        /* This fetches weather data from the OpenWeather API using the city name and your secret API key.

encodeURIComponent(city) ensures spaces/symbols in city names don’t break the URL.

units=metric makes sure the temperature is in Celsius.

appid=${apiKey} is your secret API key added to the request.*/
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${apiKey}`
    );
    //Takes the API response (which is a bunch of text) and converts it to a JavaScript object so we can use it.
        const data = await response.json();
//Send that weather data back to the browser as JSON.
    res.json(data);
//If anything goes wrong (like no internet or API fails), send back a 500 (Server Error) and an error message.
  } catch (err) {
    res.status(500).json({ error: "Error fetching weather" });
  }
  //Starts the server! It listens for people visiting your site at port 3000 and logs a message to confirm it’s working.
  //If anything goes wrong (like no internet or API fails), send back a 500 (Server Error) and an error message.
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

})