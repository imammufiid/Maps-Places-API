import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {getPlaceDetail} from "./src/google/google.api";
import {updateFileJson} from "./src/utils/file.generator";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/places", async (req: Request, res: Response) => {
  try {
    // MARK: - Example place id
    let placeId = 'ChIJtW3cqwvteC4Ru6i5UG1xSuc'
    let response = await getPlaceDetail(placeId)
    updateFileJson(response)

    res.send({
      status: true,
      message: 'Getting review',
      data: response
    })
  } catch (e) {
    let message = 'Internal server error'
    res.status(500)
      .send({
        message: message
      })
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});