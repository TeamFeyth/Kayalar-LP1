/**
 * All page copy, EN + ES.
 *
 * English strings are taken verbatim from Section 5 of the brief.
 * Spanish is a working translation for the Houston market — have the client or
 * the copy team sign off before launch.
 */

export const languages = { en: 'EN', es: 'ES' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    meta: {
      title: 'Kayalar Motors | Top-Rated Used Car Dealership in Houston, TX',
      description:
        'Family owned and operated for over 30 years. Hand-picked pre-owned vehicles, in-house financing help, and paperwork usually done in three to four hours. Houston, TX.',
      ogAlt: 'Kayalar Motors, Houston TX',
    },

    nav: {
      call: 'Call 832-966-7907',
      langLabel: 'Language',
      skipToForm: 'Skip to the inquiry form',
    },

    hero: {
      headline: 'Kayalar Motors. Top-rated Dealership in Houston',
      sub: 'Family Owned & Operated · Over 30 Years of Automotive Experience.',
      ctaPrimary: 'View Inventory',
      ctaSecondary: 'Call 832-966-7907',
      formHeading: 'Check availability',
      formSub: 'A few quick questions, and we\u2019ll get back to you today.',
      imageAlt: 'Kayalar Motors lot in Houston, Texas',
    },

    stats: [
      { num: '30+', label: 'Years in the auto business' },
      { num: '300', label: 'Point inspection on every vehicle' },
      { num: '3\u20134 hrs', label: 'Typical paperwork time' },
    ],

    form: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'First and last name',
      email: 'Email Address',
      emailPlaceholder: 'you@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '(832) 555-0123',
      existingLoan: 'Do you have an existing car loan?',
      preApproval: 'Do you have a pre-approval?',
      selectPlaceholder: 'Select one',
      yes: 'Yes',
      no: 'No',
      submit: 'Submit',
      submitting: 'Sending\u2026',
      consent:
        'By checking this box, you expressly consent to receive customer care text messages and/or phone calls to the number provided from or on behalf of Kayalar Motors or their employees in response to your inquiry. By opting in, you understand no mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Message frequency varies per user. Message and data rates may apply. You may withdraw your consent at any time by texting "STOP" or "HELP" for help. See our Privacy Policy for more information.',
      consentLinkText: 'Privacy Policy',
      errors: {
        fullName: 'Enter your first and last name.',
        email: 'Enter a valid email address.',
        phone: 'Enter a 10-digit US phone number.',
        select: 'Pick an option.',
        network:
          'That didn\u2019t go through. Try again, or call us at 832-966-7907.',
      },
    },

    confirm: {
      hero: 'You\u2019re all set. We\u2019ll be in touch shortly.',
      prefooterHeading: 'Thank you for your inquiry.',
      prefooterBody: 'We will get in touch with you shortly.',
      popupGeneric:
        'You\u2019re all set. We\u2019ll be in touch shortly with the answers you need.',
      popupVehicle:
        'Got it. We\u2019re checking on this one now and will call you back shortly.',
    },

    popup: {
      headline: 'Still deciding? Let\u2019s talk.',
      body: 'Tell us what you\u2019re looking for and we\u2019ll help you narrow it down.',
      submit: 'Submit',
      close: 'Close',
      vehicleHeadline: 'Check availability',
      vehicleBody:
        'Tell us how to reach you and we\u2019ll confirm this vehicle is still on the lot.',
    },

    vehicles: {
      heading: 'Ready when you are',
      sub: 'Selected, prepared, and ready to drive today. (Prices exclude TT&L & dealer fees)',
      cardCta: 'Check Availability',
      viewDetails: 'View details',
      callForPrice: 'Call for price',
      mileageSuffix: 'miles',
      belowGrid: 'Looking for something specific? Call us, we\u2019ll find it.',
      photoPending: 'Photo coming soon',
    },

    why: {
      heading: 'Delivering Top Rated Service.',
      bullets: [
        '300-point inspection by our ASE-certified technicians.',
        '30+ years of experience in the auto business.',
        'Financing solutions for every budget.',
        '24/7 support for new and existing customers.',
      ],
    },

    visit: {
      heading: 'See it. Drive it. Take it home.',
      copy: 'Some decisions are best made in person. Come to our Houston lot, see the car, and if it\u2019s right, the paperwork is usually done in three to four hours.',
      bullets: [
        'Every question answered in one visit: condition, history, and financing.',
        'Quick, hassle-free paperwork usually takes three to four hours.',
      ],
      directions: 'Get directions',
    },

    prefooter: {
      heading: 'Not sure which car is right?',
      sub: 'Tell us what you need, and we\u2019ll point you toward the right vehicle.',
      contactLine: '16230 FM 529 Road, Houston, TX 77095 / 832-966-7907',
      formHeading: 'Ready to see it in person?',
      formSub: 'A few quick questions, and we\u2019ll have it ready for you.',
    },

    footer: {
      services: 'Sales · Service · Trade-In',
      privacy: 'Privacy Policy',
      bottomLine:
        '\u00A9 2026 Kayalar Motors. Family-owned for 30+ years. Member of TIADA & NIADA.',
    },

    thankYou: {
      title: 'Thank you | Kayalar Motors',
      heading: 'Thank you for your inquiry.',
      body: 'We will get in touch with you shortly. If you\u2019d rather talk now, give us a call.',
      back: 'Back to the page',
    },
  },

  es: {
    meta: {
      title:
        'Kayalar Motors | Concesionario de autos usados en Houston, TX',
      description:
        'Negocio familiar con m\u00E1s de 30 a\u00F1os en Houston. Autos usados seleccionados a mano, ayuda con financiamiento y papeleo que normalmente toma de tres a cuatro horas.',
      ogAlt: 'Kayalar Motors, Houston TX',
    },

    nav: {
      call: 'Llame al 832-966-7907',
      langLabel: 'Idioma',
      skipToForm: 'Ir al formulario',
    },

    hero: {
      headline: 'Kayalar Motors. El concesionario mejor calificado de Houston',
      sub: 'Negocio familiar · M\u00E1s de 30 a\u00F1os de experiencia en el ramo automotriz.',
      ctaPrimary: 'Ver inventario',
      ctaSecondary: 'Llame al 832-966-7907',
      formHeading: 'Consulte disponibilidad',
      formSub: 'Unas preguntas r\u00E1pidas y le respondemos hoy mismo.',
      imageAlt: 'Lote de Kayalar Motors en Houston, Texas',
    },

    stats: [
      { num: '30+', label: 'A\u00F1os en el ramo automotriz' },
      { num: '300', label: 'Puntos de inspecci\u00F3n en cada veh\u00EDculo' },
      { num: '3\u20134 hrs', label: 'Tiempo normal de papeleo' },
    ],

    form: {
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Nombre y apellido',
      email: 'Correo electr\u00F3nico',
      emailPlaceholder: 'usted@ejemplo.com',
      phone: 'N\u00FAmero de tel\u00E9fono',
      phonePlaceholder: '(832) 555-0123',
      existingLoan: '\u00BFTiene un pr\u00E9stamo de auto vigente?',
      preApproval: '\u00BFCuenta con una preaprobaci\u00F3n?',
      selectPlaceholder: 'Seleccione una opci\u00F3n',
      yes: 'S\u00ED',
      no: 'No',
      submit: 'Enviar',
      submitting: 'Enviando\u2026',
      consent:
        'Al marcar esta casilla, usted da su consentimiento expreso para recibir mensajes de texto y/o llamadas de atenci\u00F3n al cliente al n\u00FAmero proporcionado, por parte de Kayalar Motors o de sus empleados, en respuesta a su consulta. Al aceptar, usted entiende que su informaci\u00F3n m\u00F3vil no ser\u00E1 compartida con terceros ni afiliados con fines de marketing o promoci\u00F3n. La frecuencia de los mensajes var\u00EDa seg\u00FAn el usuario. Pueden aplicar tarifas de mensajes y datos. Puede retirar su consentimiento en cualquier momento enviando "STOP", o "HELP" para obtener ayuda. Consulte nuestra Pol\u00EDtica de Privacidad para m\u00E1s informaci\u00F3n.',
      consentLinkText: 'Pol\u00EDtica de Privacidad',
      errors: {
        fullName: 'Escriba su nombre y apellido.',
        email: 'Escriba un correo electr\u00F3nico v\u00E1lido.',
        phone: 'Escriba un tel\u00E9fono de 10 d\u00EDgitos.',
        select: 'Elija una opci\u00F3n.',
        network:
          'No se pudo enviar. Int\u00E9ntelo de nuevo o ll\u00E1menos al 832-966-7907.',
      },
    },

    confirm: {
      hero: 'Listo. Nos comunicamos con usted en breve.',
      prefooterHeading: 'Gracias por su consulta.',
      prefooterBody: 'Nos pondremos en contacto con usted en breve.',
      popupGeneric:
        'Listo. Nos comunicamos con usted en breve con la informaci\u00F3n que necesita.',
      popupVehicle:
        'Recibido. Estamos verificando este veh\u00EDculo y le devolvemos la llamada en breve.',
    },

    popup: {
      headline: '\u00BFTodav\u00EDa lo est\u00E1 pensando? Hablemos.',
      body: 'Cu\u00E9ntenos qu\u00E9 est\u00E1 buscando y le ayudamos a decidir.',
      submit: 'Enviar',
      close: 'Cerrar',
      vehicleHeadline: 'Consulte disponibilidad',
      vehicleBody:
        'D\u00E9jenos sus datos y le confirmamos si este veh\u00EDculo sigue en el lote.',
    },

    vehicles: {
      heading: 'Listos cuando usted lo est\u00E9',
      sub: 'Seleccionados, preparados y listos para manejar hoy. (Los precios no incluyen impuestos, placas ni cargos del concesionario)',
      cardCta: 'Consultar disponibilidad',
      viewDetails: 'Ver detalles',
      callForPrice: 'Llame por el precio',
      mileageSuffix: 'millas',
      belowGrid: '\u00BFBusca algo en espec\u00EDfico? Ll\u00E1menos y se lo conseguimos.',
      photoPending: 'Foto pr\u00F3ximamente',
    },

    why: {
      heading: 'Servicio de primera, siempre.',
      bullets: [
        'Inspecci\u00F3n de 300 puntos por nuestros t\u00E9cnicos certificados ASE.',
        'M\u00E1s de 30 a\u00F1os de experiencia en el ramo automotriz.',
        'Soluciones de financiamiento para cada presupuesto.',
        'Atenci\u00F3n 24/7 para clientes nuevos y actuales.',
      ],
    },

    visit: {
      heading: 'V\u00E9alo. Man\u00E9jelo. Ll\u00E9veselo.',
      copy: 'Hay decisiones que se toman mejor en persona. Venga a nuestro lote en Houston, vea el auto y, si es el indicado, el papeleo normalmente queda listo en tres o cuatro horas.',
      bullets: [
        'Todas sus preguntas resueltas en una sola visita: condici\u00F3n, historial y financiamiento.',
        'Papeleo r\u00E1pido y sin complicaciones, normalmente de tres a cuatro horas.',
      ],
      directions: 'C\u00F3mo llegar',
    },

    prefooter: {
      heading: '\u00BFNo sabe cu\u00E1l auto es el indicado?',
      sub: 'D\u00EDganos qu\u00E9 necesita y le ayudamos a encontrar el veh\u00EDculo correcto.',
      contactLine: '16230 FM 529 Road, Houston, TX 77095 / 832-966-7907',
      formHeading: '\u00BFListo para verlo en persona?',
      formSub: 'Unas preguntas r\u00E1pidas y se lo tenemos listo.',
    },

    footer: {
      services: 'Ventas · Servicio · Intercambio',
      privacy: 'Pol\u00EDtica de Privacidad',
      bottomLine:
        '\u00A9 2026 Kayalar Motors. Negocio familiar por m\u00E1s de 30 a\u00F1os. Miembro de TIADA y NIADA.',
    },

    thankYou: {
      title: 'Gracias | Kayalar Motors',
      heading: 'Gracias por su consulta.',
      body: 'Nos pondremos en contacto con usted en breve. Si prefiere hablar ahora, ll\u00E1menos.',
      back: 'Volver a la p\u00E1gina',
    },
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in languages) return seg as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

/** Prefixes a path with the locale. EN stays at the root. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** The counterpart path in the other language, for the EN | ES toggle. */
export function alternatePath(url: URL, target: Lang): string {
  let path = url.pathname;
  for (const code of Object.keys(languages)) {
    if (code === defaultLang) continue;
    if (path === `/${code}` || path.startsWith(`/${code}/`)) {
      path = path.slice(code.length + 1) || '/';
    }
  }
  return localizePath(path, target);
}
