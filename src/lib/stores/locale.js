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

// Translations store
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact'
    },
    hero: {
      title1: 'Bringing Vision',
      title2: 'to Reality',
      subtitle: 'Discover Pioneer Consultants—where design transforms your vision into reality. With extensive experience in the construction industry, we specialise in creating innovative, sustainable structures tailored to your needs.',
      cta1: 'Explore Our Services',
      cta2: 'Start Your Project'
    },
    about: {
      title: 'Who We Are',
      description1: 'Pioneer Consultants combines creative vision with viability. We provide comprehensive technical support throughout every stage of your project, from initial concept through to closure.',
      description2: 'Our team combines professional design expertise with a commitment to delivering practical, inspiring solutions for every client.',
      cta: 'Learn More About Us'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive project management, cost control, and design support tailored to contractors, consultants, and clients.',
      bim: {
        title: 'BIM Modelling',
        description: 'Creating and managing the building\'s data throughout its entire lifecycle.'
      },
      structural: {
        title: 'Structural Design',
        description: 'Accurate and compliant structural calculations for all construction types.'
      },
      interior: {
        title: 'Interior Design',
        description: 'Thoughtfully crafted interiors that balance elegance with liveability.'
      },
      visualization: {
        title: '3D Visualization',
        description: 'High-quality, immersive 3D renderings that bring designs to life.'
      },
      learnMore: 'Learn more'
    },
    stats: {
      projects: 'Projects Completed',
      experience: 'Years Experience',
      satisfaction: 'Client Satisfaction',
      team: 'Expert Team'
    },
    cta: {
      title: 'Ready to Start Your Project?',
      subtitle: 'Let\'s transform your vision into reality together. Our expert team is ready to help you create something extraordinary.',
      button: 'Get in Touch'
    },
    footer: {
      description: 'Bringing Vision to Reality through innovative construction consultancy and design services.',
      company: 'Company',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      contact: 'اتصل بنا'
    },
    hero: {
      title1: 'نحول الرؤية',
      title2: 'إلى واقع',
      subtitle: 'اكتشف شركة بايونير للاستشارات - حيث يحول التصميم رؤيتك إلى واقع. مع خبرة واسعة في صناعة البناء، نتخصص في إنشاء هياكل مبتكرة ومستدامة مصممة خصيصًا لتلبية احتياجاتك.',
      cta1: 'استكشف خدماتنا',
      cta2: 'ابدأ مشروعك'
    },
    about: {
      title: 'من نحن',
      description1: 'تجمع شركة بايونير للاستشارات بين الرؤية الإبداعية والجدوى. نقدم دعمًا تقنيًا شاملاً في جميع مراحل مشروعك، من المفهوم الأولي حتى الإغلاق.',
      description2: 'يجمع فريقنا بين الخبرة المهنية في التصميم والالتزام بتقديم حلول عملية وملهمة لكل عميل.',
      cta: 'تعرف أكثر عنا'
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'إدارة شاملة للمشاريع ومراقبة التكاليف ودعم التصميم مصمم خصيصًا للمقاولين والاستشاريين والعملاء.',
      bim: {
        title: 'نمذجة معلومات البناء',
        description: 'إنشاء وإدارة بيانات المبنى طوال دورة حياته بالكامل.'
      },
      structural: {
        title: 'التصميم الإنشائي',
        description: 'حسابات إنشائية دقيقة ومتوافقة لجميع أنواع البناء.'
      },
      interior: {
        title: 'التصميم الداخلي',
        description: 'تصميمات داخلية مدروسة توازن بين الأناقة والعملية.'
      },
      visualization: {
        title: 'التصور ثلاثي الأبعاد',
        description: 'عروض ثلاثية الأبعاد عالية الجودة وغامرة تجعل التصاميم تنبض بالحياة.'
      },
      learnMore: 'اعرف المزيد'
    },
    stats: {
      projects: 'مشاريع مكتملة',
      experience: 'سنوات الخبرة',
      satisfaction: 'رضا العملاء',
      team: 'فريق خبراء'
    },
    cta: {
      title: 'هل أنت مستعد لبدء مشروعك؟',
      subtitle: 'دعنا نحول رؤيتك إلى واقع معًا. فريقنا من الخبراء جاهز لمساعدتك في إنشاء شيء استثنائي.',
      button: 'تواصل معنا'
    },
    footer: {
      description: 'نحول الرؤية إلى واقع من خلال الاستشارات المبتكرة في البناء وخدمات التصميم.',
      company: 'الشركة',
      services: 'الخدمات',
      contact: 'اتصل بنا',
      rights: 'جميع الحقوق محفوظة.'
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