const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const canvas = createCanvas(1000, 1000);
const cntext = canvas.getContext("2d");
const { layers, width, height } = require("./input_layers/config.js");
const edition = 1;


const savedLayer = (_canvas) => {
    fs.writeFileSync("./newImage.png", _canvas.toBuffer("image/png"));
    console.log("Image Created");
};


const drawLayer = async (_layer, _edition) => {
    let element = 
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    const image = await loadImage('${_layer.location}${element.fileName}');
    cntext.drawImage(image, _layer.position.x, _layer.position.y, _layer.position.width, _layer.position.height);
    // savedLayer(canvas);
};


for(let i = 1; i <= edition; i++){
    layers.forEach(layer => {
        drawLayer(layer, i);
    });
    console.log("Creating verision " + i);
}