angular.module('starter.services', [])

.factory('ListaHistorico', function($q){
  var db;

  function createDB(){
    try{
      db = openDatabase('historicoDB', '1.0', 'Histórico de consultas em quiz', 2 * 1024 * 1024);
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY ASC, id_cargo INTEGER, descricao_cargo varchar(20), estado varchar(25), score_resultado_1 INTEGER, id_resultado_1 INTEGER, score_resultado_2 INTEGER, id_resultado_2 INTEGER, score_resultado_3 INTEGER, id_resultado_3 INTEGER, score_resultado_4 INTEGER, id_resultado_4 INTEGER, score_resultado_5 INTEGER, id_resultado_5 INTEGER )');
      });
    }catch(erro){
      alert("Erro: " + erro);
    }
    console.log("Banco criado com sucesso !");
  }
  
  function createHistorico(id_cargo, cargo, estado, score_compativeis_historico, id_compativeis_historico){
    console.log(cargo);
    return promisedQuery("INSERT INTO historico(id_cargo, descricao_cargo, estado, score_resultado_1, id_resultado_1, score_resultado_2, id_resultado_2, score_resultado_3, id_resultado_3, score_resultado_4, id_resultado_4, score_resultado_5, id_resultado_5) VALUES ('" + id_cargo + "', '" + cargo + "', '"+ estado + "', '"+ score_compativeis_historico[0] + "', '"+ id_compativeis_historico[0] + "', '"+ score_compativeis_historico[1] +"', '"+ id_compativeis_historico[1] +"', '"+ score_compativeis_historico[2] +"', '"+ id_compativeis_historico[2] +"', '"+ score_compativeis_historico[3] +"', '"+ id_compativeis_historico[3] +"', '"+ score_compativeis_historico[4] +"', '"+ score_compativeis_historico[4] +"')",
      defaultResultHandler,
      defaultErrorHandler);
  }

  function getHistoricos(){
    return promisedQuery('SELECT * FROM historico ORDER BY estado DESC',
      defaultResultHandler,
      defaultErrorHandler);
  }

  function promisedQuery(query, successCallback, errorCallback) {
    var deferred = $q.defer();
    db.transaction(function(tx){
      tx.executeSql(query, [], successCallback(deferred), errorCallback(deferred));
    }, errorCallback);
    return deferred.promise;
  }
        

  function defaultResultHandler(deferred) {
    return function(tx, results) {
      var len = results.rows.length,
      outputResults = [];

      for (var i=0; i<len; i++){
        var historico = {
          'id'  : results.rows.item(i).id,
          'cargo': results.rows.item(i).id_cargo,
          'estado': results.rows.item(i).estado,
          'score_resultado_1': results.rows.item(i).score_resultado_1,
          'id_resultado_1': results.rows.item(i).id_resultado_1,
          'score_resultado_2': results.rows.item(i).score_resultado_2,
          'id_resultado_2': results.rows.item(i).id_resultado_2,
          'score_resultado_3': results.rows.item(i).score_resultado_3,
          'id_resultado_3': results.rows.item(i).id_resultado_3,
          'score_resultado_4': results.rows.item(i).score_resultado_4,
          'id_resultado_4': results.rows.item(i).id_resultado_4,
          'score_resultado_5': results.rows.item(i).score_resultado_5,
          'id_resultado_5': results.rows.item(i).id_resultado_5
        };
        outputResults.push(historico);
      }
      deferred.resolve(outputResults);
    }
  }


  function defaultErrorHandler(deferred) {
    console.log("AQUI");
    return function(tx, results) {
      var len = 0;
      var outputResults = '';
      deferred.resolve(outputResults);
    }
  }

  return {
    createDB: function(){
      return createDB();
    },
    create: function(id_cargo, cargo, estado, score_compativeis_historico, id_compativeis_historico) {
      return createHistorico(id_cargo, cargo, estado, score_compativeis_historico, id_compativeis_historico);
    },
    all: function() {
      return getHistoricos();
    }
  };

})

