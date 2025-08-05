import { NextApiRequest, NextApiResponse } from 'next';
import { Chance } from 'chance';
import { Products } from 'components/application/e-commerce/types';
import { add, sub } from 'date-fns';
const chance = new Chance();

export const products: Products[] = [
  {
    id: 1,
    image: 'prod-1.jpg',
    name: 'H100',
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 25,
    salePrice: 350,
    offerPrice: 275,
    gender: 'male',
    categories: ['fashion', 'books'],
    colors: ['errorDark', 'orangeDark', 'errorMain', 'secondaryMain'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    isStock: true
  }
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ products });
}
