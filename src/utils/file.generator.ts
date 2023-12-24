import fs from "fs";

const pathFileJson = 'json/coffee_shops.json'

export const updateFileJson = (data: any) => {
  // Step 1: Read the existing JSON file
  const filename = pathFileJson;
  const jsonData = fs.readFileSync(filename, 'utf-8');

  // Step 2: Parse the JSON data
  const currentData = JSON.parse(jsonData);
  // Step 3: Check if the object with a specific condition exists
  const index = currentData.findIndex((item: any) => item.place_id === data.place_id);

  // Step 4: If the object exists, update it; otherwise, push a new object
  if (index !== -1) {
    currentData[index] = data;
  } else {
    currentData.push(data);
  }

  // Step 5: Stringify the updated data
  const updatedJsonData = JSON.stringify(currentData, null, 2); // the third argument is for indentation

  // Step 6: Write the updated data back to the JSON file
  fs.writeFileSync(filename, updatedJsonData, 'utf-8');

  console.log('JSON file updated successfully.');
}