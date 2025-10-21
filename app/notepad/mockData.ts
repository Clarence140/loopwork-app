/**
 * ========================================
 * NOTEPAD - MOCK DATA
 * ========================================
 */

import { Note } from "./types";

export const mockNotes: Note[] = [
  {
    id: "note_1",
    title: "Meeting notes - Q4 Planning",
    content:
      "Discussed Q4 goals and objectives:\n\n" +
      "**Key Goals:**\n" +
      "• Increase customer satisfaction by 15%\n" +
      "• Launch new product features by November\n" +
      "• Improve team collaboration tools\n" +
      "• Quarterly review scheduled for December 15\n\n" +
      "**Action items:**\n" +
      "• Follow up with marketing team\n" +
      "• Prepare budget proposal\n" +
      "• Schedule 1-on-1s with team members",
    category: "Work",
    createdAt: new Date("2025-10-21T14:30:00"),
    updatedAt: new Date("2025-10-21T14:30:00"),
    userId: "emp_001",
    companyCode: "DEMO",
    color: "#DBEAFE",
    isPinned: true,
  },
  {
    id: "note_2",
    title: "Project ideas",
    content:
      "**Ideas for new features:**\n\n" +
      "• Mobile app redesign\n" +
      "• Dark mode support\n" +
      "• Offline sync capability\n" +
      "• Voice notes integration\n" +
      "• Better search functionality\n\n" +
      "*Research needed:*\n" +
      "• User feedback analysis\n" +
      "• Competitor analysis\n" +
      "• Technical feasibility study",
    category: "Ideas",
    createdAt: new Date("2025-10-20T16:15:00"),
    updatedAt: new Date("2025-10-20T16:15:00"),
    userId: "emp_001",
    companyCode: "DEMO",
    color: "#FEF3C7",
  },
  {
    id: "note_3",
    title: "Things to remember",
    content:
      "**Personal reminders:**\n\n" +
      "• Update project documentation\n" +
      "• Review pull requests by EOD\n" +
      "• Schedule dentist appointment\n" +
      "• Buy groceries on the way home\n" +
      "• Call mom on weekend",
    category: "Personal",
    createdAt: new Date("2025-10-19T10:00:00"),
    updatedAt: new Date("2025-10-21T09:00:00"),
    userId: "emp_001",
    companyCode: "DEMO",
    color: "#D1FAE5",
  },
  {
    id: "note_4",
    title: "Code snippets",
    content:
      "**Useful code snippets:**\n\n" +
      "React Native navigation:\n" +
      "router.push('/screen');\n\n" +
      "Format date:\n" +
      "new Date().toLocaleDateString('en-US', {\n" +
      "  month: 'short',\n" +
      "  day: 'numeric',\n" +
      "  year: 'numeric'\n" +
      "});\n\n" +
      "Firebase query:\n" +
      "const q = query(collection(db, 'notes'),\n" +
      "  where('userId', '==', userId));",
    category: "Work",
    createdAt: new Date("2025-10-18T11:30:00"),
    updatedAt: new Date("2025-10-18T11:30:00"),
    userId: "emp_001",
    companyCode: "DEMO",
    color: "#FEE2E2",
  },
  {
    id: "note_5",
    title: "Reading list",
    content:
      "**Books to read:**\n\n" +
      "• *Clean Code* by Robert Martin\n" +
      "• *The Pragmatic Programmer*\n" +
      "• *Atomic Habits* by James Clear\n" +
      "• *Deep Work* by Cal Newport\n\n" +
      "**Articles:**\n" +
      "• React Native best practices\n" +
      "• Mobile UX design patterns\n" +
      "• Firebase optimization tips",
    category: "Personal",
    createdAt: new Date("2025-10-17T15:45:00"),
    updatedAt: new Date("2025-10-17T15:45:00"),
    userId: "emp_001",
    companyCode: "DEMO",
  },
];
