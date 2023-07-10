import {chequeaSiExiste, votacion} from "./firestore.js"

const votacionMacri = document.getElementById("votacionMacri");
const votacionCristina = document.getElementById("votacionCristina");
const votacionRoberto = document.getElementById("votacionRoberto");
const votacionNicolas = document.getElementById("votacionNicolas");
const votacionJose = document.getElementById("votacionJose");
const votacionBlanco = document.getElementById("votacionBlanco");

const { createApp } = Vue;



createApp({
  data() {
    return {
      senadores: [],
      //url:'http://localhost:5000/productos',
      // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
      url: "https://francobarral.pythonanywhere.com/senadores", // si ya lo subieron a pythonanywhere
      error: false,
      cargando: true,
      errorNoProducts: false,
      /*atributos para el guardar los valores del formulario */
      id: 0,
      presidente: "",
      vicepresidente: "",
      idPresindente: "",
      partido: "",
      boleta: "",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
        
          console.log(data);
          this.senadores = data;
          console.log(this.senadores);
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
          this.cargando = false;
        });
    },
    votacion(id) {
        if (id =="senadorTodos") {
          console.log(id);
          const partidoPolitico = "Todos"
          const response = votar(partidoPolitico, "senadores")
        }
        else if(id == "senadorLibertad") {
          const partidoPolitico = "Despertar"
        const response = votar(partidoPolitico, "senadores")
        }
        else if (id == "senadorIzquierda") {
          const partidoPolitico = "Frente de izquierda"
          const response = votar(partidoPolitico, "senadores")
        }
        else if (id == "senadorConsenso") {
          const partidoPolitico = "Consenso"
          const response = votar(partidoPolitico, "senadores")
        }
        else if (id == "senadorJuntos") {
          const partidoPolitico = "Juntos por el cambio"
          const response = votar(partidoPolitico, "senadores")
        }
    }
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");



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