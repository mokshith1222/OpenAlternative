import { Helmet } from 'react-helmet-async';

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <Helmet>
        <title>Terms of Service | OpenAlternative</title>
        <meta name="description" content="Terms of Service for OpenAlternative." />
      </Helmet>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms of Service</h1>
      <div className="card-premium" style={{ padding: '3rem', lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Terms</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Disclaimer</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          All the materials on OpenAlternative's Website are provided "as is". OpenAlternative makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, OpenAlternative does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Revisions and Errata</h2>
        <p>
          The materials appearing on OpenAlternative's Website may include technical, typographical, or photographic errors. OpenAlternative will not promise that any of the materials in this Website are accurate, complete, or current.
        </p>
      </div>
    </div>
  );
}
