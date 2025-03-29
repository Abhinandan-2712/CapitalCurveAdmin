export default [
  {
    id: 1,
    Price: "6000",
    status: "Inactive",
    created_at: "2025-01-01T10:00:00+05:30",
    addsOn: [
      { id: "980097", name: "Cover Day Limits", description: "cover day limits", status: "Active" },
      { id: "109", name: "Investment Strategies", description: "add investor with your own risk analyses", status: "Inactive" },
      { id: "876", name: "Support Management", description: "provide support 24*7", status: "Active" },
      { id: "512", name: "Watchlist", description: "you can create 2 watchlists", status: "Inactive" },
      { id: "609", name: "Withdrawal", description: "withdraw with one day limit", status: "Active" },
    ],
    User: [
      { ID: 1, name: "John Doe", Status: "Active", Code: "USER1234", Email: "john.doe@example.com", Number: "+1 555-123-4567", Commission: 1500, Usages: 75 },
      { ID: 2, name: "Alice Brown", Status: "Inactive", Code: "USER5678", Email: "alice.brown@example.com", Number: "+1 555-111-2222", Commission: 1800, Usages: 65 },
      { ID: 3, name: "Charlie Davis", Status: "Active", Code: "USER9101", Email: "charlie.davis@example.com", Number: "+1 555-333-4444", Commission: 2000, Usages: 85 },
    ],
  },
  {
    id: 2,
    Price: "12000",
    status: "Active",
    created_at: "2025-01-02T12:15:00+05:30",
    addsOn: [
      { id: "234", name: "Premium Signals", description: "access premium trading signals", status: "Active" },
      { id: "435", name: "Risk Management", description: "advanced risk management tools", status: "Active" },
      { id: "876", name: "Support Management", description: "24/7 dedicated support", status: "Active" },
    ],
    User: [
      { ID: 4, name: "Jane Smith", Status: "Inactive", Code: "USER1122", Email: "jane.smith@example.com", Number: "+1 555-987-6543", Commission: 2000, Usages: 50 },
      { ID: 5, name: "David Miller", Status: "Active", Code: "USER3344", Email: "david.miller@example.com", Number: "+1 555-444-5555", Commission: 2200, Usages: 90 },
      { ID: 6, name: "Sophia Johnson", Status: "Active", Code: "USER5566", Email: "sophia.johnson@example.com", Number: "+1 555-666-7777", Commission: 2500, Usages: 100 },
    ],
  },
  {
    id: 3,
    Price: "18000",
    status: "Inactive",
    created_at: "2025-01-03T09:30:00+05:30",
    addsOn: [
      { id: "712", name: "Margin Trading", description: "trade with leverage", status: "Inactive" },
      { id: "333", name: "Educational Courses", description: "access to exclusive courses", status: "Active" },
    ],
    User: [
      { ID: 7, name: "Robert Johnson", Status: "Active", Code: "USER7788", Email: "robert.johnson@example.com", Number: "+1 555-222-3344", Commission: 1000, Usages: 30 },
      { ID: 8, name: "Emily Carter", Status: "Inactive", Code: "USER9900", Email: "emily.carter@example.com", Number: "+1 555-888-9999", Commission: 1200, Usages: 40 },
      { ID: 9, name: "Michael Scott", Status: "Active", Code: "USER1235", Email: "michael.scott@example.com", Number: "+1 555-777-6666", Commission: 3000, Usages: 110 },
    ],
  },
]