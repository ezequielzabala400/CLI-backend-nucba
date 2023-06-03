import inquirer from "inquirer";
const DATE_REGEX = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const questions = [
    {
        type: 'list',
        name: 'options',
        message: '¿Qué operación desea realizar?',
        choices: [
            {value: 1, name: 'Crear nuevo gasto'},
            {value: 2, name: 'Consultar gastos por fecha'},
            {value: 3, name: 'Consultar gasto por fecha y hora'},
            {value: 4, name: 'Consultar todos los gastos'},
            {value: 5, name: 'Eliminar un gasto por fecha y hora'},
            {value: 6, name: 'Eliminar todos los gastos'},
            {value: 99, name: 'Salir'}
        ]
    }
];

export const userPrompt = async () => {
    return await inquirer.prompt(questions).then((answers) => {
        return answers;
    })

}

const newExpenseQuestions = [
    {
        type: "input",
        name: "date",
        message: "Introduzca una fecha",
        validate(value){
            if(DATE_REGEX.test(value)){
                return true
            }else{
                return 'Ingrese una fecha valida: ejemplo(DD/MM/YYYY)'
            }
        }
    },
    {
        type: "input",
        name: "hour",
        message: "Introduzca una hora",
        validate(value){
            if(TIME_REGEX.test(value)){
                return true
            }else{
                return 'Ingrese una hora valida: ejemplo(00:00)'
            }
        }
    },
    {
        type: "input",
        name: "desc",
        message: "Descripción del gasto",
        validate(value){
            if(value.length > 0){
                return true
            } else{
                return 'Ingrese una descripción'
            }
        }
    },
    {
        type: "input",
        name: "amount",
        message: "Introduzca el monto",
        validate(value){
            let parseValue = parseInt(value)
            if(typeof parseValue === 'number' && value > 0){
                return true
            } else{
                return 'Valor inválido'
            }
        }
    }
]

export const newExpense = async () => {
    return await inquirer.prompt(newExpenseQuestions).then((answers) => {
        return answers;
    })
}


export const expenseForDate = async () => {
    return await inquirer.prompt({
        type: 'input',
        name: 'date',
        message: 'Introduzca una fecha',
        validate(value){
            if(DATE_REGEX.test(value)){
                return true
            }else{
                return 'Ingrese una fecha valida: ejemplo(DD/MM/YYYY)'
            }
        }
    }).then((answer) => answer)
} 

const expenseForDateAndHourQuestions = [
    {
        type: 'input',
        name: 'date',
        message: 'Introduzca una fecha',
        validate(value){
            if(DATE_REGEX.test(value)){
                return true
            }else{
                return 'Ingrese una fecha valida: ejemplo(DD/MM/YYYY)'
            }
        }
    },
    {
        type: 'input',
        name: 'hour',
        message: 'Introduzca una hora',
        validate(value){
            if(TIME_REGEX.test(value)){
                return true
            }else{
                return 'Ingrese una hora valida: ejemplo(00:00)'
            }
        }
    }
]

export const expenseForDateAndHour = async () => {
    return await inquirer.prompt(expenseForDateAndHourQuestions).then((answer) => answer)
} 

export const deleteAllExpenses = async () => {
    return await inquirer.prompt({
        type: 'list',
        name: 'delete',
        message: '¿Desea eliminar todos los gastos de la lista?',
        choices: [
            {value: true, name: 'Si'},
            {value: false, name: 'No'}
        ]
    })
}

export const deleteExpensePrompt = async () => {
    return await inquirer.prompt({
        type: 'list',
        name: 'delete',
        message: '¿Desea eliminar ese gasto de la lista?',
        choices: [
            {value: true, name: 'Si'},
            {value: false, name: 'No'}
        ]
    })
}