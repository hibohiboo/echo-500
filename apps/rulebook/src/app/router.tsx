import { RulebookLayout } from '@echo-500/ui';
import { createBrowserRouter, Outlet } from 'react-router';
import { BattleCommandsPage } from '@/pages/battle-commands/BattleCommands';
import { BattleRulesPage } from '@/pages/battle-rules/BattleRules';
import { SimpleBattleRulePage } from '@/pages/battle-rules/SimpleBattleRulePage';
import { CharacterCreationPage } from '@/pages/character-creation/CharacterCreation';
import { GameMasterPage } from '@/pages/game-master/GameMaster';
import { GlossaryPage } from '@/pages/glossary/Glossary';
import { HomePage } from '@/pages/home/Home';
import { PrivacyPolicyPage } from '@/pages/privacy-policy/PrivacyPolicy';
import { ScenarioCreatorsPage } from '@/pages/scenario-creators/ScenarioCreators';
import { TermsOfServicePage } from '@/pages/terms-of-service/TermsOfService';
import { TutorialPage } from '@/pages/tutorial/Tutorial';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/content',
      element: (
        <RulebookLayout basePath={BASE_PATH}>
          <Outlet />
        </RulebookLayout>
      ),
      children: [
        {
          path: 'tutorial',
          element: <TutorialPage />,
        },
        {
          path: 'glossary',
          element: <GlossaryPage />,
        },
        {
          path: 'character-creation',
          element: <CharacterCreationPage />,
        },
        {
          path: 'scenario-creators',
          element: <ScenarioCreatorsPage />,
        },
        {
          path: 'game-master',
          element: <GameMasterPage />,
        },
        {
          path: 'battle-rules',
          element: <BattleRulesPage />,
        },
        {
          path: 'battle-commands',
          element: <BattleCommandsPage />,
        },
        {
          path: 'privacy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'terms',
          element: <TermsOfServicePage />,
        },
        {
          path: 'simple-battle-rule',
          element: <SimpleBattleRulePage />,
        },
      ],
    },
  ],
  { basename: `/${BASE_PATH}` },
);
