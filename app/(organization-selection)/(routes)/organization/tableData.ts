const data = [
  {
    key: "1",
    org_id: "7843782998",
    organization_name: {
      image: "/logos/ellipse-8.svg",
      name: "Automode AI Consulting Pvt. Ltd. ",
      subtext: "IT Company",
    },
    user_role: "Service Manager",
    primary_contact: "Ashish Jaria",
    status: "Active",
    subscription_status: {
      plan: "Premium",
      expires_on: "20 Aug 2023",
      days_left: 30,
    },
    action: "Upgrade now",
  },
  {
    key: "2",
    org_id: "7784378232",
    organization_name: {
      image: "/logos/ellipse-8.svg",
      name: "Brotomotive Automotive",
      subtext: "Textile Industry",
    },
    user_role: "Accountant",
    primary_contact: "Parth Goswami",
    status: "Inactive",
    subscription_status: {
      plan: "Basic",
      expires_on: "15 July 2023",
      days_left: 0,
    },
    action: "Pay now",
  },
  {
    key: "3",
    org_id: "8437812333",
    organization_name: {
      image: "/logos/ellipse-8.svg",
      name: "Automode AI Consulting Pvt. Ltd. ",
      subtext: "IT Company",
    },
    user_role: "Service Manager",
    primary_contact: "Ashish Jaria",
    status: "Active",
    subscription_status: {
      plan: "Premium",
      expires_on: "20 Aug 2023",
      days_left: -30,
    },
    action: "Upgrade now",
  },
];

export default data;
