// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.get("/places", (req: Request, res: Response) => {
    let formattedAddress = 'name,rating,user_ratings_total,geometry,reviews'
    let placeId = 'ChIJtW3cqwvteC4Ru6i5UG1xSuc'
    let apiKey = process.env.GOOGLE_MAPS_API_KEY

    fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=${formattedAddress}&place_id=${placeId}&key=${apiKey}`)
      .then(async (response) => {
        let responseJson = await response.json()
        let responseResult = responseJson.result
        let result = {
          ...responseResult,
          placeId: placeId
        }
        const jsonString = JSON.stringify(result); // The third parameter (2) specifies the number of spaces for indentation
        createFileJson(jsonString, responseResult.name)
        res.send({
              status: true,
              message: 'Getting review',
              data: result
          })
      })
      .catch((e) => {
          console.error(e)
          res.send({
              message: e.message
          })
      });
})

const createFileJson = (data: any, fileName: string) => {
  // Specify the file path
  const filePath = `json/${fileName}.json`;

// Write the JSON string to the file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log(`JSON file '${filePath}' created successfully.`);
    }
  });
}

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});