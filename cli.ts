import todo from './core.ts';
const command = process.argv[2]; 

if (command === "add") {
  const item = process.argv[3];
  
  if (!item) {
    console.error("Por favor, forneça um item para adicionar.");
    process.exit(1);
  }

  await todo.addItem(item);
  console.log(`Item "${item}" adicionado com sucesso!`);
  process.exit(0);
}

if (command === "list") {
  const items = todo.getItems();

  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de itens:");
  items.forEach((item, index) => console.log(`${index}: ${item}`));
  process.exit(0);
}

if (command === "update") {
  if (!process.argv[3]) {
    console.error("Por favor, forneça um índice válido.");
    process.exit(1);
  }

  const index = parseInt(process.argv[3]);
  const newItem = process.argv[4];

  if (isNaN(index) || !newItem) {
    console.error("Por favor, forneça um índice válido e um novo item.");
    process.exit(1);
  }

  try {
    await todo.updateItem(index, newItem);
    console.log(`Item no índice ${index} atualizado para "${newItem}".`);
    process.exit(0);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

if (command === "remove") {
  if (!process.argv[3]) {
    console.error("Por favor, forneça um índice válido.");
    process.exit(1);
  }
  
  const index = parseInt(process.argv[3]);

  if (isNaN(index)) {
    console.error("Por favor, forneça um índice válido para remover.");
    process.exit(1);
  }
  
  try {
    await todo.removeItem(index);
    console.log(`Item no índice ${index} removido com sucesso.`);
    process.exit(0);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

if (command === "help") {
  console.log(`
🗒️  TODO CLI - Comandos disponíveis:

  add <item>        Adiciona um novo item à lista
                    Ex: node cli.js add "Comprar leite"

  list              Lista todos os itens
                    Ex: node cli.js list

  update <índice> <novo-item>    Atualiza um item existente
                    Ex: node cli.js update 0 "Comprar leite e pão"

  remove <índice>   Remove um item pelo índice
                    Ex: node cli.js remove 0

  help              Mostra esta ajuda
                    Ex: node cli.js help
`);
  process.exit(0);
}

console.error("Comando desconhecido. Use 'add', 'list', 'update', 'help' ou 'remove'.");
process.exit(1);