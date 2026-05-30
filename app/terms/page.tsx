import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Dingbro Ltd',
  description: 'Dingbro Ltd terms and conditions covering ordering, delivery, returns, privacy and conditions of use.',
}

type Section = { id: string; heading: string; body: string[] }

const sections: Section[] = [
  {
    id: 'ordering',
    heading: 'Ordering',
    body: [
      'Whilst all efforts are made to ensure accuracy of description, specifications and pricing there may be occasions where errors arise. Should such a situation occur Dingbro cannot accept your order. In the event of a mistake you will be contacted with a full explanation and a corrected offer. The information displayed is considered as an invitation to treat not as a confirmed offer for sale. The contract is confirmed upon supply of goods.',
    ],
  },
  {
    id: 'delivery-returns',
    heading: 'Delivery and Returns',
    body: [
      'Dingbro returns policy has been set up to keep costs down and to make the process as easy for you as possible. You must contact us and be in receipt of a returns authorisation (RA) number before sending any item back. Any product without a RA number will not be refunded.',
    ],
  },
  {
    id: 'exchange',
    heading: 'Exchange',
    body: [
      'If when you receive your product(s), you are not completely satisfied you may return the items to us, within seven days of exchange or refund. Returns will take approximately 5 working days for the process once the goods have arrived. Items must be in original packaging, in all original boxes, packaging materials, and manuals, blank warranty cards and all accessories and documents provided by the manufacturer.',
      'If our labels are removed from the product the warranty becomes void.',
      'We strongly recommend that you fully insure your package that you are returning. We suggest the use of a carrier that can provide you with a proof of delivery. Dingbro will not be held responsible for items lost or damaged in transit.',
      'All shipping back to Dingbro is paid for by the customer. We are unable to refund you postal fees.',
      'Any product returned found not to be defective can be refunded within the time stated above and will be subject to a 15% restocking fee to cover our administration costs. Goods found to be tampered with by the customer will not be replaced but returned at the customer’s expense.',
      'If you are returning items for exchange please be aware that a second charge may apply.',
    ],
  },
  {
    id: 'non-returnable',
    heading: 'Non-Returnable',
    body: [
      'For reasons of hygiene and public health, refunds and exchanges are not available for used items (this does not apply to faulty goods — faulty products will be exchanged like for like).',
      'Discounted or end-of-line products can only be returned for repair; no refunds or replacements will be made.',
    ],
  },
  {
    id: 'incorrect-damaged',
    heading: 'Incorrect or Damaged Goods',
    body: [
      'We try very hard to ensure that you receive your order in pristine condition. If you do not receive the products you ordered, please contact us. In the unlikely event that the product arrives damaged or faulty, please contact Dingbro immediately — this will be given special priority and you can expect to receive the correct item within 72 hours. Where incorrect items are received, all delivery charges will be refunded back to your credit/debit card.',
    ],
  },
  {
    id: 'delivery-service',
    heading: 'Delivery Service',
    body: [
      'We try to make the delivery process as simple as possible and are able to send your order either to your home or to your place of work.',
      'Delivery times are calculated in working days Monday to Friday. If you order after 4pm the next working day will be considered the first working day for delivery. In case of bank holidays and over the Christmas period, please allow an extra two working days.',
      'We aim to deliver within 3 working days but sometimes due to high order volume in certain sales periods please allow 4 days before contacting us. We will attempt to email you if we become aware of an unexpected delay.',
      'All small orders are sent out via Royal Mail 1st packets post service. If your order is over £15.00 it will be sent out via Royal Mail’s recorded packet service, which will require a signature. If you are not present, a card will be left to advise you to pick up your goods from the local sorting office.',
      'Each item will be attempted to be delivered twice. Failed deliveries after this can be re-delivered at an extra cost to you, or you can collect the package from your local post office collection point.',
    ],
  },
  {
    id: 'export-restrictions',
    heading: 'Export Restrictions',
    body: [
      'At present Dingbro only sends goods within the UK. We plan to add exports to our services in the future. If however you have a special request please contact us with your requirements.',
    ],
  },
  {
    id: 'privacy',
    heading: 'Privacy Notice',
    body: [
      'This policy covers all users who register to use the website. It is not necessary to purchase anything in order to gain access to the searching facilities of the site.',
    ],
  },
  {
    id: 'security',
    heading: 'Security',
    body: [
      'We have taken the appropriate measures to ensure that your personal information is not unlawfully processed. Dingbro uses industry standard practices to safeguard the confidentiality of your personal identifiable information, including firewalls and secure socket layers.',
      'During the payment process, we ask for personal information that both identifies you and enables us to communicate with you.',
      'We will use the information you provide only for the following purposes: to send you newsletters and details of offers and promotions in which we believe you will be interested; to improve the content, design and layout of the website; to understand the interest and buying behaviour of our registered users; and to perform other such general marketing and promotional activity focused on our products and activities.',
    ],
  },
  {
    id: 'conditions-of-use',
    heading: 'Conditions of Use',
    body: [
      'Dingbro and its affiliates provide their services to you subject to the following conditions. If you visit our shop at Dingbro you accept these conditions. Please read them carefully. Dingbro controls and operates this site from its offices within the UK. The laws of England and Wales govern claims relating to, including the use of, this site and materials contained.',
      'If you choose to access this site from another country you do so on your own initiative and are responsible for compliance with applicable local laws.',
    ],
  },
  {
    id: 'copyrights',
    heading: 'Copyrights',
    body: [
      'All content included on the site such as text, graphics, logos, button icons, images, audio clips, digital downloads and software are all owned by Dingbro and are protected by international copyright laws.',
    ],
  },
  {
    id: 'license',
    heading: 'License and Site Access',
    body: [
      'Dingbro grants you a limited license to access and make personal use of this site. This license does not include any resale or commercial use of this site or its contents, any collection and use of any product listings, descriptions or prices, any derivative use of this site or its contents, any downloading or copying of account information for the benefit of another merchant, or any use of data mining, robots or similar data gathering and extraction tools.',
      'This site may not be reproduced, duplicated, copied, sold, resold or otherwise exploited for any commercial purpose without the written consent of Dingbro.',
    ],
  },
  {
    id: 'product-descriptions',
    heading: 'Product Descriptions',
    body: [
      'Dingbro and its affiliates attempt to be as accurate as possible, however we do not warrant that product descriptions or other content is accurate, complete, reliable, or error free.',
      'From time to time there may be information on Dingbro that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing and availability.',
      'We reserve the right to correct any errors, inaccuracies or omissions and to change or update information at any time without prior notice (including after you have submitted your order). We apologise for any inconvenience this may cause.',
    ],
  },
  {
    id: 'prices',
    heading: 'Prices',
    body: [
      'Prices and availability of items are subject to change without notice.',
      'Please review our other policies posted on this site. These policies also govern your visit to Dingbro.',
    ],
  },
  {
    id: 'risk-and-title',
    heading: 'Risk and Title',
    body: [
      'Risk in the Goods shall pass to the Buyer upon delivery.',
      'Title of the Goods shall not pass to the Buyer until the Buyer has paid the Seller for the Goods in full and has also paid all other monies due to the Seller on any account.',
      'The Seller shall be entitled to recover the Prices plus Value Added Tax notwithstanding that title to the Goods has not passed to the Buyer.',
      'The Buyer shall hold all Goods which remain the Seller’s property as bailee for the Seller and shall store them separately from similar goods of the Buyer and shall keep them identifiable as the Seller’s property.',
      'The Buyer grants to the Seller and its agents and employees an irrevocable licence at any time to enter any premises controlled by the Buyer where the Goods are stored in order to inspect them and, where the Buyer’s right to possession has terminated, to recover them.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-44 md:pb-20" style={{ backgroundImage: 'linear-gradient(rgba(15,17,23,0.72), rgba(15,17,23,0.72)), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Legal</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-[1.05] md:leading-none max-w-3xl" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}>
            Our Terms<br />&amp; Conditions
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Sticky TOC */}
          <aside className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>
              Contents
            </p>
            <ul className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm transition-colors duration-150" style={{ color: '#4B5563', fontFamily: 'var(--font-inter)' }}>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="space-y-14">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-semibold mb-5" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#0F1117' }}>
                  {s.heading}
                </h2>
                <div className="space-y-4 text-base" style={{ color: '#4B5563', lineHeight: 1.8, fontFamily: 'var(--font-inter)' }}>
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
