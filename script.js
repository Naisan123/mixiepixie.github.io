//#region account-dropdown in header

var accountDropdown = document.getElementById("account-dropdown"); 
var dropdownContent = accountDropdown.querySelector(".dropdown-content"); 

// Toggle the dropdown menu when "My account" is clicked
accountDropdown.addEventListener("click", function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block"; 
});


// Get rid of dropdown menu when clicking outside of it
document.addEventListener("click", function(event) {
    if (!dropdownContent.contains(event.target) && event.target !== accountDropdown) {
        dropdownContent.style.display = "none";
    }
});

// Lead to their respective pages when clicked on elements inside "My account"
document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll(".dropdown-item a");

    dropdownItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            const url = this.getAttribute("href");
            window.location.href = url;
        });
    });
});



//#endregion account-dropdown


// NO TOUCH PLEASE, SPØR SHAILA
const cookieStorage = {
  getItem: (key) => {
      const cookies = document.cookie
          .split(';')
          .map(cookie => cookie.split('='))
          .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
      return cookies[key];
  },

  setItem: (key, value) => {
      document.cookie = `${key}=${value};path=/;`;
  },
};

const storageType = cookieStorage;
const consentPropertyName = 'customCookieName';

const showPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
  const consentPopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookie');
  const declineBtn = document.getElementById('declineCookie');

  if (!consentPopup || !acceptBtn || !declineBtn) {
      console.error("Popup or button element not found.");
      return;
  }

  const acceptFunction = () => {     
      saveToStorage();      
      consentPopup.classList.add('hide');
      consentPopup.classList.remove('show');     
  };

  const declineFunction = () => {    
      consentPopup.classList.add('hide');
      consentPopup.classList.remove('show');       
  };

  acceptBtn.addEventListener('click', acceptFunction);
  declineBtn.addEventListener('click', declineFunction);

  if (showPopup()) {
      setTimeout(() => {   
          consentPopup.classList.remove('hide');
          consentPopup.classList.add('show');
      }, 2000);
  }    
};
