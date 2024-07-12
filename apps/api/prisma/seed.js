const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const prisma = new PrismaClient();
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const users = [
  // EVENT ORGANIZER
  {
    firstName: 'TOM',
    lastName: 'RUIZ',
    email: 'tom.ruiz@example.com',
    password: 'tomruiz123',
    roleId: 2,
    verified: true,
  },
  {
    firstName: 'HARPER',
    lastName: 'MAY',
    email: 'harper.may@example.com',
    password: 'harpermay123',
    roleId: 2,
    verified: true,
  },
  {
    firstName: 'MILDRED',
    lastName: 'ORTIZ',
    email: 'mildred.ortiz@example.com',
    password: 'mildredortiz123',
    roleId: 2,
    verified: false,
  },
  {
    firstName: 'ROBERT',
    lastName: 'MORRISON',
    email: 'robert.morrison@example.com',
    password: 'robertmorrison123',
    roleId: 2,
    verified: false,
  },

  // NORMAL USER
  {
    firstName: 'RODNEY',
    lastName: 'ALVAREZ',
    email: 'rodney.alvarez@example.com',
    password: 'rodneyalvarez123',
    roleId: 3,
    verified: true,
  },
  {
    firstName: 'IAN',
    lastName: 'HART',
    email: 'ian.hart@example.com',
    password: 'ianhart123',
    roleId: 3,
    verified: true,
  },
  {
    firstName: 'TERRY',
    lastName: 'PRESCOTT',
    email: 'terry.prescott@example.com',
    password: 'terryprescott123',
    roleId: 3,
    verified: false,
  },
  {
    firstName: 'ABIGAIL',
    lastName: 'HUGHES',
    email: 'abigail.hughes@example.com',
    password: 'abigailhughes123',
    roleId: 3,
    verified: false,
  },
];

const locations = [
  {
    city: 'TOKYOBU',
    venue: 'TOKYO_TAIKUKAN',
    regionId: 4,
  },
  {
    city: 'CHIBAKEN',
    venue: 'MAKUHARIMESSE_KOKUSAITENJIJOU',
    regionId: 4,
  },
  {
    city: 'OSAKA',
    venue: 'OSAKA_JO_HALL',
    regionId: 3,
  },
  {
    city: 'KYOTO',
    venue: 'KYOTO_CONCERT_HALL',
    regionId: 3,
  },
  {
    city: 'SAPPORO',
    venue: 'SAPPORO_DOME',
    regionId: 1,
  },
  {
    city: 'FUKUOKA',
    venue: 'FUKUOKA_YAHUOKU_DOME',
    regionId: 6,
  },
  {
    city: 'NAGOYA',
    venue: 'NAGOYA_DOME',
    regionId: 5,
  },
  {
    city: 'HIROSHIMA',
    venue: 'HIROSHIMA_GREEN_ARENA',
    regionId: 6,
  },
  {
    city: 'SENDAI',
    venue: 'SENDAI_SUNPLAZA_HALL',
    regionId: 2,
  },
  {
    city: 'OKINAWA',
    venue: 'OKINAWA_ARENA',
    regionId: 6,
  },
];

const regions = [
  { name: 'HOKKAIDO' },
  { name: 'TOHOKU' },
  { name: 'KANSAI' },
  { name: 'KANTO' },
  { name: 'CHUUBU_HOKURIKU' },
  { name: 'KYUUSHUU_OKINAWA' },
];

const genres = [
  { name: 'MUSIC' },
  { name: 'SPORT' },
  { name: 'THEATER' },
  { name: 'CLASSIC' },
  { name: 'MOVIE' },
  { name: 'ANIME' },
  { name: 'KOREAN' },
  { name: 'LIVE_STREAMING' },
];

const events = [
  {
    title: 'FUJI_ROCK_FESTIVAL',
    details: 'FUJI_ROCK_FESTIVAL',
    genreId: 1,
    locationId: 1,
  },
  {
    title: 'TV_ASAHI_65TH_ANNIVERSARY',
    details: 'TV_ASAHI_65TH_ANNIVERSARY',
    genreId: 1,
    locationId: 2,
  },
];

