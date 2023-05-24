const claseBox = document.getElementById("clase");

//la schimbarea continutului bazei de date se cheama functia de extragere din bd
temeDb.onSnapshot(extrageTeme);

function extrageTeme(snapshot) {
    console.log(snapshot);

    let docs = snapshot.docs;
    let temeClasa = {};

    for (let i = 0; i < docs.length; i++) {
        //se extrag datele la fiecare obiect din bd
        let tema = docs[i].data();
        tema.id = docs[i].id;

        if (!(tema.clasa in temeClasa)) {
            //se creaza clasa in caz ca nu este pri clase existente
            temeClasa[tema.clasa] = [];
        }

        //se adauga tema in clasa respectiva, se grupeaza teme dupa clase
        temeClasa[tema.clasa].push(tema);
    }

    renderClase(temeClasa);
}

function renderClase(temeClasa) {
    //cream continut
    let html = "";

    //trecem prin fiecare grup de clasa, iterarea prin chei
    for (let clasa in temeClasa) {
        html += `
        <details>
        <summary>Clasa ${clasa}</summary>
        <div class="module">
        `

        //sortam temele dupa ordine
        temeClasa[clasa].sort(compar);

        //iterarea prin fiecare valoarea de clasa, adica temele din clasa respectiva si adaugam continuturi din bd dinamic
        for (let tema of temeClasa[clasa]) {
            html += `
            <a class="modul" href="tema.html?id=${tema.id}">
            <img src="${tema.image}">
            <div class="modul-titlu">
            ${tema.titlu}
            </div>
            </a>
            `
        }

        //inchidem constructia grupului
        html += `
        </div>
        </details>
        `
    }

    claseBox.innerHTML = html;
}

function compar(a, b) {
    return a.ordine - b.ordine;
}