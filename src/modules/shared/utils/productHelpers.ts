import type { Product, SortType } from '../types';

export function sortProducts(products: Product[], sort: SortType | null) {
  const copy = [...products];

  switch (sort) {
    case 'age':
      return copy.sort((a, b) => b.year - a.year);
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return copy.sort((a, b) => a.price - b.price);
    default:
      return copy;
  }
}

export function filterByQuery(products: Product[], query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return products;
  }

  return products.filter(product =>
    product.name.toLowerCase().includes(normalized),
  );
}
