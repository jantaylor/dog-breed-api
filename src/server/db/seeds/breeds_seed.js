exports.seed = (knex, Promise) => {
  return knex('breeds').del()
  .then(() => {
    return knex('breeds').insert({
      name: 'Doberman Pinscher',
      nicknames: 'Doberman, Dobe, Dobynm, Dobie, Dobermann',
      description: 'The Doberman Pinscher, or Dobermann, or Doberman, is a medium-large breed of domestic dog originally developed around 1890 by Karl Friedrich Louis Dobermann, a tax collector from Germany.',
      origin: 'Germany',
      life_span: '10 - 13 years',
      temperament: 'Intelligent, Obedient, Fearless, Loyal, Alert, Energetic, Confident',
      colors: 'White, Fawn, Black, Blue, Red, Black & Rust, Red & Rust, Blue & Rust, Fawn & Rust',
      height: ({male: (26, 28), female: (24, 27)}),
      weight: ({male: (75, 100), female: (60, 90)}),
      coat: 'Short',
      akc: 'Working',
      image: 'https://vetstreet.brightspotcdn.com/dims4/default/777afb9/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fcf%2Ff283009e8911e0a2380050568d634f%2Ffile%2FDoberman-2-645mk062111.jpg'
    });
  })
  .then(() => {
    return knex('breeds').insert({
      name: 'German Shepherd',
      nicknames: 'Alsatian, Deutscher Schäferhund, DSH, GSD, Shepherd, Schäferhund',
      description: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. The breed\'s officially recognized name is German Shepherd Dog in the English language. The breed is also known as the Alsatian in Britain and Ireland',
      origin: 'Germany',
      life_span: '9 - 13 years',
      temperament: 'Intelligent, Obedient, Loyal, Curious, Courageous, Watchful, Alert, Confident',
      colors: 'Black, Black & Tan, Black & Silver, Red & Black, Sable, Grey',
      height: ({male: (24, 26), female: (22, 24)}),
      weight: ({male: (66, 88), female: (49, 71)}),
      coat: 'Double',
      akc: 'Herding/Guardian',
      image: 'http://images.dailystar.co.uk/dynamic/1/photos/72000/620x/German-Shepherd-418785.jpg'
    });
  })
  .then(() => {
    return knex('breeds').insert({
      name: 'Golden Doodle',
      nicknames: 'Doodle',
      description: 'The Goldendoodle is a cross-breed dog, which is obtained by breeding a Golden Retriever with a Poodle. The name, which alters "poodle" to "doodle" by analogy to "Labradoodle", was coined in 1992.',
      origin: 'Canada/United States',
      life_span: '10 - 15 years',
      colors: 'Cream, Gold, Red, Black, Brown, White',
      height: ({male: (24, 26), female: (22, 23)}),
      weight: ({male: (45, 100), female: (45, 100)}),
      coat: 'Wavy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Golden_Doodle_Standing_%28HD%29.jpg/1200px-Golden_Doodle_Standing_%28HD%29.jpg'
    });
  });
};