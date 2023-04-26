const db = firebase.firestore()


export async function chequeaSiExiste(inputValue,todo,yaVotaste,valueDocumento,valueNombre,valueTipo,valueGenero) {
    const collection = db.collection("usuarios").doc(inputValue);
    collection.get().then((doc) => {
        if (doc.exists) {
            console.log("Ya votaste!");
            yaVotaste.className = 'yaVotasteEncendido';
            valueDocumento.value = ""
            valueNombre.value = ""
            valueTipo.value = ""
            valueGenero.value = ""
        }
        else {
            db.collection("usuarios").doc(inputValue).set({
                todo
            }).then(() => {
                console.log("se envio correctamente");
                abrirCandidatosPresidentes();
            });
            
        }
    }).catch((error) =>
    {
        console.log(error);
    })
};

function abrirCandidatosPresidentes() {
    window.open("candidatosPresidentes.html","_self")
}



export async function votacion (partidoPolitico,tipoVotacion){
    const collection = db.collection("candidatos").doc(partidoPolitico);
    collection.get().then((doc) => {
        if (doc.exists) {
            if (tipoVotacion == "presidente") {
                let data = doc.data().presidenciales + 1
                console.log(data)
                db.collection("candidatos").doc(partidoPolitico).update({
                    presidenciales: data
                }).then(() => {
                    abrirCandidatos("senadores"); 
                });  
            }
            else if(tipoVotacion == "senadores") {
                let data = doc.data().senadores + 1
                db.collection("candidatos").doc(partidoPolitico).update({
                    senadores: data
                }).then(() => {
                    abrirCandidatos("diputados"); 
                })       
            }
            else {
                let data = doc.data().diputados + 1
                db.collection("candidatos").doc(partidoPolitico).update({
                    diputados: data
                }).then(() => {
                    console.log("Terminaste la votacion")
                })
            }

        }
        else {
            console.log("no se envio")
        }
    }).catch((error) =>
    {
        console.log(error);
    });
}


function abrirCandidatos(tipoCandidato) {
    if (tipoCandidato == "senadores") {
        window.open("candidatosSenadores.html","_self")
    }
    else if(tipoCandidato == "diputados") {
        window.open("candidatosDiputados.html","_self")
    }
};