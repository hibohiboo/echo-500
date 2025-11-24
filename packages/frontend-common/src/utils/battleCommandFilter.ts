import type { BattleCommandCardData } from '../types/battleCommand';

/**
 * 指定されたタグを持つ戦闘モジュールをフィルタリング
 * @param cards すべての戦闘モジュールデータ
 * @param requiredTags フィルタリングに使用するタグ配列
 * @returns フィルタリングされた戦闘モジュール配列
 */
export function filterBattleCommandsByTags(
  cards: BattleCommandCardData[],
  requiredTags: string[],
): BattleCommandCardData[] {
  if (requiredTags.length === 0) {
    return cards;
  }

  return cards.filter((card) => {
    // カードが持つタグのいずれかが、必要なタグに含まれているかチェック
    return card.tags.some((tag) => requiredTags.includes(tag));
  });
}

/**
 * 指定されたタグをすべて持つ戦闘モジュールをフィルタリング
 * @param cards すべての戦闘モジュールデータ
 * @param requiredTags フィルタリングに使用するタグ配列
 * @returns フィルタリングされた戦闘モジュール配列
 */
export function filterBattleCommandsByAllTags(
  cards: BattleCommandCardData[],
  requiredTags: string[],
): BattleCommandCardData[] {
  if (requiredTags.length === 0) {
    return cards;
  }

  return cards.filter((card) => {
    // カードが必要なタグをすべて持っているかチェック
    return requiredTags.every((requiredTag) => card.tags.includes(requiredTag));
  });
}

/**
 * CPでソート
 * @param cards 戦闘モジュールデータ配列
 * @param order 昇順(asc)または降順(desc)
 * @returns ソートされた配列
 */
export function sortBattleCommandsByCP(
  cards: BattleCommandCardData[],
  order: 'asc' | 'desc' = 'asc',
): BattleCommandCardData[] {
  return [...cards].sort((a, b) => {
    return order === 'asc' ? a.cp - b.cp : b.cp - a.cp;
  });
}
