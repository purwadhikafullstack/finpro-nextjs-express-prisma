const { PrismaClient } = require('@prisma/client');

const bcrypt = require('bcrypt');

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

const User = [
  {
    firstName: 'TOM',
    lastName: 'RUIZ',
    email: 'tom.ruiz@example.com',
    password: 'tomruiz123',
    role: 'EVENT_ORGANIZER',
    verified: true,
  },
  {
    firstName: 'TOMAS',
    lastName: 'RONALD',
    email: 'tomas.ronald@example.com',
    password: 'tomasronald123',
    role: 'EVENT_ORGANIZER',
    verified: true,
  },
];

const Location = [
  {
    city: 'Indianapolis',
    venue: 'Evergreen Venue',
    regionId: '1',
  },
  {
    city: 'MODERN_NEWYORK',
    venue: 'SOMETHING_VENUE',
    regionId: '0',
  },
];

const Region = [
  {
    name: 'HOKKAIDO',
  },
  {
    name: 'TOHOKU',
  },
  {
    name: 'KANSAI',
  },
  {
    name: 'KANTO',
  },
  {
    name: 'CHUUBU_HOKURIKU',
  },
  {
    name: 'KYUUSHUU_OKINAWA',
  },
];

const Genre = [
  { name: 'MUSIC' },
  { name: 'SPORT' },
  { name: 'THEATER' },
  { name: 'CLASSIC' },
  { name: 'MOVIE' },
  { name: 'ANIME' },
  { name: 'KOREAN' },
  { name: 'LIVE_STREAMING' },
];

async function main() {
  const jobPosCount = await prisma.jobPosition.count();
  const shiftCount = await prisma.shift.count();
  const employeeCount = await prisma.employee.count();

  if (jobPosCount === 0) {
    for (const item of jobPositions) {
      try {
        await prisma.jobPosition.create({
          data: item,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else if (shiftCount === 0) {
    for (const item of shifts) {
      try {
        await prisma.shift.create({
          data: item,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else if (shiftCount > 0 && jobPosCount > 0 && employeeCount === 0) {
    for (const item of employees) {
      try {
        await prisma.employee.create({
          data: {
            ...item,
            password: await hashPassword(item.password),
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log('all has been generated');
  }
}

main()
  .catch((error) => {
    console.error('Main script error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
