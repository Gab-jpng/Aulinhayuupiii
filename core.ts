//lógica principal da aplicação
const filename = __dirname + '/data.todo.json';
let list: string[] | null = null!;

async function loadFromFile() {
    if (list !== null) 
        return
    try {
        const file = Bun.file(filename);
        const content = await file.text();
        list = JSON.parse(content) as string[];
    } catch (error) {
        Bun.write(filename, "[]");
        list = [];
    }
    
}

async function SaveToFile() {
    await Bun.write(filename, JSON.stringify(list));
}