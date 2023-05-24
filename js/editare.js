const url = new URL(document.location);
let id = url.searchParams.get("id");

const titleIn = document.getElementById("titlul");
const imgIn = document.getElementById("link-img");
const clasaIn = document.getElementById("clasa-input");
const ordIn = document.getElementById("ordine");
const editBtn = document.getElementById("edit-btn");
const form = document.getElementById("tema-form");

let editor;
let tema;

let ckeditorDiv = document.getElementById('ckeditor');

ClassicEditor.create(ckeditorDiv,{
    mediaEmbed: {
        previewsInData: true
    }
}).then(saveEditor);

temeDb.doc(id).get().then(constructForm);

editBtn.onclick = function (e) {
    e.preventDefault();

    if (form.checkValidity() == false) {
        form.reportValidity();
    } else {
        // transmitem datele spre firebase

        let tema = {
            titlu : titleIn.value,
            image : imgIn.value,
            clasa : Number(clasaIn.value),
            ordine : Number(ordIn.value),
            content : editor.getData()
        };
        
        form.reset();
        temeDb.doc(id).update(tema).then(redirect);
    }
}

function constructForm(doc) {
    tema = doc.data();

    titleIn.value = tema.titlu;
    imgIn.value = tema.image;
    clasaIn.value = tema.clasa;
    ordIn.value = tema.ordine;

    editor.setData(tema.content);
}

function saveEditor(ed) {
    editor = ed;
}

function redirect() {
    window.location = "tema.html?id=" + id;
}