const schedules = [
  {
    eventId: 1,
    startDate: new Date('2024-08-24T00:00:00Z'),
    endDate: new Date('2024-08-24T00:00:00Z'),
    startTime: new Date('1970-01-01T14:00:00Z'),
    endTime: new Date('1970-01-01T15:00:00Z'),
  },
  {
    eventId: 1,
    startDate: new Date('2024-08-25T00:00:00Z'),
    endDate: new Date('2024-08-25T00:00:00Z'),
    startTime: new Date('1970-01-01T14:00:00Z'),
    endTime: new Date('1970-01-01T15:00:00Z'),
  },
  // one day ticket
  {
    eventId: 2,
    startDate: new Date('2024-09-03T00:00:00Z'),
    endDate: new Date('2024-09-03T00:00:00Z'),
    startTime: new Date('1970-01-01T09:00:00Z'),
    endTime: new Date('1970-01-01T16:00:00Z'),
  },
  {
    eventId: 2,
    startDate: new Date('2024-09-04T00:00:00Z'),
    endDate: new Date('2024-09-04T00:00:00Z'),
    startTime: new Date('1970-01-01T09:00:00Z'),
    endTime: new Date('1970-01-01T16:00:00Z'),
  },
  // two day ticket
  {
    eventId: 2,
    startDate: new Date('2024-09-03T00:00:00Z'),
    endDate: new Date('2024-09-04T00:00:00Z'),
    startTime: new Date('1970-01-01T09:00:00Z'),
    endTime: new Date('1970-01-01T16:00:00Z'),
  },
];
const eventTickets = [
  {
    name: 'FUJI_ROCK_REGULAR_FIRST_DAY',
    eventId: 1,
    scheduleId: 1,
    className: 'REGULAR',
    price: 3300,
    type: 'DIGITAL',
    totalQty: 400,
    qty: 400,
  },
  {
    name: 'FUJI_ROCK_PREMIUM_FIRST_DAY',
    eventId: 1,
    scheduleId: 1,
    className: 'PREMIUM',
    price: 5500,
    type: 'DIGITAL',
    totalQty: 200,
    qty: 200,
  },
  {
    name: 'FUJI_ROCK_REGULAR_SECOND_DAY',
    eventId: 1,
    scheduleId: 2,
    className: 'ONE_DAY_REGULAR',
    price: 3300,
    type: 'DIGITAL',
    totalQty: 400,
    qty: 400,
  },
  {
    name: 'FUJI_ROCK_PREMIUM_SECOND_DAY',
    eventId: 1,
    scheduleId: 2,
    className: 'ONE_DAY_PREMIUM',
    price: 5500,
    type: 'DIGITAL',
    totalQty: 200,
    qty: 200,
  },
  {
    name: 'TV_ASAHI_ONE_DAY_TICKET_SATURDAY',
    eventId: 2,
    scheduleId: 3,
    className: 'ONE_DAY_REGULAR',
    price: 0,
    type: 'DIGITAL',
    totalQty: 400,
    qty: 400,
  },
  {
    name: 'TV_ASAHI_ONE_DAY_TICKET_SUNDAY',
    eventId: 2,
    scheduleId: 4,
    className: 'ONE_DAY_REGULAR',
    price: 0,
    type: 'DIGITAL',
    totalQty: 400,
    qty: 400,
  },
  {
    name: 'TV_ASAHI_TWO_DAY_TICKET_SATURDAY_SUNDAY',
    eventId: 2,
    scheduleId: 5,
    className: 'TWO_DAY_REGULAR',
    price: 0,
    type: 'DIGITAL',
    totalQty: 200,
    qty: 200,
  },
];

const eventPictures = [
  {
    eventId: 1,
    link: 'AAA1',
  },
  {
    eventId: 1,
    link: 'BBB1',
  },
  {
    eventId: 2,
    link: 'AAA2',
  },
  {
    eventId: 2,
    link: 'BBB2',
  },
];

const transactionStatuses = [
  {
    name: 'WAITING_PAYMENT',
  },
  {
    name: 'CONFIRMING_PAYMENT',
  },
  {
    name: 'CANCELLED',
  },
  {
    name: 'TRANSACTION_SUCCESS',
  },
];

const roles = [
  {
    name: 'SUPER_ADMIN',
  },
  {
    name: 'EVENT_ORGANIZER',
  },
  {
    name: 'CUSTOMER',
  },
];

