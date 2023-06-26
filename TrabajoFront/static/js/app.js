import {chequeaSiExiste, votacion} from "./firestore.js"

const form = document.getElementById("form-identificacion");
const documentoInput = document.getElementById("documento");
const nombreCompleto = document.getElementById("nombreCompleto");
const tipoDocumentacion = document.getElementById("tipoDocumentacion");
const genero = document.getElementById("genero");
const yaVotaste = document.querySelector(".yaVotasteApagado");
const dniIncorrecto = document.querySelector(".dniIncorrecto");
const faltanvaloresApagado = document.querySelector(".faltanvaloresApagado")

const votacionMacri = document.getElementById("votacionMacri");
const votacionCristina = document.getElementById("votacionCristina");
const votacionRoberto = document.getElementById("votacionRoberto");
const votacionNicolas = document.getElementById("votacionNicolas");
const votacionJose = document.getElementById("votacionJose");
const votacionBlanco = document.getElementById("votacionBlanco");

const senadorLibertad = document.getElementById("senadorLibertad");
const senadorIzquierda = document.getElementById("senadorIzquierda");
const senadorTodos = document.getElementById("senadorTodos");
const senadorConsenso = document.getElementById("senadorConsenso");
const senadorJuntos = document.getElementById("senadorJuntos");
const senadorBlanco = document.getElementById("senadorBlanco");

const diputadoDespertar = document.getElementById("diputadoDespertar");
const diputadoConsenso = document.getElementById("diputadoConsenso");
const diputadoIzquierda = document.getElementById("diputadoIzquierda");
const diputadoTodos = document.getElementById("diputadoTodos");
const diputadoJuntos = document.getElementById("diputadoJuntos");
const diputadoBlanco = document.getElementById("diputadoBlanco");


function validaDni (dni) {
    var ex_regular_dni; 
    ex_regular_dni = /^\d{8}(?:[-\s]\d{4})?$/;
    if(ex_regular_dni.test (dni) == true){
       return true
    }else{
     return false
    }
};

function validaVacio (dni,genero,tramite,nombre) {
    if (dni || genero || tramite || nombre) {
        return 1
    }
    else {
        return 0
    }
}


// validamos el click en el boton de submit, para enviar los datos a la base de datos y realizar un chequeo de existencia
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log("funciona");
        const inputValueDocumento = documentoInput.value;
        const inputValueNombre = nombreCompleto.value;
        const inputValueTipo = tipoDocumentacion.value;
        const inputValueGenero = genero.value;

        if (inputValueDocumento && inputValueGenero && inputValueNombre && inputValueTipo) {
            if ( validaDni(inputValueDocumento) == true) {
                addValue(inputValueDocumento,inputValueNombre,inputValueTipo, inputValueGenero);
            }
            else {
                dniIncorrecto.className = "dniIncorrectoActive"
                documentoInput.value = ""
                nombreCompleto.value = ""
                tipoDocumentacion.value = ""
                genero.value = ""
                setTimeout(() => {
                    dniIncorrecto.className = "dniIncorrecto"
                  }, 3000);
    
            }
        }
        else {
            faltanvaloresApagado.className = "faltanvalores"
            documentoInput.value = ""
            nombreCompleto.value = ""
            tipoDocumentacion.value = ""
            genero.value = ""
            setTimeout(() => {
                dniIncorrecto.className = "faltanvaloresApagado"
              }, 3000);

        }
    });
}

//Funcion para validar si existe un usuario, y si ya voto no permitirle hacer, y si no vota
async function addValue(valueDocumento,valueNombre,valueTipo,valueGenero) {
    try {
        const todo = {
            nombre: valueNombre,
            documento: valueDocumento,
            tipo_documento: valueTipo,
            genero: valueGenero
        }
        const response = await chequeaSiExiste(valueDocumento,todo,yaVotaste,documentoInput,nombreCompleto,tipoDocumentacion,genero);
        return response
    }catch(error) {
        console.log(error)
    }
};


