export type StaysSearchData = {
  destination: string;
  destinationSuggestion: string;
  checkIn: string;
  checkOut: string;
  nationality: string;
  adults: number;
  children: number;
  rooms: number;
};

export type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const staysData = {
  validSearch: {
    destination: 'Dubai',
    destinationSuggestion: 'Dubai, United Arab Emirates',
    checkIn: '09/15/2026',
    checkOut: '09/16/2026',
    nationality: 'United States',
    adults: 2,
    children: 0,
    rooms: 1,
  } satisfies StaysSearchData,

  modifiedSearch: {
    destination: 'Dubai',
    destinationSuggestion: 'Dubai, United Arab Emirates',
    checkIn: '09/20/2026',
    checkOut: '09/23/2026',
    nationality: 'United States',
    adults: 3,
    children: 1,
    rooms: 2,
  } satisfies StaysSearchData,

  validGuestDetails: {
    firstName: 'Taylor',
    lastName: 'Morgan',
    email: 'taylor.morgan@example.test',
    phone: '+12025550142',
  } satisfies GuestDetails,

  invalidSearches: {
    unsupportedDestination: 'NoSuchDestination999',
    invalidEmail: 'not-an-email',
    checkoutBeforeCheckIn: {
      checkIn: '09/20/2026',
      checkOut: '09/19/2026',
    },
    sameDayStay: {
      checkIn: '09/20/2026',
      checkOut: '09/20/2026',
    },
  },

  emptyValues: {
    destination: '',
    nationality: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  },

  boundaryValues: {
    minimumAdults: 1,
    minimumChildren: 0,
    minimumRooms: 1,
    oneNightCheckIn: '09/15/2026',
    oneNightCheckOut: '09/16/2026',
    longStayCheckIn: '09/15/2026',
    longStayCheckOut: '12/15/2026',
    longFirstName: 'Alexanderthegreat',
    longLastName: 'LastnameWithAReasonableMaximumLength',
    longEmail: 'traveler.with-a-long-but-valid-name@example.test',
  },

  specialCharacterValues: {
    destinationSearch: "O'Fallon & Spa",
    firstName: "Anne-Marie",
    lastName: "O'Connor",
    email: 'qa+stays@example.test',
    bookingNote: 'Room preference: quiet floor; arrival after 20:00.',
  },

  duplicateValues: {
    email: 'duplicate.stays.user@example.test',
    bookingReference: 'STAYS-DUPLICATE-001',
    repeatedSearch: {
      destination: 'Dubai',
      destinationSuggestion: 'Dubai, United Arab Emirates',
      checkIn: '09/15/2026',
      checkOut: '09/16/2026',
      nationality: 'United States',
      adults: 2,
      children: 0,
      rooms: 1,
    } satisfies StaysSearchData,
  },

  noResultValues: {
    destinationSearch: 'NoSuchDestination999',
    unsupportedHotelName: 'HotelThatDoesNotExist999',
  },

  sandboxPayment: {
    useSandboxOnly: true,
    cardNumber: '4111111111111111',
    expiry: '12/30',
    cvv: '000',
    cardholderName: 'Demo Test User',
  },
} as const;

export const validStaysSearches: StaysSearchData[] = [
  staysData.validSearch,
  {
    destination: 'Dubai',
    destinationSuggestion: 'Dubai, United Arab Emirates',
    checkIn: '10/05/2026',
    checkOut: '10/08/2026',
    nationality: 'United States',
    adults: 1,
    children: 0,
    rooms: 1,
  },
  staysData.modifiedSearch,
];

export const invalidEmails = [
  staysData.invalidSearches.invalidEmail,
  'missing-at-symbol.example.test',
  'traveler@',
  '@example.test',
  'traveler example@example.test',
];

export const invalidDestinations = [
  staysData.invalidSearches.unsupportedDestination,
  staysData.noResultValues.unsupportedHotelName,
  '<script>alert(1)</script>',
];