import type { APIRoute } from 'astro';
import { filterService } from 'src/services/filter.machine';

//TODO : arrange
export const get: APIRoute = ({ url }) => {
  const params = url.searchParams;
  console.log('params =>', Array.from(params.values()));

  const body = filterService(params)
    .then((arts) => JSON.stringify(arts))
    .then((body) => ({ body }));
  return body;
};
