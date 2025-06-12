import { faker } from '@faker-js/faker'
import type { ColumnRegular } from '@revolist/revogrid'

export type Person = {
  id: string | number
  parentId?: string | number | null
  avatar: string
  firstName: string
  lastName: string
  fullName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
  email: string
  phoneNumber: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  company: string
  jobTitle: string
  position: string
  salary: number
  dateOfBirth: string
  ssn: string
  creditCardNumber: string
  ipAddress: string
  website: string
  flag: string
  rating: number
}

export const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}


const newPerson = (parentId?: string | number | null, id = faker.string.uuid()) => {
  const  firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id,
    parentId,
    avatar: `https://randomuser.me/api/portraits/${Math.floor(Math.random() * 2) ? 'men' : 'women'}/${Math.floor(Math.random() * 20) + 1}.jpg`,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
    gender: faker.person.gender(),

    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    salary: faker.number.int({ min: 30000, max: 100000 }),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    ssn: faker.string.numeric(9),
    creditCardNumber: faker.finance.creditCardNumber(),
    ipAddress: faker.internet.ip(),
    website: faker.internet.url(),
    position: faker.person.jobType(),
    flag: getCountryFlag(faker.location.country()),
    rating: faker.number.int({ min: 0, max: 5 }),
  }
}

export function allColumns(): ColumnRegular[] {
  return [
    {
      name: '#',
      prop: 'id',
    },
    {
      name: 'Full name',
      prop: 'fullName',
      size: 280,
      cellTemplate: (h, { value, model }) => [
        h('img', {
          key: model.id,
          class: 'rounded mx-2 self-center',
          src: model.avatar,
          width: 20,
          height: 20,
        }),
        value,
      ],
    },
    {
      name: 'Email',
      prop: 'email',
      size: 250,
    },
    {
      name: 'Phone',
      prop: 'phoneNumber',
    },
    {
      name: 'Age',
      prop: 'age',
    },
    {
      name: 'Address',
      prop: 'address',
    },
    {
      name: 'City',
      prop: 'city',
    },
    {
      name: 'State',
      prop: 'state',
    },
    {
      name: 'Zip code',
      prop: 'zipCode',
    },
    {
      name: 'Country',
      prop: 'country',
    },
    {
      name: 'Company',
      prop: 'company',
    },
    {
      name: 'Job title',
      prop: 'jobTitle',
    },
    {
      name: 'Date of birth',
      prop: 'dateOfBirth',
    },
    {
      name: 'SSN',
      prop: 'ssn',
    },
    {
      name: 'Credit card number',
      prop: 'creditCardNumber',
    },
    {
      name: 'IP address',
      prop: 'ipAddress',
    },
    {
      name: 'Website',
      prop: 'website',
    },
    {
      name: 'Position',
      prop: 'position',
    },
  ]
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (parentId: string | number | null = null, depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((): Person => {
      const item = newPerson(parentId)
      return {
        ...item,
        subRows: lens[depth + 1] ? makeDataLevel(item.id, depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
export function generateTrendData(length: number, min: number, max: number): number[] {
  return Array.from({ length }, () => faker.number.int({ min, max }));
}

function generateTimelineEvents(numEvents: number, timelineRange: { start: number; end: number }) {
  const { start, end } = timelineRange;

  return Array.from({ length: numEvents }, () => {
    const eventStart = faker.number.int({ min: start, max: end - 1 });
    const eventEnd = faker.number.int({ min: eventStart + 1, max: end });

    return {
      start: eventStart,
      end: eventEnd,
      label: faker.lorem.words(2), // Random label for the event
    };
  });
}
export function makeCharts(len: number) {
  return range(len).map(() => ({
    num: faker.number.int({ min: 0, max: 140 }),
    trend: generateTrendData(5, 0, 90),
    status: faker.helpers.shuffle(['Active', 'Pending', 'Completed', 'Failed'])[0],
    rating: faker.number.int(5),
    timeline: generateTimelineEvents(faker.number.int(5), { start: 0, end: 100 }),
  }));
}

export function generateHeatmapData(rows: number, columns: number, minValue: number, maxValue: number) {
  return Array.from({ length: rows }, (_, rowIndex) => {
    const row: any = { id: rowIndex + 1 }; // Add unique row identifier
    for (let colIndex = 1; colIndex <= columns; colIndex++) {
      row[`col${colIndex}`] = faker.number.int({ min: minValue, max: maxValue });
    }
    return row;
  });
}

export function getCountryFlag(countryCode: string): string {
  // Convert country code to uppercase and ensure it's 2 characters
  const code = countryCode.toUpperCase().slice(0, 2);
  
  // Convert country code to regional indicator symbols
  // Each letter A-Z is converted to a Unicode regional indicator symbol
  const flag = code
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
    
  return flag;
}
