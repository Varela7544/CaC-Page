import {chequeaSiExiste} from "./firestore.js"

const form = document.getElementById("form-identificacion");
const documentoInput = document.getElementById("documento");
const nombreCompleto = document.getElementById("nombreCompleto");
const tipoDocumentacion = document.getElementById("tipoDocumentacion")
const genero = document.getElementById("genero")


form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValueDocumento = documentoInput.value;
    const inputValueNombre = nombreCompleto.value;
    const inputValueTipo = tipoDocumentacion.value;
    const inputValueGenero = genero.value;
    
    if (inputValueDocumento != '' && inputValueNombre != "" && inputValueTipo != "" && inputValueGenero != "")  {
        addValue(inputValueDocumento,inputValueNombre,inputValueTipo, inputValueGenero);
    };
});


async function addValue(valueDocumento,valueNombre,valueTipo,valueGenero) {
    try {
        const todo = {
            nombre: valueNombre,
            documento: valueDocumento,
            tipo_documento: valueTipo,
            genero: valueGenero
        }
        const response = await chequeaSiExiste(valueDocumento,todo);
    }catch(error) {
        console.log(error)
    }
};


