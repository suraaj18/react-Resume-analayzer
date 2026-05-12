import type { Analysis } from '../types';

export const demoAnalysis: Analysis = {
  id: 'demo-analysis',
  createdAt: '2026-05-06T09:00:00.000Z',
  fileName: 'resume.pdf',
  targetRole: 'Product Manager',
  overallScore: 82,
  atsScore: 76,
  clarityScore: 88,
  impactScore: 79,
  keywordScore: 84,
  summary: 'Strong experience signal with clear product ownership. Add more quantified outcomes and role-specific keywords to improve recruiter scanning.',
  highlights: [
    {
      id: 'h1',
      section: 'Experience',
      text: 'Led cross-functional roadmap planning for mobile onboarding.',
      severity: 'info',
      suggestion: 'Add measurable adoption, activation, or retention outcomes.'
    },
    {
      id: 'h2',
      section: 'Skills',
      text: 'Product tools, strategy, analytics.',
      severity: 'warning',
      suggestion: 'Include target-role keywords such as experimentation, SQL, funnel analysis, and stakeholder management where accurate.'
    }
  ],
  rewrites: [
    {
      id: 'r1',
      original: 'Worked on onboarding improvements with engineering and design.',
      rewritten: 'Partnered with engineering and design to improve onboarding activation by clarifying funnel drop-offs and prioritizing high-impact experiments.',
      rationale: 'The rewrite makes ownership, collaboration, and impact more explicit.'
    }
  ]
};
