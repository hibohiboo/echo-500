import { useState, useEffect } from 'react';
import type { BattleCommandCardData } from '../types/battleCommand';

interface SpreadSheetResponse {
  majorDimension: 'Rows';
  range: string;
  values: string[][];
}

const parseTags = (tagsString: string): string[] => {
  if (!tagsString) return [];
  return tagsString.split(',').map((t) => t.trim());
};

const safeString = (value: string | undefined): string => value || '';
const safeNumber = (value: string | undefined): number => Number(value) || 0;

const mapRowToBattleCommand = (row: string[]): BattleCommandCardData => {
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

export function useBattleCommandData(apiKey: string, spreadSheetId: string) {
  const [data, setData] = useState<BattleCommandCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
        const url = `${baseUrl}${spreadSheetId}/values/戦闘用モジュール!A2:K200?key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from Google Sheets API: ${response.statusText}`,
          );
        }

        const result: SpreadSheetResponse = await response.json();
        const cards = result.values?.map(mapRowToBattleCommand) || [];
        setData(cards);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Unknown error occurred'),
        );
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && spreadSheetId) {
      fetchData();
    }
  }, [apiKey, spreadSheetId]);

  return { data, loading, error };
}
