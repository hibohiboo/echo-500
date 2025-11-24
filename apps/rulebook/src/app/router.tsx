import { RulebookLayout } from '@echo-500/ui';
import { BrowserRouter, Routes, Route } from 'react-router';
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

export function AppRouter() {
  const basePath = BASE_PATH;

  return (
    <BrowserRouter basename={`/${basePath}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<RulebookLayout basePath={basePath} />}>
          <Route path="/content/tutorial" element={<TutorialPage />} />
          <Route path="/content/glossary" element={<GlossaryPage />} />
          <Route
            path="/content/character-creation"
            element={<CharacterCreationPage />}
          />
          <Route
            path="/content/scenario-creators"
            element={<ScenarioCreatorsPage />}
          />
          <Route path="/content/game-master" element={<GameMasterPage />} />
          <Route path="/content/battle-rules" element={<BattleRulesPage />} />
          <Route
            path="/content/battle-commands"
            element={<BattleCommandsPage />}
          />
          <Route path="/content/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/content/terms" element={<TermsOfServicePage />} />
          <Route
            path="/content/simple-battle-rule"
            element={<SimpleBattleRulePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
