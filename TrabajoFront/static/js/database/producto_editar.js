console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue

createApp({
    data() {
        return {
            boleta: "",
            id: 0,
            partido: "",
            presidente: "",
            vicepresidente: "",
            url: 'https://varel4.pythonanywhere.com/presidentes' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.presidente = data.presidente;
                    this.boleta = data.boleta
                    this.partido = data.partido
                    this.vicepresidente = data.vicepresidente
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let candidato = {
                presidente: this.presidente,
                vicepresidente: this.vicepresidente,
                partido: this.partido,
                boleta: this.boleta
            }
            var options = {
                body: JSON.stringify(candidato),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "../templates/productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')