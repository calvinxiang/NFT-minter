const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const canvas = createCanvas(1600, 2000);
const cntext = canvas.getContext("2d");
const { layers, width, height } = require("./input_layers/config.js");
const edition = 100;


const savedLayer = (_canvas, _edition) => {
  fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};



const drawLayer = async (_layer, _edition) => {
  let elementMake = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    const image = await loadImage(`${_layer.location}${elementMake.fileName}`);
    cntext.drawImage(image, 0, 0, width, height);
    console.log(`I created the ${_layer.name} layer, and chose the element, ${elementMake.name}`);
    savedLayer(canvas, _edition);
  };

    for(let i = 1; i <= edition; i++){
        layers.forEach(layer => {
            drawLayer(layer, i);
        }); 
    }