import { atom } from 'jotai';
import { Team } from '../types/types';

export const teamsAtom = atom<Team[]>([
  {
    teamId: 1,
    schoolName: 'Army',
    city: 'West Point',
    state: 'New York',
    latitude: 41.3834,
    longitude: -73.9558,
    nickname: 'Black Knights',
    logo: '',
    conference: 'aac',
    elo: 801,
  },
  {
    teamId: 2,
    schoolName: 'Charlotte',
    city: 'Charlotte',
    state: 'North Carolina',
    latitude: 35.3076,
    longitude: -80.7350,
    nickname: '49ers',
    logo: '',
    conference: 'aac',
    elo: 9629,
  },
  {
    teamId: 3,
    schoolName: 'East Carolina',
    city: 'Greenville',
    state: 'North Carolina',
    latitude: 35.6057,
    longitude: -77.3645,
    nickname: 'Pirates',
    logo: '',
    conference: 'aac',
    elo: 3343,
  },
  {
    teamId: 4,
    schoolName: 'Florida Atlantic',
    city: 'Boca Raton',
    state: 'Florida',
    latitude: 26.3730,
    longitude: -80.1011,
    nickname: 'Owls',
    logo: '',
    conference: 'aac',
    elo: 828,
  },
  {
    teamId: 5,
    schoolName: 'Memphis',
    city: 'Memphis',
    state: 'Tennessee',
    latitude: 35.1187,
    longitude: -89.9373,
    nickname: 'Tigers',
    logo: '',
    conference: 'aac',
    elo: 2714,
  },
  {
    teamId: 6,
    schoolName: 'Navy',
    city: 'Annapolis',
    state: 'Maryland',
    latitude: 38.9859,
    longitude: -76.4838,
    nickname: 'Midshipmen',
    logo: '',
    conference: 'aac',
    elo: 1601,
  },
  {
    teamId: 7,
    schoolName: 'North Texas',
    city: 'Denton',
    state: 'Texas',
    latitude: 33.2076,
    longitude: -97.1527,
    nickname: 'Mean Green',
    logo: '',
    conference: 'aac',
    elo: 2939,
  },
  {
    teamId: 8,
    schoolName: 'Rice',
    city: 'Houston',
    state: 'Texas',
    latitude: 29.7174,
    longitude: -95.4018,
    nickname: 'Owls',
    logo: '',
    conference: 'aac',
    elo: 5661,
  },
  {
    teamId: 9,
    schoolName: 'South Florida',
    city: 'Tampa',
    state: 'Florida',
    latitude: 28.0587,
    longitude: -82.4139,
    nickname: 'Bulls',
    logo: '',
    conference: 'aac',
    elo: 6984,
  },
  {
    teamId: 10,
    schoolName: 'Temple',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    latitude: 39.9812,
    longitude: -75.1550,
    nickname: 'Owls',
    logo: '',
    conference: 'aac',
    elo: 6931,
  },
  {
    teamId: 11,
    schoolName: 'Tulane',
    city: 'New Orleans',
    state: 'Louisiana',
    latitude: 29.9409,
    longitude: -90.1203,
    nickname: 'Green Wave',
    logo: '',
    conference: 'aac',
    elo: 3760,
  },
  {
    teamId: 12,
    schoolName: 'Tulsa',
    city: 'Tulsa',
    state: 'Oklahoma',
    latitude: 36.1532,
    longitude: -95.9457,
    nickname: 'Golden Hurricane',
    logo: '',
    conference: 'aac',
    elo: 622,
  },
  {
    teamId: 13,
    schoolName: 'UAB',
    city: 'Birmingham',
    state: 'Alabama',
    latitude: 33.5020,
    longitude: -86.8063,
    nickname: 'Blazers',
    logo: '',
    conference: 'aac',
    elo: 2737,
  },
  {
    teamId: 14,
    schoolName: 'UTSA',
    city: 'San Antonio',
    state: 'Texas',
    latitude: 29.5820,
    longitude: -98.6209,
    nickname: 'Roadrunners',
    logo: '',
    conference: 'aac',
    elo: 6450,
  },
  {
    teamId: 15,
    schoolName: 'Boston College',
    city: 'Chestnut Hill',
    state: 'Massachusetts',
    latitude: 42.3355,
    longitude: -71.1685,
    nickname: 'Eagles',
    logo: '',
    conference: 'acc',
    elo: 7853,
  },
  {
    teamId: 16,
    schoolName: 'Clemson',
    city: 'Clemson',
    state: 'South Carolina',
    latitude: 34.6834,
    longitude: -82.8374,
    nickname: 'Tigers',
    logo: '',
    conference: 'acc',
    elo: 2129,
  },
  {
    teamId: 17,
    schoolName: 'Duke',
    city: 'Durham',
    state: 'North Carolina',
    latitude: 36.0014,
    longitude: -78.9382,
    nickname: 'Blue Devils',
    logo: '',
    conference: 'acc',
    elo: 6751,
  },
  {
    teamId: 18,
    schoolName: 'Florida State',
    city: 'Tallahassee',
    state: 'Florida',
    latitude: 30.4419,
    longitude: -84.2985,
    nickname: 'Seminoles',
    logo: '',
    conference: 'acc',
    elo: 8965,
  },
  {
    teamId: 19,
    schoolName: 'Georgia Tech',
    city: 'Atlanta',
    state: 'Georgia',
    latitude: 33.7756,
    longitude: -84.3963,
    nickname: 'Yellow Jackets',
    logo: '',
    conference: 'acc',
    elo: 1068,
  },
  {
    teamId: 20,
    schoolName: 'Louisville',
    city: 'Louisville',
    state: 'Kentucky',
    latitude: 38.2151,
    longitude: -85.7585,
    nickname: 'Cardinals',
    logo: '',
    conference: 'acc',
    elo: 1303,
  },
  {
    teamId: 21,
    schoolName: 'Miami',
    city: 'Coral Gables',
    state: 'Florida',
    latitude: 25.7173,
    longitude: -80.277,
    nickname: 'Hurricanes',
    logo: '',
    conference: 'acc',
    elo: 1427,
  },
  {
    teamId: 22,
    schoolName: 'North Carolina State',
    city: 'Raleigh',
    state: 'North Carolina',
    latitude: 35.7847,
    longitude: -78.6821,
    nickname: 'Wolfpack',
    logo: '',
    conference: 'acc',
    elo: 4380,
  },
  {
    teamId: 23,
    schoolName: 'North Carolina',
    city: 'Chapel Hill',
    state: 'North Carolina',
    latitude: 35.9049,
    longitude: -79.0469,
    nickname: 'Tar Heels',
    logo: '',
    conference: 'acc',
    elo: 4039,
  },
  {
    teamId: 24,
    schoolName: 'Pitt',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    latitude: 40.4443,
    longitude: -79.9608,
    nickname: 'Panthers',
    logo: '',
    conference: 'acc',
    elo: 9546,
  },
  {
    teamId: 25,
    schoolName: 'Syracuse',
    city: 'Syracuse',
    state: 'New York',
    latitude: 43.0392,
    longitude: -76.1351,
    nickname: 'Orange',
    logo: '',
    conference: 'acc',
    elo: 1094,
  },
  {
    teamId: 26,
    schoolName: 'Virginia',
    city: 'Charlottesville',
    state: 'Virginia',
    latitude: 38.0336,
    longitude: -78.508,
    nickname: 'Cavaliers',
    logo: '',
    conference: 'acc',
    elo: 8679,
  },
  {
    teamId: 27,
    schoolName: 'Virginia Tech',
    city: 'Blacksburg',
    state: 'Virginia',
    latitude: 37.2307,
    longitude: -80.4215,
    nickname: 'Hokies',
    logo: '',
    conference: 'acc',
    elo: 5198,
  },
  {
    teamId: 28,
    schoolName: 'Wake Forest',
    city: 'Winston-Salem',
    state: 'North Carolina',
    latitude: 36.1351,
    longitude: -80.2796,
    nickname: 'Demon Deacons',
    logo: '',
    conference: 'acc',
    elo: 1802,
  },
  {
    teamId: 29,
    schoolName: 'Southern Methodist',
    city: 'Dallas',
    state: 'Texas',
    latitude: 32.8418,
    longitude: -96.7846,
    nickname: 'Mustangs',
    logo: '',
    conference: 'acc',
    elo: 5100,
  },
  {
    teamId: 30,
    schoolName: 'Stanford',
    city: 'Stanford',
    state: 'California',
    latitude: 37.4275,
    longitude: -122.1697,
    nickname: 'Cardinal',
    logo: '',
    conference: 'acc',
    elo: 9167,
  },
  {
    teamId: 31,
    schoolName: 'California',
    city: 'Berkeley',
    state: 'California',
    latitude: 37.8719,
    longitude: -122.2585,
    nickname: 'Golden Bears',
    logo: '',
    conference: 'acc',
    elo: 6755,
  },
  {
    teamId: 32,
    schoolName: 'Illinois',
    city: 'Champaign',
    state: 'Illinois',
    latitude: 40.1106,
    longitude: -88.2073,
    nickname: 'Fighting Illini',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 33,
    schoolName: 'Indiana',
    city: 'Bloomington',
    state: 'Indiana',
    latitude: 39.1653,
    longitude: -86.5264,
    nickname: 'Hoosiers',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 34,
    schoolName: 'Iowa',
    city: 'Iowa City',
    state: 'Iowa',
    latitude: 41.6611,
    longitude: -91.5302,
    nickname: 'Hawkeyes',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 35,
    schoolName: 'Maryland',
    city: 'College Park',
    state: 'Maryland',
    latitude: 38.9862,
    longitude: -76.9426,
    nickname: 'Terrapins',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 36,
    schoolName: 'Michigan',
    city: 'Ann Arbor',
    state: 'Michigan',
    latitude: 42.2780,
    longitude: -83.7382,
    nickname: 'Wolverines',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 37,
    schoolName: 'Michigan State',
    city: 'East Lansing',
    state: 'Michigan',
    latitude: 42.7325,
    longitude: -84.4822,
    nickname: 'Spartans',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 38,
    schoolName: 'Minnesota',
    city: 'Minneapolis',
    state: 'Minnesota',
    latitude: 44.9763,
    longitude: -93.2336,
    nickname: 'Golden Gophers',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 39,
    schoolName: 'Nebraska',
    city: 'Lincoln',
    state: 'Nebraska',
    latitude: 40.8136,
    longitude: -96.7026,
    nickname: 'Cornhuskers',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 40,
    schoolName: 'Northwestern',
    city: 'Evanston',
    state: 'Illinois',
    latitude: 42.0623,
    longitude: -87.6756,
    nickname: 'Wildcats',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 41,
    schoolName: 'Ohio State',
    city: 'Columbus',
    state: 'Ohio',
    latitude: 40.0028,
    longitude: -83.0194,
    nickname: 'Buckeyes',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 42,
    schoolName: 'University of Oregon',
    city: 'Eugene',
    state: 'Oregon',
    latitude: 44.0448,
    longitude: -123.0726,
    nickname: 'Ducks',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 43,
    schoolName: 'Penn State',
    city: 'University Park',
    state: 'Pennsylvania',
    latitude: 40.7982,
    longitude: -77.859,
    nickname: 'Nittany Lions',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 44,
    schoolName: 'Purdue',
    city: 'West Lafayette',
    state: 'Indiana',
    latitude: 40.4237,
    longitude: -86.9212,
    nickname: 'Boilermakers',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 45,
    schoolName: 'Rutgers',
    city: 'Piscataway',
    state: 'New Jersey',
    latitude: 40.5224,
    longitude: -74.4568,
    nickname: 'Scarlet Knights',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 46,
    schoolName: 'UCLA',
    city: 'Los Angeles',
    state: 'California',
    latitude: 34.0689,
    longitude: -118.4452,
    nickname: 'Bruins',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 47,
    schoolName: 'USC',
    city: 'Los Angeles',
    state: 'California',
    latitude: 34.0226,
    longitude: -118.4957,
    nickname: 'Trojans',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 48,
    schoolName: 'Washington',
    city: 'Seattle',
    state: 'Washington',
    latitude: 47.6537,
    longitude: -122.3078,
    nickname: 'Huskies',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 49,
    schoolName: 'Wisconsin',
    city: 'Madison',
    state: 'Wisconsin',
    latitude: 43.0751,
    longitude: -89.4005,
    nickname: 'Badgers',
    logo: '',
    conference: 'big10',
    elo: 5000,
  },
  {
    teamId: 50,
    schoolName: 'Arizona',
    city: 'Tucson',
    state: 'Arizona',
    latitude: 32.2313,
    longitude: -110.9501,
    nickname: 'Wildcats',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 51,
    schoolName: 'Arizona State',
    city: 'Tempe',
    state: 'Arizona',
    latitude: 33.4246,
    longitude: -111.9332,
    nickname: 'Sun Devils',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 52,
    schoolName: 'Baylor',
    city: 'Waco',
    state: 'Texas',
    latitude: 31.5493,
    longitude: -97.1143,
    nickname: 'Bears',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 53,
    schoolName: 'Brigham Young',
    city: 'Provo',
    state: 'Utah',
    latitude: 40.2338,
    longitude: -111.6585,
    nickname: 'Cougars',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 54,
    schoolName: 'Cincinnati',
    city: 'Cincinnati',
    state: 'Ohio',
    latitude: 39.1031,
    longitude: -84.5120,
    nickname: 'Bearcats',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 55,
    schoolName: 'Colorado',
    city: 'Boulder',
    state: 'Colorado',
    latitude: 40.0074,
    longitude: -105.2659,
    nickname: 'Buffaloes',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 56,
    schoolName: 'Houston',
    city: 'Houston',
    state: 'Texas',
    latitude: 29.7604,
    longitude: -95.3698,
    nickname: 'Cougars',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 57,
    schoolName: 'Iowa State',
    city: 'Ames',
    state: 'Iowa',
    latitude: 42.0312,
    longitude: -93.6458,
    nickname: 'Cyclones',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 58,
    schoolName: 'Kansas',
    city: 'Lawrence',
    state: 'Kansas',
    latitude: 38.9784,
    longitude: -95.2658,
    nickname: 'Jayhawks',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 59,
    schoolName: 'Kansas State',
    city: 'Manhattan',
    state: 'Kansas',
    latitude: 39.1869,
    longitude: -96.5717,
    nickname: 'Wildcats',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 60,
    schoolName: 'Oklahoma State',
    city: 'Stillwater',
    state: 'Oklahoma',
    latitude: 36.1131,
    longitude: -97.0589,
    nickname: 'Cowboys',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 61,
    schoolName: 'Texas Christian',
    city: 'Fort Worth',
    state: 'Texas',
    latitude: 32.7084,
    longitude: -97.3575,
    nickname: 'Horned Frogs',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 62,
    schoolName: 'Texas Tech',
    city: 'Lubbock',
    state: 'Texas',
    latitude: 33.5779,
    longitude: -101.8552,
    nickname: 'Red Raiders',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 63,
    schoolName: 'UCF',
    city: 'Orlando',
    state: 'Florida',
    latitude: 28.6024,
    longitude: -81.2001,
    nickname: 'Knights',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 64,
    schoolName: 'Utah',
    city: 'Salt Lake City',
    state: 'Utah',
    latitude: 40.7608,
    longitude: -111.8624,
    nickname: 'Utes',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 65,
    schoolName: 'West Virginia',
    city: 'Morgantown',
    state: 'West Virginia',
    latitude: 39.6295,
    longitude: -79.9559,
    nickname: 'Mountaineers',
    logo: '',
    conference: 'big12',
    elo: 5000,
  },
  {
    teamId: 66,
    schoolName: 'Florida International',
    city: 'Miami',
    state: 'Florida',
    latitude: 25.756,
    longitude: -80.3778,
    nickname: 'Panthers',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 67,
    schoolName: 'Jacksonville State',
    city: 'Jacksonville',
    state: 'Alabama',
    latitude: 33.8248,
    longitude: -85.7625,
    nickname: 'Gamecocks',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 68,
    schoolName: 'Kennesaw State',
    city: 'Kennesaw',
    state: 'Georgia',
    latitude: 34.0294,
    longitude: -84.5833,
    nickname: 'Owls',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 69,
    schoolName: 'Liberty',
    city: 'Lynchburg',
    state: 'Virginia',
    latitude: 37.3513,
    longitude: -79.1805,
    nickname: 'Flames',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 70,
    schoolName: 'Middle Tennessee State',
    city: 'Murfreesboro',
    state: 'Tennessee',
    latitude: 35.8497,
    longitude: -86.3926,
    nickname: 'Blue Raiders',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 71,
    schoolName: 'New Mexico State',
    city: 'Las Cruces',
    state: 'New Mexico',
    latitude: 32.2818,
    longitude: -106.749,
    nickname: 'Aggies',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 72,
    schoolName: 'Sam Houston State',
    city: 'Huntsville',
    state: 'Texas',
    latitude: 30.7107,
    longitude: -95.5495,
    nickname: 'Bearkats',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 73,
    schoolName: 'Louisiana Tech',
    city: 'Ruston',
    state: 'Louisiana',
    latitude: 32.5293,
    longitude: -92.6353,
    nickname: 'Bulldogs',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 74,
    schoolName: 'UTEP',
    city: 'El Paso',
    state: 'Texas',
    latitude: 31.7776,
    longitude: -106.5043,
    nickname: 'Miners',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 75,
    schoolName: 'Western Kentucky',
    city: 'Bowling Green',
    state: 'Kentucky',
    latitude: 36.9902,
    longitude: -86.4436,
    nickname: 'Hilltoppers',
    logo: '',
    conference: 'cusa',
    elo: 5000,
  },
  {
    teamId: 76,
    schoolName: 'Notre Dame',
    city: 'Notre Dame',
    state: 'Indiana',
    latitude: 41.7034,
    longitude: -86.2254,
    nickname: 'Fighting Irish',
    logo: '',
    conference: 'ind',
    elo: 5000,
    },
  {
    teamId: 77,
    schoolName: 'UConn',
    city: 'Storrs',
    state: 'Connecticut',
    latitude: 41.8084,
    longitude: -72.2538,
    nickname: 'Huskies',
    logo: '',
    conference: 'ind',
    elo: 5000,
  },
  {
    teamId: 78,
    schoolName: 'UMass',
    city: 'Amherst',
    state: 'Massachusetts',
    latitude: 42.3905,
    longitude: -72.5292,
    nickname: 'Minutemen',
    logo: '',
    conference: 'ind',
    elo: 5000,
  },
  {
    teamId: 79,
    schoolName: 'Akron',
    city: 'Akron',
    state: 'Ohio',
    latitude: 41.0814,
    longitude: -81.5190,
    nickname: 'Zips',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 80,
    schoolName: 'Ball State',
    city: 'Muncie',
    state: 'Indiana',
    latitude: 40.1934,
    longitude: -85.4148,
    nickname: 'Cardinals',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 81,
    schoolName: 'Buffalo',
    city: 'Buffalo',
    state: 'New York',
    latitude: 42.8864,
    longitude: -78.8784,
    nickname: 'Bulls',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 82,
    schoolName: 'Bowling Green',
    city: 'Bowling Green',
    state: 'Ohio',
    latitude: 41.3760,
    longitude: -83.6301,
    nickname: 'Falcons',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 83,
    schoolName: 'Central Michigan',
    city: 'Mount Pleasant',
    state: 'Michigan',
    latitude: 43.5893,
    longitude: -84.7666,
    nickname: 'Chippewas',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 84,
    schoolName: 'Eastern Michigan',
    city: 'Ypsilanti',
    state: 'Michigan',
    latitude: 42.2587,
    longitude: -81.0540,
    nickname: 'Eagles',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 85,
    schoolName: 'Kent State',
    city: 'Kent',
    state: 'Ohio',
    latitude: 41.1481,
    longitude: -81.3431,
    nickname: 'Golden Flashes',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 86,
    schoolName: 'Miami OH',
    city: 'Oxford',
    state: 'Ohio',
    latitude: 39.5075,
    longitude: -84.7446,
    nickname: 'RedHawks',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 87,
    schoolName: 'Northern Illinois',
    city: 'DeKalb',
    state: 'Illinois',
    latitude: 41.9332,
    longitude: -88.7685,
    nickname: 'Huskies',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 88,
    schoolName: 'Ohio',
    city: 'Athens',
    state: 'Ohio',
    latitude: 39.3240,
    longitude: -82.1012,
    nickname: 'Bobcats',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 89,
    schoolName: 'Toledo',
    city: 'Toledo',
    state: 'Ohio',
    latitude: 41.6603,
    longitude: -83.5379,
    nickname: 'Rockets',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 90,
    schoolName: 'Western Michigan',
    city: 'Kalamazoo',
    state: 'Michigan',
    latitude: 42.2917,
    longitude: -85.5872,
    nickname: 'Broncos',
    logo: '',
    conference: 'mac',
    elo: 5000,
  },
  {
    teamId: 91,
    schoolName: 'Air Force',
    city: 'Colorado Springs',
    state: 'Colorado',
    latitude: 38.9977,
    longitude: -104.8521,
    nickname: 'Falcons',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 92,
    schoolName: 'Boise State',
    city: 'Boise',
    state: 'Idaho',
    latitude: 43.6187,
    longitude: -116.2146,
    nickname: 'Broncos',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 93,
    schoolName: 'Colorado State',
    city: 'Fort Collins',
    state: 'Colorado',
    latitude: 40.5734,
    longitude: -105.0844,
    nickname: 'Rams',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 94,
    schoolName: 'Fresno State',
    city: 'Fresno',
    state: 'California',
    latitude: 36.7468,
    longitude: -119.7726,
    nickname: 'Bulldogs',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 95,
    schoolName: 'Hawaii',
    city: 'Honolulu',
    state: 'Hawaii',
    latitude: 21.3069,
    longitude: -157.8583,
    nickname: 'Rainbow Warriors',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 96,
    schoolName: 'Nevada',
    city: 'Reno',
    state: 'Nevada',
    latitude: 39.5296,
    longitude: -119.8138,
    nickname: 'Wolf Pack',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 97,
    schoolName: 'New Mexico',
    city: 'Albuquerque',
    state: 'New Mexico',
    latitude: 35.0844,
    longitude: -106.6504,
    nickname: 'Lobos',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 98,
    schoolName: 'San Diego State',
    city: 'San Diego',
    state: 'California',
    latitude: 32.7157,
    longitude: -117.1611,
    nickname: 'Aztecs',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 99,
    schoolName: 'San Jose State',
    city: 'San Jose',
    state: 'California',
    latitude: 37.3382,
    longitude: -121.8863,
    nickname: 'Spartans',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 100,
    schoolName: 'UNLV',
    city: 'Las Vegas',
    state: 'Nevada',
    latitude: 36.1699,
    longitude: -115.1398,
    nickname: 'Rebels',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 101,
    schoolName: 'Utah State',
    city: 'Logan',
    state: 'Utah',
    latitude: 41.7359,
    longitude: -111.8340,
    nickname: 'Aggies',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 102,
    schoolName: 'Wyoming',
    city: 'Laramie',
    state: 'Wyoming',
    latitude: 41.3111,
    longitude: -105.5911,
    nickname: 'Cowboys',
    logo: '',
    conference: 'mw',
    elo: 5000,
  },
  {
    teamId: 103,
    schoolName: 'Oregon State',
    city: 'Corvallis',
    state: 'Oregon',
    latitude: 44.5646,
    longitude: -123.2620,
    nickname: 'Beavers',
    logo: '',
    conference: 'pac12',
    elo: 5000,
  },
  {
    teamId: 104,
    schoolName: 'Washington State',
    city: 'Pullman',
    state: 'Washington',
    latitude: 46.7304,
    longitude: -117.1542,
    nickname: 'Cougars',
    logo: '',
    conference: 'pac12',
    elo: 5000,
  },
  {
    teamId: 105,
    schoolName: 'Alabama',
    city: 'Tuscaloosa',
    state: 'Alabama',
    latitude: 33.2148,
    longitude: -87.5469,
    nickname: 'Crimson Tide',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 106,
    schoolName: 'Arkansas',
    city: 'Fayetteville',
    state: 'Arkansas',
    latitude: 36.0520,
    longitude: -94.1719,
    nickname: 'Razorbacks',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 107,
    schoolName: 'Auburn',
    city: 'Auburn',
    state: 'Alabama',
    latitude: 32.6099,
    longitude: -85.4808,
    nickname: 'Tigers',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 108,
    schoolName: 'Florida',
    city: 'Gainesville',
    state: 'Florida',
    latitude: 29.6516,
    longitude: -82.3248,
    nickname: 'Gators',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 109,
    schoolName: 'Georgia',
    city: 'Athens',
    state: 'Georgia',
    latitude: 33.9510,
    longitude: -83.3730,
    nickname: 'Bulldogs',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 110,
    schoolName: 'Kentucky',
    city: 'Lexington',
    state: 'Kentucky',
    latitude: 38.0368,
    longitude: -84.5051,
    nickname: 'Wildcats',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 111,
    schoolName: 'LSU',
    city: 'Baton Rouge',
    state: 'Louisiana',
    latitude: 30.3960,
    longitude: -91.1790,
    nickname: 'Tigers',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 112,
    schoolName: 'Mississippi State',
    city: 'Starkville',
    state: 'Mississippi',
    latitude: 33.4553,
    longitude: -88.7894,
    nickname: 'Bulldogs',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 113,
    schoolName: 'Missouri',
    city: 'Columbia',
    state: 'Missouri',
    latitude: 38.9521,
    longitude: -92.3341,
    nickname: 'Tigers',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 114,
    schoolName: 'Ole Miss',
    city: 'Oxford',
    state: 'Mississippi',
    latitude: 34.3664,
    longitude: -89.5192,
    nickname: 'Rebels',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 115,
    schoolName: 'Oklahoma',
    city: 'Norman',
    state: 'Oklahoma',
    latitude: 35.2226,
    longitude: -97.4395,
    nickname: 'Sooners',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 116,
    schoolName: 'South Carolina',
    city: 'Columbia',
    state: 'South Carolina',
    latitude: 33.9908,
    longitude: -81.0255,
    nickname: 'Gamecocks',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 117,
    schoolName: 'Tennessee',
    city: 'Knoxville',
    state: 'Tennessee',
    latitude: 35.9606,
    longitude: -83.9207,
    nickname: 'Volunteers',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 118,
    schoolName: 'Texas A&M',
    city: 'College Station',
    state: 'Texas',
    latitude: 30.6120,
    longitude: -96.3418,
    nickname: 'Aggies',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 119,
    schoolName: 'Texas',
    city: 'Austin',
    state: 'Texas',
    latitude: 30.2672,
    longitude: -97.7431,
    nickname: 'Longhorns',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 120,
    schoolName: 'Vanderbilt',
    city: 'Nashville',
    state: 'Tennessee',
    latitude: 36.1447,
    longitude: -86.8085,
    nickname: 'Commodores',
    logo: '',
    conference: 'sec',
    elo: 5000,
  },
  {
    teamId: 121,
    schoolName: 'Appalachian State',
    city: 'Boone',
    state: 'North Carolina',
    latitude: 36.2131,
    longitude: -81.6746,
    nickname: 'Mountaineers',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 122,
    schoolName: 'Arkansas State',
    city: 'Jonesboro',
    state: 'Arkansas',
    latitude: 35.8423,
    longitude: -90.7043,
    nickname: 'Red Wolves',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 123,
    schoolName: 'Coastal Carolina',
    city: 'Conway',
    state: 'South Carolina',
    latitude: 33.8431,
    longitude: -79.0518,
    nickname: 'Chanticleers',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 124,
    schoolName: 'Georgia Southern',
    city: 'Statesboro',
    state: 'Georgia',
    latitude: 32.4406,
    longitude: -81.7835,
    nickname: 'Eagles',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 125,
    schoolName: 'Georgia State',
    city: 'Atlanta',
    state: 'Georgia',
    latitude: 33.7490,
    longitude: -84.3880,
    nickname: 'Panthers',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 126,
    schoolName: 'James Madison',
    city: 'Harrisonburg',
    state: 'Virginia',
    latitude: 38.4342,
    longitude: -78.8689,
    nickname: 'Dukes',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 127,
    schoolName: 'Louisiana-Lafayette',
    city: 'Lafayette',
    state: 'Louisiana',
    latitude: 30.2241,
    longitude: -92.0198,
    nickname: 'Ragin\' Cajuns',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 128,
    schoolName: 'Louisiana-Monroe',
    city: 'Monroe',
    state: 'Louisiana',
    latitude: 32.5093,
    longitude: -92.1193,
    nickname: 'Warhawks',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 129,
    schoolName: 'Marshall',
    city: 'Huntington',
    state: 'West Virginia',
    latitude: 38.4193,
    longitude: -82.4452,
    nickname: 'Thundering Herd',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 130,
    schoolName: 'Old Dominion',
    city: 'Norfolk',
    state: 'Virginia',
    latitude: 36.8573,
    longitude: -76.2852,
    nickname: 'Monarchs',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 131,
    schoolName: 'South Alabama',
    city: 'Mobile',
    state: 'Alabama',
    latitude: 30.6954,
    longitude: -88.0399,
    nickname: 'Jaguars',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 132,
    schoolName: 'Troy',
    city: 'Troy',
    state: 'Alabama',
    latitude: 31.8111,
    longitude: -85.9514,
    nickname: 'Trojans',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 133,
    schoolName: 'Texas State',
    city: 'San Marcos',
    state: 'Texas',
    latitude: 29.8882,
    longitude: -97.9414,
    nickname: 'Bobcats',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  },
  {
    teamId: 134,
    schoolName: 'Southern Miss',
    city: 'Hattiesburg',
    state: 'Mississippi',
    latitude: 31.3221,
    longitude: -89.3085,
    nickname: 'Golden Eagles',
    logo: '',
    conference: 'sunbelt',
    elo: 5000,
  }
]);