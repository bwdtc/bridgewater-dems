// Content service for site-wide content management
// Provides centralized content management that can be edited from admin panel

export interface DonationContent {
  donatePage: {
    title: string
    subtitle: string
    optionsTitle: string
    option1Title: string
    option1Description: string
    option1Note: string
    option2Title: string
    option2Description: string
    option2Warning: string
    option2Instructions: string
    option2MailingInstructions: string
    mailingAddress: {
      organization: string
      addressLine1: string
      addressLine2: string
    }
    thankYouMessage: string
  }
  thankYouPage: {
    title: string
    subtitle: string
    summaryTitle: string
    nextStepsTitle: string
    nextSteps: string[]
    engagementTitle: string
    engagementSubtitle: string
    contactNote: string
  }
  seecForm: {
    title: string
    subtitle: string
    contributorSectionTitle: string
    donationSectionTitle: string
    addressSectionTitle: string
    employmentSectionTitle: string
    legalSectionTitle: string
    legalInstructions: string
    certificationTitle: string
    certificationText: string
    signatureInstructions: string
    submitMessage: string
    submitButtonText: string
  }
  emailTemplates: {
    adminNotification: {
      subject: string
      header: string
      introText: string
      dataHeader: string
      footer: string
    }
    donorConfirmation: {
      subject: string
      greeting: string
      mainMessage: string
      summaryHeader: string
      supportMessage: string
      contactMessage: string
      closing: string
      footer: string
    }
  }
}

// Default content that matches current implementation
export const defaultDonationContent: DonationContent = {
  donatePage: {
    title: 'Send Check or Pay Online?',
    subtitle: 'Thank you for choosing to donate! We really appreciate your help.',
    optionsTitle: 'Two options:',
    option1Title: 'If you\'d like to send money online',
    option1Description: '(this is fast, easy and secure) click this link to donate using PayPal.',
    option1Note: '→ You will see a form you must fill out first, then you will be taken to PayPal. ←',
    option2Title: 'If you\'d prefer to send a check',
    option2Description: 'you must fill out a Connecticut SEEC donor form so that we can certify your contribution.',
    option2Warning: 'We can\'t accept your donation if you don\'t.',
    option2Instructions: 'Please click this button,',
    option2MailingInstructions: 'fill out the donor form, print it and send it with your check to:',
    mailingAddress: {
      organization: 'Bridgewater Democratic Town Committee',
      addressLine1: 'P.O. Box 132',
      addressLine2: 'Bridgewater, CT 06752'
    },
    thankYouMessage: 'Thank you!'
  },
  thankYouPage: {
    title: 'Thank You for Your Donation!',
    subtitle: 'Your contribution to the Bridgewater Democratic Town Committee is greatly appreciated and will help us continue our important work for our community.',
    summaryTitle: 'Donation Summary',
    nextStepsTitle: 'What Happens Next?',
    nextSteps: [
      'You will receive a confirmation email at the address you provided',
      'Your SEEC Individual Contributor Form has been processed and filed',
      'Your donation will be used to support Democratic candidates and causes in Bridgewater',
      'You may receive periodic updates about our activities and upcoming events'
    ],
    engagementTitle: 'Keep Supporting Democracy',
    engagementSubtitle: 'There are many ways to stay involved with the Bridgewater Democratic Town Committee:',
    contactNote: 'Questions about your donation?'
  },
  seecForm: {
    title: 'Connecticut SEEC Individual Contributor Form',
    subtitle: 'This form is required by Connecticut state law before making your donation. After completing this form, you will be redirected to PayPal to process your payment.',
    contributorSectionTitle: 'NAME OF INDIVIDUAL CONTRIBUTOR:',
    donationSectionTitle: 'DONATION AMOUNT:',
    addressSectionTitle: 'RESIDENTIAL ADDRESS*',
    employmentSectionTitle: 'Employment Information',
    legalSectionTitle: 'Legal Disclosure Requirements',
    legalInstructions: 'PLEASE SCROLL DOWN TO REVIEW THE DEFINITIONS BELOW, THEN SCROLL BACK HERE TO ANSWER EACH OF THE FOLLOWING:',
    certificationTitle: 'CERTIFICATION:',
    certificationText: 'I hereby certify and state that all of the information disclosed by me and set forth above on this contributor card is true and accurate to the best of my knowledge and belief. I certify that I am either a United States citizen or a foreign national with permanent resident status in the United States. I certify that this contribution is being made from my personal funds, is not being reimbursed in any manner, is not being made as a loan, and is not an otherwise prohibited contribution.',
    signatureInstructions: 'To sign this form digitally, please type your full name as you entered it above:',
    submitMessage: 'Thank you for your time.',
    submitButtonText: 'Send'
  },
  emailTemplates: {
    adminNotification: {
      subject: 'New SEEC Individual Contributor Form Submission',
      header: '*** PLEASE DO NOT REPLY TO THIS EMAIL. THIS IS A SENDING SERVER ONLY ***',
      introText: 'A contributor just filled out an SEEC Individual Contributor Form prior to donating via PayPal.',
      dataHeader: 'Here is the information the contributor provided:',
      footer: 'This e-mail was sent from an online form on the Bridgewater Democratic Town Committee website (http://bridgewaterdems.org)'
    },
    donorConfirmation: {
      subject: 'Thank you for your donation - Bridgewater DTC',
      greeting: 'Dear {donor_name},',
      mainMessage: 'Thank you for your donation of ${donation_amount} to the Bridgewater Democratic Town Committee!',
      summaryHeader: 'Your SEEC Individual Contributor Form has been received and processed. Here\'s a summary of your contribution:',
      supportMessage: 'Your support helps us continue our important work for the Bridgewater community. We truly appreciate your commitment to Democratic values and local engagement.',
      contactMessage: 'If you have any questions about your donation, please don\'t hesitate to contact us.',
      closing: 'Best regards,\nBridgewater Democratic Town Committee',
      footer: 'This is an automated confirmation email. Please do not reply to this email.'
    }
  }
}

