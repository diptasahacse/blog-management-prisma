export interface ISendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface IEmailTemplatePayload {
  token: string;
  name: string;
}
