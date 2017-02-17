angular.module('starter.services', [])

.factory('ListaHistorico', function($q){
  var db;

  function createDB(){
    try{
      db = openDatabase('historicoDB', '1.0', 'Histórico de consultas em quiz', 2 * 1024 * 1024);
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY ASC, id_cargo INTEGER, descricao_cargo varchar(20), estado varchar(25), estado_nome varchar(40), data_historico TEXT)');
      });
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico_resposta (id INTEGER PRIMARY KEY ASC, id_historico INTEGER, pergunta INTEGER, resposta INTEGER)');
      });
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS historico_resultado (id INTEGER PRIMARY KEY ASC, id_historico INTEGER, id_candidato INTEGER, score INTEGER)');
      });
    }catch(erro){
      alert("Erro: " + erro);
    }
    console.log("Banco criado com sucesso !");
  }
  
  function createHistorico(id_cargo, cargo, estado, estado_nome, data_historico){
    return promisedQuery("INSERT INTO historico(id_cargo, descricao_cargo, estado, estado_nome, data_historico) VALUES ('" + id_cargo + "', '" + cargo + "', '"+ estado + "', '" + estado_nome + "', '"+ data_historico +"')",
      defaultResultHandler,
      defaultErrorHandler);
  }

  function createRespostas(id_historico, pergunta, resposta){
    return promisedQuery("INSERT INTO historico_resposta(id_historico, pergunta, resposta) VALUES ('" + id_historico + "', '" + pergunta + "', '" + resposta + "')",
      defaultResultHandlerResposta,
      defaultErrorHandler);
  }

  function createResultado(id_historico, id_candidato, score){
    return promisedQuery("INSERT INTO historico_resultado(id_historico, id_candidato, score) VALUES ('"+ id_historico + "', '"  + id_candidato + "', '" + score + "')",
      defaultResultHandlerResultado,
      defaultErrorHandler);
  }

  function getRespostas(id){
    return promisedQuery("SELECT * FROM historico_resposta WHERE id_historico = '"+ id +"'",
      defaultResultHandlerResposta,
      defaultErrorHandler);
  }

  function getResultados(id){
    return promisedQuery("SELECT * FROM historico_resultado WHERE id_historico = '"+ id +"'",
      defaultResultHandlerResultado,
      defaultErrorHandler);
  }

  function getHistoricos(){
    return promisedQuery('SELECT * FROM historico ORDER BY id DESC ',
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

  function defaultResultHandlerResultado(deferred) {
    return function(tx, results) {
      var len = results.rows.length,
      outputResultsResultado = [];

      for (var i=0; i<len; i++){
        var historico_resultado = {
          'id'  : results.rows.item(i).id,
          'id_historico'  : results.rows.item(i).id_historico,
          'id_candidato' : results.rows.item(i).id_candidato,
          'score' : results.rows.item(i).score
        };
        outputResultsResultado.push(historico_resultado);
      }
      deferred.resolve(outputResultsResultado);
    }
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

  function destroy_resultados(id){
   return promisedQuery("DELETE FROM historico_resultado where id_historico = " + id,
    defaultResultHandler,
    defaultErrorHandler); 
  }

  function destroy_respostas(id){
   return promisedQuery("DELETE FROM historico_resposta where id_historico = " + id,
    defaultResultHandler,
    defaultErrorHandler); 
  }
  
  function destroy(id){
   destroy_respostas(id);
   destroy_resultados(id);
   return promisedQuery("DELETE FROM historico where id = " + id,
    defaultResultHandler,
    defaultErrorHandler);
  }

  return {
    createDB: function(){
      return createDB();
    },
    create: function(id_cargo, cargo, estado, estado_nome, data_historico) {
      return createHistorico(id_cargo, cargo, estado, estado_nome, data_historico);
    },
    createRespostas: function(id_historico, pergunta, resposta) {
      return createRespostas(id_historico, pergunta, resposta);
    },
    createResultado: function(id_historico, id_candidato, score) {
      return createResultado(id_historico, id_candidato, score);
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
    all_resultados: function(id) {
      return getResultados(id);
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
    sigla: 'BR',
    bandeira: 'img/estados/federal.png',
    tipo : "federal"
  },
  {
    id: 1,
    nome: 'Acre',
    url: 'acre',
    sigla: 'AC',
    bandeira: 'img/estados/acre.png',
    tipo: "estadual"
  },
  {
    id: 2,
    nome: 'Alagoas',
    url: 'alagoas',
    sigla: 'AL',
    bandeira: 'img/estados/alagoas.png',
    tipo: "estadual"
  },
  {
    id: 3,
    nome: 'Amapá',
    url: 'amapa',
    sigla: 'AP',
    bandeira: 'img/estados/amapa.png',
    tipo: "estadual"
  },
  {
    id: 4,
    nome: 'Amazonas',
    url: 'amazonas',
    sigla: 'AM',
    bandeira: 'img/estados/amazonas.png',
    tipo: "estadual"
  },
  {
    id: 5,
    nome: 'Bahia',
    url: 'bahia',
    sigla: 'BA',
    bandeira: 'img/estados/bahia.png',
    tipo: "estadual"
  },
  {
    id: 6,
    nome: 'Ceará',
    url: 'ceara',
    sigla: 'CE',
    bandeira: 'img/estados/ceara.png',
    tipo: "estadual"
  },
  {
    id: 7,
    nome: 'Distrito Federal',
    url: 'distrito_federal',
    sigla: 'DF',
    bandeira: 'img/estados/distrito_federal.png',
    tipo: "estadual"
  },
  {
    id: 8,
    nome: 'Espírito Santo',
    url: 'espiritosanto',
    sigla: 'ES',
    bandeira: 'img/estados/espiritosanto.png',
    tipo: "estadual"
  },
  {
    id: 9,
    nome: 'Goiás',
    url: 'goias',
    sigla: 'GO',
    bandeira: 'img/estados/goias.png',
    tipo: "estadual"
  },
  {
    id: 10,
    nome: 'Maranhão',
    url: 'maranhao',
    sigla: 'MA',
    bandeira: 'img/estados/maranhao.png',
    tipo: "estadual"
  },
  {
    id: 11,
    nome: 'Mato Grosso',
    url: 'mato_grosso',
    sigla: 'MT',
    bandeira: 'img/estados/mato_grosso.png',
    tipo: "estadual"
  },
  {
    id: 12,
    nome: 'Mato Grosso do Sul',
    url: 'mato_grosso_do_sul',
    sigla: 'MS',
    bandeira: 'img/estados/mato_grosso_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 13,
    nome: 'Minas Gerais',
    url: 'minas_gerais',
    sigla: 'MG',
    bandeira: 'img/estados/minas_gerais.png',
    tipo: "estadual"
  },
  {
    id: 14,
    nome: 'Pará',
    url: 'para',
    sigla: 'PA',
    bandeira: 'img/estados/para.png',
    tipo: "estadual"
  },
  {
    id: 15,
    nome: 'Paraíba',
    url: 'paraiba',
    sigla: 'PB',
    bandeira: 'img/estados/paraiba.png',
    tipo: "estadual"
  },
  {
    id: 16,
    nome: 'Paraná',
    url: 'parana',
    sigla: 'PR',
    bandeira: 'img/estados/parana.png',
    tipo: "estadual"
  },
  {
    id: 17,
    nome: 'Pernambuco',
    url: 'pernambuco',
    sigla: 'PE',
    bandeira: 'img/estados/pernambuco.png',
    tipo: "estadual"
  },
  {
    id: 18,
    nome: 'Piauí',
    url: 'piaui',
    sigla: 'PI',
    bandeira: 'img/estados/piaui.png',
    tipo: "estadual"
  },
  {
    id: 19,
    nome: 'Rio de Janeiro',
    url: 'rio_de_janeiro',
    sigla: 'RJ',
    bandeira: 'img/estados/rio_de_janeiro.png',
    tipo: "estadual"
  },
  {
    id: 20,
    nome: 'Rio Grande do Norte',
    url: 'rio_grande_do_norte',
    sigla: 'RN',
    bandeira: 'img/estados/rio_grande_do_norte.png',
    tipo: "estadual"
  },
  {
    id: 21,
    nome: 'Rio Grande do Sul',
    url: 'rio_grande_do_sul',
    sigla: 'RS',
    bandeira: 'img/estados/rio_grande_do_sul.png',
    tipo: "estadual"
  },
  {
    id: 22,
    nome: 'Rondônia',
    url: 'rondonia',
    sigla: 'RO',
    bandeira: 'img/estados/rondonia.png',
    tipo: "estadual"
  },
  {
    id: 23,
    nome: 'Roraima',
    url: 'roraima',
    sigla: 'RR',
    bandeira: 'img/estados/roraima.png',
    tipo: "estadual"
  },
  {
    id: 24,
    nome: 'Santa Catarina',
    url: 'santa_catarina',
    sigla: 'SC',
    bandeira: 'img/estados/santa_catarina.png',
    tipo: "estadual"
  },
  {
    id: 25,
    nome: 'São Paulo',
    url: 'sao_paulo',
    sigla: 'SP',
    bandeira: 'img/estados/sao_paulo.png',
    tipo: "estadual"
  },
  {
    id: 26,
    nome: 'Sergipe',
    url: 'sergipe',
    sigla: 'SE',
    bandeira: 'img/estados/sergipe.png',
    tipo: "estadual"
  },
  {
    id: 27,
    nome: 'Tocantins',
    url: 'tocantins',
    sigla: 'TO',
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
    },
    getSigla: function(sigla) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i].sigla === sigla) {
          return estados[i];
        }
      }
      return null;
    }
  };
});
