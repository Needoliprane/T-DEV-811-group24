const fs = require('fs');
function editSwaggerYaml(){
    const fileUri = './swagger.temp.yaml'
    let content = fs.readFileSync('./swagger.temp.yaml', 'utf8');
    content = content.replace('${PORT}', process.env.PORT)
    fs.writeFileSync('./swagger.yaml', content);
}

module.exports = editSwaggerYaml