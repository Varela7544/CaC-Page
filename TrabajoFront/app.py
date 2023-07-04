from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend


# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:1234567@localhost/proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino la tabla
class Presidentes(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    idPresindente=db.Column(db.String(255))
    presidente=db.Column(db.String(100))
    vicepresidente=db.Column(db.String(100))
    partido = db.Column(db.String(255))
    boleta = db.Column(db.String(400))

    def _init_(self,presidente,vicepresidente,partido,boleta):
        self.presidente=presidente
        self.vicepresidente=vicepresidente
        self.partido=partido
        self.boleta=boleta

class Senadores(db.Model): # la clase Product
    id=db.Column(db.Integer, primary_key=True)
    idSenador=db.Column(db.String(255))   #define los campos de la tabla
    titular=db.Column(db.String(100))
    partido = db.Column(db.String(255))
    boleta = db.Column(db.String(400))

    def _init_(self,titular,partido,boleta):
        self.titular=titular
        self.partido=partido
        self.boleta=boleta

class Diputados(db.Model):
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    idDiputado=db.Column(db.String(255))
    titular=db.Column(db.String(100))
    partido = db.Column(db.String(255))
    boleta = db.Column(db.String(400))

    def _init_(self,titular,partido,boleta):
        self.titular=titular
        self.partido=partido
        self.boleta=boleta



    #  si hay que crear mas tablas , se hace aqui




with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class PresidentesSchema(ma.Schema):
    class Meta:
        fields=('id','presidente','vicepresidente','partido','boleta','idPresindente')

class SenadoresSchema(ma.Schema):
    class Meta:
        fields=('id','titular','partido','boleta','idSenador')

class DiputadosSchema(ma.Schema):
    class Meta:
        fields=('id','titular','partido','boleta', 'idDiputado')




presidente_schema=PresidentesSchema()            # El objeto producto_schema es para traer un producto
presidentes_schema=PresidentesSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

senador_schema=SenadoresSchema()
senadores_schema=SenadoresSchema(many=True)

diputado_schema=DiputadosSchema()
diputados_schema=DiputadosSchema(many=True)



@app.route("/presidentes", methods=["GET"])
def get_presidentes():
    presidente = Presidentes.query.all()

    result = presidentes_schema.dump(presidente)

    return jsonify(result)

@app.route("/senadores", methods=["GET"])
def get_senadores():
    senadores = Senadores.query.all()

    result = senadores_schema.dump(senadores)

    return jsonify(result)

@app.route("/diputados", methods=["GET"])
def get_diputados():
    diputados = Diputados.query.all()

    result = diputados_schema.dump(diputados)

    return jsonify(result)

@app.route("/presidentes", methods=["POST"])
def create_presidentes():
    presidente = request.json["presidente"]
    idPresidente = request.json["idPresidente"]
    vicepresidente = request.json["vicepresidente"]
    partido = request.json["partido"]
    boleta = request.json["boleta"]

    new_presidente = Presidentes(presidente=presidente, vicepresidente=vicepresidente, partido=partido, boleta=boleta, idPresindente=idPresidente)

    db.session.add(new_presidente)
    db.session.commit()
    return presidente_schema.jsonify(new_presidente)


@app.route("/diputados", methods=["POST"])
def create_diputados():
    titular = request.json["titular"]
    idDiputados = request.json["idDiputados"]
    partido = request.json["partido"]
    boleta = request.json["boleta"]

    new_diputado = Diputados(titular=titular,partido=partido,boleta=boleta, idDiputado=idDiputados)

    db.session.add(new_diputado)
    db.session.commit()
    return presidente_schema.jsonify(new_diputado)

@app.route("/senadores", methods=["POST"])
def create_senadores():
    titular = request.json["titular"]
    idSenadores = request.json["idSenadores"]
    partido = request.json["partido"]
    boleta = request.json["boleta"]

    new_senador = Senadores(titular=titular,partido=partido,boleta=boleta, idSenador=idSenadores)

    db.session.add(new_senador)
    db.session.commit()
    return presidente_schema.jsonify(new_senador)


@app.route('/presidentes/<id>', methods=["GET"])
def get_presidente_id(id):
    presidente = Presidentes.query.get(id)

    return presidente_schema.jsonify(presidente)


@app.route('/diputados/<id>', methods=["GET"])
def get_diputados_id(id):
    diputados = Diputados.query.get(id)

    return diputado_schema.jsonify(diputados)


@app.route('/senadores/<id>', methods=["GET"])
def get_senadores_id(id):
    senadores = Senadores.query.get(id)

    return senador_schema.jsonify(senadores)


@app.route('/presidentes/<id>', methods=["DELETE"])
def delete_presidente(id):
    presidente = Presidentes.query.get(id)
    db.session.delete(presidente)
    db.session.commit()

    return presidente_schema.jsonify(presidente)

@app.route('/diputados/<id>', methods=["DELETE"])
def delete_diputados(id):
    diputados = Diputados.query.get(id)
    db.session.delete(diputados)
    db.session.commit()

    return diputado_schema.jsonify(diputados)

@app.route('/senadores/<id>', methods=["DELETE"])
def delete_senadores(id):
    senadores = Senadores.query.get(id)
    db.session.delete(senadores)
    db.session.commit()

    return senador_schema.jsonify(senadores)

@app.route('/presidentes/<id>', methods=["PUT"])
def update_presidente(id):
    presidentes = Presidentes.query.get(id)
    presidente = request.json['presidente']
    vicepresidente = request.json['vicepresidente']
    partido = request.json['partido']
    boleta = request.json['boleta']
    presidentes.presidente = presidente
    presidentes.vicepresidente = vicepresidente
    presidentes.partido = partido
    presidentes.boleta = boleta

    db.session.commit()

    return presidente_schema.jsonify(presidentes)

@app.route('/diputados/<id>', methods=["PUT"])
def update_diputados(id):
    diputados = Diputados.query.get(id)
    titular = request.json["titular"]
    partido = request.json["partido"]
    boleta = request.json["boleta"]

    diputados.titular = titular
    diputados.partido = partido
    diputados.boleta = boleta
    
    db.session.commit()

    return diputado_schema.jsonify(diputados)


@app.route('/senadores/<id>', methods=["PUT"])
def update_senadores(id):
    senadores = Senadores.query.get(id)
    titular = request.json["titular"]
    partido = request.json["partido"]
    boleta = request.json["boleta"]

    senadores.titular = titular
    senadores.partido = partido
    senadores.boleta = boleta

    db.session.commit()

    return senador_schema.jsonify(senadores)
    

# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000) 