const coupons = [
  {
    name: 'FIRST_TIME_USER',
    details: '20%_OFF_FIRST_TIME_USER',
    code: 'FIRSTTIME20',
    discountPercentage: 20,
    activeDate: new Date(),
    expirationDate: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
  {
    name: 'FUJI_ROCK_SPECIAL',
    details: '1000_YEN_OFF',
    code: 'FUJIROCK24',
    priceCut: 1000,
    activeDate: new Date('2024-08-24T00:00:00Z'),
    expirationDate: new Date('2024-09-01T00:00:00Z'),
    includedEventId: 1,
  },
  {
    name: 'MUSIC_SPECIALS',
    details: '2000_YEN_OFF_TO_MUSIC_CATEGORY',
    code: 'MUSIC2024',
    priceCut: 2000,
    activeDate: new Date('2024-06-01T00:00:00Z'),
    expirationDate: new Date('2025-01-01T00:00:00Z'),
    includedEventCategoryId: 1,
  },
];
async function main() {
  let userCount = await prisma.user.count();
  let locationCount = await prisma.location.count();
  let regionCount = await prisma.region.count();
  let genreCount = await prisma.genre.count();
  let eventCount = await prisma.event.count();
  let eventPictureCount = await prisma.eventPicture.count();
  let reviewCount = await prisma.review.count();
  let scheduleCount = await prisma.schedule.count();
  let myTicketCount = await prisma.myTicket.count();
  let eventTicketCount = await prisma.eventTicket.count();
  let transactionStatusCount = await prisma.transactionStatus.count();
  let roleCount = await prisma.role.count();
  let couponCount = await prisma.coupon.count();

  // Insert Users
  if (userCount === 0 && roleCount > 0) {
    for (const item of users) {
      try {
        await prisma.user.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting user:', error);
      }
    }
  } else if (userCount === 0) {
    console.log('Users have not been inserted');
  }

  // Insert Locations
  if (locationCount === 0 && regionCount > 0) {
    for (const item of locations) {
      try {
        await prisma.location.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting location:', error);
      }
    }
  } else if (locationCount === 0) {
    console.log('Locations have not been inserted');
  }

  // Insert Regions
  if (regionCount === 0) {
    for (const item of regions) {
      try {
        await prisma.region.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting region:', error);
      }
    }
  } else if (regionCount === 0) {
    console.log('Regions have not been inserted');
  }

  // Insert Genres
  if (genreCount === 0) {
    for (const item of genres) {
      try {
        await prisma.genre.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting genre:', error);
      }
    }
  } else if (genreCount === 0) {
    console.log('Genres have not been inserted');
  }

  // Insert Events
  if (
    eventCount === 0 &&
    genreCount > 0 &&
    locationCount > 0
  ) {
    for (const item of events) {
      try {
        await prisma.event.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting event:', error);
      }
    }
  } else if (eventCount === 0) {
    console.log('Events have not been inserted');
  }

  // Insert Schedules
  if (scheduleCount === 0 && eventCount > 0) {
    for (const item of schedules) {
      try {
        await prisma.schedule.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting schedule:', error);
      }
    }
  } else if (scheduleCount === 0) {
    console.log('Schedules have not been inserted');
  }

  // Insert Event Tickets
  if (eventTicketCount === 0 && eventCount > 0 && scheduleCount > 0) {
    for (const item of eventTickets) {
      try {
        await prisma.eventTicket.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting eventTicket:', error);
      }
    }
  } else if (eventTicketCount === 0) {
    console.log('Event Tickets have not been inserted');
  }

  // Insert Event Pictures
  if (eventPictureCount === 0 && eventCount > 0) {
    for (const item of eventPictures) {
      try {
        await prisma.eventPicture.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting eventPicture:', error);
      }
    }
  } else if (eventPictureCount === 0) {
    console.log('Event pictures have not been inserted');
  }

  // Insert Transaction Statuses
  if (transactionStatusCount === 0) {
    for (const item of transactionStatuses) {
      try {
        await prisma.transactionStatus.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting transaction status:', error);
      }
    }
  } else if (transactionStatusCount === 0) {
    console.log('Transaction Statuses have not been inserted');
  }

  // Insert Roles
  if (roleCount === 0) {
    for (const item of roles) {
      try {
        await prisma.role.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting role:', error);
      }
    }
  } else if (roleCount === 0) {
    console.log('Roles have not been inserted');
  }

  // Insert Coupon
  if (couponCount === 0 && eventCount > 0 && genreCount > 0) {
    for (const item of coupons) {
      try {
        await prisma.coupon.create({
          data: item,
        });
      } catch (error) {
        console.log('Error inserting coupon:', error);
      }
    }
  } else if (couponCount ===0) {
    console.log('Coupons have not been inserted');
  }

  // Refresh counts after inserting data
  userCount = await prisma.user.count();
  locationCount = await prisma.location.count();
  regionCount = await prisma.region.count();
  genreCount = await prisma.genre.count();
  eventCount = await prisma.event.count();
  eventPictureCount = await prisma.eventPicture.count();
  reviewCount = await prisma.review.count();
  scheduleCount = await prisma.schedule.count();
  myTicketCount = await prisma.myTicket.count();
  eventTicketCount = await prisma.eventTicket.count();
  transactionStatusCount = await prisma.transactionStatus.count();
  roleCount = await prisma.role.count();
  couponCount = await prisma.coupon.count();

  if (
    userCount > 0 &&
    locationCount > 0 &&
    regionCount > 0 &&
    genreCount > 0 &&
    eventCount > 0 &&
    scheduleCount > 0 &&
    eventTicketCount > 0 &&
    eventPictureCount > 0 &&
    transactionStatusCount > 0 &&
    roleCount > 0 &&
    couponCount > 0
  ) {
    console.log(chalk.green('Seeding succesful, all tables have been properly seeded'));
  } else {
    console.log(chalk.yellow('Please execute seeding again until all tables are properly seeded'));
  }
}

const green = '\x1b[32m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';

main()
  .catch((error) => {
    console.error(chalk.red('Main script error:', error));
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
