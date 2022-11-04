// import { writeFileSync } from 'fs';
// import { image } from 'image-downloader';
// import { nanoid } from 'nanoid';
// import { join } from 'path';
// import { test } from 'vitest';
// import { COUNTRY_CODES } from './constants';
// import data from './data.json';

// console.log(data.length);

// type Data = {
//   format?: string;
//   description?: string;
//   status: string;
//   title: string;
//   year?: number;
//   src: string;
//   color?: string;
//   genres?: string[];
//   country: string;
//   id: string;
// };

// const transformData = (val: typeof data[number]): Data => {
//   const out: Data = {
//     id: nanoid(),
//     status: val.status,
//     title: val.title.romaji,
//     src: val.coverImage.medium,
//     country: COUNTRY_CODES[val.countryOfOrigin],
//   };

//   // #region CheckAssigns
//   const genres = val.genres;
//   if (genres.length > 0) {
//     out.genres = genres;
//   }
//   const format = val.format;
//   if (format) {
//     out.format = format;
//   }
//   const year = val.startDate.year;
//   if (year) {
//     out.year = year;
//   }
//   const description = val.description;
//   if (description && description.trim() !== '') {
//     out.description = description;
//   }
//   const color = val.coverImage.color;
//   if (color && color.trim() !== '') {
//     out.color = color;
//   }
//   // #endregion

//   return out;
// };

// const data2 = data.map(transformData);

// async function getImage(url: string, file: string) {
//   if (!url) return;
//   const result = (
//     await image({
//       dest: join(
//         process.cwd(),
//         'public',
//         'images',
//         'data',
//         `${file}.jpeg`
//       ),
//       url,
//     })
//   ).filename;

//   return file;
// }

// function writeJson(data: any) {
//   writeFileSync(
//     join(process.cwd(), 'public', 'json', `data.json`),
//     JSON.stringify(data),
//     {}
//   );
// }

// // console.log(JSON.stringify(data2[245], null, 2));

// test(
//   'OK',
//   async () => {
//     const promises = data2.map((vl) => getImage(vl.src, vl.id));
//     const out = await Promise.all(promises);
//     const data3 = data2.map((vl) => ({
//       ...vl,
//       src: `/images/data/${vl.id}.jpeg`,
//     }));
//     console.log(data3.length);
//     writeJson(data3);
//     console.log(out);
//   },
//   { timeout: 500 * 1000 }
// );
