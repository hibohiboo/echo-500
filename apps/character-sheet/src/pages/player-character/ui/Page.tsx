import {
  PlayerCharacterList,
  PlayerCharacterCreateModal,
  BattleCommandList,
  BattleCommandForm,
} from '@echo-500/ui';
import { useState } from 'react';
import { useCreatePlayerCharacter } from '@/entities/playerCharacter/hooks/useCreatePlayerCharacter';
import { useDeletePlayerCharacter } from '@/entities/playerCharacter/hooks/useDeletePlayerCharacter';
import { usePlayerCharacterList } from '@/entities/playerCharacter/hooks/usePlayerCharacterList';
import {
  createAndLinkBattleCommand,
  deleteBattleCommand,
} from '@/features/playerCharacterBattleCommandManagement/actions/battleCommandManagementActions';
import { useBattleCommandManagement } from '@/features/playerCharacterBattleCommandManagement/hooks/useBattleCommandManagement';
import { useAppDispatch } from '@/shared/lib/store';
import type { BattleCommandFormData } from '@echo-500/ui';

export default function PlayerCharacterPage() {
  const dispatch = useAppDispatch();
  const { characters, isLoading: isLoadingCharacters } =
    usePlayerCharacterList();
  const createCharacterHook = useCreatePlayerCharacter();
  const deleteCharacterHook = useDeletePlayerCharacter();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );
  const [isCommandFormOpen, setIsCommandFormOpen] = useState(false);

  const { commands, isLoading: isLoadingCommands } = useBattleCommandManagement(
    selectedCharacterId || '',
  );

  const handleCreateCharacter = async (params: { name: string }) => {
    await createCharacterHook.submit(params.name);
    createCharacterHook.close();
  };

  const handleDeleteCharacter = async (clickedCharacter: {
    id: string;
    name: string;
  }) => {
    if (
      window.confirm(
        `プレイヤーキャラクター「${clickedCharacter.name}」を削除しますか？`,
      )
    ) {
      await deleteCharacterHook.submit(clickedCharacter.id);
      if (selectedCharacterId === clickedCharacter.id) {
        setSelectedCharacterId(null);
      }
    }
  };

  const handleSelectCharacter = (character: { id: string }) => {
    setSelectedCharacterId(character.id);
  };

  const handleAddBattleCommand = async (data: BattleCommandFormData) => {
    if (!selectedCharacterId) return;

    try {
      const sortOrder = commands.length;
      await dispatch(
        createAndLinkBattleCommand(
          selectedCharacterId,
          { ...data, sortOrder },
          sortOrder,
        ),
      );
      setIsCommandFormOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDeleteBattleCommand = async (command: {
    id: string;
    name: string;
  }) => {
    if (!selectedCharacterId) return;

    if (window.confirm(`バトルコマンド「${command.name}」を削除しますか？`)) {
      await dispatch(deleteBattleCommand(selectedCharacterId, command.id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">プレイヤーキャラクター管理</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <PlayerCharacterList
            characters={characters}
            isLoading={isLoadingCharacters}
            onCharacterClick={handleSelectCharacter}
            onCreateNew={createCharacterHook.open}
            onDelete={handleDeleteCharacter}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {selectedCharacterId ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  {characters.find((c) => c.id === selectedCharacterId)?.name ||
                    ''}{' '}
                  のバトルコマンド
                </h2>
              </div>
              <BattleCommandList
                commands={commands}
                isLoading={isLoadingCommands}
                onAdd={() => setIsCommandFormOpen(true)}
                onDelete={handleDeleteBattleCommand}
              />
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              プレイヤーキャラクターを選択してください
            </div>
          )}
        </div>
      </div>

      <PlayerCharacterCreateModal
        isOpen={createCharacterHook.isOpen}
        onClose={createCharacterHook.close}
        onSubmit={handleCreateCharacter}
        isLoading={createCharacterHook.isSubmitting}
      />

      <BattleCommandForm
        isOpen={isCommandFormOpen}
        onClose={() => setIsCommandFormOpen(false)}
        onSubmit={handleAddBattleCommand}
      />
    </div>
  );
}
