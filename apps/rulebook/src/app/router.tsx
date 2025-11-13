import { Router, Route } from '@solidjs/router';
import { HomePage } from '@/pages/home';
import { PrivacyPolicyPage } from '@/pages/privacy-policy';
import { TermsOfServicePage } from '@/pages/terms-of-service';
import { TutorialPage } from '@/pages/tutorial';
import { Layout } from '@/shared/ui/layout';

function AppRouter() {
  return (
    <Router
      base={`/${BASE_PATH}`}
      root={(props) => <Layout>{props.children}</Layout>}
    >
      <Route path="/" component={HomePage} />
      <Route path="/tutorial" component={TutorialPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsOfServicePage} />
    </Router>
  );
}
export default AppRouter;
