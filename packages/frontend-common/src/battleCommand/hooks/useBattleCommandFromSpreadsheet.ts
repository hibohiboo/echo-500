import { useSpreadSheetData } from '@echo-500/frontend-common/shared/spreadsheet/api';
import { parseToExternalBattleCommand } from '@echo-500/schema';

export const useBattleCommandFromSpreadsheet = () => {
  const result = useSpreadSheetData({
    spreadSheetId: import.meta.env.VITE_SPREAD_SHEET_ID!,
    sheetName: '戦闘用モジュール',
    range: 'A2:K200',
  });
  const data = result.data?.values.map((row) => {
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

    const parsed = parseToExternalBattleCommand({
      class: className,
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
    });
    return parsed;
  });

  return {
    ...result,
    data,
  };
};
