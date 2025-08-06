import { NextApiRequest, NextApiResponse } from 'next';
import { Chance } from 'chance';
import { Products } from 'components/application/e-commerce/types';
import { add, sub } from 'date-fns';
import { KeyedObject } from 'types';
const chance = new Chance();
const products: Products[] = [
  {
    id: 4,
    image: 'prod-1.jpg',
    name: 'HMens T-Shirts',
    description: chance.paragraph({ sentences: 2 }),
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    discount: 17,
    salePrice: 1,
    offerPrice: 1,
    gender: 'kids',
    categories: ['fashion', 'electronics', 'toys'],
    colors: ['errorLight', 'orangeMain', 'warningMain'],
    popularity: chance.natural(),
    date: chance.natural(),
    created: sub(new Date(), { days: 7, hours: 6, minutes: 45 }),
    isStock: false
  }
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filter } = req.body;

  if (filter.sort === 'high') {
    products.sort((a: Products, b: Products) => Number(b.offerPrice) - Number(a.offerPrice));
  }

  if (filter.sort === 'low') {
    products.sort((a, b) => Number(a.offerPrice) - Number(b.offerPrice));
  }

  if (filter.sort === 'popularity') {
    products.sort((a, b) => Number(b.popularity) - Number(a.popularity));
  }

  if (filter.sort === 'discount') {
    products.sort((a, b) => Number(b.discount) - Number(a.discount));
  }

  if (filter.sort === 'discount') {
    products.sort((a, b) => Number(b.discount) - Number(a.discount));
  }

  if (filter.sort === 'new') {
    products.sort((a, b) => Number(b.new) - Number(a.new));
  }

  const results = products.filter((product: KeyedObject) => {
    let searchMatches = true;

    if (filter.search) {
      const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (product[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        searchMatches = false;
      }
    }

    const genderMatches = filter.gender.length > 0 ? filter.gender.some((item: string) => item === product.gender) : true;
    const categoriesMatches =
      filter.categories.length > 0 && filter.categories.some((category: string) => category !== 'all')
        ? filter.categories.some((category: string) => product.categories.some((item: string) => item === category))
        : true;
    const colorsMatches =
      filter.colors.length > 0 ? filter.colors.some((color: string) => product.colors.some((item: string) => item === color)) : true;

    const minMax = filter.price ? filter.price.split('-') : '';
    const priceMatches = filter.price ? product.offerPrice >= minMax[0] && product.offerPrice <= minMax[1] : true;
    const ratingMatches = filter.rating > 0 ? product.rating >= filter.rating : true;

    return searchMatches && genderMatches && categoriesMatches && colorsMatches && priceMatches && ratingMatches;
  });
  return res.status(200).json(results);
}
