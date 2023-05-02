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



export async function mostrarDatos (tipoTabla) {
    const collection = db.collection('candidatos').get();

    if (tipoTabla == "presidentes") {
        collection.then((querySnapshot) => {
            const arrayDatos = [];
            querySnapshot.forEach((doc) => {
                arrayDatos.push(doc.data().presidenciales)
                console.log(doc.id, "=>", doc.data().presidenciales)
            })

            const ctx = document.getElementById('columnchart_values_presidentes')
            new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ['Consenso', 'Despertar', 'Frente de Izquierda', 'Juntos por el cambio', 'Todos', 'En blanco'],
                  datasets: [{
                    label: 'Presidenciales',
                    data: [arrayDatos[0],arrayDatos[1],arrayDatos[3],arrayDatos[4],arrayDatos[5],arrayDatos[2]],
                    backgroundColor: [
                        'rgba(24,70,156,84.6)',
                        'rgba(10,95,173,94.2)',
                        'rgba(248,52,52,79.2)',
                        'rgba(235,238,0,100)',
                        'rgba(0,153,198,100)',
                        'grey'
                    ],
                    borderWidth: 1
                  }],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
        });
    }
    else if (tipoTabla == "senadores") {
        collection.then((querySnapshot) => {
            const arrayDatos = [];
            querySnapshot.forEach((doc) => {
                arrayDatos.push(doc.data().senadores)
                console.log(doc.id, "=>", doc.data().senadores)
            })

            const ctx = document.getElementById('columnchart_values_senadores')
            new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ['Consenso', 'Despertar', 'Frente de Izquierda', 'Juntos por el cambio', 'Todos', 'En blanco'],
                  datasets: [{
                    label: 'Senadores',
                    data: [arrayDatos[0],arrayDatos[1],arrayDatos[3],arrayDatos[4],arrayDatos[5],arrayDatos[2]],
                    backgroundColor: [
                        'rgba(24,70,156,84.6)',
                        'rgba(10,95,173,94.2)',
                        'rgba(248,52,52,79.2)',
                        'rgba(235,238,0,100)',
                        'rgba(0,153,198,100)',
                        'grey'
                    ],
                    borderWidth: 1
                  }],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
        });
    }
    else {
        collection.then((querySnapshot) => {
            const arrayDatos = [];
            querySnapshot.forEach((doc) => {
                arrayDatos.push(doc.data().diputados)
                console.log(doc.id, "=>", doc.data().diputados)
            })

            const ctx = document.getElementById('columnchart_values_diputados')
            new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ['Consenso', 'Despertar', 'Frente de Izquierda', 'Juntos por el cambio', 'Todos', 'En blanco'],
                  datasets: [{
                    label: 'Diputados',
                    data: [arrayDatos[0],arrayDatos[1],arrayDatos[3],arrayDatos[4],arrayDatos[5],arrayDatos[2]],
                    backgroundColor: [
                        'rgba(24,70,156,84.6)',
                        'rgba(10,95,173,94.2)',
                        'rgba(248,52,52,79.2)',
                        'rgba(235,238,0,100)',
                        'rgba(0,153,198,100)',
                        'grey'
                    ],
                    borderWidth: 1
                  }],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
        });
    }
    
}

  




mostrarDatos("presidentes")
mostrarDatos("senadores")
mostrarDatos("diputados")