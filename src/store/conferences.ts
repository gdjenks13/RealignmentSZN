import { atom } from 'jotai';
import { Conference } from '../types/types';
import { teamsAtom } from './fbs_teams';

export const conferencesAtom = atom<Conference[]>(get => {
  const teams = get(teamsAtom);
  return [
    {
      id: 'aac',
      name: 'AAC',
      logo: 'src\\img\\aac_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'aac'))
    },
    {
      id: 'acc',
      name: 'ACC',
      logo: 'src\\img\\acc_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'acc'))
    },
    {
      id: 'big10',
      name: 'Big Ten',
      logo: 'src\\img\\big10_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'big10'))
    },
    {
      id: 'big12',
      name: 'Big 12',
      logo: 'src\\img\\big12_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'big12'))
    },
    {
      id: 'cusa',
      name: 'Conference USA',
      logo: 'src\\img\\cusa_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'cusa'))
    },
    {
      id: 'mac',
      name: 'MAC',
      logo: 'src\\img\\mac_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'mac'))
    },
    {
      id: 'mw',
      name: 'Mountain West',
      logo: 'src\\img\\mountainwest_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'mw'))
    },
    {
      id: 'pac12',
      name: 'Pac 12',
      logo: 'src\\img\\pac12_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'pac12'))
    },
    {
      id: 'sec',
      name: 'SEC',
      logo: 'src\\img\\sec_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'sec'))
    },
    {
      id: 'sunbelt',
      name: 'Sun Belt',
      logo: 'src\\img\\sunbelt_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'sunbelt'))
    },
    {
      id: 'ind',
      name: 'Independents',
      logo: 'src\\img\\ncaa_logo.svg',
      teams: atom(teams.filter(team => team.conference === 'ind'))
    },
  ];
});