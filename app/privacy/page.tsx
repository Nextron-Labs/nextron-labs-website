export const metadata = {
  title: "Privacy Policy | Nextron Labs",
  description: "Privacy policy for Nextron Labs",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Privacy Policy</h1>
      </header>

      <div className="space-y-8 text-[var(--color-text-secondary)] text-sm leading-relaxed">
        <p>
          We, Nextron Systems GmbH ("Nextron/we"), are pleased about your visit to our website and your interest in our
          products and services. In the following provisions, we inform you about the type, scope, and purpose of the
          collection and use of your personal data on our website. Personal data within the meaning of the GDPR is all
          information relating to an identified or identifiable natural person (hereinafter referred to as "data
          subject"). This may especially include your name, address, or e-mail address.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
            1. Provider and Data Protection Officer
          </h2>
          <p>Provider of the website and controller in the sense of data protection law is the:</p>
          <div className="space-y-1 pl-4">
            <p>Nextron Systems GmbH</p>
            <p>Hanauer Landstraße 172</p>
            <p>60314 Frankfurt am Main</p>
            <p>Germany</p>
          </div>
          <p className="mt-4">You can reach Nextron's data protection officer at:</p>
          <div className="space-y-1 pl-4">
            <p>krupna LEGAL / Dr. Karsten Krupna</p>
            <p>
              E-mail:{" "}
              <a
                href="mailto:data.protection@nextron-systems.com"
                className="text-[var(--color-accent)] hover:underline"
              >
                data.protection@nextron-systems.com
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
            2. Data processing for enabling the website use
          </h2>
          <p>
            If you merely visit our websites, i.e. do not otherwise transmit information to us, e.g. via a contact form,
            we automatically collect and store information that your browser automatically sends to us. This data is
            temporarily stored on the server.
          </p>
          <p>The following data will be collected automatically:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Browser type and browser version</li>
            <li>Operating system used</li>
            <li>Referrer URL</li>
            <li>Host name of the accessing computer</li>
            <li>Time of the server request</li>
            <li>IP address</li>
          </ul>
          <p>
            This data is technically required to display the website and to ensure the security of our website. We
            evaluate this data exclusively for statistical purposes in order to eliminate possible technical errors and,
            if necessary, identify and prevent attacks and security risks. These data are not stored together with other
            personal data of the user.
          </p>
          <p>
            The legal basis for the temporary storage of data and log files is our legitimate interest in the security
            and stability of our website (Art. 6 para. 1 sentence 1 lit. f GDPR).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">3. Newsletter</h2>
          <h3 className="font-medium text-[var(--color-text-primary)]">3.1. General information</h3>
          <p>
            You can subscribe to the newsletter on our website, which we use to inform you monthly about our products,
            new features and blog posts. The content of the individual newsletter will be briefly described during the
            registration process. The legal basis for sending the respective newsletter is your consent in accordance
            with Art. 6 para. 1 sentence 1 lit. a GDPR.
          </p>
          <p>
            For the registration to our newsletter, we use the so-called double-opt-in procedure. This means that after
            your registration, we will send you an e-mail to the e-mail address you provided, in which we ask you to
            confirm that you wish to receive the newsletter.
          </p>
          <p>
            Mandatory information for sending the newsletter is only your e-mail address. After your confirmation, we
            store your e-mail address for the purpose of sending the newsletter and until withdrawn. We also store your
            IP address current at the time of registration, the time of registration and confirmation for up to three
            years after registration (statute of limitations). The purpose of this procedure is to be able to prove your
            registration in case of doubt and, if necessary, to clarify any misuse of your personal data. The legal
            basis for logging the registration is Art. 6 para. 1 sentence 1 lit. c GDPR.
          </p>
          <p>
            You can withdraw your consent to the sending of the newsletter at any time and unsubscribe from the
            newsletter. You can declare the withdrawal by clicking on the link provided in every newsletter email or by
            sending an email to{" "}
            <a href="mailto:data.protection@nextron-systems.com" className="text-[var(--color-accent)] hover:underline">
              data.protection@nextron-systems.com
            </a>
            .
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">3.2. Newsletter Tracking</h3>
          <p>
            We would like to point out that we evaluate your user behavior when sending the newsletter in order to
            determine whether and when the newsletter was opened. For this evaluation, the sent e-mails contain
            so-called web beacons or tracking pixels.
          </p>
          <p>
            For example, we can see whether a newsletter message was opened and which links, if any, were clicked. In
            addition, we can see whether certain pre-defined actions were performed after opening/clicking (conversion
            rate).
          </p>
          <p>
            With the data thus obtained, we create a user profile in order to tailor the newsletter to your individual
            interests. In doing so, we record when you read our newsletters, which links you click on in them and infer
            your personal interests from this. The legal basis for this data processing is your consent in accordance
            with § 25 para. 1 sentence 1 TDDDG for the storage and access to information in terminal equipment and Art.
            6 para. 1 sentence 1 lit. a GDPR for our further processing of your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">4. Contact</h2>
          <p>
            On our website you will find the option to contact us using the appropriate forms. Only the fields marked as
            mandatory (*) must be completed for your inquiry to be answered. Any other information you provide is
            voluntary. The data you enter in the forms is sent to us and stored using SSL encryption. The following data
            (metadata) is also stored when the form is sent:
          </p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Your IP address</li>
            <li>Date and time of transmission</li>
          </ul>
          <p>
            The metadata collected is used to prevent misuse of the contact form and to ensure the security of our
            information technology systems. As an alternative to using our contact forms, you can also write to us at
            the e-mail addresses provided. In this case, the data transmitted with the e-mail will be stored.
          </p>
          <p>
            The legal basis for the processing of the data transmitted by you is basically Art. 6 para. 1 sentence 1
            lit. f GDPR, or if your request is aimed at the conclusion of a contract, Art. 6 para. 1 sentence 1 lit. b
            GDPR.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">5. Applications</h2>
          <p>
            You may find vacant job offers on our website. You have the option to apply by e-mail or by post. As part of
            the application, you will be asked to provide personal information (e.g. name and contact details). For the
            establishment and implementation of a possible employment relationship, the provision of certain data is
            required. If you do not provide this data, your application is incomplete and cannot be considered further
            in the application process.
          </p>
          <p>
            Your data will be processed by Nextron for the purpose of deciding on the establishment of an employment
            relationship. The legal basis for data processing by Nextron is Art. 88 para. 1 GDPR in conjunction with the
            respective national regulation, in Germany § 26 para. 1 sentence 1 BDSG.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">6. Cookies</h2>
          <h3 className="font-medium text-[var(--color-text-primary)]">6.1. General information about Cookies</h3>
          <p>
            In addition to the data mentioned in section 2, our website uses cookies. Cookies are small text files that
            are stored on your device when you visit our website and enable your browser to be reassigned. Cookies store
            information such as your language settings, the duration of your visit to our website or the information you
            enter there. This avoids you having to re-enter all necessary data each time you visit our website.
          </p>
          <p>
            With a modern web browser, you can monitor, restrict, or prevent the setting of cookies. Many web browsers
            can be configured to automatically delete cookies when the program is closed. The deactivation of cookies
            may result in limited functionality of our website.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">6.1.1. Session Cookies</h3>
          <p>The session cookies are deleted when you log out or close your browser.</p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">6.1.2. Persistent Cookies</h3>
          <p>
            These cookies are automatically deleted after a specified period, which may vary depending on the cookie.
            You can delete the cookies at any time in the security settings of your browser.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">6.1.3. Legal basis</h3>
          <p>
            The legal basis for essential cookies depends on our legitimate interest (Art. 6 para. 1 sentence 1 lit. f
            GDPR) for the basic functionality of our website.
          </p>
          <p>
            Cookies used for services and statistics takes place on your consent (Art. 6 para. 1 sentence 1 lit. a GDPR,
            § 25 para. 1 sentence 1 TDDDG). You can withdraw your consents any time by changing your privacy settings or
            by clicking on the button "Change privacy consent" in the footer of our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">7. Tracking tools / other Services</h2>

          <h3 className="font-medium text-[var(--color-text-primary)]">7.1. Google Analytics</h3>
          <p>
            Our website uses the "Google Analytics 4 (GA4) tracking tool. This is a service provided by Google Ireland
            Limited, a company registered and operated in accordance with Irish law, headquartered at Gordon House, 4
            Barrow Street, Dublin, Ireland ("Google"). This tracking tool helps us to make our online offers more
            interesting for you and to improve the user experience.
          </p>
          <p>
            The legal basis for the use of Google Analytics is based on your consent, based on § 25 para. 1 sentence 1
            TDDDG for the storage and access to information in terminal equipment and Art. 6 para. 1 sentence 1 lit. a
            GDPR for our further processing of your data. You give your consent to this via our cookie banner.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.2. Google reCaptcha</h3>
          <p>
            We use Google reCAPTCHA (hereinafter "reCAPTCHA") on our website. This is a service provided by Google. The
            purpose of reCAPTCHA is to check whether the data input on our website (e.g. when registering for a
            newsletter) is made by a human or by an automated program.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.3. Google Ads Conversion</h3>
          <p>
            We use the "Google Ads Conversion" service to advertise our products on external websites with the help of
            advertising material and to determine success of our advertising measures.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.4. Google Tag Manager</h3>
          <p>
            We use Google Tag Manager "GTM". This Google service allows website tags to be managed via an interface.
            However, GTM only implements tags. In this respect, no cookies are used.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.5. Leadfeeder</h3>
          <p>
            Our website uses the technologies of Dealfront (Dealfront Finland Oy as part of Dealfront Group GmbH) to
            analyze visitor behavior. In this process, the IP address of a visitor is processed to help us understand
            which businesses (B2B) are visiting our site.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.6. Microsoft Clarity</h3>
          <p>
            We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our
            website through behavioral metrics, heatmaps, and session replay to improve and market our
            products/services.
          </p>

          <h3 className="font-medium text-[var(--color-text-primary)] mt-4">7.7. HubSpot Website Tracking</h3>
          <p>
            We use HubSpot to understand how visitors use our website and to improve our services. It helps us recognize
            visits, count sessions, and connect form submissions with website activity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">8. Social Plugins – YouTube</h2>
          <p>
            Our website uses plug-ins from YouTube, which is operated by Google. If you visit one of our websites
            featuring a YouTube plug-in and actively click on the corresponding field, a connection to YouTube servers
            is established.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">9. (Social) Media presence</h2>
          <p>
            Our website contains links to (social) networks (X, LinkedIn, Discord, GitHub and YouTube). These websites
            are operated exclusively by third parties. If you follow the links, the respective provider may process
            personal data about you. Please note the data protection information of the provider in this regard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
            10. Links to websites of other providers
          </h2>
          <p>
            Our websites may contain links to websites of other providers which are not covered by this Privacy Policy.
            Insofar as the collection, processing or use of personal data is connected to the use of the websites of
            other providers, please note the privacy policy of the respective providers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">11. Data transfer</h2>
          <p>
            A transfer of your personal data to third parties generally does not take place unless we are legally
            obliged to do so, the data transfer is necessary for the execution of the contractual relationship, or you
            have previously expressly consented to the transfer of your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
            12. Duration for which personal data is stored
          </h2>
          <p>
            Your personal data will be stored by Nextron for as long as it is necessary for the afore-mentioned purposes
            of processing, in the event of an objection no compelling reasons worthy of protection oppose Nextron or in
            the event of a revocation no other legal basis for data processing exists.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">13. Your rights</h2>
          <p>Within the framework of the legal requirements, you have a fundamental claim against Nextron for:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Confirmation as to whether personal data concerning you is processed by Nextron</li>
            <li>Information about these data and the circumstances of processing</li>
            <li>Correction, if this data is incorrect</li>
            <li>
              Deletion, unless the processing is not justified and there is no (longer an) obligation to keep the data
            </li>
            <li>Restriction of processing in special cases determined by law</li>
            <li>Objection in case of data processing on the basis of Art. 6 para. 1 sentence 1 lit. f GDPR</li>
            <li>
              Transmission of your personal data – if you have provided it – to you or a third party in a structured,
              common and machine-readable format
            </li>
          </ul>
          <p>
            Please address your specific request in writing or by e-mail to our data protection officer (see section 1),
            clearly identifying yourself.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">14. Data security</h2>
          <p>
            For security reasons and to protect the transmission of confidential content that you send to us as a site
            operator, our website uses an SSL or TLS encryption. Thus, the data that you submit via this website is for
            others not readable. You will recognize an encrypted connection at the "https://" address bar of your
            browser and at the lock icon in the browser bar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">15. No automated individual decision</h2>
          <p>We do not use your personal data for automated individual decisions.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">16. Changes to our privacy policy</h2>
          <p>
            We reserve the right to change this Privacy Policy at any time in accordance with applicable privacy laws.
          </p>
        </section>

        <section className="pt-4 border-t border-[var(--color-border)]">
          <p className="text-[var(--color-text-muted)]">The current status is July 2025.</p>
        </section>
      </div>
    </div>
  )
}
