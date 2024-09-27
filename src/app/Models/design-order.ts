export class designOrderDTO {
  agency:    string;
  contact_name: string;
  contact_mail: string;
  contact_phone: string;
  work_type:  string;
  body:     string;
  state: string;

  constructor(
    agency:    string,
    contact_name: string,
    contact_mail: string,
    contact_phone: string,
    work_type:  string,
    body:     string,
    state: string

   )
    {
    this.agency = agency,
    this.contact_name = contact_name,
    this.contact_mail = contact_mail,
    this.contact_phone = contact_phone,
    this.work_type = work_type,
    this.body = body,
    this.state = state
    }
}