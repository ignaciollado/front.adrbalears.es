export interface genericDataDTO {
  userId: number;
  id:     number;
  title:  string;
  body:   string;
}

export class genericMailDTO {
  email:    string;
  requester: string;
  contactPhone: string;
  subject:  string;
  body:     string;

  constructor(
    email: string,
    requester: string,
    contactPhone: string,
    subject: string,
    body: string,
   )
    {
      this.email = email,
      this.requester = requester,
      this.contactPhone = contactPhone,
      this.subject = subject,
      this.body = body
    }
}

