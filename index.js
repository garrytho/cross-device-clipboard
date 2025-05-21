//instantiate express app
const express = require("express");
const app = express();
const clipboardStore = {};

//tell server to interpret incoming data as json and serve html file from current directory
app.use(express.json());
app.use(express.static("."));


//SEND route
app.post("/send", (req, res) => {
  const {code, text} = req.body; // < set code and text to the data sent from the frontend

  //check if either code or text is empty
  if(!code || !text){
    return res.status(400).json({ success: false, message: "Missing code or text"}); // < return an error if so
  }

  //otherwise, store the text in the clipboardStore object
  clipboardStore[code] = text;
  res.json({ success: true, message: "Text saved successfully!"});
});


//GET route
app.get("/get", (req, res) => {

  const code = req.query.code; // < set code from req

  //check if clipboardStore[code] exists
  if(!clipboardStore[code]){
    return res.status(404).json({ success: false, message: "clipboardStore[code] not found!"});
  }

  //otherwise, return the text
  res.json({success: true, text: clipboardStore[code]});
});





//start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
