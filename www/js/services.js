angular.module('starter.services', [])

.factory('ListaHistorico', function($q){
  var db;

  function createDB(){
    try{
      db = openDatabase('historicoDB', '1.0', 'Histórico de consultas em quiz', 2 * 1024 * 1024);
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY ASC, id_cargo INTEGER, descricao_cargo varchar(20), estado varchar(25), estado_nome varchar(40), score_resultado_1 INTEGER, id_resultado_1 INTEGER, score_resultado_2 INTEGER, id_resultado_2 INTEGER, score_resultado_3 INTEGER, id_resultado_3 INTEGER, score_resultado_4 INTEGER, id_resultado_4 INTEGER, score_resultado_5 INTEGER, id_resultado_5 INTEGER, data_historico TEXT)');
      });
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico_resposta (id INTEGER PRIMARY KEY ASC, id_historico INTEGER, pergunta INTEGER, resposta INTEGER)');
      });
    }catch(erro){
      alert("Erro: " + erro);
    }
    console.log("Banco criado com sucesso !");
  }
  
  function createHistorico(id_cargo, cargo, estado, estado_nome, score_compativeis_historico, id_compativeis_historico, data_historico){
    return promisedQuery("INSERT INTO historico(id_cargo, descricao_cargo, estado, estado_nome, score_resultado_1, id_resultado_1, score_resultado_2, id_resultado_2, score_resultado_3, id_resultado_3, score_resultado_4, id_resultado_4, score_resultado_5, id_resultado_5, data_historico) VALUES ('" + id_cargo + "', '" + cargo + "', '"+ estado + "', '" + estado_nome + "', '"+ score_compativeis_historico[0] + "', '"+ id_compativeis_historico[0] + "', '"+ score_compativeis_historico[1] +"', '"+ id_compativeis_historico[1] +"', '"+ score_compativeis_historico[2] +"', '"+ id_compativeis_historico[2] +"', '"+ score_compativeis_historico[3] +"', '"+ id_compativeis_historico[3] +"', '"+ score_compativeis_historico[4] +"', '"+ score_compativeis_historico[4] +"', '"+ data_historico +"')",
      defaultResultHandler,
      defaultErrorHandler);
  }

  function createRespostas(id_historico, pergunta, resposta){
    return promisedQuery("INSERT INTO historico_resposta(id_historico, pergunta, resposta) VALUES ('" + id_historico + "', '" + pergunta + "', '" + resposta + "')",
      defaultResultHandlerResposta,
      defaultErrorHandler);
  }

  function getRespostas(id){
    return promisedQuery("SELECT * FROM historico_resposta WHERE id_historico = '"+ id +"'",
      defaultResultHandlerResposta,
      defaultErrorHandler);
  }

  function getHistoricos(){
    return promisedQuery('SELECT * FROM historico ORDER BY id DESC',
      defaultResultHandler,
      defaultErrorHandler);
  }

  function lastHistorico(){
    return promisedQuery('SELECT id FROM historico ORDER BY id DESC LIMIT 1',
      defaultResultHandler,
      defaultErrorHandler);
  }  

  function getDatas(){
    return promisedQuery('SELECT data_historico FROM historico GROUP BY data_historico ORDER BY id DESC ',
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

  function defaultResultHandlerResposta(deferred) {
    return function(tx, results) {
      var len = results.rows.length,
      outputResultsRespostas = [];

      for (var i=0; i<len; i++){
        var historico_resposta = {
          'id'  : results.rows.item(i).id,
          'id_historico'  : results.rows.item(i).id_historico,
          'pergunta': results.rows.item(i).pergunta,
          'resposta': results.rows.item(i).resposta
        };
        outputResultsRespostas.push(historico_resposta);
      }
      deferred.resolve(outputResultsRespostas);
    }
  }
        

  function defaultResultHandler(deferred) {
    return function(tx, results) {
      var len = results.rows.length,
      outputResults = [];

      for (var i=0; i<len; i++){
        var historico = {
          'id'  : results.rows.item(i).id,
          'cargo': results.rows.item(i).id_cargo,
          'descricao_cargo': results.rows.item(i).descricao_cargo,
          'estado': results.rows.item(i).estado,
          'estado_nome': results.rows.item(i).estado_nome,
          'score_resultado_1': results.rows.item(i).score_resultado_1,
          'id_resultado_1': results.rows.item(i).id_resultado_1,
          'score_resultado_2': results.rows.item(i).score_resultado_2,
          'id_resultado_2': results.rows.item(i).id_resultado_2,
          'score_resultado_3': results.rows.item(i).score_resultado_3,
          'id_resultado_3': results.rows.item(i).id_resultado_3,
          'score_resultado_4': results.rows.item(i).score_resultado_4,
          'id_resultado_4': results.rows.item(i).id_resultado_4,
          'score_resultado_5': results.rows.item(i).score_resultado_5,
          'id_resultado_5': results.rows.item(i).id_resultado_5,
          'data_historico': results.rows.item(i).data_historico
        };
        outputResults.push(historico);
      }
      deferred.resolve(outputResults);
    }
  }


  function defaultErrorHandler(deferred) {
    return function(tx, results) {
      var len = 0;
      var outputResults = '';
      deferred.resolve(outputResults);
    }
  }

  function destroy(id){
   return promisedQuery("DELETE FROM historico where id = " + id,
    defaultResultHandler,
    defaultErrorHandler);
  }

  return {
    createDB: function(){
      return createDB();
    },
    create: function(id_cargo, cargo, estado, estado_nome, score_compativeis_historico, id_compativeis_historico, data_historico) {
      return createHistorico(id_cargo, cargo, estado, estado_nome, score_compativeis_historico, id_compativeis_historico, data_historico);
    },
    createRespostas: function(id_historico, pergunta, resposta) {
      return createRespostas(id_historico, pergunta, resposta);
    },
    lastHistorico: function(){
      return lastHistorico();
    },
    all: function() {
      return getHistoricos();
    },
    all_respostas: function(id) {
      return getRespostas(id);
    },
    all_dates: function(){
      return getDatas();
    },
    destroy: function(id){
      return destroy(id);
    }
  };

})

