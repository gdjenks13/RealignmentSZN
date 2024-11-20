import { atom } from 'jotai';
import { Conference } from '../types';
import { aacTeamsAtom, accTeamsAtom, big10TeamsAtom, big12TeamsAtom, cusaTeamsAtom, 
  indTeamsAtom, macTeamsAtom, mwTeamsAtom, pac12TeamsAtom, secTeamsAtom, sbcTeamsAtom } from './fbs_teams';

export const conferencesAtom = atom<Conference[]>([
  {
    id: 'aac',
    name: 'AAC',
    logo: 'src\\img\\aac_logo.svg',
    teams: aacTeamsAtom
  },
  {
    id: 'acc',
    name: 'ACC',
    logo: 'src\\img\\acc_logo.svg',
    teams: accTeamsAtom
  },
  {
    id: 'big10',
    name: 'Big Ten',
    logo: 'src\\img\\big10_logo.svg',
    teams: big10TeamsAtom
  },
  {
    id: 'big12',
    name: 'Big 12',
    logo: 'src\\img\\big12_logo.svg',
    teams: big12TeamsAtom
  },
  {
    id: 'cusa',
    name: 'Conference USA',
    logo: 'src\\img\\cusa_logo.svg',
    teams: cusaTeamsAtom
  },
  {
    id: 'mac',
    name: 'MAC',
    logo: 'src\\img\\mac_logo.svg',
    teams: macTeamsAtom
  },
  {
    id: 'mw',
    name: 'Mountain West',
    logo: 'src\\img\\mountainwest_logo.svg',
    teams: mwTeamsAtom
  },
  {
    id: 'pac12',
    name: 'Pac 12',
    logo: 'src\\img\\pac12_logo.svg',
    teams: pac12TeamsAtom
  },
  {
    id: 'sec',
    name: 'SEC',
    logo: 'src\\img\\sec_logo.svg',
    teams: secTeamsAtom
  },
  {
    id: 'sunbelt',
    name: 'Sun Belt',
    logo: 'src\\img\\sunbelt_logo.svg',
    teams: sbcTeamsAtom
  },
  {
    id: 'ind',
    name: 'Independents',
    logo: 'src\\img\\ncaa_logo.svg',
    teams: indTeamsAtom
  },
]);