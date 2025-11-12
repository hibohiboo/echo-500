import { Router, Route } from '@solidjs/router';
import App from '@/pages/App';
import Test from '@/pages/Test';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';

function AppRouter() {
  return (
    <Router
      base={`/${BASE_PATH}`}
      root={(props) => (
        <>
          <h1>Site Title</h1>
          {props.children}
        </>
      )}
    >
      <Route path="/" component={App} />
      <Route path="/users" component={Test} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
    </Router>
  );
}
export default AppRouter;
