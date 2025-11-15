import useSWR from 'swr';

const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

interface GetSpreadSheetDataProps {
  spreadSheetId: string;
  sheetName: string;
  range: string;
}

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

const useSpreadSheetData = ({
  spreadSheetId,
  sheetName,
  range,
}: GetSpreadSheetDataProps) => {
  if (!apiKey) {
    throw new Error('Google Sheets API key is not set.');
  }

  const url = `${baseUrl}${spreadSheetId}/values/${sheetName}!${range}?key=${apiKey}`;

  return useSWR<SpreadSheetResponse>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 600000, // 600秒間は同じリクエストを重複排除
  });
};
export const useSpreadSheetBattleSkillData = () => {
  const result = useSpreadSheetData({
    spreadSheetId: import.meta.env.VITE_SPREAD_SHEET_ID!,
    sheetName: '戦闘用コマンド',
    range: 'A2:I200',
  });
  return (
    result.data?.values.map((row) => {
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
      ] = row;
      return {
        class: className,
        name,
        cp: Number(cp),
        timing,
        cost,
        range,
        effect,
        target,
        flavor,
        tags: tags.split(','),
      };
    }) || []
  );
};
