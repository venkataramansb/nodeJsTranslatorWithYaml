const translate = require('google-translate-api');

translate('Good Morning', {from:'en', to:'ta'}).then(res =>{
    console.log(res.text);
}).catch(err => {
    console.log(err);
});