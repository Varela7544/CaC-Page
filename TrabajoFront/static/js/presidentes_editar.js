console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.substr(4);
console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      id: 0,
      presidente: "",
      vicepresidente: "",
      idPresindente: "",
      partido: "",
      boleta: "",
      url: "https://francobarral.pythonanywhere.com/presidentes/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.presidente = data.presidente;
          this.vicepresidente = data.vicepresidente;
          this.idPresindente = data.idPresindente;
          this.partido = data.partido;
          this.boleta = data.boleta;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let candidato = {
        presidente: this.presidente,
        vicepresidente: this.vicepresidente,
        idPresindente: this.idPresindente,
        partido: this.partido,
        boleta: this.boleta,
      };
      var options = {
        body: JSON.stringify(candidato),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href = "./presidentes.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
