import { createResource } from 'solid-js';

const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

interface SpreadSheetResponse {
  majorDimension: 'Rows';
  range: string;
  values: string[][];
}

const fetcher = async (url: string): Promise<SpreadSheetResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from Google Sheets API: ${response.statusText}`,
    );
  }

  return response.json();
};

const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY;

interface BattleSkillData {
  class: string;
  name: string;
  cp: number;
  timing: string;
  cost: string;
  range: string;
  effect: string;
  target: string;
  flavor: string;
  tags: string[];
  details: string;
}

const parseTags = (tagsString: string): string[] => {
  if (!tagsString) return [];
  return tagsString.split(',').map((t) => t.trim());
};

const safeString = (value: string | undefined): string => value || '';
const safeNumber = (value: string | undefined): number => Number(value) || 0;

const mapRowToBattleSkill = (row: string[]): BattleSkillData => {
  const [
    className,
    name,
    cp,
    timing,
    target,
    range,
    cost,
    effect,
    flavor,
    tags,
    details,
  ] = row;

  return {
    class: safeString(className),
    name: safeString(name),
    cp: safeNumber(cp),
    timing: safeString(timing),
    cost: safeString(cost),
    range: safeString(range),
    effect: safeString(effect),
    target: safeString(target),
    flavor: safeString(flavor),
    tags: parseTags(tags),
    details: safeString(details),
  };
};

export const useSpreadSheetBattleSkillData = () => {
  if (!apiKey) {
    throw new Error('Google Sheets API key is not set.');
  }

  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID!;
  const url = `${baseUrl}${spreadSheetId}/values/戦闘用モジュール!A2:K200?key=${apiKey}`;

  const [data] = createResource<BattleSkillData[]>(async () => {
    const response = await fetcher(url);
    return response.values?.map(mapRowToBattleSkill) || [];
  });

  return data;
};
