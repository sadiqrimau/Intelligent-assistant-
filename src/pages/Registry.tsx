import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import FAQSection from "@/components/ui/FAQSection";

const registryFAQs = [
  {
    question: "What are the entry requirements for undergraduate programs?",
    answer: "Candidates must possess a minimum of five O'Level credits including English Language and Mathematics in WAEC, NECO, or equivalent. Specific programs may have additional requirements. UTME score and post-UTME screening are also required.",
  },
  {
    question: "How long does the admission process take?",
    answer: "The admission process typically takes 2-4 weeks after the submission of all required documents. Candidates can check their admission status on the university portal using their application reference number.",
  },
  {
    question: "Can I transfer from another university?",
    answer: "Yes, transfer students are accepted subject to available spaces and meeting transfer requirements. You must provide transcripts, a letter of good standing from your previous institution, and meet our entry requirements.",
  },
  {
    question: "How do I request for my transcript?",
    answer: "Transcript requests are made at the Registry Office. Complete the transcript request form, pay the applicable fee at the Bursary, and submit your receipt to the Registry. Processing takes 2-3 weeks for local requests and 3-4 weeks for international requests.",
  },
];

const Registry = () => {
  return (
    <Layout>
      <PageHeader
        title="Registry & Admissions"
        subtitle="Your gateway to academic excellence at Al-Hikmah University"
      />

      <section className="content-section">
        <div className="container-custom">
          <div className="grid gap-8">
            <ContentSection title="Admission Requirements">
              <p className="mb-4">
                Al-Hikmah University admits qualified candidates into various undergraduate, postgraduate, and diploma programs. Our admission process is transparent, merit-based, and designed to identify students who will thrive in our academic environment.
              </p>
              <h4 className="font-semibold text-foreground mb-2">Undergraduate Admission Requirements:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Minimum of five O'Level credits including English Language and Mathematics</li>
                <li>Valid JAMB UTME result with Al-Hikmah University as first choice</li>
                <li>Successful completion of Post-UTME screening exercise</li>
                <li>Meet specific departmental requirements for chosen course</li>
                <li>Original and photocopies of relevant certificates</li>
              </ul>
              <h4 className="font-semibold text-foreground mb-2">Postgraduate Requirements:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Bachelor's degree from a recognized institution (minimum Second Class Lower)</li>
                <li>NYSC Discharge or Exemption Certificate</li>
                <li>Official transcripts from previous institutions</li>
                <li>Two academic reference letters</li>
              </ul>
            </ContentSection>

            <ContentSection title="Course Registration">
              <p className="mb-4">
                Course registration is conducted at the beginning of each semester through the student portal. Students must complete their registration within the stipulated period to avoid penalties.
              </p>
              <h4 className="font-semibold text-foreground mb-2">Registration Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Login to the student portal with your credentials</li>
                <li>Complete fee payment (or confirm payment status)</li>
                <li>Select courses for the current semester</li>
                <li>Submit course form for departmental approval</li>
                <li>Print approved course registration form</li>
                <li>Submit a copy to your department</li>
              </ol>
              <p>
                Late registration attracts a penalty fee. Students who fail to register within the extended period will not be allowed to participate in examinations.
              </p>
            </ContentSection>

            <ContentSection title="Academic Calendar">
              <p className="mb-4">
                The academic year is divided into two semesters, each lasting approximately 17 weeks including examination periods. Key dates for the current session include:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 font-semibold text-foreground">Activity</th>
                      <th className="py-3 font-semibold text-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 pr-4">First Semester Begins</td>
                      <td className="py-3">October 2024</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Mid-Semester Break</td>
                      <td className="py-3">December 2024</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">First Semester Examinations</td>
                      <td className="py-3">February 2025</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Second Semester Begins</td>
                      <td className="py-3">March 2025</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Second Semester Examinations</td>
                      <td className="py-3">July 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ContentSection>

            <ContentSection title="Transcripts & Certificates">
              <p className="mb-4">
                The Registry handles all requests for academic transcripts, certificates, and other official documents. Processing times vary based on the type of document and destination.
              </p>
              <h4 className="font-semibold text-foreground mb-2">Available Documents:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Academic Transcript:</strong> Official record of all courses and grades</li>
                <li><strong>Statement of Result:</strong> Summary of academic performance</li>
                <li><strong>Certificate:</strong> Original degree certificate (collected in person)</li>
                <li><strong>Letter of Good Standing:</strong> For transfer or external verification</li>
                <li><strong>Attestation Letter:</strong> Confirmation of studentship or graduation</li>
              </ul>
              <p>
                All document requests must be made in person at the Registry with valid identification and payment receipts.
              </p>
            </ContentSection>

            <FAQSection faqs={registryFAQs} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Registry;
