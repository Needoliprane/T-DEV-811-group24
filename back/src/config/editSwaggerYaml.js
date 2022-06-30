const fs = require('fs');
function editSwaggerYaml(){
    let content = fs.readFileSync('./swagger.temp.yaml', 'utf8');
    content = content.replace('${PORT}', process.env.PORT)
    fs.writeFileSync('./swagger.yaml', content);
}

module.exports = editSwaggerYaml