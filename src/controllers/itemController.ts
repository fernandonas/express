import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigurationSicChartDrawerData } from '../entities/ConfigurationSicChartDrawerData';

const filePath = path.join(__dirname, '../data/database.json');

// Função para ler os dados do arquivo JSON
const readDataFromFile = (): ConfigurationSicChartDrawerData[] => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8'); // Cria o arquivo se não existir
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo JSON
const writeDataToFile = (data: ConfigurationSicChartDrawerData[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Listar todos os itens
export const getAll = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  res.json(items);
};

// Obter item por ID
export const getById = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  const item = items.find(i => i.uuid === req.params.id);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.json(item);
  }
};

// Criar um novo item
export const Add = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  const newItem: ConfigurationSicChartDrawerData = {
    uuid: uuidv4(),
    ...req.body
  };
  items.push(newItem);
  writeDataToFile(items);
  res.status(201).json(newItem);
};

// Atualizar item existente
export const update = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  const itemIndex = items.findIndex(i => i.uuid === req.params.id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[itemIndex] = { ...req.body };
    writeDataToFile(items);
    res.json(items[itemIndex]);
  }
};

// Deletar item
export const remove = (req: Request, res: Response): void => {
  const items = readDataFromFile();
  const itemIndex = items.findIndex(i => i.uuid === req.params.id);

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    const deletedItem = items.splice(itemIndex, 1);
    writeDataToFile(items);
    res.json(deletedItem[0]);
  }
};
