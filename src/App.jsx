import { useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { site } from './siteData';
import './styles.css';

const nav = [
  ['/', 'Home'], ['/mission', 'Mission'], ['/kikis-cat-club', "Kiki's Cat Club"],
  ['/farm-stand', 'Farm Stand'], ['/volunteer', 'Volunteer'],
  ['/contact', 'Contact'], ['/social', 'Social & Team']
];

function Action({ to, children, variant = 'green', external = false }) {
  if (!to) return <span className="button disabled" title="Add a link in siteData.js">{children} · Coming soon</span>;
  return external ? <a className={`button ${variant}`} href={to} target="_blank" rel="noreferrer">{children}</a>
    : <Link className={`button ${variant}`} to={to}>{children}</Link>;
}
function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`photo ${className}`}>
    {!failed ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : null}
    {failed && <div className="photo-placeholder"><span aria-hidden="true">✿</span><small>Photo coming soon</small></div>}
  </div>;
}
function Heading({ eyebrow, title, children }) {
  return <div className="heading">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{children && <p className="lead">{children}</p>}</div>;
}
function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="site-shell">
    <header className="site-header"><Link className="brand" to="/" onClick={() => setMobileOpen(false)}>
      <span className="brand-mark" aria-hidden="true">☀</span><span>Sunbrewed <strong>Homestead</strong></span>
    </Link><button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="main-nav">{mobileOpen ? 'Close' : 'Menu'}</button>
      <nav id="main-nav" className={mobileOpen ? 'nav open' : 'nav'} aria-label="Main navigation">{nav.map(([path, label]) => <NavLink key={path} end={path === '/'} to={path} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
    </header><main><Routes>
      <Route path="/" element={<Home />} /><Route path="/mission" element={<Mission />} />
      <Route path="/kikis-cat-club" element={<Cats />} /><Route path="/kikis-cat-club/adopt" element={<Adopt />} />
      <Route path="/kikis-cat-club/resources" element={<Resources />} /><Route path="/farm-stand" element={<FarmStand />} />
      <Route path="/volunteer" element={<Volunteer />} /><Route path="/contact" element={<Contact />} />
      <Route path="/social" element={<Social />} /><Route path="/composting-101" element={<Composting />} />
      <Route path="*" element={<section className="section"><Heading title="Page not found" /><Action to="/">Back home</Action></section>} />
    </Routes></main><footer className="footer"><span>© {new Date().getFullYear()} Sunbrewed Homestead</span><span>Rooted in community. Growing together.</span></footer>
  </div>;
}
function Home() {
  return <><section className="hero section"><div className="hero-copy"><span className="eyebrow">Welcome to the homestead</span>
    <div className="logo-area"><img src={site.logo} alt="Sunbrewed Homestead logo" onError={e => { e.currentTarget.style.display = 'none'; }} /><h1>Sunbrewed<br /><em>Homestead</em></h1></div>
    <p className="lead">{site.homeIntro}</p><Action to="/volunteer">Get involved — Volunteer</Action></div>
    <div className="hero-art" aria-hidden="true"><div className="sun" /><div className="hill hill-one" /><div className="hill hill-two" /><span className="hero-flower">✿</span></div></section>
    <section className="section"><div className="section-intro"><span className="eyebrow">Friends of the farm</span><h2>Meet the goats</h2><p>A few familiar faces from around the homestead.</p></div>
      <div className="photo-grid">{site.photos.goats.map((src, i) => <Photo key={src} src={src} alt={`Goat photo ${i + 1}`} />)}</div></section>
    <section className="section compost-spotlight"><Photo src={site.photos.compost} alt="Composting 101 feature" className="compost-image" /><div><span className="eyebrow">Learn something new</span><h2>Composting 101</h2><p>Turn everyday plant scraps into something useful. Explore the basics of creating healthy compost.</p><Action to="/composting-101" variant="harvest">Explore Composting 101</Action></div></section></>;
}
function Mission() { return <section className="section narrow"><Heading eyebrow="Our purpose" title="Our Mission">{site.mission || 'The official mission statement will be added here.'}</Heading><div className="mission-decoration" aria-hidden="true">✿ ☼ ✿</div></section>; }

function Cats() {
  return <><section className="section"><Heading eyebrow="Community cat care" title="Kiki’s Cat Club">{site.tnrIntro}</Heading>
    <div className="stat-grid">{site.stats.map((stat, i) => <div className={`stat stat-${i}`} key={stat.label}><strong>{stat.value ?? '—'}</strong><span>{stat.label}</span></div>)}</div>
    <div className="button-group"><Action to={site.donationUrl} external variant="coral">Donate</Action><Action to="/kikis-cat-club/adopt" variant="turquoise">Adopt a cat</Action><Action to="/kikis-cat-club/resources" variant="purple">Need help spaying community cats?</Action><Action to={site.fosterUrl} external variant="harvest">Foster</Action><Action to="/volunteer">Volunteer</Action></div>
  </section></>;
}

function Adopt() { return <section className="section narrow"><Heading eyebrow="Kiki's Cat Club" title="Welcome, future adopters!">{site.adoptionIntro}</Heading><div className="button-group"><Action to={site.adoptionListingsUrl} external variant="turquoise">View available cats</Action><Action to={site.adoptionApplicationUrl} external variant="harvest">Open adoption application</Action></div></section>; }
function Resources() { return <section className="section narrow"><Heading eyebrow="Community cats" title="Spay / neuter & TNR resources">This page will provide community cat spay/neuter support, TNR guidance, and verified local resources.</Heading><div className="info-panel"><h2>Helpful starting points</h2><p>Add verified local clinics, appointment links, eligibility information, and instructions here before publishing.</p><Action to="/contact">Ask us a question</Action></div></section>; }
function FarmStand() { return <section className="section narrow"><Heading eyebrow="Straight from the homestead" title="Farm Stand">{site.farmStandIntro}</Heading><div className="info-panel warm"><h2>See what’s available</h2><p>Pickfresh link or embed can be added once confirmed.</p><Action to={site.pickfreshUrl} external variant="harvest">Browse Pickfresh</Action></div></section>; }
function Composting() {
  return <section className="section"><Heading eyebrow="Get started" title="Composting 101">Composting is a way to turn organic materials into a soil-improving resource.</Heading>
    <div className="learning-grid"><article><b>01</b><h2>Choose a spot</h2><p>Pick a well-drained place or a suitable enclosed bin with access for turning and moisture checks.</p></article>
      <article><b>02</b><h2>Balance materials</h2><p>Mix nitrogen-rich greens (fruit and vegetable scraps) with carbon-rich browns (dry leaves and shredded paper).</p></article>
      <article><b>03</b><h2>Maintain your pile</h2><p>Keep materials damp like a wrung-out sponge, provide airflow, and turn occasionally.</p></article>
      <article><b>04</b><h2>Use finished compost</h2><p>Wait until the material is dark, crumbly, and earthy-smelling before applying it to soil.</p></article></div></section>;
}

function EmailDraftForm({ type }) {
  const [fields, setFields] = useState({ name: '', email: '', interest: '', message: '' });
  const [notice, setNotice] = useState('');
  const isVolunteer = type === 'volunteer';
  const change = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    if (!site.email) { setNotice('This form is not connected yet. Add the receiving email address in src/siteData.js.'); return; }
    const subject = `${isVolunteer ? 'Volunteer inquiry' : 'Contact inquiry'} — Sunbrewed Homestead`;
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n${isVolunteer ? `Interest: ${fields.interest}\n` : ''}\nMessage:\n${fields.message}`;
    // An email draft, not a silently sent email. Replace with a verified form service for automatic submissions.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with a prepared draft. Please send the email there to complete your submission.');
  };
  return <form className="contact-form" onSubmit={submit}><label htmlFor={`${type}-name`}>Name</label><input id={`${type}-name`} name="name" value={fields.name} onChange={change} required autoComplete="name" />
    <label htmlFor={`${type}-email`}>Email</label><input id={`${type}-email`} name="email" value={fields.email} onChange={change} required type="email" autoComplete="email" />
    {isVolunteer && <><label htmlFor="volunteer-interest">What would you like to help with?</label><select id="volunteer-interest" name="interest" value={fields.interest} onChange={change} required><option value="">Choose an interest</option><option>Gardening / growing</option><option>Animal care</option><option>Events / community outreach</option><option>General volunteering</option><option>Other</option></select></>}
    <label htmlFor={`${type}-message`}>Message</label><textarea id={`${type}-message`} name="message" value={fields.message} onChange={change} required rows="6" />
    <button className="button green" type="submit">Prepare email {isVolunteer ? 'to volunteer' : 'message'}</button><p className="form-note">This starter opens a draft in your email app; it does not submit data to a server.</p>{notice && <p role="status" className="form-notice">{notice}</p>}
  </form>;
}
function Volunteer() { return <section className="section form-layout"><div><Heading eyebrow="Get involved" title="Volunteer with us">{site.volunteerIntro}</Heading><p>Complete the form and tell us where you would like to help.</p></div><EmailDraftForm type="volunteer" /></section>; }
function Contact() { return <section className="section form-layout"><div><Heading eyebrow="Say hello" title="Contact us">{site.contactIntro}</Heading></div><EmailDraftForm type="contact" /></section>; }
function Social() {
  return <section className="section"><Heading eyebrow="Stay connected" title="Social & Team">Follow along and meet the people behind the homestead.</Heading>
    <div className="social-slot"><div><span aria-hidden="true">◎</span><h2>From the homestead</h2><p>Instagram feed/embed will appear here after setup.</p>{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">View Instagram profile</a>}</div></div>
    <div className="section-intro team-intro"><span className="eyebrow">Nice to meet you</span><h2>Our team</h2></div><div className="team-grid">{site.team.map(member => <article key={member.name} className="team-card"><Photo src={member.image} alt={member.name} /><h3>{member.name}</h3><p>{member.role}</p></article>)}</div>
    <div className="section-intro team-intro"><h2>Team photo</h2><p>Add a group photo of the Sunbrewed team here.</p></div><Photo src="/images/team-group.jpg" alt="Sunbrewed Homestead team group photo" className="group-photo" />
  </section>;
}
export default function App() { return <BrowserRouter><Layout /></BrowserRouter>; }
