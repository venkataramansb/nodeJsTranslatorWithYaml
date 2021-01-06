const fs = require("fs");
const yaml = require('js-yaml');

var lang = 'french';
var inputRequestJson = 'sampleJson.json';
var outputJson = 'translatedResponse.json';

translator(lang, inputRequestJson);

function translator(lang, inputRequestJson) {

    fs.readFile(inputRequestJson, function (err, data) {
        if (err) throw err;

        let users = JSON.parse(data);
        let newdata = JSON.stringify(users)
        let fileContents = fs.readFileSync(`translate-${lang}.yaml`, 'utf8');
        let ymldata = yaml.load(fileContents);

        Object.keys(newdata).forEach(function (value) {
            Object.keys(ymldata).find(function (key) {
                if (newdata.includes(key)) {
                    newdata = newdata.replace(key, ymldata[key])
                }
            });
        });
        // console.log(newdata)
        fs.writeFileSync(outputJson, newdata);
    });

}


