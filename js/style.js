//index javascript validation for homepage
document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('form');
    let nameInput = document.getElementById('name');
    let nameErrorMessage = document.getElementById('name-error');
    let emailInput = document.getElementById('email');
    let emailErrorMessage = document.getElementById('email-error');
    let panInput = document.getElementById('pan');
    let panErrorMessage = document.getElementById('pan-error');
    let loanInput = document.getElementById('loan');
    let loanWords = document.getElementById('loan-words');

    form.addEventListener('submit', function(event) {
        if (!validateName() || !validateEmail() || !validatePAN()) {
            event.preventDefault();
            alert('Please enter a valid information.');
        }
        else {
            // Valid form data, proceed to confirm.html
            let name = nameInput.value.trim();
            let email = emailInput.value.trim();

            // Save data in localStorage for access on the confirm.html page
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);

            // Redirect to confirm.html
            window.location.href = 'confirm.html';
        }
    });

    nameInput.addEventListener('blur', function() {
        validateName();
    });

    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    panInput.addEventListener('blur', function() {
        validatePAN();
    });

    function validateName() {
        let nameValue = nameInput.value.trim();
        let nameWords = nameValue.split(' ');
    
        if (nameWords.length <2) {
            nameErrorMessage.textContent = 'Please enter atleast 2 words.';
            return false;
        }
    
        for (let i = 0; i < nameWords.length; i++) {
            if (nameWords[i].length < 4) {
                nameErrorMessage.textContent = 'Each word should have at least 4 characters.';
                return false;
            }
    
            //  if the word contains any numbers or symbols
            if (/\d/.test(nameWords[i]) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(nameWords[i])) {
                nameErrorMessage.textContent = 'Name should not contain numbers or symbols.';
                return false;
            }
        }
    
        nameErrorMessage.textContent = '';
        return true;
    }
    
    function validateEmail() {
        let emailValue = emailInput.value.trim();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;

        if (!emailPattern.test(emailValue)) {
            emailErrorMessage.textContent = 'Please enter a valid email address.';
            return false;
        }

        emailErrorMessage.textContent = '';
        return true;
    }

    function validatePAN() {
        let panValue = panInput.value.trim();
        let panPattern = /^[A-Z0-9a-z]+$/;

        if (panValue.length !== 10 || !panPattern.test(panValue)) {
            panErrorMessage.textContent = 'Please enter a valid PAN number.';
            return false;
        }

        panErrorMessage.textContent = '';
        return true;
    }

  function calculateEMI(loanAmount, interestRate, tenure) {
        // Convert interest rate from percentage to decimal
        interestRate = interestRate / 100;
        
        // Convert tenure from years to months
        tenure = tenure * 12;
        
        // Calculate monthly interest rate
        let monthlyInterestRate = interestRate / 12;
        
        // Calculate EMI using the formula
        let emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
                  (Math.pow(1 + monthlyInterestRate, tenure) - 1);
        
        // Return the calculated EMI rounded to 2 decimal places
        return emi.toFixed(2);
      }

      loanInput.addEventListener('input', function() {
        let loanAmount = Number(loanInput.value);
        
        let interestRate = 8.5; // 8.5%
        let tenure = 15; // 15 years
        
        let emi = calculateEMI(loanAmount, interestRate, tenure);
        let emiSpan = document.getElementById('emi-amount');
        emiSpan.textContent = emi;
})
                       
});

//confirm
      

document.addEventListener('DOMContentLoaded', function() {
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');



 // Use the name and email values as needed
    console.log('Name:', name);
    console.log('Email:', email);

      // Get the elements to display the name and email
    let nameElement = document.getElementById('user-name');
    let emailElement = document.getElementById('user-email');


  // Set the name and email values in the elements
    nameElement.textContent = name;
    emailElement.textContent = email;


    // Clear the stored values from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('email');

   // Generate a random 4-digit OTP
    let otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
     // Store the OTP in localStorage
    localStorage.setItem('otp', otp);
    localStorage.setItem('attempts', 0);

    // Get the form and input elements
    let form = document.querySelector('form');
    let otpInput = document.getElementById('otp');

    // Declare attempts variable outside the event listener function
    let attempts;

            // Add event listener for form submission
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                // Get the entered OTP
                let enteredOTP = otpInput.value;

                // Get the stored OTP and attempt count from localStorage
                let storedOTP = localStorage.getItem('otp');
                attempts = Number(localStorage.getItem('attempts'));

                // Check if the entered OTP matches the stored OTP
                if (enteredOTP === storedOTP) {
                    alert('OTP verification successful!');
                    // Perform any further actions on successful verification
                    location.href='https://pixel6.co/';
                } else {
                    attempts++;
                    localStorage.setItem('attempts', attempts);

                    if (attempts >= 3) {
                        alert('OTP verification failed. Redirecting to a different URL.');
                        location.href = 'https://pixel6.co/404';
                    } else {
                        alert('OTP verification failed. Please try again.');
                        otpInput.value = '';
                    }
                }
            });
        });
