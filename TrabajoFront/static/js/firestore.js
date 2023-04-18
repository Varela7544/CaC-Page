const db = firebase.firestore()


export async function chequeaSiExiste(inputValue,todo) {
    const collection = db.collection("usuarios").doc(inputValue);
    collection.get().then((doc) => {
        if (doc.exists) {
            console.log("Ya votaste!");
        }
        else {
            const response = db.collection("usuarios").doc(inputValue).set(todo)
            console.log(document.location)
            abrir();
            return response 
        }
    }).catch((error) =>
    {
        console.log(error);
    })
};

function abrir() {
    window.open("/CaC-Page/TrabajoFront/pages/candidatosPresidentes.html","_self")
}


