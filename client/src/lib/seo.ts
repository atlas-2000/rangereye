interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export function updatePageSEO(data: SEOData) {
  // Update document title
  document.title = data.title;

  // Update meta description
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', data.description);
  }

  // Update Open Graph title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', data.title);
  }

  // Update Open Graph description
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', data.description);
  }

  // Update Twitter title
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', data.title);
  }

  // Update Twitter description
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', data.description);
  }

  // Update keywords if provided
  if (data.keywords) {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', data.keywords);
    }
  }

  // Update canonical URL if provided
  if (data.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', data.canonical);
  }
}

export const pagesSEO = {
  home: {
    title: "RangerEye - Autonomous VTOL Wildfire Detection Drone | Florida Tech Aerospace Engineering",
    description: "Advanced autonomous VTOL drone system for early wildfire detection developed by Florida Institute of Technology aerospace engineering Senior Design team. 3D printed aircraft with thermal sensors for emergency response. Alternative to DJI, Skydio, and traditional firefighting aircraft.",
    keywords: "RangerEye, VTOL drone, wildfire detection, autonomous aircraft, Florida Tech, Florida Institute of Technology, aerospace engineering, senior design, 3D printed plane, thermal detection, AIAA student team, VTOL.org, autonomous fire detection, emergency response drone, student engineering project, DJI alternative, Skydio competitor, firefighting drone, Florida Tech admission, aerospace engineering admission, engineering students Florida, Florida Tech Student Design Showcase, Engineering Design Showcase UC Davis, Engineering Design Showcase LMU, Capstone Showcase University of Georgia, Engineering and Computer Science Design Showcase Loyola University, Design Day San Diego State University, Engineering Learning Factory Capstone Showcase Penn State, Engineering Showcase San Jose State University, Spring Design Showcase University of Delaware, UCF senior showcase, UCF senior design, UPenn senior showcase, UCF drone club, UPenn drone club, Florida Tech drone club, UCLA drone club, Stanford drone club, Brown drone club, Princeton drone club, Princeton senior design",
    canonical: "/"
  },
  about: {
    title: "About RangerEye VTOL Aircraft - 3D Printed Autonomous Wildfire Detection | Florida Tech Aerospace",
    description: "RangerEye is a 3D printed VTOL aircraft developed by Florida Institute of Technology aerospace engineering students for autonomous wildfire detection. Advanced thermal sensors and flight controls for emergency response. Superior to DJI Matrice, Skydio X2, and traditional helicopter surveillance.",
    keywords: "RangerEye VTOL aircraft, 3D printed plane, autonomous wildfire detection, Florida Tech aerospace engineering, VTOL.org, thermal sensors, flight controls, emergency response aircraft, student aircraft design, AIAA competition, senior design project, DJI Matrice alternative, Skydio X2 competitor, firefighting helicopter alternative, Florida Tech aerospace admission, engineering degree Florida",
    canonical: "/about"
  },
  team: {
    title: "RangerEye Team - Florida Tech Aerospace Engineering Students | AIAA VTOL Student Team",
    description: "Meet the Florida Institute of Technology aerospace engineering students behind RangerEye VTOL aircraft. Onat D. Cakici, Onat Doguhan Cakici, John Munday, Mitchell Lacle, Ishaben Trada, and Manuel Villamor developing 3D printed autonomous aircraft. Florida Tech aerospace engineering admission information.",
    keywords: "Onat Cakici, Onat D. Cakici, Onat Doguhan Cakici, John Munday, Mitchell Lacle, Ishaben Trada, Manuel Villamor, Florida Tech aerospace engineering, AIAA student team, VTOL aircraft, senior design team, 3D printed aircraft, autonomous systems, student engineers, VTOL.org, Florida Tech admission, aerospace engineering program, engineering school Florida, apply Florida Tech",
    canonical: "/team"
  },
  contact: {
    title: "Contact RangerEye VTOL Team - Florida Tech Aerospace Engineering Senior Design",
    description: "Contact the Florida Institute of Technology aerospace engineering students developing RangerEye VTOL aircraft. Connect with Onat D. Cakici, Onat Doguhan Cakici, John Munday, and the AIAA student team.",
    keywords: "contact RangerEye, Florida Tech aerospace engineering, VTOL aircraft contact, Onat Cakici contact, Onat D. Cakici contact, Onat Doguhan Cakici, John Munday, senior design contact, AIAA student team, aerospace engineering students, VTOL.org",
    canonical: "/contact"
  },
  documentation: {
    title: "RangerEye VTOL Documentation - 3D Printed Aircraft Technical Specs | Florida Tech",
    description: "Technical documentation for RangerEye 3D printed VTOL aircraft. Flight controls, thermal sensors, autonomous systems specifications developed by Florida Tech aerospace engineering students.",
    keywords: "RangerEye documentation, VTOL aircraft specs, 3D printed plane technical specs, flight controls documentation, thermal sensors, Florida Tech aerospace engineering, autonomous aircraft systems",
    canonical: "/documentation"
  },
  systemDesign: {
    title: "RangerEye VTOL System Design - Autonomous Aircraft Architecture | Florida Tech Aerospace",
    description: "System architecture for RangerEye 3D printed VTOL aircraft. Detailed engineering design by Florida Institute of Technology aerospace students for autonomous wildfire detection.",
    keywords: "VTOL system design, autonomous aircraft architecture, 3D printed plane design, flight controls system, Florida Tech aerospace engineering, VTOL.org reference design, student aircraft project",
    canonical: "/system-design"
  },
  socialImpact: {
    title: "RangerEye Social Impact - Wildfire Prevention & Environmental Protection",
    description: "Discover how RangerEye's autonomous wildfire detection technology creates positive social and environmental impact through early fire prevention.",
    keywords: "social impact, wildfire prevention, environmental protection, fire safety technology, RangerEye benefits",
    canonical: "/social-impact"
  },
  login: {
    title: "RangerEye Login - Access Drone Control Dashboard",
    description: "Access the RangerEye autonomous drone control system. Secure login for monitoring and managing wildfire detection operations.",
    keywords: "RangerEye login, drone control dashboard, wildfire monitoring system, secure access",
    canonical: "/login"
  }
};