const url = new URL('https://astro.js');
url.searchParams.append(
  'nothing',
  JSON.stringify(['Slice of Life', 'algebre'])
);
url.searchParams.append('year', '2022');

console.log(url.href);
console.log(JSON.parse(url.searchParams.get('nothing')).length);
