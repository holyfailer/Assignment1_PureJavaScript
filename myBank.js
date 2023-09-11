//Function for getting a loan. IT prompts the user enter how much they want to loan. 
//They are only allowed to if they doesn't already have a loan or if the loan is bigger than size the avaiable balance

export function getLoan(){
    const loadInput= prompt("Enter loan amount:");
    const amount  = parseInt(loadInput);

    if(amount > 0 && amount <= currentBalance*2 && loanAmount == 0 ){
        currentBalance += amount;
        loanAmount +=amount;
        updateBalance();
        updateLoan();
        document.querySelector('.repayLoanBtn').style.display = 'block';
    } 
}

//work function. Adds 100 kr to the payAmount
export  function work(){
    payAmount+=100;
    updatePay();
}