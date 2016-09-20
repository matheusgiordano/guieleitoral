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
    bandeira: 'img/brasil.png'
  },
  {
    id: 1,
    nome: 'Acre',
    bandeira: 'img/ben.png'
  },
  {
    id: 2,
    nome: 'Alagoas',
    bandeira: 'img/ben.png'
  },
  {
    id: 3,
    nome: 'Amazonas',
    bandeira: 'img/ben.png'
  },
  {
    id: 4,
    nome: 'Amapá',
    bandeira: 'img/ben.png'
  },
  {
    id: 5,
    nome: 'Bahia',
    bandeira: 'img/ben.png'
  },
  {
    id: 6,
    nome: 'Ceará',
    bandeira: 'img/ben.png'
  },
  {
    id: 7,
    nome: 'Espírito Sato',
    bandeira: 'img/ben.png'
  },
  {
    id: 8,
    nome: 'Goiás',
    bandeira: 'img/ben.png'
  },
  {
    id: 9,
    nome: 'Maranhão',
    bandeira: 'img/ben.png'
  },
  {
    id: 10,
    nome: 'Minas Gerais',
    bandeira: 'img/ben.png'
  },
  {
    id: 11,
    nome: 'Mato Grosso do Sul',
    bandeira: 'img/ben.png'
  },
  {
    id: 12,
    nome: 'Mato Grosso',
    bandeira: 'img/ben.png'
  },
  {
    id: 13,
    nome: 'Pará',
    bandeira: 'img/ben.png'
  },
  {
    id: 14,
    nome: 'Paraíba',
    bandeira: 'img/ben.png'
  },
  {
    id: 15,
    nome: 'Pernambuco',
    bandeira: 'img/ben.png'
  },
  {
    id: 16,
    nome: 'Piauí',
    bandeira: 'img/ben.png'
  },
  {
    id: 17,
    nome: 'Paraná',
    bandeira: 'img/ben.png'
  },
  {
    id: 18,
    nome: 'Rio de Janeiro',
    bandeira: 'img/ben.png'
  },
  {
    id: 19,
    nome: 'Rio Grande do Norte',
    bandeira: 'img/ben.png'
  }
  ];

  return {
    all: function() {
      return estados;
    },
    remove: function(estado) {
      estados.splice(estdos.indexOf(estado), 1);
    },
    get: function(estadoId) {
      for (var i = 0; i < estados.length; i++) {
        if (estados[i].id === parseInt(estadoId)) {
          return estado[i];
        }
      }
      return null;
    }
  };
});
