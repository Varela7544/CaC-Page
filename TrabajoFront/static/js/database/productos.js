const { createApp } = Vue
createApp({
    data() {
        return {
            presidentes: [],
            //url:'http://localhost:5000/productos',
            // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'https://claracabrera.pythonanywhere.com/presidentes', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            boleta: "",
            id: 0,
            partido: "",
            presidente: "",
            vicepresidente: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.presidente = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(presidente) {
            const url = this.url + '/' + presidente;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let presidente = {
                presidente: this.presidente,
                vicepresidente: this.vicepresidente,
                partido: this.partido,
                boleta: this.boleta
            }
            var options = {
                body: JSON.stringify(presidente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../templates/productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')