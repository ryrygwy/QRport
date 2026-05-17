const QRPORT_STORAGE_KEY = 'QRPort_data';
const QRPORT_LAST_TICKET_KEY = 'QRPort_last_ticket';

const QRPORT_SAMPLE_ISSUES = [
  {
    ticket: '#1',
    category: 'Library',
    problem: 'Lighting issue',
    location: 'Library - Study Area',
    description: 'Ceiling light flickers near the group tables.',
    date: 'May 17, 2026',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    ticket: '#2',
    category: 'Laboratory',
    problem: 'Plumbing leak',
    location: 'Science Lab 2',
    description: 'Sink faucet is leaking after use.',
    date: 'May 16, 2026',
    priority: 'High',
    status: 'Pending'
  },
  {
    ticket: '#3',
    category: 'Hallway',
    problem: 'Flooring damage',
    location: 'Main Hallway',
    description: 'Loose floor tile near the entrance.',
    date: 'May 15, 2026',
    priority: 'Low',
    status: 'Resolved'
  }
];

function getQRPortIssues() {
  const savedIssues = JSON.parse(sessionStorage.getItem(QRPORT_STORAGE_KEY) || '[]');

  if (savedIssues.length > 0) {
    return savedIssues;
  }

  sessionStorage.setItem(QRPORT_STORAGE_KEY, JSON.stringify(QRPORT_SAMPLE_ISSUES));
  return QRPORT_SAMPLE_ISSUES;
}

function saveQRPortIssues(issues) {
  sessionStorage.setItem(QRPORT_STORAGE_KEY, JSON.stringify(issues));
}

function saveLastTicket(ticket) {
  sessionStorage.setItem(QRPORT_LAST_TICKET_KEY, JSON.stringify(ticket));
}

function getLastTicket() {
  return JSON.parse(sessionStorage.getItem(QRPORT_LAST_TICKET_KEY) || 'null');
}

function updateTicketStatus(ticketId, status) {
  const issues = getQRPortIssues();
  const updatedIssues = issues.map(function(issue) {
    if (issue.ticket === ticketId) {
      return Object.assign({}, issue, {
        status: status,
        date: new Date().toLocaleDateString()
      });
    }

    return issue;
  });

  saveQRPortIssues(updatedIssues);
  return updatedIssues;
}
