const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const canvas = createCanvas(1000, 1000);
const cntext = canvas.getContext("2d");


const savedLayer = (_canvas) => {
    fs.writeFileSync("./newImage.png", _canvas.toBuffer("image/png"));
    console.log("Image Created")

;}


const drawLayer = async () => {
    const image = await loadImage("./Goat_Main_Body.png");
    cntext.drawImage(image, 0, 0, 1000, 1000);
    console.log("Finished.")
    savedLayer(canvas);
};

drawLayer();