const url = new URL(document.location);
let id = url.searchParams.get("id");

const temaDiv = document.getElementById("continut-tema");

temeDb.doc(id).get().then(renderTema);

function renderTema(doc) {
    let tema = doc.data();
    
    document.getElementById("clasa").innerHTML = tema.clasa;
    document.getElementById("tema-link").innerHTML = tema.titlu;
    
    let editBtn = "";
    let deleteBtn = "";
    let html = "";

    if (isAdmin()) {
        deleteBtn = '<div onclick="sterge()" class="delete"><i class="fas fa-trash"></i></div>';
        editBtn = `<a href="editare.html?id=${id}" class="edit"><i class="fas fa-edit"></i></a>`;
    }

    html += `
    <div class="tema-full">
                <div class="tema-titlu-full">
                    <img src="${tema.image}">
                    <h1 class="centered"> ${tema.titlu}</h1>

                    ${deleteBtn}
                    ${editBtn}

                </div>

                <div>
                ${tema.content}
                </div>

                <br/>
                <span id="data">${formatData(tema.creat)}</span>
            </div>
    `

    temaDiv.innerHTML = html;

}

function sterge() {
    let confirmare = confirm("Sunteti sigur?");

    if (confirmare == true) {
        temeDb.doc(id).delete().then(redirectTeme);
    }
}

function redirectTeme() {
    window.location = "teme.html";
}