// Get content from localStorage or return defaults
export const getDonationContent = (): DonationContent => {
  try {
    const stored = localStorage.getItem('donationContent')
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with defaults to ensure all properties exist
      return {
        donatePage: { ...defaultDonationContent.donatePage, ...parsed.donatePage },
        thankYouPage: { ...defaultDonationContent.thankYouPage, ...parsed.thankYouPage },
        seecForm: { ...defaultDonationContent.seecForm, ...parsed.seecForm },
        emailTemplates: {
          adminNotification: { ...defaultDonationContent.emailTemplates.adminNotification, ...parsed.emailTemplates?.adminNotification },
          donorConfirmation: { ...defaultDonationContent.emailTemplates.donorConfirmation, ...parsed.emailTemplates?.donorConfirmation }
        }
      }
    }
  } catch (error) {
    console.error('Error loading donation content:', error)
  }

  return defaultDonationContent
}

// Save content to localStorage
export const saveDonationContent = (content: DonationContent): void => {
  try {
    localStorage.setItem('donationContent', JSON.stringify(content))
  } catch (error) {
    console.error('Error saving donation content:', error)
  }
}

// Hook for React components to use donation content
export const useDonationContent = () => {
  return getDonationContent()
}

// ====================================
// SITE-WIDE CONTENT MANAGEMENT SYSTEM
// ====================================

// Interface for Hero Slider
export interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  isActive: boolean
}

// Interface for all page content
export interface SiteContent {
  header: {
    logo: {
      src: string
      alt: string
      fallbackText: string
    }
    navigation: Array<{
      name: string
      href: string
      displayName?: string
    }>
    donateButton: {
      text: string
      link: string
    }
  }

  footer: {
    ourTown: {
      title: string
      quote: string
      attribution: string
    }
    categories: {
      title: string
      links: Array<{
        name: string
        href: string
      }>
    }
    copyright: {
      text: string
      address: string
    }
  }

  sidebar: {
    search: {
      placeholder: string
      enabled: boolean
    }
    contactWidget: {
      title: string
      linkText: string
      linkHref: string
    }
    aboutWidget: {
      title: string
      linkText: string
      linkHref: string
    }
  }

  home: {
    title: string
    heroSlider: HeroSlide[]
    welcomeMessage: string[]
    featureBlocks: Array<{
      id: string
      title: string
      description: string
      link: string
      icon: string
    }>
  }

  about: {
    title: string
    sections: {
      whoWeAre: {
        title: string
        content: string
      }
      officers: {
        title: string
        content: string
      }
      whatWeStriveFor: {
        title: string
        items: string[]
      }
    }
    joinUsMessage: string
  }

  candidates: {
    title: string
    subtitle: string
    candidates: Array<{
      id: string
      name: string
      position: string
      image: string
      bio: string
      experience: string[]
      priorities: string[]
    }>
    callToAction: {
      title: string
      message: string
      buttons: Array<{
        text: string
        link: string
        style: 'primary' | 'secondary'
      }>
    }
  }

  issues: {
    title: string
    subtitle: string
    sections: {
      accomplishments: {
        enabled: boolean
        title: string
        items: Array<{
          id: string
          title: string
          description: string
          details: string[]
          icon: string
        }>
      }
      futurePlans: {
        enabled: boolean
        title: string
        items: Array<{
          id: string
          title: string
          description: string
          timeline: string
          priority: 'high' | 'medium' | 'low'
        }>
      }
    }
    callToAction: {
      title: string
      message: string
      buttons: Array<{
        text: string
        link: string
        style: 'primary' | 'secondary'
      }>
    }
  }

  endorsements: {
    title: string
    subtitle: string
    individualEndorsements: Array<{
      id: string
      name: string
      title: string
      quote: string
      image: string
    }>
    organizationEndorsements: Array<{
      id: string
      name: string
      description: string
      website?: string
    }>
    mediaEndorsements: Array<{
      id: string
      outlet: string
      headline: string
      excerpt: string
      date: string
      link?: string
    }>
  }

