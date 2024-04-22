const fs = require("fs");
const myArg = process.argv.slice(2);
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input_layers/config.js");
const console = require("console");
const canvas = createCanvas(width, height);
const cntext = canvas.getContext("2d");
const edition = myArg.length > 0 ? Number(myArg[0]) : 1;
var metaData = [];
var hash = [];
var attributes = [];
var decodedHash = [];


const savedLayer = (_canvas, _edition) => {
  fs.writeFileSync(`./nft_pictures/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetaData = (_edition, _layer) => {
  let time = Date.now();
  let temporaryMetaData = {
    date: time,
    edition: _edition,
    hash: hash.join(""),
    attributes: attributes,
    decodedHash: [] 
  };
  metaData.push(temporaryMetaData);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttr = (_element, _layer) => {
  let temporaryAttributes = {
    id: _element.id, // from getElement
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity
  };
  attributes.push(temporaryAttributes);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({[_layer.id]: _element.id})
};




const drawLayer = async (_layer, _edition) => {
  let elementMake = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
  addAttr(elementMake, _layer);
    const image = await loadImage(`${_layer.location}${elementMake.fileName}`);
    cntext.drawImage(image, 0, 0, width, height);
    // console.log(`I created the ${_layer.name} layer, and chose the element, ${elementMake.name}`);
    savedLayer(canvas, _edition);
  };

    for(let i = 1; i <= edition; i++){
        layers.forEach(layer => {
            drawLayer(layer, i);
        }); 
        addMetaData(i);
    }

fs.readFile("./nft_pictures/pictureInformation.json", (err, data) => {
  if(err) throw err;
  fs.writeFileSync("./nft_pictures/pictureInformation.json", JSON.stringify(metaData));
});



