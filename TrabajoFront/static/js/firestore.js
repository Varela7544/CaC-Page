const db = firebase.firestore()


export async function chequeaSiExiste(inputValue,todo,yaVotaste,valueDocumento,valueNombre,valueTipo,valueGenero) {
    const collection = db.collection("usuarios").doc(inputValue);
    collection.get().then((doc) => {
        if (doc.exists) {
            yaVotaste.className = 'yaVotasteEncendido';
            valueDocumento.value = ""
            valueNombre.value = ""
            valueTipo.value = ""
            valueGenero.value = ""
        }
        else {
            const response = db.collection("usuarios").doc(inputValue).set(todo)
            abrir();
            return response;
        }
    }).catch((error) =>
    {
        console.log(error);
    })
};

function abrir() {
    window.open("candidatosPresidentes.html","_self")
}


