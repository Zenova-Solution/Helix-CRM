import type { HelixData } from '@/types';

const makeRandom = (seed: number) => () => {
  let next = seed >>> 0;
  return () => {
    next = (next * 1664525 + 1013904223) >>> 0;
    return next / 0x100000000;
  };
};

const buildHeat = () => {
  const rand = makeRandom(42);
  const rows: number[][] = [];
  for (let r = 0; r < 7; r += 1) {
    const row: number[] = [];
    for (let c = 0; c < 24; c += 1) {
      let v = 0;
      if (c >= 8 && c <= 19) v = 0.35 + rand() * 0.55;
      else v = rand() * 0.18;
      if (r >= 5) v *= 0.45;
      row.push(+v.toFixed(2));
    }
    rows.push(row);
  }
  return rows;
};

export const HELIX_SEED: HelixData = {
  SEED_DEALS: {
    lead: [
      { id: 'd1', name: 'Q3 expansion proposal', co: 'Northwind Labs', value: 24500, tag: 'warm', members: ['SK', 'MO'], progress: 18 },
      { id: 'd2', name: 'Pilot onboarding', co: 'Helios Robotics', value: 8200, tag: 'cold', members: ['SK'], progress: 10 },
      { id: 'd3', name: 'Enterprise SSO upgrade', co: 'Pinecone Logistics', value: 41000, tag: 'warm', members: ['MO', 'AR'], progress: 22 },
    ],
    qualified: [
      { id: 'd4', name: 'Annual contract renewal', co: 'Atlas Freight', value: 86400, tag: 'hot', members: ['AR', 'SK', 'DV'], progress: 42 },
      { id: 'd5', name: 'Multi-seat rollout', co: 'Glasswing Studio', value: 17900, tag: 'warm', members: ['DV'], progress: 38 },
    ],
    proposal: [
      { id: 'd6', name: 'Custom integrations', co: 'Vertex Health', value: 132000, tag: 'hot', members: ['MO', 'AR'], progress: 64 },
      { id: 'd7', name: 'Workspace migration', co: 'Brightside Co.', value: 28600, tag: 'warm', members: ['SK', 'DV'], progress: 55 },
      { id: 'd8', name: 'API access tier', co: 'Lumen Mobility', value: 9400, tag: 'cold', members: ['DV'], progress: 50 },
    ],
    negotiation: [
      { id: 'd9', name: 'Procurement signoff', co: 'Aether Bank', value: 218000, tag: 'hot', members: ['AR', 'MO'], progress: 82 },
      { id: 'd10', name: 'Legal review', co: 'Wavelet AI', value: 64500, tag: 'warm', members: ['SK'], progress: 76 },
    ],
    closed: [
      { id: 'd11', name: 'Year-2 renewal', co: 'Pearl Maritime', value: 52000, tag: 'warm', members: ['MO'], progress: 100 },
      { id: 'd12', name: 'Add-on seats', co: 'Orbit Studios', value: 11200, tag: 'warm', members: ['DV', 'AR'], progress: 100 },
    ],
  },
  STAGES: [
    { id: 'lead', name: 'Lead', color: '#60A5FA' },
    { id: 'qualified', name: 'Qualified', color: '#22D3EE' },
    { id: 'proposal', name: 'Proposal', color: '#A78BFA' },
    { id: 'negotiation', name: 'Negotiation', color: '#F472B6' },
    { id: 'closed', name: 'Closed Won', color: '#34D399' },
  ],
  CUSTOMERS: [
    { id: 1, name: 'Maya Okafor', email: 'maya@northwindlabs.io', company: 'Northwind Labs', plan: 'Enterprise', mrr: 4200, status: 'active', country: '\uD83C\uDDFA\uD83C\uDDF8', joined: 'Mar 2024', owner: 'AR' },
    { id: 2, name: 'Henrik S\u00f8rensen', email: 'henrik@atlasfreight.dk', company: 'Atlas Freight', plan: 'Scale', mrr: 7200, status: 'active', country: '\uD83C\uDDE9\uD83C\uDDF0', joined: 'Jan 2024', owner: 'MO' },
    { id: 3, name: 'Priya Raman', email: 'priya@vertexhealth.io', company: 'Vertex Health', plan: 'Enterprise', mrr: 11000, status: 'active', country: '\uD83C\uDDEE\uD83C\uDDF3', joined: 'Nov 2023', owner: 'SK' },
    { id: 4, name: 'Theo Beaumont', email: 'theo@glasswing.fr', company: 'Glasswing Studio', plan: 'Pro', mrr: 1490, status: 'trial', country: '\uD83C\uDDEB\uD83C\uDDF7', joined: 'May 2026', owner: 'DV' },
    { id: 5, name: 'Sara Ben-Ami', email: 'sara@aetherbank.com', company: 'Aether Bank', plan: 'Enterprise', mrr: 18200, status: 'active', country: '\uD83C\uDDEE\uD83C\uDDF1', joined: 'Sep 2023', owner: 'AR' },
    { id: 6, name: 'Lucas Reinhardt', email: 'lucas@wavelet.ai', company: 'Wavelet AI', plan: 'Scale', mrr: 5380, status: 'active', country: '\uD83C\uDDE9\uD83C\uDDEA', joined: 'Feb 2025', owner: 'MO' },
    { id: 7, name: 'Yuki Tanaka', email: 'yuki@orbit.studio', company: 'Orbit Studios', plan: 'Pro', mrr: 940, status: 'active', country: '\uD83C\uDDEF\uD83C\uDDF5', joined: 'Aug 2024', owner: 'DV' },
    { id: 8, name: 'Marco Esposito', email: 'marco@pinecone.co', company: 'Pinecone Logistics', plan: 'Scale', mrr: 3400, status: 'lead', country: '\uD83C\uDDEE\uD83C\uDDF9', joined: 'Apr 2026', owner: 'SK' },
    { id: 9, name: 'Anika Schreiber', email: 'anika@brightside.co', company: 'Brightside Co.', plan: 'Pro', mrr: 0, status: 'churn', country: '\uD83C\uDDE8\uD83C\uDDED', joined: 'Jul 2023', owner: 'MO' },
    { id: 10, name: 'Oluwaseun Adebayo', email: 'olu@helios.bot', company: 'Helios Robotics', plan: 'Pro', mrr: 720, status: 'trial', country: '\uD83C\uDDF3\uD83C\uDDEC', joined: 'May 2026', owner: 'DV' },
    { id: 11, name: 'Camille Martel', email: 'camille@pearl.fr', company: 'Pearl Maritime', plan: 'Scale', mrr: 4100, status: 'active', country: '\uD83C\uDDEB\uD83C\uDDF7', joined: 'Oct 2024', owner: 'AR' },
    { id: 12, name: 'Devon Carter', email: 'devon@lumen.io', company: 'Lumen Mobility', plan: 'Pro', mrr: 1280, status: 'lead', country: '\uD83C\uDDE8\uD83C\uDDE6', joined: 'May 2026', owner: 'SK' },
  ],
  ACTIVITY: [
    { id: 'a1', kind: 'success', text: '<b>Aether Bank</b> moved to Negotiation', meta: 'by Mira Okafor', time: '2m ago' },
    { id: 'a2', kind: 'info', text: '<b>Priya Raman</b> upgraded to Enterprise', meta: '', time: '14m ago' },
    { id: 'a3', kind: 'warn', text: 'Trial ending in 3 days \u2014 <b>Glasswing Studio</b>', meta: '', time: '38m ago' },
    { id: 'a4', kind: 'info', text: 'New lead from <b>helios.bot</b> via webform', meta: '', time: '1h ago' },
    { id: 'a5', kind: 'success', text: 'Deal <b>$52,000</b> closed with Pearl Maritime', meta: '', time: '3h ago' },
    { id: 'a6', kind: 'info', text: 'Automation <b>Win-back EU</b> sent to 218 leads', meta: '', time: 'yesterday' },
  ],
  REV_THIS: [42, 48, 51, 58, 56, 63, 71, 78, 82, 89, 97, 112],
  REV_LAST: [38, 41, 44, 46, 50, 52, 58, 61, 64, 70, 74, 79],
  MONTHS: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  FUNNEL: [
    { label: 'Visitors', value: 24800, pct: 100 },
    { label: 'Signups', value: 6420, pct: 25.9 },
    { label: 'Activated', value: 3180, pct: 12.8 },
    { label: 'Trial', value: 1240, pct: 5.0 },
    { label: 'Paid', value: 412, pct: 1.66 },
  ],
  HEAT: buildHeat(),
};
