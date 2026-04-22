import React, { useState } from 'react';
import { Phone, MessageSquare, Building2, BookHeart, Users, Link2, Calendar, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

const EXTERNAL_DIRECTORIES = [
  { name: "NowServing (by SeriousMD)", type: "Medical Directory App", location: "Searchable by \"Iloilo City\"", link: "https://nowserving.ph" },
  { name: "Philippine Psychiatric Association", type: "Official Directory", location: "Nationwide (Search \"Iloilo City\")", link: "https://philippinepsychiatricassociation.org" },
  { name: "RecoveryHub Philippines", type: "Mental Health Platform", location: "Online / Western Visayas Clinics", link: "https://recoveryhub.ph" },
  { name: "Metanoia Psychological Clinic", type: "Private Specialized Clinic", location: "Zamora St., Iloilo City", link: "https://metanoiapsychclinic.com" },
  { name: "The Medical City Iloilo", type: "Hospital Outpatient Clinics", location: "Locsin St., Brgy. Tap-oc, Molo", link: "https://themedicalcityiloilo.com" },
  { name: "St. Paul's Hospital Iloilo", type: "Hospital Outpatient Clinics", location: "General Luna St., Iloilo City", link: "#" },
  { name: "QualiMed Hospital Iloilo", type: "Hospital Outpatient Clinics", location: "Atria Park District, Mandurriao", link: "#" }
];

const PEER_GROUPS = {
  local: [
    { name: "Agubayani", focus: "Local Peer Support & Viber Community", link: "https://facebook.com/agubayani" },
    { name: "Philippine Mental Health Association (PMHA)", focus: "Advocacy & Psychosocial Support", link: "https://pmha.org.ph" },
    { name: "#MentalHealthPH", focus: "Community Conversations & Advocacy", link: "https://mentalhealthph.org" },
    { name: "RAISE Mental Health Program", focus: "LGU Interventions & Community Support", link: "https://facebook.com/iloilocitygov" },
    { name: "WVSU Center for Mindfulness", focus: "Mindfulness & Group Well-being", link: "https://facebook.com/wvsu.edu.ph" }
  ],
  national: [
    { name: "ADSP (Anxiety & Depression Support PH)", type: "Private Peer Support Space", link: "https://www.facebook.com/groups/adhdphilippines" },
    { name: "Buhay Movement", type: "Mental Health Awareness & Check-ins", link: "https://facebook.com/buhaymovement" },
    { name: "Tala: Mental Wellness", type: "Peer Wellness Discussions", link: "https://facebook.com/talamentalwellness" }
  ]
};

const SELF_CARE_GUIDES = [
  { id: 'grounding', title: "Grounding Techniques", desc: "5-4-3-2-1 method to bring yourself back to the present moment.", icon: <ShieldCheck size={20} /> },
  { id: 'sleep', title: "Sleep Hygiene Basics", desc: "Create the perfect environment for restorative rest.", icon: <Building2 size={20} /> },
  { id: 'anxiety', title: "Exam Anxiety Prep", desc: "Mental strategies to conquer test-day nerves.", icon: <BookHeart size={20} /> }
];

function Resources() {
  const [activeView, setActiveView] = useState('main');
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleScheduleAction = () => {
    setBookingStatus('Connecting to University Health Portal...');
    setTimeout(() => {
      setBookingStatus('Success! A portal window would open here in the production version.');
      setTimeout(() => setBookingStatus(null), 3000);
    }, 1500);
  };

  const renderView = () => {
    switch (activeView) {
      case 'directories':
        return (
          <div className="resource-detail-view">
            <button className="card-action" onClick={() => setActiveView('main')} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Resources
            </button>
            <div className="section-header">
              <h1>Vetted Mental Health Resources</h1>
              <p>Specialized clinical and medical directories in Iloilo City and nationwide.</p>
            </div>
            
            <table className="resource-table">
              <thead>
                <tr>
                  <th>Resource Name</th>
                  <th>Type of Service</th>
                  <th>Location / Area</th>
                  <th>Website / Access</th>
                </tr>
              </thead>
              <tbody>
                {EXTERNAL_DIRECTORIES.map((res, i) => (
                  <tr key={i}>
                    <td className="res-name">{res.name}</td>
                    <td>{res.type}</td>
                    <td>{res.location}</td>
                    <td>
                      {res.link !== '#' ? (
                        <a href={res.link} target="_blank" rel="noopener noreferrer" className="res-link">
                          Visit Site <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Internal/In-person</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'peerGroups':
        return (
          <div className="resource-detail-view">
            <button className="card-action" onClick={() => setActiveView('main')} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Resources
            </button>
            <div className="section-header">
              <h1>Peer Support & Community</h1>
              <p>Connect with fellow students in safe, moderated spaces.</p>
            </div>

            <div className="peer-section">
              <h3>Local Community Programs</h3>
              <div className="peer-grid">
                {PEER_GROUPS.local.map((group, i) => (
                  <div key={i} className="peer-card">
                    <h4>{group.name}</h4>
                    <p>{group.focus}</p>
                    <a href={group.link} target="_blank" rel="noopener noreferrer" className="card-action">View Group →</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="peer-section" style={{ marginTop: '3rem' }}>
              <h3>National Online Groups</h3>
              <div className="peer-grid">
                {PEER_GROUPS.national.map((group, i) => (
                  <div key={i} className="peer-card">
                    <h4>{group.name}</h4>
                    <span className="badge">{group.type}</span>
                    <a href={group.link} target="_blank" rel="noopener noreferrer" className="card-action">Join Community →</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'selfCare':
        return (
          <div className="resource-detail-view">
            <button className="card-action" onClick={() => setActiveView('main')} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Resources
            </button>
            <div className="section-header">
              <h1>Self-Care Library</h1>
              <p>Guided practices and strategies for daily resilience.</p>
            </div>

            <div className="grid-layout">
              {SELF_CARE_GUIDES.map(guide => (
                <div key={guide.id} className="card">
                  <div className="card-icon">{guide.icon}</div>
                  <h3 className="card-title">{guide.title}</h3>
                  <p className="card-desc">{guide.desc}</p>
                  <button className="btn-secondary" onClick={() => alert(`Opening ${guide.title} guide...`)}>Read Guide</button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <>
            <h1>Support & Resources</h1>
            <p>A curated space for professional guidance, immediate help, and self-paced tools to support your mental well-being.</p>

            <div className="grid-layout">
              {/* Highlight Card */}
              <div className="card highlight" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                <div>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Phone size={18} color="var(--accent-color)" />
                    24/7 Crisis Support
                  </h2>
                  <p className="card-desc" style={{ marginBottom: 0 }}>Immediate, confidential help is available. If you or someone you know is in distress, please reach out to professional crisis counselors.</p>
                </div>
                <div className="card-content">
                  <button className="call-btn" onClick={() => window.open('tel:988')}>
                    <Phone size={18} />
                    Call 988
                  </button>
                  <div className="text-info">
                    <MessageSquare size={18} />
                    <span>Text HOME<br/>to 741741</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={18} />
                    University Counseling
                  </h2>
                </div>
                <p className="card-desc">Access free, short-term counseling services provided by the university health center. Available for all enrolled students.</p>
                
                <table className="table-info">
                  <tbody>
                    <tr>
                      <td>Location</td>
                      <td>Student Health Bldg, 3rd Floor</td>
                    </tr>
                    <tr>
                      <td>Hours</td>
                      <td>Mon-Fri, 8AM - 5PM</td>
                    </tr>
                    <tr>
                      <td>Walk-ins</td>
                    </tr>
                  </tbody>
                </table>

                {bookingStatus ? (
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--text-primary)', borderRadius: '0.5rem', fontSize: '0.8rem', textAlign: 'center' }}>
                    {bookingStatus}
                  </div>
                ) : (
                  <button onClick={handleScheduleAction} className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} /> Schedule Appointment
                  </button>
                )}
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookHeart size={18} />
                    Self-Care Guides
                  </h2>
                </div>
                <p className="card-desc">Explore our library of guided practices, breathing exercises, and journaling prompts designed for stress reduction.</p>
                
                <ul className="list-info">
                  <li>Grounding Techniques</li>
                  <li>Sleep Hygiene Basics</li>
                  <li>Exam Anxiety Prep</li>
                </ul>

                <button className="card-action" onClick={() => setActiveView('selfCare')}>Browse Library →</button>
              </div>

              <div className="card">
                <div className="card-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} />
                    Peer Support Groups
                  </h2>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }}>Weekly</span>
                </div>
                <p className="card-desc">Connect with fellow students in a safe, moderated environment to share experiences and coping strategies.</p>
                <button className="card-action" onClick={() => setActiveView('peerGroups')}>View Schedule →</button>
              </div>

              <div className="card">
                <div className="card-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link2 size={18} />
                    External Directories
                  </h2>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }}>Verified</span>
                </div>
                <p className="card-desc">A vetted list of local therapists, psychiatrists, and specialized clinics off-campus.</p>
                <button className="card-action" onClick={() => setActiveView('directories')}>Browse Directory →</button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="page-container">
      {renderView()}
    </div>
  );
}

export default Resources;
