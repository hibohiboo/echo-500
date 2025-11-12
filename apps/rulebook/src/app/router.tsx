import { Router, Route } from '@solidjs/router';
import { Layout } from '@/widgets/layout';
import { HomePage } from '@/pages/home';
import { PrivacyPolicyPage } from '@/pages/privacy-policy';
import { TermsOfServicePage } from '@/pages/terms-of-service';

function AppRouter() {
  return (
    <Router
      base={`/${BASE_PATH}`}
      root={(props) => <Layout>{props.children}</Layout>}
    >
      <Route path="/" component={HomePage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsOfServicePage} />
    </Router>
  );
}
export default AppRouter;
