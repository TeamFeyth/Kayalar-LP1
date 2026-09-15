/**
 * Featured vehicles — Section 5.5 of the brief.
 *
 * Photos supplied by the client and served from /public/images/vehicles/.
 * They are 960x720 WebP (4:3, the source ratio) so the cards never crop the
 * dealer watermark off the top-left or the badge off the bottom-right.
 *
 * `price` and `mileage` are still null: they were listed as "recommended (not
 * specified in source copy)" and no figures have come back. A null price
 * renders the "Call for price" label from the i18n dictionary.
 */

export type Vehicle = {
  /** Stable id sent to the CRM with the lead. Matches the VDP stock id. */
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  /** Full name exactly as written in the brief. Sent to the CRM. */
  name: string;
  url: string;
  price: string | null;
  mileage: string | null;
  image: string | null;
};

export const vehicles: Vehicle[] = [
  {
    id: '23785724',
    year: 2023,
    make: 'Land Rover',
    model: 'Range Rover Sport',
    trim: 'P360 SE',
    name: '2023 Land Rover Range Rover Sport P360 SE',
    url: 'https://kayalar-motors.com/vdp/23785724/Used-2023-Land-Rover-Range-Rover-Sport-P360-SE-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/range-rover-sport-p360-se.webp',
  },
  {
    id: '23869126',
    year: 2022,
    make: 'Audi',
    model: 'Q7',
    trim: 'Premium Plus 55 TFSI quattro',
    name: '2022 Audi Q7 Premium Plus 55 TFSI quattro',
    url: 'https://kayalar-motors.com/vdp/23869126/Used-2022-Audi-Q7-Premium-Plus-55-TFSI-quattro-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/audi-q7-premium-plus.webp',
  },
  {
    id: '23869122',
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    trim: 'XSE Auto Natl',
    name: '2020 Toyota Camry XSE Auto Natl',
    url: 'https://kayalar-motors.com/vdp/23869122/Used-2020-Toyota-Camry-XSE-Auto-Natl-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/toyota-camry-xse.webp',
  },
  {
    id: '24073075',
    year: 2020,
    make: 'Ford',
    model: 'Mustang',
    trim: 'GT Premium Convertible',
    name: '2020 Ford Mustang GT Premium Convertible',
    url: 'https://kayalar-motors.com/vdp/24073075/Used-2020-Ford-Mustang-GT-Premium-Convertible-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/ford-mustang-gt-convertible.webp',
  },
  {
    id: '23860801',
    year: 2022,
    make: 'Toyota',
    model: 'Tacoma',
    trim: "SR5 Double Cab 5' Bed I4 AT Natl",
    name: "2022 Toyota Tacoma SR5 Double Cab 5' Bed I4 AT Natl",
    url: 'https://kayalar-motors.com/vdp/23860801/Used-2022-Toyota-Tacoma-SR5-Double-Cab-5-Bed-I4-AT-Natl-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/toyota-tacoma-sr5.webp',
  },
  {
    id: '23211704',
    year: 2021,
    make: 'GMC',
    model: 'Yukon',
    trim: '4WD 4dr Denali',
    name: '2021 GMC Yukon 4WD 4dr Denali',
    url: 'https://kayalar-motors.com/vdp/23211704/Used-2021-GMC-Yukon-4WD-4dr-Denali-for-sale-in-Houston-TX-77095',
    price: null,
    mileage: null,
    image: '/images/vehicles/gmc-yukon-denali.webp',
  },
];
