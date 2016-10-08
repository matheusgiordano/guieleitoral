angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
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
