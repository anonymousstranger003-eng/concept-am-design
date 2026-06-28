import plan1 from "@/assets/plan-exterior-1.jpg.asset.json";
import plan2 from "@/assets/plan-exterior-2.jpg.asset.json";
import plan3 from "@/assets/plan-exterior-3.jpg.asset.json";
import plan5 from "@/assets/plan-exterior-5.jpg.asset.json";
import plan6 from "@/assets/plan-exterior-6.jpg.asset.json";
import interiorLuxe from "@/assets/interior-living-luxe.png.asset.json";
import bedroom from "@/assets/interior-bedroom.jpg.asset.json";
import kitchen from "@/assets/interior-kitchen.jpg.asset.json";
import dining from "@/assets/interior-dining.jpg.asset.json";
import study from "@/assets/interior-study.jpg.asset.json";
import bath from "@/assets/interior-bath.jpg.asset.json";
import foyer from "@/assets/interior-foyer.jpg.asset.json";

export const services = [
  { title: "Architectural Planning", desc: "Concept development, spatial planning , and detailed architectural floor plans tailored to each project", img: plan1.url },
  { title: "Residential Architecture", desc: "Custom homes, villas and living spaces desgigned around comfort, lifestyle, and timeless design.", img: plan2.url },
  { title: "Commercial Architecture", desc: "Office spaces, retail environments, and hospitality projects crafted for functionality and exeperience.", img: plan6.url },
  { title: "Building Permit & Approvals", desc: "Building permit drawings, municipality submissions, approvals procedures, and statutory documentation.", img: plan3.url },
  { title: "Completion Certificate Services", desc: "Assistance with completion drawings, documentation, and certification process", img: plan5.url },
  { title: "Interior Design", desc: "Curated interior spaces balancing aesthetics, practicality, and material harmony.", img: interiorLuxe.url },
  { title: "Renovation & Space Planning", desc: "Reimagining existing spaces with smarter flow and storage.", img: foyer.url },
  { title: "Architectural Drawings", desc: "Precise CAD documentation, MEP and working drawings.", img: study.url },
  { title: "Sustainable Design", desc: "Climate-responsive and eco-conscious architecture focused on long-term value.", img: bedroom.url },
  { title: "Landscape Desgining", desc: "Gardens, courtyards, terraces, and outdoor environments integrated with architecture.", img: dining.url },
  { title: "3D Visualization & VR Experience", desc: "Immersive 3D visualizations and 360-degree virtual reality experiences that help clients explore and experience spaces before execution.", img: kitchen.url },
  { title: "Architectural Consultancy", desc: "End -to-end architecture guidance, execution support, and project coordination with attention to detail.", img: bath.url },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Completed Projects" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
  { value: 100, suffix: "+", label: "Residential Projects" },
  { value: 50, suffix: "+", label: "Commercial Projects" },
];

export const faqs = [
  { q: "What services does AM Concepts provide?", a: "We provide complete architectural, interior design, space planning, renovation, turnkey execution, and project management services for residential and commercial projects." },
  { q: "Do you handle both architecture and interiors?", a: "Yes. We offer integrated architectural and interior design solutions, ensuring a seamless design language from exterior to interior spaces." },
  { q: "Where is AM Concepts located?", a: "Our studio is based in Calicut and Kasaragod, Kerala, and we undertake projects across Kerala and selected locations outside the state." },
  { q: "How many years of experience do you have?", a: "Our team has over 15 years of professional experience in architecture and interior design, with expertise in residential, commercial, hospitality, and customized projects." },
  { q: "What is the process of working with your team?", a: "Our process generally includes: Initial consultation · Site visit and requirement discussion · Concept design · Material selection · Detailed drawings · Estimation and budgeting · Execution and supervision · Final handover." },
  { q: "Do you provide 3D designs and visualizations?", a: "Yes. We provide realistic 360° visualisations, Virtual Reality walkthroughs and design presentations to help clients understand the final outcome before execution begins." },
  { q: "Can you work within my budget?", a: "Absolutely. We carefully plan designs and material selections according to the client's budget without compromising functionality and aesthetics." },
  { q: "Do you undertake turnkey interior projects?", a: "Yes. We provide complete turnkey interior solutions including design, carpentry, false ceiling, electrical, lighting, furnishing, décor, and site coordination." },
  { q: "How long does a typical project take?", a: "Project timelines vary depending on project size and scope. Residential interiors usually take 45–90 days, while larger commercial projects may require additional time." },
  { q: "Will I receive detailed drawings and specifications?", a: "Yes. We provide detailed working drawings, material specifications, and execution details for smooth project implementation." },
];

export const portfolio = [
  { title: "Hillside Villa", category: "Residential", img: "exterior-villa" },
  { title: "Linear Living", category: "Interior", img: "living-room" },
  { title: "Brick Loft", category: "Residential", img: "loft-interior" },
  { title: "Walnut Dining", category: "Interior", img: "dining-table" },
  { title: "Marble Kitchen", category: "Interior", img: "kitchen" },
  { title: "Corporate Workspace", category: "Commercial", img: "office" },
  { title: "Pavilion House", category: "Residential", img: "hero-architecture" },
  { title: "Sandstone Tower", category: "Commercial", img: "portfolio-commercial" },
  { title: "Arched Suite", category: "Interior", img: "portfolio-bedroom" },
];
