import readline from 'readline';
import chalk from 'chalk';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tareas = [];

function mostrarTareas() {
  console.log('\nLista de Tareas:');
  tareas.forEach((tarea, index) => {
    const estado = tarea.completada ? chalk.green('Completada') : chalk.red('Pendiente');
    console.log(`${index + 1}. ${tarea.descripcion} - ${estado}`);
  });
}

function añadirTarea(descripcion) {
  tareas.push({ descripcion, completada: false });
  console.log(chalk.yellow('Tarea añadida.'));
}

function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log(chalk.yellow('Tarea eliminada.'));
  } else {
    console.log(chalk.red('Índice inválido.'));
  }
}

function completarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log(chalk.green('Tarea completada.'));
  } else {
    console.log(chalk.red('Índice inválido.'));
  }
}

function preguntarOpcion() {
  rl.question('\nElige una opción (añadir/eliminar/completar/mostrar/salir): ', (opcion) => {
    switch (opcion.toLowerCase()) {
      case 'añadir':
        rl.question('Descripción de la tarea: ', (descripcion) => {
          añadirTarea(descripcion);
          mostrarTareas();
          preguntarOpcion();
        });
        break;
      case 'eliminar':
        rl.question('Índice de la tarea a eliminar: ', (indice) => {
          eliminarTarea(parseInt(indice) - 1);
          mostrarTareas();
          preguntarOpcion();
        });
        break;
      case 'completar':
        rl.question('Índice de la tarea a completar: ', (indice) => {
          completarTarea(parseInt(indice) - 1);
          mostrarTareas();
          preguntarOpcion();
        });
        break;
      case 'mostrar':
        mostrarTareas();
        preguntarOpcion();
        break;
      case 'salir':
        rl.close();
        break;
      default:
        console.log(chalk.red('Opción no válida.'));
        preguntarOpcion();
    }
  });
}

console.log(chalk.blue('¡Bienvenido a la Lista de Tareas!'));

// Inicia el programa
preguntarOpcion();
