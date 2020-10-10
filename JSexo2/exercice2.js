function affiche(tableau, NomRegion) {
    //console.log(tableau);

    let divReponse = document.getElementById('departements');
    divReponse.innerHTML = "";
    let h3 = document.createElement('h3');
    h3.textContent = NomRegion;
    let ul = document.createElement('ul');

    divReponse.appendChild(h3);
    divReponse.appendChild(ul);

    let li = "";
    for (const item of tableau) {
        li = document.createElement('li');
        li.textContent = item.nom + item.code;
        ul.appendChild(li);
    }
};

//constantes des couleurs d'animation
const mapcolor = "#D3D3D3";
const mapover = "#A8BED5";
const mapselect = "#7095BA";

const paths = document.getElementsByTagName('path');
console.log(paths);

for (const path of paths) {
    //init de la couleur de fond des regions
    path.setAttribute("fill", mapcolor);

    //au survol
    path.onmouseover = () => {
        if (path.getAttribute('fill') === '#D3D3D3') {
            path.setAttribute("fill", mapover);
        }

    };

    //à la sortie du survol
    path.onmouseout = () => {
        if (path.getAttribute('fill') === '#7095BA') {
            path.setAttribute("fill", mapselect);
        }
        else {
            path.setAttribute("fill", mapcolor);
        }
    };

    //au clic affichage des departements
    path.addEventListener('click', function () {
        let code = path.getAttribute('alt');
        let nomRegion = path.getAttribute('title');
        console.log(code);
        console.log(nomRegion);

        fetch('https://geo.api.gouv.fr/regions/' + code + '/departements')
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                //appelle la fct d'affichage
                affiche(data, nomRegion);

            })
            .catch((error) => {
                console.log('Problème avec Fetch: ' + error.message);
            });
    });
}

//Ecoute Carte Clic changement de couleur
carte.addEventListener('click', function () {
    //console.log('ecoutecarte');
    for (const path of paths) {
        if (path.getAttribute('fill') === '#A8BED5') {
            path.setAttribute("fill", mapselect);
        } else {
            path.setAttribute("fill", mapcolor);
        }
    }

});