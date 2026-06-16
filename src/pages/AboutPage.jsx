import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <Helmet>
        <title>About Us | OpenAlternative</title>
        <meta name="description" content="Learn more about OpenAlternative, the open-source directory helping you replace proprietary SaaS." />
      </Helmet>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About OpenAlternative</h1>
      <div className="card-premium" style={{ padding: '3rem', lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Welcome to <strong>OpenAlternative</strong>. We are a community-driven directory dedicated to helping developers, businesses, and privacy-conscious individuals find high-quality, free, and open-source alternatives to expensive proprietary SaaS products.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          In a world increasingly dominated by vendor lock-in and soaring subscription fees, open-source software provides a vital escape route. It gives you ownership over your data, flexibility in your deployment (including self-hosting), and the freedom to modify the software to fit your exact needs.
        </p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.8rem' }}>Our Mission</h2>
        <p>
          Our mission is to make open-source software accessible to everyone. By curating the best alternatives to popular tools like Notion, Slack, Jira, and Photoshop, we aim to bridge the gap between incredible open-source developers and the users who need their software the most.
        </p>
      </div>
    </div>
  );
}
