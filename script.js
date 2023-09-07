let currentBalance = 200;

let loanAmount = 0;

let payAmount = 0;

function updateBalance(){
    const elem =  document.getElementById('balanceDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(currentBalance)}`;
}

function updateLoan(){
    if(loanAmount> 0) {
        const elem = document.getElementById('loanDiv')
        const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
        elem.innerHTML = `Outstanding loan: ${Formatter.format(loanAmount)}`
    }
}

function updatePay(){
    const elem =  document.getElementById('payDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(payAmount)}`;
}


function getLoan(){
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

function work(){
    payAmount+=100;
    updatePay();
}

function transferPayToBank(){
    if(loanAmount==0){
        currentBalance += payAmount;
        payAmount=0;
        updatePay()
        updateBalance()
    }else{
        let amountToBankLoan = payAmount*0.1
        payAmount -= payAmount*0.1;
        loanAmount -= amountToBankLoan;
        currentBalance +=payAmount;
        payAmount=0;
        updatePay()
        updateLoan()
        updateBalance()
    }

}

function payLoan(){
    let amount = loanAmount - payAmount
    loanAmount -= amount
}


//inital start of current balance and loan amount. Default at 200 kr in balance and 0 in loan. 0 in loans means it isn't visible
updateBalance();
updateLoan();
updatePay();

