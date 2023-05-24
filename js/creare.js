const titleIn = document.getElementById("titlul");
const imgIn = document.getElementById("link-img");
const clasaIn = document.getElementById("clasa-input");
const ordIn = document.getElementById("ordine");
const creareBtn = document.getElementById("creare-btn");
const form = document.getElementById("tema-form");

let editor;

let ckeditorDiv = document.getElementById('ckeditor');

ClassicEditor.create(ckeditorDiv, {
    mediaEmbed: {
        previewsInData: true
    }
}).then(saveEditor);

creareBtn.onclick = function (e) {
    e.preventDefault();

    if (form.checkValidity() == false) {
        form.reportValidity();
    } else {
        // transmitem datele spre firebase
        let data = new Date();

        let tema = {
            titlu : titleIn.value,
            image : imgIn.value,
            clasa : Number(clasaIn.value),
            ordine : Number(ordIn.value),
            content : editor.getData(),
            creat : data.getTime()
        };
        
        form.reset();
        temeDb.add(tema).then(redirect);
    }
}

function saveEditor(ed) {
    editor = ed;
}

function redirect(doc) {
    window.location = "tema.html?id=" + doc.id;
}