const fs = require("fs");
const yaml = require('js-yaml');

var lang = 'tamil';
var inputRequestJson = 'sampleJson.json';
var outputJson = 'translatedOutputResponse.json';

translator(lang, inputRequestJson);

function translator(lang, inputRequestJson) {

    fs.readFile(inputRequestJson, function (err, data) {
        if (err) throw err;
        try {
            let users = JSON.parse(data);
            let fileContents = fs.readFileSync(`translate-${lang}.yaml`, 'utf8');
            let ymldata = yaml.load(fileContents);

            var translatedData = replace(users, ymldata)

            fs.writeFileSync(outputJson, JSON.stringify(translatedData));
        } catch (e) {
            console.log(e);
        }
    });
}

function replace(obj,ymldata){
    for(let key in obj)
      if(typeof obj[key] == 'object'){
        replace(obj[key],ymldata);
      }
    else {
        Object.keys(ymldata).find(function(value){
            if(typeof obj[key] == 'string'){
             if(obj[key].includes(value)){
                 obj[key] = obj[key].replace(value,ymldata[value]);
               
             }
            }
        });
    }
    return obj;
  }



