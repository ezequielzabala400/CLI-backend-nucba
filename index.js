import chalk from 'chalk';
import {deleteAllExpenses, deleteExpensePrompt, expenseForDate, expenseForDateAndHour, newExpense, userPrompt} from './modules/inquirerPrompt.js'
import { readFile } from './modules/readFile.js';
import { writeFile } from './modules/writeFile.js';
import { deleteExpense, filterDates, findDateAndHour } from './utils/utils.js';

// writeFile('./data/data.json', answer);
const operations = async () => {
    let answer = await userPrompt();
    while (answer.options !== 99){
        switch (answer.options) {
            case 1:
                {const expense = await newExpense();
                const expensesList = await readFile('./data/data.json');
                const newExpenseList = [...expensesList, expense];
                await writeFile('./data/data.json', newExpenseList);
                console.log(chalk.green('El gasto se registro con exito!'));
                break;}
            
            case 2:
                {
                    const expense = await expenseForDate();
                    const expensesList = await readFile('./data/data.json');
                    const filterExpenses = filterDates(expensesList, expense);
                    if(filterExpenses.length > 0){
                    console.log(chalk.green.bold(`Los siguientes gastos coinciden con la fecha ${expense.date}\n`));
                    console.log(filterExpenses);
                }else{
                    console.log(chalk.red.bold(`No se encontraron gastos que coincidan con la fecha ${expense.date}\n`));
                }
                break;
                }

            case 3:
                {
                    const expense = await expenseForDateAndHour();
                    const expensesList = await readFile('./data/data.json');
                    const findedExpense = findDateAndHour(expensesList,expense)
                    if(findedExpense){
                        console.log(chalk.green.bold(`La búsqueda se realizo con éxito! \n`));
                        console.log(`Se encontró el siguiente gasto: ${findedExpense}`);
                    }else{
                        console.log(chalk.red.bold(`No se encontró un gasto que coincida con la fecha ${expense.date} y la hora ${expense.hour}\n`));
                    }
                    break;
                }
            case 4:
                {
                const expensesList = await readFile('./data/data.json');
                if(!expensesList.length){
                    console.log(chalk.red.bold('No se encontraron gastos en la lista'));
                }else{
                    console.log(chalk.green.bold('Búsqueda realizada con éxito! \n'));
                    console.log(chalk.blue('Estos son los gastos que se encontraron: \n'));
                    console.log(expensesList);
                }
                break;
            }

            case 5: 
            {
                const expense = await expenseForDateAndHour();
                const expensesList = await readFile('./data/data.json');
                const confirmDelete = await deleteExpensePrompt();
                if(confirmDelete.delete){
                    const newExpenseList = deleteExpense(expensesList, expense);
                    if(!newExpenseList){
                        console.log(chalk.red.bold(`No se encontró un gasto con la fecha ${expense.date} y la hora ${expense.hour}`));
                    }else{
                        writeFile('./data/data.json', newExpenseList)
                        console.log(chalk.green.bold('Se elimino con éxito!'));
                    }
                }
                break;
            }

            case 6:
                {
                    const deleteAll = await deleteAllExpenses();
                    if(deleteAll.delete){
                        writeFile('./data/data.json', []);
                        console.log(chalk.green.bold('Se han eliminado todos los gastos'));
                    }
                    break;
                }
        
            default:
                break;
        }
        answer = await userPrompt()
    }
}

operations();