.factory('Estados', function() {
  var estados = [{
    id: 0,
    nome: 'Federal',
    bandeira: 'img/brasil.png',
    tipo : "federal"
  },
  {
    id: 1,
    nome: 'Acre',
    bandeira: 'img/estados/acre.jpg',
    tipo: "estadual"
  },
  {
    id: 2,
    nome: 'Alagoas',
    bandeira: 'img/estados/alagoas.png',
    tipo: "estadual"
  },
  {
    id: 3,
    nome: 'Amazonas',
    bandeira: 'img/estados/amazonas.png',
    tipo: "estadual"
  },
  {
    id: 4,
    nome: 'Amapá',
    bandeira: 'img/estados/amapa.png',
    tipo: "estadual"
  },
  {
    id: 5,
    nome: 'Bahia',
    bandeira: 'img/estados/bahia.png',
    tipo: "estadual"
  },
  {
    id: 6,
    nome: 'Ceará',
    bandeira: 'img/estados/ceara.png',
    tipo: "estadual"
  },
  {
    id: 7,
    nome: 'Espírito Santo',
    bandeira: 'img/estados/espiritosanto.png',
    tipo: "estadual"
  },
  {
    id: 8,
    nome: 'Goiás',
    bandeira: 'img/estados/goias.png',
    tipo: "estadual"
  },
  {
    id: 9,
    nome: 'Maranhão',
    bandeira: 'img/estados/maranhao.png',
    tipo: "estadual"
  },
  {
    id: 10,
    nome: 'Mato Grosso',
    bandeira: 'img/estados/mato_grosso.png',
    tipo: "estadual"
  },
  {
    id: 11,
    nome: 'Mato Grosso do Sul',
    bandeira: 'img/estados/mato_grosso_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 12,
    nome: 'Minas Gerais',
    bandeira: 'img/estados/minas_gerais.png',
    tipo: "estadual"
  },
  {
    id: 13,
    nome: 'Pará',
    bandeira: 'img/estados/para.png'
  },
  {
    id: 14,
    nome: 'Paraíba',
    bandeira: 'img/estados/paraiba.png',
    tipo: "estadual"
  },
  {
    id: 15,
    nome: 'Paraná',
    bandeira: 'img/estados/parana.png',
    tipo: "estadual"
  },
  {
    id: 16,
    nome: 'Pernambuco',
    bandeira: 'img/estados/pernambuco.png',
    tipo: "estadual"
  },
  {
    id: 17,
    nome: 'Piauí',
    bandeira: 'img/estados/piaui.png',
    tipo: "estadual"
  },
  {
    id: 18,
    nome: 'Rio de Janeiro',
    bandeira: 'img/estados/rio_de_janeiro.png',
    tipo: "estadual"
  },
  {
    id: 19,
    nome: 'Rio Grande do Norte',
    bandeira: 'img/estados/rio_grande_do_norte.png',
    tipo: "estadual"
  },
  {
    id: 20,
    nome: 'Rio Grande do Sul',
    bandeira: 'img/estados/rio_grande_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 21,
    nome: 'Rondônia',
    bandeira: 'img/estados/rondonia.png',
    tipo: "estadual"
  },
  {
    id: 22,
    nome: 'Roraima',
    bandeira: 'img/estados/roraima.png',
    tipo: "estadual"
  },
  {
    id: 23,
    nome: 'Santa Catarina',
    bandeira: 'img/estados/santa_catarina.png',
    tipo: "estadual"
  },
  {
    id: 24,
    nome: 'São Paulo',
    bandeira: 'img/estados/sao_paulo.png',
    tipo: "estadual"
  },
  {
    id: 25,
    nome: 'Sergipe',
    bandeira: 'img/estados/sergipe.png',
    tipo: "estadual"
  },
  {
    id: 26,
    nome: 'Tocantins',
    bandeira: 'img/estados/tocantins.png',
    tipo: "estadual"
  }
  ];

  return {
    all: function() {
      return estados;
    },
    remove: function(estado) {
      estados.splice(estdos.indexOf(estado), 1);
    },
    get: function(tipo) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i].tipo === tipo) {
          return estados[i];
        }
      }
      return null;
    }
  };
});
