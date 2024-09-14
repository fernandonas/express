import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

interface Item {
  id: string;
  nome: string;
}

const filePath = path.join(__dirname, '../data/items/items.json');

// Função para ler os dados do arquivo JSON
const readDataFromFile = (): Item[] => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8'); // Cria o arquivo se não existir
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo JSON
const writeDataToFile = (data: Item[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Listar todos os itens
export const getItems = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  res.json(items);
};

// Obter item por ID
export const getItemById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const items = readDataFromFile();
  const item = items.find(i => i.id === id);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.json(item);
  }
};

// Criar um novo item
export const createItem = (req: Request, res: Response): void => {
  const { nome } = req.body;
  const items = readDataFromFile();
  const newItem: Item = {
    id: uuidv4(), // Gerando um UUID como ID
    nome
  };
  items.push(newItem);
  writeDataToFile(items);
  res.status(201).json(newItem);
};

// Atualizar item existente
export const updateItem = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { nome } = req.body;
  const items = readDataFromFile();
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[itemIndex].nome = nome;
    writeDataToFile(items);
    res.json(items[itemIndex]);
  }
};

// Deletar item
export const deleteItem = (req: Request, res: Response): void => {
  const { id } = req.params;
  const items = readDataFromFile();
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    const deletedItem = items.splice(itemIndex, 1);
    writeDataToFile(items);
    res.json(deletedItem[0]);
  }
};
