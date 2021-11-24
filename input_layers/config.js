const fs = require("fs");
const dir = __dirname;
const width = 1600;
const height = 2000;

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

const getElements = (path) => {
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
    location: `${dir}\\background\\`,
    elements: getElements(`${dir}\\background\\`),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },

    {
    id: 2,
    name: "goat",
    location: `${dir}\\goat\\`,
    elements: getElements(`${dir}/goat/`),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
    {
    id: 3,
    name: "tops",
    location: `${dir}\\tops\\`,
    elements: getElements(`${dir}\\tops\\`),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },

    {
    id: 4,
    name: "accessories",
    location: `${dir}\\accessories\\`,
    elements: getElements(`${dir}\\accessories\\`),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
    {
    id: 5,
    name: "hats",
    location: `${dir}\\hats\\`,
    elements: getElements(`${dir}\\hats\\`),
    position: {x: 0, y: 0},
    size: {width: width, height: height },
    },
];

module.exports = {layers, width, height};
