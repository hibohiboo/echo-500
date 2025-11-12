import { Router, Route } from '@solidjs/router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';

function AppRouter() {
  return (
    <Router
      base={`/${BASE_PATH}`}
      root={(props) => <Layout>{props.children}</Layout>}
    >
      <Route path="/" component={Home} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
    </Router>
  );
}
export default AppRouter;
