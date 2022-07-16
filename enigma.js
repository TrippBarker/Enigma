const keys = document.querySelectorAll('.key');
const crptKey = document.querySelector('#cryptkey');
const copyKey = document.querySelector('#copykey');
const clrKey = document.querySelector('#clrkey');
const orgMssg = document.querySelector('#OriginalMessage');
const cryptMssg = document.querySelector('#CryptedMessage');
const optionMenu = document.querySelector('#options');

orgMssg.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const {clientX: mouseX, clientY: mouseY} = event;
    optionMenu.style.top = `${mouseY}px`;
    optionMenu.style.left = `${mouseX}px`;
    optionMenu.classList.add("visible");
})

function cryptMessage(e){
    cryptMssg.textContent = orgMssg.value.toUpperCase();
}

function simpleCaesarCipher(e){
    var message = "";
    for (var i = 0; i < orgMssg.value.length; i++){
        switch (orgMssg.value.charAt(i).toUpperCase()){
            case "A":
                message += "Z";
                break;
            case "B":
                message += "Y";
                break;
            case "C":
                message += "X";
                break;
            case "D":
                message += "W";
                break;
            case "E":
                message += "V";
                break;
            case "F":
                message += "U";
                break;
            case "G":
                message += "T";
                break;
            case "H":
                message += "S";
                break;
            case "I":
                message += "R";
                break;
            case "J":
                message += "Q";
                break;
            case "K":
                message += "P";
                break;
            case "L":
                message += "O";
                break;
            case "M":
                message += "N";
                break;
            case "N":
                message += "M";
                break;
            case "O":
                message += "L";
                break;
            case "P":
                message += "K";
                break;
            case "Q":
                message += "J";
                break;
            case "R":
                message += "I";
                break;
            case "S":
                message += "H";
                break;
            case "T":
                message += "G";
                break;
            case "U":
                message += "F";
                break;
            case "V":
                message += "E";
                break;
            case "W":
                message += "D";
                break;
            case "X":
                message += "C";
                break;
            case "Y":
                message += "B";
                break;
            case "Z":
                message += "A";
                break;
            default:
                continue;
        }
    }
    cryptMssg.textContent = message;
}

function copyMessage(e){
    navigator.clipboard.writeText(cryptMssg.value);
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

function combo(e){
    if (repeat) return
    if (ctrlKey && key === 'V'){
        orgMssg.textContent = "paste";
    }
}

crptKey.addEventListener('click', simpleCaesarCipher);
copyKey.addEventListener('click', copyMessage);
clrKey.addEventListener('click', clearMessage);
keys.forEach(button => button.addEventListener('click', typeLetter));
window.addEventListener('keyup', typedLetter);