  volunteer: {
    title: string
    subtitle: string
    introduction: string
    roles: Array<{
      id: string
      title: string
      description: string
      timeCommitment: string
      requirements: string[]
      tasks: string[]
      icon: string
    }>
    benefits: string[]
    callToAction: {
      title: string
      message: string
      formFields: Array<{
        name: string
        label: string
        type: string
        required: boolean
        options?: string[]
      }>
    }
  }

  vote: {
    title: string
    subtitle: string
    introduction: string
    tabs: {
      registration: {
        enabled: boolean
        label: string
        title: string
        subtitle: string
        content: {
          whoCanRegister: {
            title: string
            items: string[]
          }
          howToRegister: {
            title: string
            items: string[]
          }
          whatYouNeed: {
            title: string
            items: string[]
          }
          checkStatus: {
            title: string
            description: string
            buttons: Array<{
              text: string
              style: 'primary' | 'secondary'
            }>
          }
          needHelp: {
            title: string
            contacts: Array<{
              type: 'phone' | 'email' | 'address'
              label: string
              value: string
            }>
          }
        }
      }
      locations: {
        enabled: boolean
        label: string
        title: string
        subtitle: string
        pollingLocations: Array<{
          id: string
          name: string
          address: string
          districts: string[]
          hours: string
          accessibility: string
          parking: string
          contact: string
        }>
        districtLookup: {
          title: string
          description: string
          buttonText: string
        }
      }
      dates: {
        enabled: boolean
        label: string
        title: string
        subtitle: string
        importantDates: Array<{
          id: string
          title: string
          date: string
          description: string
          type: 'registration' | 'early_voting' | 'election' | 'absentee'
        }>
        electionDayReminders: {
          title: string
          items: string[]
        }
      }
      candidates: {
        enabled: boolean
        label: string
        title: string
        subtitle: string
        candidateInfo: Array<{
          office: string
          candidates: Array<{
            name: string
            party: string
            description?: string
          }>
        }>
        learnMore: {
          title: string
          description: string
          buttons: Array<{
            text: string
            link: string
            style: 'primary' | 'secondary'
          }>
        }
      }
    }
    callToAction: {
      title: string
      message: string
      buttons: Array<{
        text: string
        style: 'primary' | 'secondary'
      }>
    }
    votingRights: {
      title: string
      youHaveTheRight: {
        title: string
        items: string[]
      }
      needAssistance: {
        title: string
        contacts: Array<{
          label: string
          value: string
        }>
      }
    }
  }

  contact: {
    title: string
    subtitle: string
    showPhoneNumber: boolean
    phoneNumber: string
    email: string
    mailingAddress: {
      organization: string
      addressLine1: string
      addressLine2: string
    }
    contactForm: {
      title: string
      subtitle: string
      fields: Array<{
        name: string
        label: string
        type: string
        required: boolean
        placeholder?: string
      }>
      submitButtonText: string
      successMessage: string
    }
    officeHours: {
      title: string
      schedule: string[]
    }
    socialMedia: Array<{
      platform: string
      url: string
      isActive: boolean
    }>
  }
}

