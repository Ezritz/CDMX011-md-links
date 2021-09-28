// instalamos npm i inquirer
// npmjs.com/package/inquirer
// type = list, rawlist(1,2,3), expand (recursivo), checkbox, password,

const inquirer = require('inquirer');
inquirer.prompt({
    type: 'expand',
    name: 'colors',
    message: 'which are your favorite color?',
    choices: [
        {
            key: 'a',
            value: 'red',
        },
        {
            key: 'b',
            value: 'blue',
        },
        {
            key: 'c',
            value: 'yellow',
        }
    ]
})
    /*
    name: 'color',
    message: 'Color favorito?',
    default: 'red'
},{
    name: 'website',
    message: 'Sitio web favorito?'
},])
*/
    .then(answers => {
        console.log('Answer: ', answers)
    })