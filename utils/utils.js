

export const filterDates = (expensesList, expense) => {
    return expensesList.filter(expenses => expenses.date === expense.date);
}

export const findDateAndHour = (expensesList,expense) => {
    return expensesList.find(expenses => {
        return expenses.date === expense.date && expenses.hour === expense.hour;
    })
}

export const deleteExpense = (expensesList, expense) => {
    const findExpense = expensesList.find(expenses => {
        return expenses.date === expense.date && expenses.hour === expense.hour;
    })
    if(!findExpense){
        return false
    }else{
        return expensesList.filter(expenses => expenses !== findExpense);
    }

}