// CAPA 2 - LÓGICA DE NEGOCIO: reglas del módulo carrito
// Regla: solo usa su propio repository. Para otros módulos, llamar a SU service.
const repository = require('./carrito.repository');

async function listar() {
  return repository.buscarTodos();
}

module.exports = { listar };
