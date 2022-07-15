const keys = document.querySelectorAll('.key');
const crptKey = document.querySelector('#cryptkey');
const copyKey = document.querySelector('#copykey');
const clrKey = document.querySelector('#clrkey');
const orgMssg = document.querySelector('#OriginalMessage');
const cryptMssg = document.querySelector('#CryptedMessage');

function cryptMessage(e){
    cryptMssg.textContent = orgMssg.value;
}

function clearMessage(e){
    cryptMssg.textContent = "";
    orgMssg.textContent = "";
}

function typeLetter(e){
    orgMssg.textContent = (orgMssg.value + this.textContent);
}

function typedLetter(e){
    if (e.which >= 65 && e.which <= 90){
        orgMssg.textContent = (orgMssg.value + e.key);
    } else if (e.which === 8){
        orgMssg.textContent = (orgMssg.value.slice(0, -1));
    }
}

crptKey.addEventListener('click', cryptMessage);
clrKey.addEventListener('click', clearMessage);
keys.forEach(button => button.addEventListener('click', typeLetter));
window.addEventListener('keydown', typedLetter);