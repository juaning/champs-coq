const fetch = require('node-fetch');

const result = fetch('https://vatapi.com/v1/country-code-check?code=DE', {
  headers: {
    apikey: '63fcf95d837c2bcdb7d10a150e779157',
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => data.rates.standard.value)
  .catch((e) => {
    console.error(e);
  });
