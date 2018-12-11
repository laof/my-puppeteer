const fs = require('fs');

module.exports  = {
    jq: fs.readFileSync('./lib/jquery.3.3.1.min.js'),
    axios: fs.readFileSync('./lib/axios.0.18.0.min.js')
}
