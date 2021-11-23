const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1000;

const rarity = [
    { key: "", val: "common" },
    { key: "_rare", val: "rare" },
    { key: "_super", val: "super rare" },
];

const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if (_str.includes(r.key)){
            itemRarity = r.val;
        }
    });
    return itemRarity;
};

const cleanName = (_str) => {
    let name = _str.slice(0, -4);
    rarity.forEach((r) => {
        name = name.replace(r.key, "");
    });
    return name;
};

const getElement = (path) => {
    return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item)) 
    .map((i, index) => {
        return {
            id: index + 1,
            name: cleanName(i),
            fileName: i,
            rarity: addRarity(i),
        };
    });
};



const layers = [
    {
    id: 1,
    name: "background",
    location: './input_layers/background/',
    elements: getElement('./input_layers/background/'),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },

    {
    id: 2,
    name: "goat",
    location: './input_layers/goat/',
    elements: getElement('./input_layers/goat/'),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
    {
    id: 3,
    name: "tops",
    location: './input_layers/tops/',
    elements: getElement('./input_layers/tops/'),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
    {
    id: 4,
    name: "accessories",
    location: './input_layers/accessories/',
    elements: getElement('./input_layers/accessories/'),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
    {
    id: 5,
    name: "hats",
    location: '$./input_layers/hats/',
    elements: getElement('./input_layers/hats/'),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
];

module.exports = { layers, width, height };
