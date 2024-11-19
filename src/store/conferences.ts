import { atom } from 'jotai';
import { Conference } from '../types';
import { aacTeams } from './teams/aac_teams';
import { accTeams } from './teams/acc_teams';
import { big10Teams } from './teams/big10_teams';
import { big12Teams } from './teams/big12_teams';
import { cusaTeams } from './teams/cusa_teams';
import { indTeams } from './teams/independent_teams';
import { macTeams } from './teams/mac_teams';
import { mwTeams } from './teams/mw_teams';
import { pac12Teams } from './teams/pac12_teams';
import { secTeams } from './teams/sec_teams';
import { sunbeltTeams } from './teams/sunbelt_teams';

export const conferencesAtom = atom<Conference[]>([
  {
    id: 'aac',
    name: 'AAC',
    logo: 'src\\img\\aac_logo.svg',
    teams: aacTeams
  },
  {
    id: 'acc',
    name: 'ACC',
    logo: 'src\\img\\acc_logo.svg',
    teams: accTeams
  },
  {
    id: 'big10',
    name: 'Big Ten',
    logo: 'src\\img\\big10_logo.svg',
    teams: big10Teams
  },
  {
    id: 'big12',
    name: 'Big 12',
    logo: 'src\\img\\big12_logo.svg',
    teams: big12Teams
  },
  {
    id: 'cusa',
    name: 'Conference USA',
    logo: 'src\\img\\cusa_logo.svg',
    teams: cusaTeams
  },
  {
    id: 'mac',
    name: 'MAC',
    logo: 'src\\img\\mac_logo.svg',
    teams: macTeams
  },
  {
    id: 'mw',
    name: 'Mountain West',
    logo: 'src\\img\\mountainwest_logo.svg',
    teams: mwTeams
  },
  {
    id: 'pac12',
    name: 'Pac 12',
    logo: 'src\\img\\pac12_logo.svg',
    teams: pac12Teams
  },
  {
    id: 'sec',
    name: 'SEC',
    logo: 'src\\img\\sec_logo.svg',
    teams: secTeams
  },
  {
    id: 'sunbelt',
    name: 'Sun Belt',
    logo: 'src\\img\\sunbelt_logo.svg',
    teams: sunbeltTeams
  },
  {
    id: 'ind',
    name: 'Independents',
    logo: 'src\\img\\ncaa_logo.svg',
    teams: indTeams
  },
]);