import { Router, Route } from '@solidjs/router';
import { BattleCommandsPage } from '@/pages/battle-commands';
import SimpleBattleRulePage from '@/pages/battle-rules/SimpleBattleRulePage';
import { HomePage } from '@/pages/home';
import { PrivacyPolicyPage } from '@/pages/privacy-policy';
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
        <Route path="/battle-commands" component={BattleCommandsPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsOfServicePage} />
        <Route path="/simple-battle-rule" component={SimpleBattleRulePage} />
      </Route>
    </Router>
  );
}
export default AppRouter;