// Default content for all pages
export const defaultSiteContent: SiteContent = {
  header: {
    logo: {
      src: "/media/bridgewater-dtc-logo.png",
      alt: "Bridgewater Democratic Town Committee",
      fallbackText: "Bridgewater Democratic Town Committee"
    },
    navigation: [
      { name: "Home", href: "/" },
      { name: "Candidates", href: "/candidates" },
      { name: "Issues", href: "/issues" },
      { name: "Endorsements", href: "/endorsements" },
      { name: "FactCheck", href: "/factcheck", displayName: "FACT CHECK" },
      { name: "Events", href: "/events" },
      { name: "Volunteer", href: "/volunteer" },
      { name: "Vote!", href: "/vote" }
    ],
    donateButton: {
      text: "DONATE",
      link: "/donate"
    }
  },

  footer: {
    ourTown: {
      title: "Our Town",
      quote: "Outside, I'm all for progress. But once across the big bridge, progress wears a different face. It means preserving our tranquility against distant forces which press against us. We like it here; we mean to keep it this way. That's basic politics in Bridgewater.",
      attribution: "-- 1985 - Theodore H. White, American political journalist, historian, and novelist."
    },
    categories: {
      title: "Categories",
      links: [
        { name: "Voting", href: "#vote" },
        { name: "Endorsements", href: "#endorsements" },
        { name: "Issues", href: "/issues" },
        { name: "The 2021 Candidates", href: "#candidates" }
      ]
    },
    copyright: {
      text: "Copyright © 2024 Bridgewater DTC. All rights reserved. Paid for by the Bridgewater DTC, Cynthia Feuer, Treasurer",
      address: "P.O. Box 132, Bridgewater, CT 06752"
    }
  },

  sidebar: {
    search: {
      placeholder: "Search",
      enabled: true
    },
    contactWidget: {
      title: "Contact Us",
      linkText: "eMail/USMail us here",
      linkHref: "/contact"
    },
    aboutWidget: {
      title: "ABOUT US",
      linkText: "About the DTC",
      linkHref: "/about"
    }
  },

  home: {
    title: "Bridgewater Democratic Town Committee",
    heroSlider: [
      {
        id: "slide1",
        image: "https://ext.same-assets.com/249616470/1885902561.jpeg",
        title: "Bridgewater",
        subtitle: "We love our town.",
        isActive: true
      },
      {
        id: "slide2",
        image: "https://ext.same-assets.com/249616470/848745050.jpeg",
        title: "Bridgewater",
        subtitle: "Things are good in Bridgewater.",
        isActive: true
      },
      {
        id: "slide3",
        image: "https://ext.same-assets.com/249616470/1410192107.jpeg",
        title: "Bridgewater",
        subtitle: "The town has improved,\nand it's also stayed the same.\n\nThat's letting Bridgewater be Bridgewater.",
        isActive: true
      },
      {
        id: "slide4",
        image: "https://i.imgur.com/QskNK32.jpeg",
        title: "Eric Gsell",
        subtitle: "Bridgewater's First Selectman",
        isActive: true
      },
      {
        id: "slide5",
        image: "https://i.imgur.com/0nTbSKK.jpeg",
        title: "Carolan Dwyer",
        subtitle: "Bridgewater's Selectman",
        isActive: true
      }
    ],
    welcomeMessage: [
      "The Bridgewater Democratic Town Committee is the voice and face of the Democratic Party in Bridgewater, Connecticut. We love Bridgewater and think is a great place to live. We are grateful for all that nature has given us here.",
      "We understand that it takes effort, discipline and skill to care for our beautiful surroundings, for the town's infrastructure and its operations, and for all of the residents who have chosen to make Bridgewater their home.",
      "We are here to preserve, to protect, to progress, and play fair.",
      "And we welcome help from any members of the Bridgewater community in our efforts."
    ],
    featureBlocks: [
      {
        id: "candidates",
        title: "Candidates",
        description: "The slate, strong and qualified.",
        link: "/candidates",
        icon: "👥"
      },
      {
        id: "endorsements",
        title: "Endorsements",
        description: "Supporters, loud and clear.",
        link: "/endorsements",
        icon: "🗳️"
      },
      {
        id: "issues",
        title: "Issues",
        description: "Successes and plans.",
        link: "/issues",
        icon: "📋"
      }
    ]
  },

  about: {
    title: "About Bridgewater Democrats",
    sections: {
      whoWeAre: {
        title: "Who We Are",
        content: "We're a committee of 24 Democrats elected by a caucus of Bridgewater residents who are themselves registered Democrats. We represent the Democratic Party in Bridgewater, and represent Bridgewater regionally, state-wide and nationally in the Democratic Party."
      },
      officers: {
        title: "Our Officers Are",
        content: "Curtis S. Read, Chairman\nKathleen Creighton, Secretary\nCynthia Feuer, Treasurer"
      },
      whatWeStriveFor: {
        title: "What We Strive For",
        items: [
          "Maintaining the small town advantage.",
          "Providing quality education.",
          "Preserving small towns in must-do state mandates.",
          "Continuing to maintain reasonable tax rates with rising demand for services.",
          "Continuing to balance pressure for growth with environment, open space, and quality of life.",
          "Providing reasonable housing for the elderly.",
          "Providing housing opportunities for younger generations."
        ]
      }
    },
    joinUsMessage: "Would you like to join us? Click here to contact us."
  },

  candidates: {
    title: "2021 Candidates",
    subtitle: "Meet the dedicated individuals running to serve Bridgewater. Our slate represents experience, integrity, and a shared vision for our community's future.",
    candidates: [
      {
        id: "curtis-read",
        name: "Curtis Read",
        position: "First Selectman",
        image: "https://ext.same-assets.com/1303823124/4232692335.jpeg",
        bio: "Curtis Read has served Bridgewater with dedication and integrity. As First Selectman, he has led initiatives to improve our town's infrastructure while preserving its small-town character.",
        experience: [
          "Bridgewater First Selectman (2019-present)",
          "Town Planning Commission (2015-2019)",
          "Local Business Owner (20+ years)",
          "Volunteer Fire Department"
        ],
        priorities: [
          "Responsible fiscal management",
          "Infrastructure improvements",
          "Preserving Bridgewater's character",
          "Supporting local businesses"
        ]
      },
      {
        id: "alan-brown",
        name: "Alan Brown",
        position: "Selectman",
        image: "https://ext.same-assets.com/1303823124/642631049.jpeg",
        bio: "Alan Brown brings years of public service experience to the Board of Selectmen. His commitment to transparent government and community engagement makes him an invaluable team member.",
        experience: [
          "Bridgewater Selectman (2019-present)",
          "Board of Education (2012-2019)",
          "Environmental Commission Chair",
          "Community Volunteer"
        ],
        priorities: [
          "Transparent governance",
          "Environmental protection",
          "Educational excellence",
          "Community engagement"
        ]
      }
    ],
    callToAction: {
      title: "Your Team, Your Town",
      message: "This experienced team is committed to preserving what makes Bridgewater special while ensuring our town continues to thrive for future generations.",
      buttons: [
        {
          text: "See Endorsements",
          link: "/endorsements",
          style: "primary"
        },
        {
          text: "View Issues",
          link: "/issues",
          style: "secondary"
        }
      ]
    }
  },

  issues: {
    title: "Issues & Accomplishments",
    subtitle: "Over the past four years, our team has delivered on our promises while maintaining the values and character that make Bridgewater a special place to call home.",
    sections: {
      accomplishments: {
        enabled: true,
        title: "Our Accomplishments",
        items: [
          {
            id: "infrastructure",
            title: "Infrastructure Improvements",
            description: "Significant improvements to town roads, bridges, and public facilities while maintaining fiscal responsibility.",
            details: [
              "Completed Route 202 bridge repairs",
              "Resurfaced 12 miles of town roads",
              "Upgraded town hall heating system",
              "Improved emergency services equipment"
            ],
            icon: "🏗️"
          },
          {
            id: "fiscal",
            title: "Fiscal Management",
            description: "Maintained stable tax rates while investing in essential services and infrastructure.",
            details: [
              "Zero tax increase for three consecutive years",
              "Improved bond rating from AA- to AA",
              "Reduced long-term debt by 15%",
              "Increased emergency fund reserves"
            ],
            icon: "💰"
          }
        ]
      },
      futurePlans: {
        enabled: true,
        title: "Looking Forward: Our Plans",
        items: [
          {
            id: "broadband",
            title: "Broadband Expansion",
            description: "Bring high-speed internet to all residents",
            timeline: "2024-2025",
            priority: "high"
          },
          {
            id: "parks",
            title: "Park Improvements",
            description: "Upgrade playground equipment and trails",
            timeline: "2024",
            priority: "medium"
          }
        ]
      }
    },
    callToAction: {
      title: "Continue the Progress",
      message: "Our proven track record shows we deliver results while maintaining fiscal responsibility.",
      buttons: [
        {
          text: "Meet the Team",
          link: "/candidates",
          style: "primary"
        },
        {
          text: "Get Involved",
          link: "/contact",
          style: "secondary"
        }
      ]
    }
  },

  endorsements: {
    title: "Endorsements",
    subtitle: "Supporters from across our community and region recognize the exceptional leadership and results our team has delivered for Bridgewater.",
    individualEndorsements: [
      {
        id: "robert-thompson",
        name: "Robert Thompson",
        title: "Former Mayor, Litchfield",
        quote: "Curtis Read and his team have demonstrated exceptional leadership and fiscal responsibility. Bridgewater is fortunate to have such dedicated public servants.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
      }
    ],
    organizationEndorsements: [
      {
        id: "teachers-union",
        name: "Bridgewater Teachers Association",
        description: "Supporting education and community values"
      }
    ],
    mediaEndorsements: [
      {
        id: "litchfield-county-times",
        outlet: "Litchfield County Times",
        headline: "Bridgewater Democrats Deliver Results",
        excerpt: "Fiscal responsibility meets community progress in Bridgewater...",
        date: "October 15, 2021"
      }
    ]
  },

  volunteer: {
    title: "Volunteer Opportunities",
    subtitle: "Make a difference in your community by joining our team of dedicated volunteers.",
    introduction: "Whether you have 30 minutes or 30 hours to spare, there's a way for you to contribute to our mission of strengthening Bridgewater's democratic voice.",
    roles: [
      {
        id: "phone-banking",
        title: "Phone Banking",
        description: "Contact voters to share information about candidates and issues",
        timeCommitment: "2-4 hours per week",
        requirements: ["Comfortable speaking on the phone", "Basic computer skills"],
        tasks: ["Make voter contact calls", "Update voter databases", "Follow up with interested voters"],
        icon: "📞"
      }
    ],
    benefits: [
      "Meet like-minded community members",
      "Gain valuable campaign experience",
      "Make a real difference in local politics",
      "Flexible scheduling to fit your availability"
    ],
    callToAction: {
      title: "Ready to Get Involved?",
      message: "Sign up below and we'll contact you with volunteer opportunities that match your interests and availability.",
      formFields: [
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: false },
        { name: "interests", label: "Areas of Interest", type: "select", required: false, options: ["Phone Banking", "Canvassing", "Event Planning", "Data Entry", "Social Media"] }
      ]
    }
  },

  vote: {
    title: "Voting Information",
    subtitle: "Everything you need to know to make your voice heard in Bridgewater elections.",
    introduction: "Voting is one of our most fundamental rights and responsibilities. Here's how to participate in Bridgewater's democratic process.",
    tabs: {
      registration: {
        enabled: true,
        label: "Registration",
        title: "Voter Registration",
        subtitle: "Get registered to vote in Bridgewater elections",
        content: {
          whoCanRegister: {
            title: "Who Can Register?",
            items: [
              "U.S. citizen",
              "Connecticut resident",
              "At least 18 years old by Election Day",
              "Not currently serving a felony sentence"
            ]
          },
          howToRegister: {
            title: "How to Register",
            items: [
              "Online at ct.gov/vote",
              "By mail using voter registration form",
              "In person at Town Clerk's office",
              "At DMV when getting driver's license"
            ]
          },
          whatYouNeed: {
            title: "What You Need",
            items: [
              "Valid Connecticut driver's license OR",
              "Last 4 digits of Social Security number",
              "Current address in Bridgewater"
            ]
          },
          checkStatus: {
            title: "Check Your Status",
            description: "Verify your voter registration status and find your polling location.",
            buttons: [
              { text: "Check Registration Status", style: "primary" },
              { text: "Register Online", style: "secondary" }
            ]
          },
          needHelp: {
            title: "Need Help?",
            contacts: [
              { type: "phone", label: "Town Clerk", value: "(860) 555-0123" },
              { type: "email", label: "Email", value: "clerk@bridgewater.gov" },
              { type: "address", label: "Town Hall", value: "100 Main St\nMonday-Friday 9AM-5PM" }
            ]
          }
        }
      },
      locations: {
        enabled: true,
        label: "Polling Locations",
        title: "Polling Locations",
        subtitle: "Find your designated polling place",
        pollingLocations: [
          {
            id: "community-center",
            name: "Bridgewater Community Center",
            address: "123 Main Street, Bridgewater, CT 06752",
            districts: ["District 1", "District 2"],
            hours: "6:00 AM - 8:00 PM",
            accessibility: "Fully Accessible",
            parking: "Free parking available",
            contact: "(860) 555-0123"
          },
          {
            id: "burnham-library",
            name: "Burnham Library",
            address: "456 Library Lane, Bridgewater, CT 06752",
            districts: ["District 3"],
            hours: "6:00 AM - 8:00 PM",
            accessibility: "Wheelchair Accessible",
            parking: "Street parking",
            contact: "(860) 555-0145"
          },
          {
            id: "elementary-school",
            name: "Bridgewater Elementary School",
            address: "789 School Drive, Bridgewater, CT 06752",
            districts: ["District 4", "District 5"],
            hours: "6:00 AM - 8:00 PM",
            accessibility: "Fully Accessible",
            parking: "Large parking lot",
            contact: "(860) 555-0167"
          }
        ],
        districtLookup: {
          title: "Don't Know Your District?",
          description: "Use our district lookup tool to find your voting district and polling location.",
          buttonText: "Find My District"
        }
      },
      dates: {
        enabled: true,
        label: "Important Dates",
        title: "Important Election Dates",
        subtitle: "Key dates and deadlines for upcoming elections",
        importantDates: [
          {
            id: "registration-deadline",
            title: "Voter Registration Deadline",
            date: "2024-10-29",
            description: "Last day to register to vote for the November election",
            type: "registration"
          },
          {
            id: "absentee-deadline",
            title: "Absentee Ballot Application Deadline",
            date: "2024-10-30",
            description: "Last day to apply for an absentee ballot",
            type: "absentee"
          },
          {
            id: "early-voting",
            title: "Early Voting Begins",
            date: "2024-11-04",
            description: "Early voting period starts at designated locations",
            type: "early_voting"
          },
          {
            id: "election-day",
            title: "Election Day",
            date: "2024-11-05",
            description: "General Election - Polls open 6:00 AM to 8:00 PM",
            type: "election"
          }
        ],
        electionDayReminders: {
          title: "🗳️ Election Day Reminders",
          items: [
            "Polls are open from 6:00 AM to 8:00 PM",
            "Bring a valid ID if you're a first-time voter",
            "You can still vote if you're in line when polls close",
            "Report any voting issues to election officials",
            "No campaigning within 75 feet of polling places"
          ]
        }
      },
      candidates: {
        enabled: true,
        label: "Candidates",
        title: "2024 Election Candidates",
        subtitle: "Learn about the candidates on your ballot",
        candidateInfo: [
          {
            office: "First Selectman",
            candidates: [
              { name: "Curtis Read", party: "Democratic", description: "Incumbent seeking re-election" },
              { name: "John Smith", party: "Republican" }
            ]
          },
          {
            office: "Selectman",
            candidates: [
              { name: "Alan Brown", party: "Democratic", description: "Incumbent seeking re-election" },
              { name: "Mary Johnson", party: "Republican" }
            ]
          },
          {
            office: "Town Clerk",
            candidates: [
              { name: "Susan Miller", party: "Democratic", description: "Incumbent seeking re-election" },
              { name: "Robert Wilson", party: "Republican" }
            ]
          },
          {
            office: "Board of Education (3 seats)",
            candidates: [
              { name: "Jennifer Davis", party: "Democratic" },
              { name: "Michael Thompson", party: "Democratic", description: "Incumbent seeking re-election" },
              { name: "Sarah Williams", party: "Republican" },
              { name: "David Martinez", party: "Republican", description: "Incumbent seeking re-election" }
            ]
          }
        ],
        learnMore: {
          title: "📋 Learn More About Candidates",
          description: "Research candidates' positions on issues important to Bridgewater.",
          buttons: [
            { text: "View Democratic Candidates", link: "/candidates", style: "primary" },
            { text: "Read About Issues", link: "/issues", style: "secondary" }
          ]
        }
      }
    },
    callToAction: {
      title: "Make Your Voice Heard",
      message: "Every vote matters in Bridgewater. Your participation helps shape our community's future and ensures that our values are represented in local government.",
      buttons: [
        { text: "🗳️ Check My Registration", style: "primary" },
        { text: "📍 Find My Polling Place", style: "secondary" }
      ]
    },
    votingRights: {
      title: "Your Voting Rights",
      youHaveTheRight: {
        title: "You Have the Right To:",
        items: [
          "Vote if you're in line when polls close",
          "Request help if you have a disability",
          "Vote privately and independently",
          "Receive a new ballot if you make a mistake",
          "Report voting problems to election officials"
        ]
      },
      needAssistance: {
        title: "Need Assistance?",
        contacts: [
          { label: "📞 Election Protection Hotline", value: "1-866-OUR-VOTE" },
          { label: "📧 Secretary of State", value: "elections@ct.gov" },
          { label: "🌐 Connecticut Voting Rights", value: "ct.gov/vote" },
          { label: "📱 Text Help", value: "Text \"CTHELP\" to 67369 for assistance" }
        ]
      }
    }
  },

  contact: {
    title: "Contact Us",
    subtitle: "Get in touch with the Bridgewater Democratic Town Committee",
    showPhoneNumber: false,
    phoneNumber: "(860) 555-0123",
    email: "info@bridgewaterdems.org",
    mailingAddress: {
      organization: "Bridgewater Democratic Town Committee",
      addressLine1: "P.O. Box 132",
      addressLine2: "Bridgewater, CT 06752"
    },
    contactForm: {
      title: "Send us a Message",
      subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      fields: [
        { name: "name", label: "Your Name", type: "text", required: true, placeholder: "Enter your full name" },
        { name: "email", label: "Email Address", type: "email", required: true, placeholder: "your@email.com" },
        { name: "subject", label: "Subject", type: "text", required: true, placeholder: "What is this regarding?" },
        { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message here..." }
      ],
      submitButtonText: "Send Message",
      successMessage: "Thank you for your message! We'll get back to you soon."
    },
    officeHours: {
      title: "Office Hours",
      schedule: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
        "Sunday: Closed"
      ]
    },
    socialMedia: [
      { platform: "Facebook", url: "https://facebook.com/bridgewaterdems", isActive: false },
      { platform: "Twitter", url: "https://twitter.com/bridgewaterdems", isActive: false }
    ]
  }
}

