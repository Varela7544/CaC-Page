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
      titular: "",
      idSenador: "",
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
          console.log(this.presidentes);
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
          this.cargando = false;
        });
    },
    eliminar(producto) {
      const url = this.url + "/" + producto;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          location.reload();
        });
    },
    grabar() {
      let boleta = {
        titular: this.titular,
        idSenadores: this.idSenador,
        partido: this.partido,
        boleta: this.boleta,
      };
      var options = {
        body: JSON.stringify(boleta),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "./senadores.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabarr");
        });
    }
  },
  created() {
    this.fetchData(this.url);
  },
  update() {
    this.buscar();
  },
}).mount("#app");
