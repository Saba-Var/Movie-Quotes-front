export type EmailsProps = {
  primaryEmail: string
  secondaryEmails?: { _id: string; email: string; verified: boolean }[]
}
