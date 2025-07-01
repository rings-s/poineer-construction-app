// src/lib/stores/locale.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Create locale store
function createLocaleStore() {
  const { subscribe, set, update } = writable('en');
  
  return {
    subscribe,
    init: () => {
      if (browser) {
        const savedLocale = localStorage.getItem('locale') || 'en';
        set(savedLocale);
        document.documentElement.setAttribute('lang', savedLocale);
        document.documentElement.setAttribute('dir', savedLocale === 'ar' ? 'rtl' : 'ltr');
      }
    },
    toggle: () => {
      update(currentLocale => {
        const newLocale = currentLocale === 'en' ? 'ar' : 'en';
        if (browser) {
          localStorage.setItem('locale', newLocale);
          document.documentElement.setAttribute('lang', newLocale);
          document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
        }
        return newLocale;
      });
    },
    setLocale: (locale) => {
      set(locale);
      if (browser) {
        localStorage.setItem('locale', locale);
        document.documentElement.setAttribute('lang', locale);
        document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      }
    }
  };
}

export const locale = createLocaleStore();

// Enhanced translations with more comprehensive content
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close'
    },
    hero: {
      title1: 'Bringing Vision',
      title2: 'to Reality',
      subtitle: 'Discover Pioneer Consultants—where design transforms your vision into reality. With extensive experience in the construction industry, we specialise in creating innovative, sustainable structures tailored to your needs.',
      cta1: 'Explore Our Services',
      cta2: 'Start Your Project',
      scrollDown: 'Scroll to explore'
    },
    about: {
      title: 'Who We Are',
      subtitle: 'Pioneer Consultants combines creative vision with viability',
      description1: 'Pioneer Consultants combines creative vision with viability. We provide comprehensive technical support throughout every stage of your project, from initial concept through to closure.',
      description2: 'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client.',
      cta: 'Learn More About Us',
      vision: {
        title: 'Our Vision',
        description: 'To be the most trusted and innovative construction consultancy firm in the West Midlands and beyond, setting new standards in design excellence and project delivery.'
      },
      mission: {
        title: 'Our Mission',
        description: 'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client. We specialize in creating innovative, sustainable structures tailored to your needs.'
      },
      values: {
        title: 'Our Core Values',
        excellence: {
          title: 'Excellence',
          description: 'Committed to delivering the highest quality in every project'
        },
        integrity: {
          title: 'Integrity', 
          description: 'Building trust through transparency and ethical practices'
        },
        innovation: {
          title: 'Innovation',
          description: 'Embracing new technologies to create better solutions'
        },
        sustainability: {
          title: 'Sustainability',
          description: 'Designing for a greener, more sustainable future'
        }
      },
      journey: {
        title: 'Our Journey',
        subtitle: 'Over 25 years of excellence in construction consultancy',
        milestone1: {
          title: 'Company Founded',
          description: 'Pioneer Consultants was established with a vision to bring innovation to construction consultancy in the West Midlands.'
        },
        milestone2: {
          title: 'First Major Project',
          description: 'Successfully completed our first major commercial project, establishing our reputation for quality and reliability.'
        },
        milestone3: {
          title: 'BIM Integration',
          description: 'Became early adopters of BIM technology, revolutionizing our design and project management processes.'
        },
        milestone4: {
          title: 'Team Expansion',
          description: 'Expanded our team of specialists to cover all aspects of construction consultancy and design services.'
        },
        milestone5: {
          title: 'Digital Innovation',
          description: 'Launched our digital visualization services, offering clients immersive 3D experiences of their projects.'
        },
        milestone6: {
          title: 'Leading Excellence',
          description: 'Today, we continue to lead the industry with innovative solutions and exceptional service delivery.'
        }
      },
      team: {
        title: 'Our Expert Team',
        subtitle: 'A dedicated team of professionals committed to excellence in every project across the West Midlands',
        memberTitle: 'Team Member',
        memberRole: 'Expert Professional'
      }
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive project management, cost control & design support with extensive expertise tailored to contractors, consultants, and clients.',
      learnMore: 'Learn more',
      getQuote: 'Get Quote',
      bim: {
        title: 'BIM Modelling',
        description: 'Creating and managing the building\'s data throughout its entire lifecycle by allowing architects, engineers, and contractors to work from a shared 3D model.',
        features: {
          title: 'Key Features',
          list: ['3D Model Creation', 'Clash Detection', 'Quantity Takeoffs', '4D Construction Sequencing', 'Facility Management Integration']
        }
      },
      structural: {
        title: 'Structural Calculations',
        description: 'Accurate and compliant structural calculations for new constructions, extensions, and refurbishments.',
        features: {
          title: 'What We Offer',
          list: ['Load Analysis', 'Structural Design', 'Foundation Design', 'Seismic Analysis', 'Compliance Verification']
        }
      },
      drawings: {
        title: 'Building Drawings',
        description: 'Detailed architectural plans for all construction phases.',
        features: {
          title: 'Drawing Types',
          list: ['Floor Plans', 'Elevations', 'Sections', 'Construction Details', 'As-Built Drawings']
        }
      },
      interior: {
        title: 'Interior Design',
        description: 'Thoughtfully crafted interiors that balance elegance with everyday liveability.',
        features: {
          title: 'Design Services',
          list: ['Space Planning', 'Material Selection', 'Lighting Design', 'Furniture Layout', 'Color Consultation']
        }
      },
      visualization: {
        title: '3D Building Visualisation',
        description: 'High-quality, immersive 3D renderings that bring designs to life and support confident decision-making.',
        features: {
          title: 'Visualization Options',
          list: ['Photorealistic Renders', 'Virtual Walkthroughs', 'Animation Services', 'VR/AR Integration', 'Marketing Materials']
        }
      },
      web: {
        title: 'Construction Web Design',
        description: 'Tailored websites for construction businesses—modern, user-friendly, and search engine optimised.',
        features: {
          title: 'Web Features',
          list: ['Responsive Design', 'SEO Optimization', 'Portfolio Showcase', 'Lead Generation', 'Content Management']
        }
      },
      clientTypes: {
        title: 'Services by Client Type',
        subtitle: 'Tailored solutions for every stakeholder in the construction process',
        clients: {
          title: 'For Clients',
          services: ['Employer agent', 'Bid preparation and administration', 'Contractor procurement and management', 'Contract management', 'Regular project reporting']
        },
        contractors: {
          title: 'For Contractors',
          services: ['Full range of Quantity surveying activities', 'Tender preparation', 'Preparing bill of quantities', 'Preparing time schedules', 'BIM modeling', 'Preparing financial reports', 'Contract handling and legal compliance']
        },
        consultancies: {
          title: 'For Consultancies',
          services: ['Proposal development', 'Architectural drawings', 'Structural design with calculations', 'Structural detailing', 'Interior design']
        }
      },
      sectors: {
        title: 'Sectors We Work In',
        subtitle: 'Delivering excellence across multiple construction sectors',
        infrastructure: {
          title: 'Infrastructure',
          description: 'Roads, bridges, utilities, and public works projects'
        },
        construction: {
          title: 'Construction',
          description: 'Commercial, residential, and industrial buildings'
        }
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: 'Let our expert team help you bring your vision to life with our comprehensive range of services across the West Midlands and surrounding areas.',
        button: 'Get Your Free Consultation'
      }
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to transform your vision into reality? Our expert team at Pioneer Consultants is here to help.',
      hero: {
        title: 'Let\'s Start Your Next Project Together',
        subtitle: 'Ready to transform your vision into reality? Our expert team at Pioneer Consultants is here to help across the West Midlands and surrounding areas.'
      },
      info: {
        email: {
          title: 'Email Us',
          value: 'info@pioneerconsultants.com'
        },
        phone: {
          title: 'Call Us',
          value: '+44 (0) 123 456 7890'
        },
        location: {
          title: 'Service Area',
          value: 'Serving clients across the West Midlands and surrounding areas'
        }
      },
      form: {
        title: 'Send us a Message',
        subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
        steps: {
          contact: 'Contact Info',
          project: 'Project Details',
          review: 'Review & Submit',
          contactSubtitle: 'Tell us about yourself',
          projectSubtitle: 'Describe your project',
          reviewSubtitle: 'Confirm your information'
        },
        fields: {
          name: {
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: 'Name is required'
          },
          email: {
            label: 'Email Address',
            placeholder: 'Enter your email address',
            required: 'Email is required'
          },
          phone: {
            label: 'Phone Number',
            placeholder: 'Enter your phone number'
          },
          subject: {
            label: 'Project Type',
            placeholder: 'Select project type or enter custom',
            options: ['BIM Modelling', 'Structural Design', 'Interior Design', '3D Visualization', 'Construction Web Design', 'Other']
          },
          message: {
            label: 'Project Description',
            placeholder: 'Tell us about your project requirements, timeline, and any specific needs...',
            required: 'Project description is required'
          }
        },
        buttons: {
          previous: 'Previous',
          next: 'Next',
          submit: 'Send Message',
          sending: 'Sending...'
        },
        review: {
          title: 'Review Your Information',
          subtitle: 'Please review your details before submitting'
        },
        success: {
          title: 'Message Sent!',
          message: 'Thank you for your message! We will get back to you soon.'
        }
      },
      office: {
        title: 'Office Hours',
        emergency: 'Emergency Support',
        emergencyText: 'For urgent matters outside office hours, please call our emergency line'
      },
      serviceArea: {
        title: 'Our Service Area',
        subtitle: 'We serve clients across the West Midlands and surrounding areas',
        areas: {
          birmingham: 'Birmingham - City Centre & Surrounding Areas',
          coventry: 'Coventry - Full Coverage',
          wolverhampton: 'Wolverhampton - Complete Service Area'
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: {
          timeline: {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary depending on scope and complexity. Most residential projects take 3-6 months, while commercial projects can range from 6-18 months. We provide detailed time schedules for all our projects.'
          },
          consultation: {
            question: 'Do you offer free consultations?',
            answer: 'Yes, we offer a free initial consultation to discuss your project requirements and provide a preliminary assessment. This helps us understand your needs and provide you with the best possible service.'
          },
          areas: {
            question: 'What areas do you serve?',
            answer: 'We primarily serve the West Midlands region including Birmingham, Coventry, Wolverhampton and surrounding areas. We also take on projects throughout the UK for select clients.'
          },
          contractors: {
            question: 'What services do you offer for contractors?',
            answer: 'We offer a full range of quantity surveying activities, tender preparation, bill of quantities preparation, time schedules, BIM modeling, financial reports, and contract handling with legal compliance.'
          }
        }
      }
    },
    stats: {
      projects: 'Projects Completed',
      experience: 'Years Experience',
      satisfaction: 'Client Satisfaction',
      team: 'Expert Team Members'
    },
    cta: {
      title: 'Ready to Start Your Project?',
      subtitle: 'Let\'s transform your vision into reality together. Our expert team is ready to help you create something extraordinary.',
      button: 'Get in Touch'
    },
    footer: {
      description: 'Bringing Vision to Reality through innovative construction consultancy and design services across the West Midlands.',
      company: 'Company',
      services: 'Services',
      contact: 'Contact',
      legal: 'Legal',
      social: 'Follow Us',
      rights: 'All rights reserved.',
      links: {
        about: 'About Us',
        services: 'Our Services',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
        sitemap: 'Sitemap'
      }
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Try again',
      close: 'Close',
      open: 'Open',
      more: 'More',
      less: 'Less',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      darkMode: 'Switch to dark mode',
      lightMode: 'Switch to light mode',
      changeLanguage: 'Change language',
      theme: 'Theme',
      language: 'Language'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      contact: 'اتصل بنا',
      menu: 'القائمة',
      close: 'إغلاق'
    },
    hero: {
      title1: 'نحول الرؤية',
      title2: 'إلى واقع',
      subtitle: 'اكتشف شركة بايونير للاستشارات - حيث يحول التصميم رؤيتك إلى واقع. مع خبرة واسعة في صناعة البناء، نتخصص في إنشاء هياكل مبتكرة ومستدامة مصممة خصيصًا لتلبية احتياجاتك.',
      cta1: 'استكشف خدماتنا',
      cta2: 'ابدأ مشروعك',
      scrollDown: 'مرر لأسفل للاستكشاف'
    },
    about: {
      title: 'من نحن',
      subtitle: 'تجمع شركة بايونير للاستشارات بين الرؤية الإبداعية والجدوى',
      description1: 'تجمع شركة بايونير للاستشارات بين الرؤية الإبداعية والجدوى. نقدم دعمًا تقنيًا شاملاً في جميع مراحل مشروعك، من المفهوم الأولي حتى الإغلاق.',
      description2: 'يجمع فريقنا بين الخبرة المهنية في التصميم والالتزام بتقديم حلول عملية وملهمة لكل عميل.',
      cta: 'تعرف أكثر عنا',
      vision: {
        title: 'رؤيتنا',
        description: 'أن نكون شركة الاستشارات الهندسية الأكثر ثقة وابتكارًا في ويست ميدلاندز وخارجها، مع وضع معايير جديدة في التميز التصميمي وتسليم المشاريع.'
      },
      mission: {
        title: 'مهمتنا',
        description: 'يجمع فريقنا بين الخبرة المهنية في التصميم والالتزام بتقديم حلول عملية وملهمة لكل عميل. نتخصص في إنشاء هياكل مبتكرة ومستدامة مصممة خصيصًا لتلبية احتياجاتك.'
      },
      values: {
        title: 'قيمنا الأساسية',
        excellence: {
          title: 'التميز',
          description: 'ملتزمون بتقديم أعلى جودة في كل مشروع'
        },
        integrity: {
          title: 'النزاهة',
          description: 'بناء الثقة من خلال الشفافية والممارسات الأخلاقية'
        },
        innovation: {
          title: 'الابتكار',
          description: 'احتضان التقنيات الجديدة لإنشاء حلول أفضل'
        },
        sustainability: {
          title: 'الاستدامة',
          description: 'التصميم من أجل مستقبل أكثر اخضرارًا واستدامة'
        }
      },
      journey: {
        title: 'رحلتنا',
        subtitle: 'أكثر من 25 عامًا من التميز في الاستشارات الإنشائية',
        milestone1: {
          title: 'تأسيس الشركة',
          description: 'تأسست شركة بايونير للاستشارات برؤية لجلب الابتكار إلى استشارات البناء في ويست ميدلاندز.'
        },
        milestone2: {
          title: 'أول مشروع كبير',
          description: 'أكملنا بنجاح أول مشروع تجاري كبير لنا، مما رسخ سمعتنا في الجودة والموثوقية.'
        },
        milestone3: {
          title: 'دمج تقنية BIM',
          description: 'أصبحنا من أوائل المتبنين لتقنية نمذجة معلومات البناء، مما أحدث ثورة في عمليات التصميم وإدارة المشاريع لدينا.'
        },
        milestone4: {
          title: 'توسيع الفريق',
          description: 'وسعنا فريق المتخصصين لدينا لتغطية جميع جوانب الاستشارات الإنشائية وخدمات التصميم.'
        },
        milestone5: {
          title: 'الابتكار الرقمي',
          description: 'أطلقنا خدمات التصور الرقمي، مما يوفر للعملاء تجارب ثلاثية الأبعاد غامرة لمشاريعهم.'
        },
        milestone6: {
          title: 'قيادة التميز',
          description: 'اليوم، نواصل قيادة الصناعة بحلول مبتكرة وتقديم خدمات استثنائية.'
        }
      },
      team: {
        title: 'فريق الخبراء لدينا',
        subtitle: 'فريق متخصص من المهنيين ملتزم بالتميز في كل مشروع عبر ويست ميدلاندز',
        memberTitle: 'عضو الفريق',
        memberRole: 'محترف خبير'
      }
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'إدارة شاملة للمشاريع ومراقبة التكاليف ودعم التصميم بخبرة واسعة مصممة خصيصًا للمقاولين والاستشاريين والعملاء.',
      learnMore: 'اعرف المزيد',
      getQuote: 'احصل على عرض',
      bim: {
        title: 'نمذجة معلومات البناء',
        description: 'إنشاء وإدارة بيانات المبنى طوال دورة حياته بالكامل من خلال السماح للمهندسين المعماريين والمهندسين والمقاولين بالعمل من نموذج ثلاثي الأبعاد مشترك.',
        features: {
          title: 'الميزات الرئيسية',
          list: ['إنشاء نماذج ثلاثية الأبعاد', 'كشف التداخلات', 'استخراج الكميات', 'تسلسل البناء الرباعي الأبعاد', 'تكامل إدارة المرافق']
        }
      },
      structural: {
        title: 'الحسابات الإنشائية',
        description: 'حسابات إنشائية دقيقة ومتوافقة للمباني الجديدة والإضافات والتجديدات.',
        features: {
          title: 'ما نقدمه',
          list: ['تحليل الأحمال', 'التصميم الإنشائي', 'تصميم الأساسات', 'التحليل الزلزالي', 'التحقق من الامتثال']
        }
      },
      drawings: {
        title: 'الرسومات المعمارية',
        description: 'مخططات معمارية مفصلة لجميع مراحل البناء.',
        features: {
          title: 'أنواع الرسومات',
          list: ['مخططات الطوابق', 'الواجهات', 'المقاطع', 'تفاصيل البناء', 'الرسومات كما هو مبني']
        }
      },
      interior: {
        title: 'التصميم الداخلي',
        description: 'تصميمات داخلية مدروسة توازن بين الأناقة والعملية اليومية.',
        features: {
          title: 'خدمات التصميم',
          list: ['تخطيط المساحات', 'اختيار المواد', 'تصميم الإضاءة', 'تخطيط الأثاث', 'استشارة الألوان']
        }
      },
      visualization: {
        title: 'التصور ثلاثي الأبعاد للمباني',
        description: 'عروض ثلاثية الأبعاد عالية الجودة وغامرة تجعل التصاميم تنبض بالحياة وتدعم اتخاذ القرارات الواثقة.',
        features: {
          title: 'خيارات التصور',
          list: ['عروض واقعية', 'جولات افتراضية', 'خدمات الرسوم المتحركة', 'تكامل الواقع الافتراضي والمعزز', 'مواد التسويق']
        }
      },
      web: {
        title: 'تصميم المواقع للبناء',
        description: 'مواقع ويب مخصصة لشركات البناء - حديثة وسهلة الاستخدام ومحسنة لمحركات البحث.',
        features: {
          title: 'ميزات الويب',
          list: ['التصميم المتجاوب', 'تحسين محركات البحث', 'عرض المحفظة', 'توليد العملاء المحتملين', 'إدارة المحتوى']
        }
      },
      clientTypes: {
        title: 'الخدمات حسب نوع العميل',
        subtitle: 'حلول مخصصة لكل أصحاب المصلحة في عملية البناء',
        clients: {
          title: 'للعملاء',
          services: ['وكيل صاحب العمل', 'إعداد وإدارة العطاءات', 'شراء وإدارة المقاولين', 'إدارة العقود', 'تقارير المشروع المنتظمة']
        },
        contractors: {
          title: 'للمقاولين',
          services: ['مجموعة كاملة من أنشطة مسح الكميات', 'إعداد العطاءات', 'إعداد جداول الكميات', 'إعداد الجداول الزمنية', 'نمذجة معلومات البناء', 'إعداد التقارير المالية', 'التعامل مع العقود والامتثال القانوني']
        },
        consultancies: {
          title: 'للاستشارات',
          services: ['تطوير المقترحات', 'الرسومات المعمارية', 'التصميم الإنشائي مع الحسابات', 'التفصيل الإنشائي', 'التصميم الداخلي']
        }
      },
      sectors: {
        title: 'القطاعات التي نعمل بها',
        subtitle: 'تقديم التميز عبر قطاعات البناء المتعددة',
        infrastructure: {
          title: 'البنية التحتية',
          description: 'الطرق والجسور والمرافق ومشاريع الأشغال العامة'
        },
        construction: {
          title: 'البناء',
          description: 'المباني التجارية والسكنية والصناعية'
        }
      },
      cta: {
        title: 'هل أنت مستعد لبدء مشروعك؟',
        subtitle: 'دع فريق الخبراء لدينا يساعدك في تحقيق رؤيتك من خلال مجموعتنا الشاملة من الخدمات عبر ويست ميدلاندز والمناطق المحيطة.',
        button: 'احصل على استشارتك المجانية'
      }
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'هل أنت مستعد لتحويل رؤيتك إلى واقع؟ فريق الخبراء لدينا في شركة بايونير للاستشارات هنا للمساعدة.',
      hero: {
        title: 'لنبدأ مشروعك التالي معًا',
        subtitle: 'هل أنت مستعد لتحويل رؤيتك إلى واقع؟ فريق الخبراء لدينا في شركة بايونير للاستشارات هنا للمساعدة عبر ويست ميدلاندز والمناطق المحيطة.'
      },
      info: {
        email: {
          title: 'راسلنا',
          value: 'info@pioneerconsultants.com'
        },
        phone: {
          title: 'اتصل بنا',
          value: '+44 (0) 123 456 7890'
        },
        location: {
          title: 'منطقة الخدمة',
          value: 'نخدم العملاء عبر ويست ميدلاندز والمناطق المحيطة'
        }
      },
      form: {
        title: 'أرسل لنا رسالة',
        subtitle: 'املأ النموذج أدناه وسنتواصل معك خلال 24 ساعة',
        steps: {
          contact: 'معلومات الاتصال',
          project: 'تفاصيل المشروع',
          review: 'المراجعة والإرسال',
          contactSubtitle: 'أخبرنا عن نفسك',
          projectSubtitle: 'صف مشروعك',
          reviewSubtitle: 'تأكد من معلوماتك'
        },
        fields: {
          name: {
            label: 'الاسم الكامل',
            placeholder: 'أدخل اسمك الكامل',
            required: 'الاسم مطلوب'
          },
          email: {
            label: 'عنوان البريد الإلكتروني',
            placeholder: 'أدخل عنوان بريدك الإلكتروني',
            required: 'البريد الإلكتروني مطلوب'
          },
          phone: {
            label: 'رقم الهاتف',
            placeholder: 'أدخل رقم هاتفك'
          },
          subject: {
            label: 'نوع المشروع',
            placeholder: 'اختر نوع المشروع أو أدخل نوعًا مخصصًا',
            options: ['نمذجة معلومات البناء', 'التصميم الإنشائي', 'التصميم الداخلي', 'التصور ثلاثي الأبعاد', 'تصميم المواقع للبناء', 'أخرى']
          },
          message: {
            label: 'وصف المشروع',
            placeholder: 'أخبرنا عن متطلبات مشروعك والجدول الزمني وأي احتياجات محددة...',
            required: 'وصف المشروع مطلوب'
          }
        },
        buttons: {
          previous: 'السابق',
          next: 'التالي',
          submit: 'إرسال الرسالة',
          sending: 'جاري الإرسال...'
        },
        review: {
          title: 'راجع معلوماتك',
          subtitle: 'يرجى مراجعة تفاصيلك قبل الإرسال'
        },
        success: {
          title: 'تم إرسال الرسالة!',
          message: 'شكرًا لك على رسالتك! سنتواصل معك قريبًا.'
        }
      },
      office: {
        title: 'ساعات العمل',
        emergency: 'الدعم الطارئ',
        emergencyText: 'للمسائل الطارئة خارج ساعات العمل، يرجى الاتصال بخط الطوارئ لدينا'
      },
      serviceArea: {
        title: 'منطقة خدمتنا',
        subtitle: 'نخدم العملاء عبر ويست ميدلاندز والمناطق المحيطة',
        areas: {
          birmingham: 'برمنغهام - وسط المدينة والمناطق المحيطة',
          coventry: 'كوفنتري - تغطية كاملة',
          wolverhampton: 'وولفرهامبتون - منطقة خدمة كاملة'
        }
      },
      faq: {
        title: 'الأسئلة الشائعة',
        questions: {
          timeline: {
            question: 'كم يستغرق المشروع النموذجي؟',
            answer: 'تختلف الجداول الزمنية للمشاريع حسب النطاق والتعقيد. تستغرق معظم المشاريع السكنية 3-6 أشهر، بينما يمكن أن تتراوح المشاريع التجارية من 6-18 شهرًا. نقدم جداول زمنية مفصلة لجميع مشاريعنا.'
          },
          consultation: {
            question: 'هل تقدمون استشارات مجانية؟',
            answer: 'نعم، نقدم استشارة أولية مجانية لمناقشة متطلبات مشروعك وتقديم تقييم أولي. هذا يساعدنا على فهم احتياجاتك وتقديم أفضل خدمة ممكنة لك.'
          },
          areas: {
            question: 'ما هي المناطق التي تخدمونها؟',
            answer: 'نخدم بشكل أساسي منطقة ويست ميدلاندز بما في ذلك برمنغهام وكوفنتري ووولفرهامبتون والمناطق المحيطة. كما نتولى مشاريع في جميع أنحاء المملكة المتحدة لعملاء مختارين.'
          },
          contractors: {
            question: 'ما هي الخدمات التي تقدمونها للمقاولين؟',
            answer: 'نقدم مجموعة كاملة من أنشطة مسح الكميات وإعداد العطاءات وإعداد جداول الكميات والجداول الزمنية ونمذجة معلومات البناء والتقارير المالية والتعامل مع العقود مع الامتثال القانوني.'
          }
        }
      }
    },
    stats: {
      projects: 'مشاريع مكتملة',
      experience: 'سنوات الخبرة',
      satisfaction: 'رضا العملاء',
      team: 'أعضاء الفريق الخبراء'
    },
    cta: {
      title: 'هل أنت مستعد لبدء مشروعك؟',
      subtitle: 'دعنا نحول رؤيتك إلى واقع معًا. فريقنا من الخبراء جاهز لمساعدتك في إنشاء شيء استثنائي.',
      button: 'تواصل معنا'
    },
    footer: {
      description: 'نحول الرؤية إلى واقع من خلال الاستشارات المبتكرة في البناء وخدمات التصميم عبر ويست ميدلاندز.',
      company: 'الشركة',
      services: 'الخدمات',
      contact: 'اتصل بنا',
      legal: 'قانوني',
      social: 'تابعنا',
      rights: 'جميع الحقوق محفوظة.',
      links: {
        about: 'من نحن',
        services: 'خدماتنا',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام',
        sitemap: 'خريطة الموقع'
      }
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      retry: 'حاول مرة أخرى',
      close: 'إغلاق',
      open: 'فتح',
      more: 'المزيد',
      less: 'أقل',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      confirm: 'تأكيد',
      yes: 'نعم',
      no: 'لا',
      darkMode: 'التبديل إلى الوضع المظلم',
      lightMode: 'التبديل إلى الوضع المضيء',
      changeLanguage: 'تغيير اللغة',
      theme: 'المظهر',
      language: 'اللغة'
    }
  }
};

// Create a derived store for translations
export const t = derived(locale, ($locale) => {
  return (key) => {
    const keys = key.split('.');
    let value = translations[$locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
});