//Votaciones para presindentes, validamos que este el link y luego se ejecuta la funcion para enviar los datos
if (votacionMacri) {
    votacionMacri.addEventListener('click', () => {
        console.log("votaste a Macri");
        const partidoPolitico = "Juntos por el cambio"
        const response = votar(partidoPolitico, "presidente")
    });
};
if(votacionCristina) {
    votacionCristina.addEventListener('click', () => {
        console.log("votaste a Cristina");
        const partidoPolitico = "Todos"
        const response = votar(partidoPolitico, "presidente")
    });
};
if(votacionRoberto) {
    votacionRoberto.addEventListener('click', () => {
        console.log("votaste a Roberto");
        const partidoPolitico = "Consenso"
        const response = votar(partidoPolitico, "presidente")
    });
};
if(votacionNicolas) {
    votacionNicolas.addEventListener('click', () => {
        console.log("votaste a Nicolas");
        const partidoPolitico = "Frente de izquierda"
        const response = votar(partidoPolitico, "presidente")
    });
};
if(votacionJose) {
    votacionJose.addEventListener('click', () => {
        console.log("votaste a Jose");
        const partidoPolitico = "Despertar"
        const response = votar(partidoPolitico, "presidente")
    });
};
if(votacionBlanco) {
    votacionBlanco.addEventListener('click', () => {
        console.log("votaste en Blanco");
        const partidoPolitico = "En blanco"
        const response = votar(partidoPolitico, "presidente")
    });
};




//Votaciones para senadores, validamos que este el link y luego se ejecuta la funcion para enviar los datos
if(senadorLibertad) {
    senadorLibertad.addEventListener('click', () => {
        console.log("votaste en senadorLibertad");
        const partidoPolitico = "Despertar"
        const response = votar(partidoPolitico, "senadores")
    });
};
if(senadorIzquierda) {
    senadorIzquierda.addEventListener('click', () => {
        console.log("votaste en senadorIzquierda");
        const partidoPolitico = "Frente de izquierda"
        const response = votar(partidoPolitico, "senadores")
    });
};
if(senadorTodos) {
    senadorTodos.addEventListener('click', () => {
        console.log("votaste en senadorTodos");
        const partidoPolitico = "Todos"
        const response = votar(partidoPolitico, "senadores")
    });
};
if(senadorConsenso) {
    senadorConsenso.addEventListener('click', () => {
        console.log("votaste en senadorConsenso");
        const partidoPolitico = "Consenso"
        const response = votar(partidoPolitico, "senadores")
    });
};
if(senadorJuntos) {
    senadorJuntos.addEventListener('click', () => {
        console.log("votaste en senadorJuntos");
        const partidoPolitico = "Juntos por el cambio"
        const response = votar(partidoPolitico, "senadores")
    });
};
if(senadorBlanco) {
    senadorBlanco.addEventListener('click', () => {
        console.log("votaste en senadorBlanco");
        const partidoPolitico = "En blanco"
        const response = votar(partidoPolitico, "senadores")
    });
};



//Votaciones para diputados , validamos que este el link y luego se ejecuta la funcion para enviar los datos
if(diputadoDespertar) {
    diputadoDespertar.addEventListener('click', () => {
        console.log("votaste en senadorLibertad");
        const partidoPolitico = "Despertar"
        const response = votar(partidoPolitico, "diputados")
    });
};
if(diputadoIzquierda) {
    diputadoIzquierda.addEventListener('click', () => {
        console.log("votaste en diputadoIzquierda");
        const partidoPolitico = "Frente de izquierda"
        const response = votar(partidoPolitico, "diputados")
    });
};
if(diputadoTodos) {
    diputadoTodos.addEventListener('click', () => {
        console.log("votaste en diputadoTodos");
        const partidoPolitico = "Todos"
        const response = votar(partidoPolitico, "diputados")
    });
};
if(diputadoConsenso) {
    diputadoConsenso.addEventListener('click', () => {
        console.log("votaste en diputadoConsenso");
        const partidoPolitico = "Consenso"
        const response = votar(partidoPolitico, "diputados")
    });
};
if(diputadoJuntos) {
    diputadoJuntos.addEventListener('click', () => {
        console.log("votaste en senadorJuntos");
        const partidoPolitico = "Juntos por el cambio"
        const response = votar(partidoPolitico, "diputados")
    });
};
if(diputadoBlanco) {
    diputadoBlanco.addEventListener('click', () => {
        console.log("votaste en diputadoBlanco");
        const partidoPolitico = "En blanco"
        const response = votar(partidoPolitico, "diputados")
    });
};



//Ejecutamos la funcion que se encuentra en firestore.js y le enviamos el partido politico, y el tipo de votacion
async function votar(partidoPolitico,tipoVotacion) {
    if (tipoVotacion == "presidente") {
        const response = await votacion(partidoPolitico,"presidente");
        return response
    }
    else if (tipoVotacion == "senadores") {
        const response = await votacion(partidoPolitico,"senadores");
        return response
    }
    else {
        const response = await votacion(partidoPolitico,"diputados");
        return response
    }
};




