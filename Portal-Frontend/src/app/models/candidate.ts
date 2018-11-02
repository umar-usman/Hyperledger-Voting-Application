export class Candidate {
  candidateId: string;
  name: string;
  constituency: string;
  symbol: string;
}

export class CandidateWithVote extends Candidate {
  votes: number;
}

export class Auth {
  id: string;
  is_admin: boolean;
  constituency: string;
}