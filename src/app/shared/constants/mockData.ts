import { Product, Warehouse } from "../interfaces";

export const testProducts: Product[] = [
  { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', name: 'Electronics Component Kit', description: 'Kit of various electronic components for assembly.' },
  { id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', name: 'Fresh Produce Assortment', description: 'Assorted fresh fruits and vegetables, refrigerated.' },
  { id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', name: 'Heavy Machinery Parts', description: 'Spare parts for industrial heavy machinery.' },
  { id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', name: 'Textile Raw Materials', description: 'Large bales of cotton and synthetic fibers.' },
];

export const testWarehouses: Warehouse[] = [
  { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', name: 'Central Distribution Hub', address: '789 Logistics Park', city: 'Bogota', country: 'Colombia' },
  { id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', name: 'Regional North Depot', address: '101 Industrial Way', city: 'Medellín', country: 'Colombia' },
  { id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', name: 'South America Gateway', address: '456 Export Blvd', city: 'Sao Paulo', country: 'Brazil' },
];