// Get site content from localStorage or return defaults
export const getSiteContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem('siteContent')
    if (stored) {
      const parsed = JSON.parse(stored)
      // Deep merge with defaults to ensure all properties exist
      return mergeSiteContent(defaultSiteContent, parsed)
    }
  } catch (error) {
    console.error('Error loading site content:', error)
  }

  return defaultSiteContent
}

// Deep merge function for site content
const mergeSiteContent = (defaults: SiteContent, stored: Partial<SiteContent>): SiteContent => {
  return {
    header: {
      ...defaults.header,
      ...stored.header,
      logo: { ...defaults.header.logo, ...stored.header?.logo },
      navigation: stored.header?.navigation || defaults.header.navigation,
      donateButton: { ...defaults.header.donateButton, ...stored.header?.donateButton }
    },
    footer: {
      ...defaults.footer,
      ...stored.footer,
      ourTown: { ...defaults.footer.ourTown, ...stored.footer?.ourTown },
      categories: {
        ...defaults.footer.categories,
        ...stored.footer?.categories,
        links: stored.footer?.categories?.links || defaults.footer.categories.links
      },
      copyright: { ...defaults.footer.copyright, ...stored.footer?.copyright }
    },
    sidebar: {
      ...defaults.sidebar,
      ...stored.sidebar,
      search: { ...defaults.sidebar.search, ...stored.sidebar?.search },
      contactWidget: { ...defaults.sidebar.contactWidget, ...stored.sidebar?.contactWidget },
      aboutWidget: { ...defaults.sidebar.aboutWidget, ...stored.sidebar?.aboutWidget }
    },
    home: { ...defaults.home, ...stored.home },
    about: {
      ...defaults.about,
      ...stored.about,
      sections: {
        ...defaults.about.sections,
        ...stored.about?.sections
      }
    },
    candidates: {
      ...defaults.candidates,
      ...stored.candidates,
      candidates: stored.candidates?.candidates || defaults.candidates.candidates,
      callToAction: { ...defaults.candidates.callToAction, ...stored.candidates?.callToAction }
    },
    issues: {
      ...defaults.issues,
      ...stored.issues,
      sections: {
        accomplishments: {
          ...defaults.issues.sections.accomplishments,
          ...stored.issues?.sections?.accomplishments,
          items: stored.issues?.sections?.accomplishments?.items || defaults.issues.sections.accomplishments.items
        },
        futurePlans: {
          ...defaults.issues.sections.futurePlans,
          ...stored.issues?.sections?.futurePlans,
          items: stored.issues?.sections?.futurePlans?.items || defaults.issues.sections.futurePlans.items
        }
      },
      callToAction: { ...defaults.issues.callToAction, ...stored.issues?.callToAction }
    },
    endorsements: {
      ...defaults.endorsements,
      ...stored.endorsements,
      individualEndorsements: stored.endorsements?.individualEndorsements || defaults.endorsements.individualEndorsements,
      organizationEndorsements: stored.endorsements?.organizationEndorsements || defaults.endorsements.organizationEndorsements,
      mediaEndorsements: stored.endorsements?.mediaEndorsements || defaults.endorsements.mediaEndorsements
    },
    volunteer: {
      ...defaults.volunteer,
      ...stored.volunteer,
      roles: stored.volunteer?.roles || defaults.volunteer.roles,
      benefits: stored.volunteer?.benefits || defaults.volunteer.benefits,
      callToAction: { ...defaults.volunteer.callToAction, ...stored.volunteer?.callToAction }
    },
    vote: {
      ...defaults.vote,
      ...stored.vote,
      tabs: {
        registration: {
          ...defaults.vote.tabs.registration,
          ...stored.vote?.tabs?.registration,
          content: {
            ...defaults.vote.tabs.registration.content,
            ...stored.vote?.tabs?.registration?.content
          }
        },
        locations: {
          ...defaults.vote.tabs.locations,
          ...stored.vote?.tabs?.locations,
          pollingLocations: stored.vote?.tabs?.locations?.pollingLocations || defaults.vote.tabs.locations.pollingLocations,
          districtLookup: { ...defaults.vote.tabs.locations.districtLookup, ...stored.vote?.tabs?.locations?.districtLookup }
        },
        dates: {
          ...defaults.vote.tabs.dates,
          ...stored.vote?.tabs?.dates,
          importantDates: stored.vote?.tabs?.dates?.importantDates || defaults.vote.tabs.dates.importantDates,
          electionDayReminders: { ...defaults.vote.tabs.dates.electionDayReminders, ...stored.vote?.tabs?.dates?.electionDayReminders }
        },
        candidates: {
          ...defaults.vote.tabs.candidates,
          ...stored.vote?.tabs?.candidates,
          candidateInfo: stored.vote?.tabs?.candidates?.candidateInfo || defaults.vote.tabs.candidates.candidateInfo,
          learnMore: { ...defaults.vote.tabs.candidates.learnMore, ...stored.vote?.tabs?.candidates?.learnMore }
        }
      },
      callToAction: { ...defaults.vote.callToAction, ...stored.vote?.callToAction },
      votingRights: {
        ...defaults.vote.votingRights,
        ...stored.vote?.votingRights,
        youHaveTheRight: { ...defaults.vote.votingRights.youHaveTheRight, ...stored.vote?.votingRights?.youHaveTheRight },
        needAssistance: { ...defaults.vote.votingRights.needAssistance, ...stored.vote?.votingRights?.needAssistance }
      }
    },
    contact: {
      ...defaults.contact,
      ...stored.contact,
      mailingAddress: { ...defaults.contact.mailingAddress, ...stored.contact?.mailingAddress },
      contactForm: { ...defaults.contact.contactForm, ...stored.contact?.contactForm },
      officeHours: { ...defaults.contact.officeHours, ...stored.contact?.officeHours },
      socialMedia: stored.contact?.socialMedia || defaults.contact.socialMedia
    }
  }
}

// Save site content to localStorage
export const saveSiteContent = (content: SiteContent): void => {
  try {
    localStorage.setItem('siteContent', JSON.stringify(content))
  } catch (error) {
    console.error('Error saving site content:', error)
  }
}

// Hooks for React components to use specific page content
export const useHeaderContent = () => getSiteContent().header
export const useFooterContent = () => getSiteContent().footer
export const useSidebarContent = () => getSiteContent().sidebar
export const useHomeContent = () => getSiteContent().home
export const useAboutContent = () => getSiteContent().about
export const useCandidatesContent = () => getSiteContent().candidates
export const useIssuesContent = () => getSiteContent().issues
export const useEndorsementsContent = () => getSiteContent().endorsements
export const useVolunteerContent = () => getSiteContent().volunteer
export const useVoteContent = () => getSiteContent().vote
export const useContactContent = () => getSiteContent().contact
export const useSiteContent = () => getSiteContent()
