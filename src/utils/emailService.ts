// Email service utility for sending SEEC form notifications
// This uses EmailJS for client-side email sending
// In production, you would replace this with your preferred email service

import { getDonationContent } from './contentService'

interface EmailConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

interface SEECFormData {
  'your-first-name': string
  'text-initial': string
  'your-last-name': string
  'your-email': string
  'tel-number': string
  donation: number
  'your-street': string
  'your-city': string
  'your-state': string
  'your-zip': string
  'checkbox-under18': boolean
  'text-age': string
  employer: string
  occupation: string
  'checkbox-lobby': string
  'checkbox-spouse': string
  'checkbox-elected': string
  'checkbox-contractor': string
  'checkbox-branch': string[]
  'checkbox-contractor-official': string
  'checkbox-holder': string
  'digital-signature': string
}

// Configuration for EmailJS (replace with your actual values)
const EMAIL_CONFIG: EmailConfig = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID
  templateId: 'your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key' // Replace with your EmailJS public key
}

// Function to format the SEEC form data into the email template
export const formatSEECEmailContent = (formData: SEECFormData): string => {
  const content = getDonationContent()
  const emailTemplate = content.emailTemplates.adminNotification

  return `
${emailTemplate.header}

${emailTemplate.introText}

${emailTemplate.dataHeader}:

${formData['your-first-name']} ${formData['text-initial']}. ${formData['your-last-name']}
${formData['your-street']}
${formData['your-city']}, ${formData['your-state']}  ${formData['your-zip']}
${formData['tel-number']}
${formData['your-email']}

Donation Amount: $${formData.donation}

Under 18: ${formData['checkbox-under18'] ? 'Yes' : 'No'}
   If yes, age: ${formData['text-age']}

Employer: ${formData.employer}
Principal Occupation: ${formData.occupation}

Communicator Lobbyist? ${formData['checkbox-lobby']}
Spouse or Dependent? ${formData['checkbox-spouse']}
    Elected official? ${formData['checkbox-elected']}
State Contractor or Potential State Contractor? ${formData['checkbox-contractor']}
    Which branch(es)? ${formData['checkbox-branch'].join(', ')}
    Elected official? ${formData['checkbox-contractor-official']}
CAS Prequalification Holder? ${formData['checkbox-holder']}

Method of Contribution: PayPal

Digitally Signed Certification: ${formData['digital-signature']}

--
${emailTemplate.footer}
  `.trim()
}

// Function to send email using EmailJS
export const sendSEECNotification = async (
  formData: SEECFormData,
  recipients: string[]
): Promise<{ success: boolean; error?: string }> => {
  try {
    // For demonstration purposes, we'll log the email content and simulate sending
    const emailContent = formatSEECEmailContent(formData)

    console.log('=== SEEC FORM EMAIL NOTIFICATION ===')
    console.log('Recipients:', recipients)
    console.log('Subject: New SEEC Individual Contributor Form Submission')
    console.log('Content:')
    console.log(emailContent)
    console.log('=====================================')

    // In a real implementation, you would use EmailJS or another service:
    //
    // import emailjs from '@emailjs/browser'
    //
    // const templateParams = {
    //   to_email: recipients.join(','),
    //   subject: 'New SEEC Individual Contributor Form Submission',
    //   message: emailContent,
    //   from_name: 'Bridgewater DTC Website',
    //   reply_to: 'noreply@bridgewaterdems.org'
    // }
    //
    // const result = await emailjs.send(
    //   EMAIL_CONFIG.serviceId,
    //   EMAIL_CONFIG.templateId,
    //   templateParams,
    //   EMAIL_CONFIG.publicKey
    // )

    // Simulate successful email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error('Error sending SEEC notification email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Function to get email recipients from admin settings
export const getEmailRecipients = (): string[] => {
  // In a real application, this would fetch from your admin settings
  // For now, we'll use default recipients
  const defaultRecipients = [
    'treasurer@bridgewaterdems.org',
    'admin@bridgewaterdems.org'
  ]

  // Try to get recipients from localStorage (where admin might have stored them)
  const storedRecipients = localStorage.getItem('donationEmailRecipients')
  if (storedRecipients) {
    try {
      return JSON.parse(storedRecipients)
    } catch (error) {
      console.error('Error parsing stored email recipients:', error)
    }
  }

  return defaultRecipients
}

// Function to send confirmation email to the donor
export const sendDonorConfirmation = async (
  formData: SEECFormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const content = getDonationContent()
    const emailTemplate = content.emailTemplates.donorConfirmation

    const donorName = `${formData['your-first-name']} ${formData['your-last-name']}`
    const greeting = emailTemplate.greeting.replace('{donor_name}', donorName)
    const mainMessage = emailTemplate.mainMessage.replace('{donation_amount}', formData.donation.toString())

    const confirmationContent = `
${greeting}

${mainMessage}

${emailTemplate.summaryHeader}

Donation Amount: ${formData.donation}
Method: PayPal
Date: ${new Date().toLocaleDateString()}

${emailTemplate.supportMessage}

${emailTemplate.contactMessage}

${emailTemplate.closing}

--
${emailTemplate.footer}
    `.trim()

    console.log('=== DONOR CONFIRMATION EMAIL ===')
    console.log('To:', formData['your-email'])
    console.log('Subject: Thank you for your donation - Bridgewater DTC')
    console.log('Content:')
    console.log(confirmationContent)
    console.log('===============================')

    // Simulate successful email sending
    await new Promise(resolve => setTimeout(resolve, 500))

    return { success: true }
  } catch (error) {
    console.error('Error sending donor confirmation email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
