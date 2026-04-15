import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/ui/PageHeader";
import ContentSection from "@/components/ui/ContentSection";
import FAQSection from "@/components/ui/FAQSection";

const studentAffairsFAQs = [
  {
    question: "How do I join a student club or organization?",
    answer: "Visit the Student Affairs office in the Administration Building or attend the Student Activities Fair held at the beginning of each semester. You can also check the university portal for a list of active clubs and their contact information.",
  },
  {
    question: "What are the hostel accommodation options?",
    answer: "The university provides both male and female hostels with different room configurations. Applications for accommodation are done online through the student portal during the designated period each session.",
  },
  {
    question: "How do I apply for a leave of absence?",
    answer: "Submit a formal application to the Student Affairs office with supporting documents. The application must be endorsed by your Head of Department and Dean of Faculty before final approval.",
  },
  {
    question: "What counseling services are available?",
    answer: "The Student Counseling Center offers free confidential counseling services for academic, personal, and career-related issues. Walk-in consultations are available Monday to Friday from 9 AM to 4 PM.",
  },
];

const StudentAffairs = () => {
  return (
    <Layout>
      <PageHeader
        title="Student Affairs"
        subtitle="Supporting your journey through university life with comprehensive services and resources"
      />

      <section className="content-section">
        <div className="container-custom">
          <div className="grid gap-8">
            <ContentSection title="General Campus Information">
              <p className="mb-4">
                Al-Hikmah University is located in the serene Adewole Estate area of Ilorin, Kwara State. Our campus spans over 100 hectares of well-developed land with modern facilities designed to support academic excellence and holistic student development.
              </p>
              <p className="mb-4">
                The campus features state-of-the-art lecture halls, well-equipped laboratories, a central library with extensive collections, sports facilities, and comfortable hostel accommodations. Our environment promotes both academic pursuits and personal growth.
              </p>
              <p>
                Key campus facilities include the Central Mosque, University Health Center, Student Center, Sports Complex, and various faculty buildings housing different academic programs.
              </p>
            </ContentSection>

            <ContentSection title="Student Activities & Clubs">
              <p className="mb-4">
                Al-Hikmah University encourages students to participate in extracurricular activities that complement their academic pursuits. We have numerous student organizations covering academic, cultural, religious, sports, and social interests.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Academic and Departmental Associations</li>
                <li>Muslim Students Society of Nigeria (MSSN)</li>
                <li>Red Cross Society</li>
                <li>Drama and Cultural Groups</li>
                <li>Sports Clubs (Football, Basketball, Volleyball, etc.)</li>
                <li>Debating Society</li>
                <li>Press Club and Campus Media</li>
                <li>Community Service Organizations</li>
              </ul>
              <p>
                Each club is supervised by a faculty advisor and operates under the guidelines set by the Student Affairs Division.
              </p>
            </ContentSection>

            <ContentSection title="Campus Policies">
              <p className="mb-4">
                All students are expected to conduct themselves in accordance with the university's code of conduct, which emphasizes academic integrity, moral uprightness, and respect for others.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Dress Code:</strong> Students must dress modestly and appropriately at all times on campus</li>
                <li><strong>Attendance:</strong> Minimum 75% attendance is required for all courses</li>
                <li><strong>Examinations:</strong> Strict adherence to examination rules and regulations</li>
                <li><strong>Hostel Rules:</strong> Specific guidelines for residential students including curfew times</li>
                <li><strong>Library Usage:</strong> Proper conduct and care of library resources</li>
                <li><strong>ID Cards:</strong> Students must carry their ID cards at all times on campus</li>
              </ul>
              <p>
                Violation of campus policies may result in disciplinary action as outlined in the Student Handbook.
              </p>
            </ContentSection>

            <FAQSection faqs={studentAffairsFAQs} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudentAffairs;
