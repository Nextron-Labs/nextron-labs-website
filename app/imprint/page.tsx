export const metadata = {
  title: "Imprint | Nextron Labs",
  description: "Legal information and imprint for Nextron Labs",
}

export default function ImprintPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Imprint</h1>
      </header>

      <div className="space-y-8 text-[var(--color-text-secondary)]">
        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
            Information in accordance with section 5 DDG
          </h2>
          <div className="space-y-1">
            <p>Nextron Systems GmbH</p>
            <p>Hanauer Landstraße 172</p>
            <p>60314 Frankfurt am Main</p>
            <p>Germany</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">1. Represented by</h2>
          <div className="space-y-1">
            <p>Chief Executive Officer: Marc Hirtz</p>
            <p>Member of the Board: Wilhelm Roth</p>
            <p>Member of the Board: Dr. Helge Hofmeister</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">2. Contact</h2>
          <div className="space-y-1">
            <p>Phone: +49 69 – 63348040</p>
            <p>
              Email:{" "}
              <a href="mailto:info@nextron-systems.com" className="text-[var(--color-accent)] hover:underline">
                info@nextron-systems.com
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">3. Register entry</h2>
          <div className="space-y-1">
            <p>Entry in Handelsregister.</p>
            <p>Register Court: Amtsgericht Frankfurt am Main</p>
            <p>Register Number: HRB 141011</p>
          </div>
          <p className="mt-2">
            VAT identification number in accordance with section 27 a of the German VAT act: DE313144048
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">4. Disclaimer</h2>

          <div className="space-y-2">
            <h3 className="font-medium text-[var(--color-text-primary)]">4.1. Accountability for content</h3>
            <p className="text-sm leading-relaxed">
              The contents of our pages have been created with the utmost care. However, we cannot guarantee the
              contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore
              responsible for our own content on these web pages. In this context, please note that we are accordingly
              not obliged to monitor merely the transmitted or saved information of third parties, or investigate
              circumstances pointing to illegal activity. Our obligations to remove or block the use of information
              under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (DDG).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-[var(--color-text-primary)]">4.2. Accountability for links</h3>
            <p className="text-sm leading-relaxed">
              Responsibility for the content of external links (to web pages of third parties) lies solely with the
              operators of the linked pages. No violations were evident to us at the time of linking. Should any legal
              infringement become known to us, we will remove the respective link immediately.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-[var(--color-text-primary)]">4.3. Copyright</h3>
            <p className="text-sm leading-relaxed">
              Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law (§
              44a et seq. of the copyright law), every form of utilizing, reproducing or processing works subject to
              copyright protection on our web pages requires the prior consent of the respective owner of the rights.
              Individual reproductions of a work are allowed only for private use, so must not serve either directly or
              indirectly for earnings. Unauthorized utilization of copyrighted works is punishable (§ 106 of the
              copyright law).
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
