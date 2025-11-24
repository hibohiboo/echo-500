import { Router, Route } from '@solidjs/router';
import { BattleCommandsPage } from '@/pages/battle-commands';
import {
  BattleRulesPage,
  SimpleBattleRulePage,
} from '@/pages/battle-rules';
import { CharacterCreationPage } from '@/pages/character-creation';
import { GameMasterPage } from '@/pages/game-master';
import { GlossaryPage } from '@/pages/glossary';
import { HomePage } from '@/pages/home';
import { PrivacyPolicyPage } from '@/pages/privacy-policy';
import { ScenarioCreatorsPage } from '@/pages/scenario-creators';
import { TermsOfServicePage } from '@/pages/terms-of-service';
import { TutorialPage } from '@/pages/tutorial';
import { Layout } from '@/shared/ui/layout';

function AppRouter() {
  return (
    <Router base={`/${BASE_PATH}`}>
      <Route path="/" component={HomePage} />
      <Route
        path="/content"
        component={(props) => <Layout>{props.children}</Layout>}
      >
        <Route path="/tutorial" component={TutorialPage} />
        <Route path="/glossary" component={GlossaryPage} />
        <Route path="/character-creation" component={CharacterCreationPage} />
        <Route path="/scenario-creators" component={ScenarioCreatorsPage} />
        <Route path="/game-master" component={GameMasterPage} />
        <Route path="/battle-rules" component={BattleRulesPage} />
        <Route path="/battle-commands" component={BattleCommandsPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsOfServicePage} />
        <Route path="/simple-battle-rule" component={SimpleBattleRulePage} />
      </Route>
    </Router>
  );
}
export default AppRouter;
