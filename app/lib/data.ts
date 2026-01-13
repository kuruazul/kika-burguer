export type CategoryId = 'antojitos' | 'rapidas' | 'hamburguesas' | string;

export interface Variant {
  name: string;
  price?: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  variants?: Variant[];
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'antojitos', label: 'Antojitos' },
  // { id: 'rapidas', label: 'Comidas Rápidas' },
  // { id: 'hamburguesas', label: 'Hamburguesas' },
];

export const HERO_TITLES = ['Antojitos', 'Hamburguesas', 'Comidas'];

export const MENU_ITEMS: Record<CategoryId, MenuItem[]> = {
  antojitos: [
    {
      name: 'Picadas Sencillas',
      description: 'Salsa roja o verde, con queso fresco y cebolla.',
      price: '$12',
      variants: [
        { name: 'Rojas' },
        { name: 'Verdes' },
      ]
    },
    {
      name: 'Picadas Preparadas',
      description: 'Con crema, huevo o guisos del día.',
      price: '$18',
      popular: true,
      variants: [
        { name: 'Huevo' },
        { name: 'Carne' },
      ]
    },
    {
      name: 'Empanadas',
      description: 'Rellenas de queso, pollo, carne o jamón con queso. Orden de 4.',
      price: '$35',
      variants: [
        { name: 'Carne' },
        { name: 'Pollo' },
        { name: 'Queso' },
        { name: 'Jamón con queso' },
      ]
    },
    {
      name: 'Garnachas',
      description: 'Tortillas fritas con salsa y guisos tradicionales. Orden de 4.',
      price: '$35',
      variants: [
        { name: 'Mole con carne' },
        { name: 'Frijol con carne' },
        { name: 'Frijol con pollo' },
      ]
    },
    { name: 'Gorditas de Frijol', description: 'Masa de maíz con frijol negro, fritas y crujientes.', price: '$18' },
    {
      name: 'Tostadas',
      description: 'Crujientes tortillas con sus guisos favoritos. Orden de 4.',
      price: '$35',
      variants: [
        { name: 'Frijol con carne' },
        { name: 'Mole con carne' },
        { name: 'Carne o pollo' },
        { name: 'Pollo con frijol o mole' },
      ]
    },
    {
      name: 'Panuchos',
      description: 'Tortilla rellena de frijol, con lechuga, tomate y aguacate.',
      price: '$40',
      variants: [
        { name: 'Jamón con queso' },
        { name: 'Pollo' },
        { name: 'Carne' },
      ]
    },
    {
      name: 'Panucho Loco',
      description: 'Frijol, carne, jamón, pollo y queso (panucho grande).',
      price: '$85',
    },
    {
      name: 'Plátanos Fritos',
      description: 'Plátanos machos fritos al gusto.',
      price: '$30',
      variants: [
        { name: 'Con crema y queso' },
        { name: 'Preparados (lechera, crema, choco chips)', price: '+$15' },
      ]
    },
    {
      name: 'Tacos Fritos',
      description: 'Tacos de pollo (4 piezas).',
      price: '$45',
    },
  ],
  rapidas: [
    {
      name: 'Hot Dog Clásico',
      description: 'Salchicha de pavo, tocino, tomate, cebolla y aderezos.',
      price: '$35',
      variants: [
        { name: 'Orden de Papas', price: '+$30' },
      ]
    },
    { name: 'Hot Dog Especial', description: 'Con queso gratinado y champiñones.', price: '$45' },
    { name: 'Nuggets de Pollo', description: '10 piezas doraditas acompañadas de papas a la francesa.', price: '$60' },
    { name: 'Salchipapas', description: 'Salchichas fritas con papas y queso líquido.', price: '$50', popular: true },
  ],
  hamburguesas: [
    {
      name: 'Hamburguesa Sencilla',
      description: 'Carne de res 100%, queso americano, lechuga, tomate y cebolla.',
      price: '$65',
      variants: [
        { name: 'Extra Queso', price: '+$15' },
        { name: 'Tocino', price: '+$20' },
      ]
    },
    { name: 'Hamburguesa Hawaiana', description: 'Carne, queso, jamón y rebanada de piña asada.', price: '$75' },
    {
      name: 'Hamburguesa Kika',
      description: 'Doble carne, doble queso, tocino crujiente, aguacate y aros de cebolla.',
      price: '$95',
      popular: true,
      variants: [
        { name: 'Carne Extra', price: '+$35' },
      ]
    },
    { name: 'Burger BBQ', description: 'Con salsa BBQ casera, tocino y queso monterey jack.', price: '$85' },
  ],
};
