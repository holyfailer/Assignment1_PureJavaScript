const laptopSelect = document.getElementById('laptopSelect');
const featuresDiv = document.getElementById('features');
const laptopImage = document.getElementById('laptopImage');
const laptopName = document.getElementById('laptopName');
const laptopDescription = document.getElementById('laptopDescription');
const laptopPrice = document.getElementById('laptopPrice');
const buyNowBtn = document.getElementById('buyNowBtn');
const purchaseStatus = document.getElementById('purchaseStatus');

let currentBalance = 200;

let loanAmount = 0;

let payAmount = 0;

import { getLoan } from "./myBank.js";
import { work } from "./myBank.js";



//Updates the visuals for the balance field. Is used whenever the balance is changed. 
function updateBalance(){
    const elem =  document.getElementById('balanceDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(currentBalance)}`;
}
//Updates the visuals for the loan field. Is used whenever the loan is changed. Is hidden by default and is only visual when the loan is above 0.
function updateLoan(){
    const elem = document.getElementById('loanDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} );
    
    if(loanAmount > 0) {
        elem.style.display = 'block'; // Show the element
        elem.innerHTML = `Outstanding loan: ${Formatter.format(loanAmount)}`;
    } else {
        elem.style.display = 'none'; // Hide the element
    }
}

//Updates the visuals for the pay field. Is used whenever the pay is changed. 
 function updatePay(){
    const elem =  document.getElementById('payDiv');
    const Formatter = new Intl.NumberFormat('da-DK',{style: 'currency', currency:'Dkk'} )
    elem.innerHTML = `Current Balance: ${Formatter.format(payAmount)}`;
}




//transfers money to the bank from work. If there is no loan, transfer all of it, otherwise transfer 10% to the bankloan. 
function transferPayToBank(){
    console.log("hey" + loanAmount)
    if(loanAmount <= 0){
        currentBalance += payAmount;
    }else{
        let amountToBankLoan = payAmount*0.1
       
        payAmount -= payAmount*0.1;
        loanAmount -= amountToBankLoan;
        currentBalance +=payAmount;

    }
    // checks and moves any leftover debt(e.g. "negative debt" and moves it to currentBalance)
    if(loanAmount < 0){
      let temp = Math.abs(loanAmount)   
      currentBalance += temp  
      
    }
    
    payAmount=0;
    updatePay()
    updateLoan()
    updateBalance()

}

function payLoan(){
    loanAmount -= payAmount
    
    if(loanAmount < 0){
        let temp = Math.abs(loanAmount)   
        currentBalance += temp  
        
      }
    payAmount=0

    updatePay()
    updateLoan()
    updateBalance()
}

fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => {


        data.forEach(laptop => {
            const option = document.createElement('option');
            option.value = laptop.id;
            option.textContent = laptop.title;
            laptopSelect.appendChild(option);
        });

        laptopSelect.addEventListener('change', () => {
            const selectedLaptopId = parseInt(laptopSelect.value);
            const selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);

            featuresDiv.innerHTML = selectedLaptop.specs.map(feature => `<p>${feature}</p>`).join('');

            laptopImage.src = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`;
            laptopName.textContent = selectedLaptop.title;
            laptopDescription.textContent = selectedLaptop.description;
            laptopPrice.textContent = `Price: $${selectedLaptop.price}`;

            buyNowBtn.addEventListener('click', () => {
                 bankBalance = currentBalance; 
                if (selectedLaptop.price <= bankBalance) {
                    bankBalance -= selectedLaptop.price;
                    purchaseStatus.textContent = `Congratulations! You are now the owner of the ${selectedLaptop.title}. Remaining balance: $${bankBalance}`;
                } else {
                    purchaseStatus.textContent = `Sorry, you cannot afford the ${selectedLaptop.title}. Your balance is insufficient.`;
                }
            });
        });
    });





//inital start of current balance and loan amount. Default at 200 kr in balance and 0 in loan. 0 in loans means it isn't visible
updateBalance();
updateLoan();
updatePay();

