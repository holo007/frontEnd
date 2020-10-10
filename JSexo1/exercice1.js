
//fonction Verification de l'email
function verifEmail(txt, errEmail) {
    let email = txt.target.value; // Valeur saisie dans le champ login               
    let regex =/(^[a-z0-9._-]{1,})@([a-z0-9-]{2,})\.[a-z]{2,}$/;

    if (regex.test(email) === false) {
         document.getElementById(errEmail).textContent = "Adresse Email incorrecte ";
         return false;
    } else {
        document.getElementById(errEmail).textContent = "";
        return true;
    }
}

function verifMdp(txt,errMdp) {
    let mdp=txt.target.value; //valeur saisie dans le champ mdp
    let regexMin =/[a-z]{1,}/;
    let regexMax =/[A-Z]{1,}/;
    let regexChiffre=/[0-9]{1,}/;
    let regexCaracSpecial=/[^a-zA-Z0-9_]{1,}/;

    if (mdp.match(regexMin) && mdp.match(regexMax) && mdp.match(regexChiffre) && mdp.match(regexCaracSpecial) && mdp.length > 6) {
        document.getElementById(errMdp).textContent = " ";

    } else {
        document.getElementById(errMdp).textContent = "Le mot de passe doit comporter au moins 6 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial";
    }
}


//Verifie par la fonction verifEmail la cohérence de l'email
document.getElementById('login').addEventListener('blur', (e) => {
    verifEmail(e, 'msg');
});


//Vérifie si le mdp contient une maj une min et un chiffre
document.getElementById('mdp').addEventListener('input', (e) => {
    verifMdp(e, 'msg');
});



let form=document.querySelector('form');

//Verifications au submit
document.querySelector('form').addEventListener('submit', (e) => {
    let email =form.elements.login.value;
    //console.log(email);
    let mdp = form.elements.mdp.value;
    let regex =/(^[a-z0-9._-]{1,})@([a-z0-9-]{2,})\.[a-z]{2,}$/;
    let regexMin =/[a-z]{1,}/;
    let regexMax =/[A-Z]{1,}/;
    let regexChiffre=/[0-9]{1,}/;
    let regexCaracSpecial=/[^a-zA-Z0-9_]{1,}/;

    if (regex.test(email) === false) {
        e.preventDefault(); // Annulation de l'envoi des données
        document.getElementById('msg').textContent = "Veuillez entrer une adresse email correcte.";
    } 
    else if(!mdp.match(regexMin) || !mdp.match(regexMax) || !mdp.match(regexChiffre) || !mdp.match(regexCaracSpecial) || mdp.length < 6) {
        e.preventDefault(); // Annulation de l'envoi des données
        document.getElementById('msg').textContent = "Veuillez entrer un mot de passe avec au moins 6 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial";
    }
    else {
       document.getElementById('msg').textContent = "";
    }
});


