import {chequeaSiExiste, votacion} from "./firestore.js"

const { createApp } = Vue;



createApp({
  data() {
    return {
      diputados: [],
      //url:'http://localhost:5000/productos',
      // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
      url: "https://francobarral.pythonanywhere.com/diputados", // si ya lo subieron a pythonanywhere
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
          this.diputados = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
          this.cargando = false;
        });
    },
    votacion(id) {
        if (id =="diputadoDespertar") {
          const partidoPolitico = "Despertar"
          const response = votar(partidoPolitico, "diputados")
        }
        else if (id =="diputadoIzquierda") {
          const partidoPolitico = "Frente de izquierda"
          const response = votar(partidoPolitico, "diputados")
        }
        else if (id =="diputadoTodos") {
          const partidoPolitico = "Todos"
                      const response = votar(partidoPolitico, "diputados")
        }
        else if (id =="diputadoConsenso") {
          const partidoPolitico = "Consenso"
          const response = votar(partidoPolitico, "diputados")
                }
        else if (id =="diputadoJuntos") {
          const partidoPolitico = "Juntos por el cambio"
          const response = votar(partidoPolitico, "diputados")
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