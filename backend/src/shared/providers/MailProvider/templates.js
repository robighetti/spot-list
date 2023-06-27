const welcome = ({ name, token }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem Vindo ao SporList</title>
  </head>
  <body>
    <h1>Olá ${name}</h1>
    <span>Seja bem vindo a nossa plataforma de compartilhamento e gravação de listas de musicas</span>
  
    <h5>Seu Token de ativação é ${token}</h5>
  </body>
  </html>
  `
}

module.exports = { welcome }
