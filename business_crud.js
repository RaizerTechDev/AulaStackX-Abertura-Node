const items = []; // Um array simples para armazenar os itens temporariamente
let idCounter = 1; // Contador para atribuir IDs únicos

export function createItem(item) {
  const newItem = { id: idCounter++, ...item };
  items.push(newItem);
  return newItem;
}

export function readItem() {
  return items;
}

export function readItemById(id) {
  return items.find(item => item.id === parseInt(id));
}

export function updateItem(id, updatedItem) {
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    items[index] = { id: parseInt(id), ...updatedItem };
    return items[index];
  }
  return null;
}

export function deleteItem(id) {
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    return items.splice(index, 1)[0]; // Remove o item do array
  }
  return null;
}
