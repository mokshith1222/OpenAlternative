import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <Helmet>
        <title>Privacy Policy | OpenAlternative</title>
        <meta name="description" content="Privacy Policy for OpenAlternative." />
      </Helmet>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <div className="card-premium" style={{ padding: '3rem', lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
        <p style={{ marginBottom: '1.5rem' }}>
          At OpenAlternative, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by OpenAlternative and how we use it.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Information We Collect</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          If you choose to subscribe to our newsletter, we collect your email address. If you submit a tool, we collect the data you provide in the submission form. We use this information solely to provide and improve our service.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Cookies and Web Beacons</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Like any other website, OpenAlternative uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
