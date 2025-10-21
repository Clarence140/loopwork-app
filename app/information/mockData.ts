/**
 * ========================================
 * INFORMATION - MOCK DATA
 * ========================================
 */

import { InformationPost } from "./types";

export const mockPosts: InformationPost[] = [
  {
    id: "post_1",
    title: "Company Holiday - Thanksgiving Day",
    content:
      "**Reminder: Office Closure**\n\n" +
      "The office will be closed on **Thursday, November 23, 2025** in observance of Thanksgiving Day.\n\n" +
      "**What this means:**\n" +
      "• No work scheduled\n" +
      "• Office facilities closed\n" +
      "• Emergency contacts available via email\n\n" +
      "*We will resume normal operations on Friday, November 24.*\n\n" +
      "Happy Thanksgiving to everyone!",
    category: "announcements",
    categoryIcon: "📢",
    priority: "Urgent",
    createdBy: "emp_hr_001",
    createdByName: "HR Department",
    startDate: new Date("2025-10-21T00:00:00"),
    endDate: new Date("2025-11-24T23:59:59"),
    isAccessibleToAll: true,
    readBy: ["emp_001", "emp_002"],
    createdAt: new Date("2025-10-20T09:00:00"),
    updatedAt: new Date("2025-10-20T09:00:00"),
    companyCode: "DEMO",
  },
  {
    id: "post_2",
    title: "New Employee Portal Features",
    content:
      "**We're excited to announce new features in the employee portal!**\n\n" +
      "**What's New:**\n" +
      "• Mobile app for iOS and Android\n" +
      "• Enhanced timecard system\n" +
      "• Improved schedule management\n" +
      "• Real-time notifications\n\n" +
      "**How to access:**\n" +
      "Download the LoopWork mobile app from your app store and log in with your existing credentials.\n\n" +
      "Questions? Contact IT support.",
    category: "updates",
    categoryIcon: "🔔",
    priority: "High",
    createdBy: "emp_it_001",
    createdByName: "John Smith - IT",
    startDate: new Date("2025-10-19T00:00:00"),
    endDate: new Date("2025-11-19T23:59:59"),
    isAccessibleToAll: true,
    readBy: ["emp_001"],
    createdAt: new Date("2025-10-19T14:30:00"),
    updatedAt: new Date("2025-10-19T14:30:00"),
    companyCode: "DEMO",
  },
  {
    id: "post_3",
    title: "Team Building Event - Next Friday",
    content:
      "**Join us for our quarterly team building activity!**\n\n" +
      "**Date:** Friday, October 27, 2025\n" +
      "**Time:** 2:00 PM - 6:00 PM\n" +
      "**Location:** Main Conference Hall\n\n" +
      "**Activities:**\n" +
      "• Team games and challenges\n" +
      "• Pizza party\n" +
      "• Raffle prizes\n\n" +
      "Please RSVP by Wednesday. See you there!",
    category: "events",
    categoryIcon: "🎉",
    priority: "Medium",
    createdBy: "emp_hr_002",
    createdByName: "Sarah Williams - HR",
    startDate: new Date("2025-10-18T00:00:00"),
    endDate: new Date("2025-10-27T23:59:59"),
    isAccessibleToAll: true,
    readBy: [],
    createdAt: new Date("2025-10-18T10:15:00"),
    updatedAt: new Date("2025-10-18T10:15:00"),
    companyCode: "DEMO",
  },
  {
    id: "post_4",
    title: "Timecard Submission Deadline",
    content:
      "**Important Reminder**\n\n" +
      "All timecards for the current pay period must be submitted by **5:00 PM this Friday**.\n\n" +
      "**Action Required:**\n" +
      "• Review your hours\n" +
      "• Submit any pending timecards\n" +
      "• Contact payroll with questions\n\n" +
      "Late submissions may delay your paycheck.",
    category: "reminders",
    categoryIcon: "⏰",
    priority: "High",
    createdBy: "emp_payroll_001",
    createdByName: "Payroll Team",
    startDate: new Date("2025-10-17T00:00:00"),
    endDate: new Date("2025-10-26T23:59:59"),
    isAccessibleToAll: true,
    readBy: ["emp_001"],
    createdAt: new Date("2025-10-17T08:00:00"),
    updatedAt: new Date("2025-10-17T08:00:00"),
    companyCode: "DEMO",
  },
  {
    id: "post_5",
    title: "Updated Remote Work Policy",
    content:
      "**Policy Update Effective November 1, 2025**\n\n" +
      "We have updated our remote work policy to provide more flexibility.\n\n" +
      "**Key Changes:**\n" +
      "• Up to 2 remote days per week (previously 1)\n" +
      "• Flexible hours (core hours: 10 AM - 3 PM)\n" +
      "• Monthly remote work reports required\n\n" +
      "**Requirements:**\n" +
      "• Manager approval needed\n" +
      "• Available during core hours\n" +
      "• Maintain productivity standards\n\n" +
      "Full policy document available in the Document Management system.",
    category: "policies",
    categoryIcon: "📋",
    priority: "Medium",
    createdBy: "emp_hr_001",
    createdByName: "HR Department",
    startDate: new Date("2025-10-16T00:00:00"),
    isAccessibleToAll: true,
    readBy: ["emp_001", "emp_002", "emp_003"],
    createdAt: new Date("2025-10-16T11:00:00"),
    updatedAt: new Date("2025-10-16T11:00:00"),
    companyCode: "DEMO",
  },
];
