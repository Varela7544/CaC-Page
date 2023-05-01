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
                console.log(doc.id, "=>", doc.data().presidenciales)
                arrayDatos.push(doc.data().presidenciales)
    
                google.charts.load("current", {packages:['corechart']});
                google.charts.setOnLoadCallback(drawChart);
    
                function drawChart() {
                    var data = google.visualization.arrayToDataTable(
                      [['Presidentes','Votos',{role : 'style'}],
                        ['Consenso',arrayDatos[0],"#18469c"],
                        ['Despertar',arrayDatos[1],"#0a5fad"],
                        ["Frente de Izquierda",arrayDatos[3],"red"],
                        ["Juntos por el cambio",arrayDatos[4],"yellow"],
                        ["Frente de todos",arrayDatos[5],"#0099c6"],
                        ["En blanco",arrayDatos[2],"grey"]]
                      );
                
                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1,
                                     { calc: "stringify",
                                       sourceColumn: 1,
                                       type: "string",
                                       role: "annotation" },
                                     2]);
                
                    var options = {
                      title: "Presidentes",
                      width: 600,
                      height: 400,
                      legend: { position: "none" },
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values_presidentes"));
                    chart.draw(view, options);
                }
            })
        });
    }
    else if (tipoTabla == "senadores") {
        collection.then((querySnapshot) => {
            const arrayDatos = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data().senadores)
                arrayDatos.push(doc.data().senadores)
    
                google.charts.load("current", {packages:['corechart']});
                google.charts.setOnLoadCallback(drawChart);
    
                function drawChart() {
                    var data = google.visualization.arrayToDataTable(
                      [['Senadores','Votos',{role : 'style'}],
                        ['Consenso',arrayDatos[0],"#18469c"],
                        ['Despertar',arrayDatos[1],"#0a5fad"],
                        ["Frente de Izquierda",arrayDatos[3],"red"],
                        ["Juntos por el cambio",arrayDatos[4],"yellow"],
                        ["Frente de todos",arrayDatos[5],"#0099c6"],
                        ["En blanco",arrayDatos[2],"grey"]]
                      );
                
                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1,
                                     { calc: "stringify",
                                       sourceColumn: 1,
                                       type: "string",
                                       role: "annotation" },
                                     2]);
                
                    var options = {
                      title: "Senadores",
                      width: 600,
                      height: 400,
                      legend: { position: "none" },
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values_senadores"));
                    chart.draw(view, options);
                }
            })
        });
    }
    else {
        collection.then((querySnapshot) => {
            const arrayDatos = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data().diputados)
                arrayDatos.push(doc.data().diputados)
    
                google.charts.load("current", {packages:['corechart']});
                google.charts.setOnLoadCallback(drawChart);
    
                function drawChart() {
                    var data = google.visualization.arrayToDataTable(
                      [['Diputados','Votos',{role : 'style'}],
                        ['Consenso',arrayDatos[0],"#18469c"],
                        ['Despertar',arrayDatos[1],"#0a5fad"],
                        ["Frente de Izquierda",arrayDatos[3],"red"],
                        ["Juntos por el cambio",arrayDatos[4],"yellow"],
                        ["Frente de todos",arrayDatos[5],"#0099c6"],
                        ["En blanco",arrayDatos[2],"grey"]]
                      );
                
                    var view = new google.visualization.DataView(data);
                    view.setColumns([0, 1,
                                     { calc: "stringify",
                                       sourceColumn: 1,
                                       type: "string",
                                       role: "annotation" },
                                     2]);
                
                    var options = {
                      title: "Diputados",
                      width: 600,
                      height: 400,
                      legend: { position: "none" },
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values_diputados"));
                    chart.draw(view, options);
                }
            })
        });
    }
    
}
  




mostrarDatos("presidentes")
mostrarDatos("senadores")
mostrarDatos("diputados")