.factory('Estados', function() {
  var estados = [{
    id: 0,
    nome: 'Federal',
    url: 'federal',
    bandeira: 'img/estados/federal.png',
    tipo : "federal"
  },
  {
    id: 1,
    nome: 'Acre',
    url: 'acre',
    bandeira: 'img/estados/acre.png',
    tipo: "estadual"
  },
  {
    id: 2,
    nome: 'Alagoas',
    url: 'alagoas',
    bandeira: 'img/estados/alagoas.png',
    tipo: "estadual"
  },
  {
    id: 3,
    nome: 'Amazonas',
    url: 'amazonas',
    bandeira: 'img/estados/amazonas.png',
    tipo: "estadual"
  },
  {
    id: 4,
    nome: 'Amapá',
    url: 'amapa',
    bandeira: 'img/estados/amapa.png',
    tipo: "estadual"
  },
  {
    id: 5,
    nome: 'Bahia',
    url: 'bahia',
    bandeira: 'img/estados/bahia.png',
    tipo: "estadual"
  },
  {
    id: 6,
    nome: 'Ceará',
    url: 'ceara',
    bandeira: 'img/estados/ceara.png',
    tipo: "estadual"
  },
  {
    id: 7,
    nome: 'Espírito Santo',
    url: 'espiritosanto',
    bandeira: 'img/estados/espiritosanto.png',
    tipo: "estadual"
  },
  {
    id: 8,
    nome: 'Goiás',
    url: 'goias',
    bandeira: 'img/estados/goias.png',
    tipo: "estadual"
  },
  {
    id: 9,
    nome: 'Maranhão',
    url: 'maranhao',
    bandeira: 'img/estados/maranhao.png',
    tipo: "estadual"
  },
  {
    id: 10,
    nome: 'Mato Grosso',
    url: 'mato_grosso',
    bandeira: 'img/estados/mato_grosso.png',
    tipo: "estadual"
  },
  {
    id: 11,
    nome: 'Mato Grosso do Sul',
    url: 'mato_grosso_do_sul',
    bandeira: 'img/estados/mato_grosso_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 12,
    nome: 'Minas Gerais',
    url: 'minas_gerais',
    bandeira: 'img/estados/minas_gerais.png',
    tipo: "estadual"
  },
  {
    id: 13,
    nome: 'Pará',
    url: 'para',
    bandeira: 'img/estados/para.png',
    tipo: "estadual"
  },
  {
    id: 14,
    nome: 'Paraíba',
    url: 'paraiba',
    bandeira: 'img/estados/paraiba.png',
    tipo: "estadual"
  },
  {
    id: 15,
    nome: 'Paraná',
    url: 'parana',
    bandeira: 'img/estados/parana.png',
    tipo: "estadual"
  },
  {
    id: 16,
    nome: 'Pernambuco',
    url: 'pernambuco',
    bandeira: 'img/estados/pernambuco.png',
    tipo: "estadual"
  },
  {
    id: 17,
    nome: 'Piauí',
    url: 'piaui',
    bandeira: 'img/estados/piaui.png',
    tipo: "estadual"
  },
  {
    id: 18,
    nome: 'Rio de Janeiro',
    url: 'rio_de_janeiro',
    bandeira: 'img/estados/rio_de_janeiro.png',
    tipo: "estadual"
  },
  {
    id: 19,
    nome: 'Rio Grande do Norte',
    url: 'rio_grande_do_norte',
    bandeira: 'img/estados/rio_grande_do_norte.png',
    tipo: "estadual"
  },
  {
    id: 20,
    nome: 'Rio Grande do Sul',
    url: 'rio_grande_do_sul',
    bandeira: 'img/estados/rio_grande_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 21,
    nome: 'Rondônia',
    url: 'rondonia',
    bandeira: 'img/estados/rondonia.png',
    tipo: "estadual"
  },
  {
    id: 22,
    nome: 'Roraima',
    url: 'roraima',
    bandeira: 'img/estados/roraima.png',
    tipo: "estadual"
  },
  {
    id: 23,
    nome: 'Santa Catarina',
    url: 'santa_catarina',
    bandeira: 'img/estados/santa_catarina.png',
    tipo: "estadual"
  },
  {
    id: 24,
    nome: 'São Paulo',
    url: 'sao_paulo',
    bandeira: 'img/estados/sao_paulo.png',
    tipo: "estadual"
  },
  {
    id: 25,
    nome: 'Sergipe',
    url: 'sergipe',
    bandeira: 'img/estados/sergipe.png',
    tipo: "estadual"
  },
  {
    id: 26,
    nome: 'Tocantins',
    url: 'tocantins',
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
    },
    getNome: function(nome) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i].nome === nome) {
          return estados[i];
        }
      }
      return null;
    },    
    getUrl: function(url) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i].url === url) {
          return estados[i];
        }
      }
      return null;
    }
  };
});
