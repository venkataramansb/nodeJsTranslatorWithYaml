const fs = require("fs");
const yaml = require('js-yaml');

var lang = 'tamil';
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

       // typeof obj[key] == 'string'? obj[key] = obj[key].replace(/[^a-zA-Z0-9 ]/g, " ") : '';
        Object.keys(newdata).forEach(function (value) {
            Object.keys(ymldata).find(function (key) {
                if (newdata.includes(key)) {
                    newdata = newdata.replace(key, ymldata[key])
                }
            });
        });
     
        fs.writeFileSync(outputJson, newdata);
    });

}