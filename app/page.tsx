import home from "./page.module.css";
import layout from "@/styles/layout.module.css"
import buttons from "@/styles/buttons.module.css"
import IconCard from "@/components/IconCard";

const cards  = [
    {
        icon:"/icons/015-passport-1.svg",
        title:"Comprehensive Travel & Visa Services",
        body:"From visa acquisition to relocation planning, " +
            "we provide personalized guidance for individuals and families navigating " +
            "international travel, study, or resettlement.",
    },
    {
        icon:"/icons/017-plane-ticket-1.svg",
        title:"One-on-One Support, Every Step",
        body:"We don’t believe in one-size-fits-all. " +
            "You’ll work directly with an expert who tailors every recommendation to your goals, " +
            "timeline, and preferences.",
    },
    {
        icon:"/icons/016-around-the-world-2.svg",
        title:"Discreet, Boutique-Level Service",
        body:"Ariventures offers a high-touch, concierge-style experience — combining expertise, " +
            "discretion, and a deep understanding of global mobility and lifestyle needs.",
    }

]

export default function Home() {
  return (

    <div>
      <div className={layout.section_bg_img} style={{
          backgroundImage: 'url("/images/hero-bg.png")',
      }}>
          <h1 className={home.title}>Your Journey, Our Expertise</h1>
          <p className={home.subtitle}>We provide expert travel advisory services specializing in travel planning, visa acquisition, international student support,
              and relocation assistance. We help individuals navigate the complexities of traveling, studying,
              and moving abroad with ease.
          </p>
          <button className={buttons.primary}>Learn More</button>
      </div>
      <div className={layout.section}>
          <div className={home.cards}>
              {cards.map((card, i) => (
                  <IconCard icon={card.icon} title={card.title} body={card.body} key={i}/>
              ))}
          </div>
      </div>
        <div className={layout.section}>
            <h1>Client Success Stories</h1>
            <h5>Hear from Travelers who trusted us with their dreams </h5>
        </div>
    </div>
  );
}
