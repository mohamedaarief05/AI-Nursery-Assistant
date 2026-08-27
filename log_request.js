const http = require('http');
http.request('http://localhost:3000/api/chat', { method: 'POST', headers: {'Content-Type': 'application/json'} }, (res) => {}).on('error', () => {});
