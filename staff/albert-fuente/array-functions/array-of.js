function arrayOf(arg) {
  var resultado = [];

  // Iterar a través de los otros argumentos enviados
  for (var i = 0; i < arguments.length; i++)
    resultado[resultado.length]=(arguments[i]);

  return resultado;
}
