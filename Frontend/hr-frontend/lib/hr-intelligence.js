// lib/hr-intelligence.js
// This is the "brain" that understands what employees want

import {
  employees,
  policies,
  leaveRequests,
  assetRequests,
  getEmployee,
  addLeaveRequest,
  addAssetRequest,
  searchPolicies,
} from "./hr-data.js";

// Intent Recognition - Figure out what the user wants
export function analyzeHRIntent(message) {
  const msg = message.toLowerCase();

  // Extract useful information
  const dateMatches = message.match(
    /\b(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4})\b/g
  );
  const numberMatches = message.match(/\b(\d+)\s*(day|days|week|weeks)\b/g);

  // Intent Classification with Confidence Scores
  let intents = [];

  // LEAVE BALANCE CHECK
  if (
    msg.includes("balance") ||
    msg.includes("remaining") ||
    msg.includes("left") ||
    (msg.includes("leave") &&
      (msg.includes("how many") || msg.includes("days")))
  ) {
    intents.push({
      intent: "check_leave_balance",
      confidence: 0.95,
      reason: "User asking about leave balance",
    });
  }

  // LEAVE APPLICATION
  if (
    (msg.includes("apply") ||
      msg.includes("request") ||
      msg.includes("take") ||
      msg.includes("need") ||
      msg.includes("want")) &&
    (msg.includes("leave") ||
      msg.includes("time off") ||
      msg.includes("vacation") ||
      msg.includes("holiday"))
  ) {
    let leaveType = "annual"; // default
    if (msg.includes("sick") || msg.includes("ill")) leaveType = "sick";
    if (msg.includes("maternity") || msg.includes("pregnancy"))
      leaveType = "maternity";

    intents.push({
      intent: "apply_leave",
      confidence: 0.9,
      leaveType,
      dates: dateMatches,
      reason: "User wants to apply for leave",
    });
  }

  // POLICY QUERIES
  if (
    msg.includes("policy") ||
    msg.includes("rule") ||
    msg.includes("guideline") ||
    msg.includes("maternity") ||
    msg.includes("sick leave") ||
    msg.includes("wfh") ||
    msg.includes("work from home")
  ) {
    intents.push({
      intent: "policy_query",
      confidence: 0.85,
      query: message,
      reason: "User asking about company policies",
    });
  }

  // ASSET REQUESTS
  if (
    (msg.includes("need") || msg.includes("request") || msg.includes("want")) &&
    (msg.includes("laptop") ||
      msg.includes("computer") ||
      msg.includes("monitor") ||
      msg.includes("phone") ||
      msg.includes("equipment"))
  ) {
    let assetType = "laptop"; // default
    if (msg.includes("monitor")) assetType = "monitor";
    if (msg.includes("phone")) assetType = "phone";

    intents.push({
      intent: "asset_request",
      confidence: 0.8,
      assetType,
      reason: "User requesting equipment",
    });
  }

  // STATUS CHECK
  if (
    (msg.includes("status") || msg.includes("check")) &&
    (msg.includes("request") || msg.includes("application"))
  ) {
    intents.push({
      intent: "status_check",
      confidence: 0.75,
      reason: "User checking request status",
    });
  }

  // Return highest confidence intent or general
  if (intents.length === 0) {
    return {
      intent: "general",
      confidence: 0.3,
      reason: "No specific HR intent detected",
    };
  }

  return intents.sort((a, b) => b.confidence - a.confidence)[0];
}

// Process HR Requests - Do the actual work
export async function processHRRequest(
  intent,
  message,
  userEmail = "john.doe"
) {
  const employee = getEmployee(userEmail);

  if (!employee) {
    return {
      success: false,
      message: "❌ Employee not found. Please contact HR for assistance.",
      data: null,
    };
  }

  switch (intent.intent) {
    case "check_leave_balance":
      return handleLeaveBalance(employee);

    case "apply_leave":
      return handleLeaveApplication(employee, intent, message);

    case "policy_query":
      return handlePolicyQuery(intent.query);

    case "asset_request":
      return handleAssetRequest(employee, intent.assetType);

    case "status_check":
      return handleStatusCheck(employee);

    default:
      return {
        success: true,
        message: `Hi ${employee.name}! 👋 I'm your HR Assistant. I can help you with:

🏖️ **Leave Management**
- Check your leave balance
- Apply for annual/sick/maternity leave
- View leave history

💻 **Asset Requests** 
- Request laptops, monitors, phones
- Check asset status
- Report equipment issues

📋 **HR Policies**
- Leave policies
- Work from home guidelines  
- Company procedures

📊 **Status Updates**
- Check your pending requests
- View request history

Try asking: "What's my leave balance?" or "I need a laptop"`,
        data: {
          employee: {
            name: employee.name,
            department: employee.department,
            leaveBalance: employee.leaveBalance,
          },
        },
      };
  }
}

// Individual Handler Functions
function handleLeaveBalance(employee) {
  const usedLeave = employee.totalLeave - employee.leaveBalance;

  return {
    success: true,
    message: `📊 **Leave Summary for ${employee.name}**

🟢 **Available Leave:** ${employee.leaveBalance} days
🔵 **Used This Year:** ${usedLeave} days  
📅 **Total Annual Entitlement:** ${employee.totalLeave} days
👤 **Department:** ${employee.department}

Need to apply for leave? Just let me know your dates! 😊`,
    data: {
      leaveBalance: employee.leaveBalance,
      usedLeave,
      totalLeave: employee.totalLeave,
      department: employee.department,
    },
    actions: ["Apply for Leave", "View Leave History", "Leave Policy"],
  };
}

function handleLeaveApplication(employee, intent, message) {
  // Parse dates from the message
  if (!intent.dates || intent.dates.length < 2) {
    return {
      success: false,
      message: `I'd be happy to help you apply for leave! 📝

Please provide your leave dates in one of these formats:
- "I need leave from 2024-03-15 to 2024-03-20"
- "Apply leave from 15/03/2024 to 20/03/2024" 
- "Take 5 days off starting March 15th"

What dates did you have in mind?`,
      data: null,
      actions: ["Check Leave Balance", "Leave Policy"],
    };
  }

  const startDate = new Date(intent.dates[0]);
  const endDate = new Date(intent.dates[1]);

  // Validate dates
  if (startDate >= endDate) {
    return {
      success: false,
      message:
        "❌ End date must be after start date. Please check your dates and try again.",
      data: null,
    };
  }

  if (startDate < new Date()) {
    return {
      success: false,
      message:
        "❌ Cannot apply for leave in the past. Please select future dates.",
      data: null,
    };
  }

  // Calculate leave days (excluding weekends for simplicity)
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  // Check leave balance
  if (daysDiff > employee.leaveBalance) {
    return {
      success: false,
      message: `❌ **Insufficient Leave Balance**

You requested: **${daysDiff} days**
Available: **${employee.leaveBalance} days**
Shortfall: **${daysDiff - employee.leaveBalance} days**

Would you like to:
- Apply for fewer days?
- Check if you can take unpaid leave?
- Speak to your manager about options?`,
      data: {
        requestedDays: daysDiff,
        availableDays: employee.leaveBalance,
        shortfall: daysDiff - employee.leaveBalance,
      },
    };
  }

  // Determine approval workflow
  let status = "pending";
  let approver = employee.manager;

  // Auto-approve short leave (hackathon magic!)
  if (daysDiff <= 3) {
    status = "approved";
    approver = "AUTO_SYSTEM";

    // Update employee balance
    employee.leaveBalance -= daysDiff;
  }

  // Create leave request
  const leaveRequest = addLeaveRequest({
    employeeId: employee.email,
    startDate: intent.dates[0],
    endDate: intent.dates[1],
    days: daysDiff,
    type: intent.leaveType,
    reason: message,
    status,
    appliedDate: new Date().toISOString(),
    approvedBy: approver,
  });

  const successMessage =
    status === "approved"
      ? `✅ **Leave Approved Instantly!** 🎉

📋 **Request Details:**
- Request ID: **${leaveRequest.id}**
- Dates: **${intent.dates[0]} to ${intent.dates[1]}**
- Duration: **${daysDiff} days**
- Type: **${intent.leaveType} leave**
- Status: **APPROVED** ✅

💰 **Leave Balance Updated:**
- Days deducted: **${daysDiff}**
- Remaining balance: **${employee.leaveBalance} days**

Enjoy your time off! 🏖️`
      : `📋 **Leave Application Submitted** 

- Request ID: **${leaveRequest.id}**
- Dates: **${intent.dates[0]} to ${intent.dates[1]}**  
- Duration: **${daysDiff} days**
- Status: **Pending Manager Approval** ⏳

Your manager (${employee.manager}) will review and respond within 2 business days. You'll receive an email notification once decided.`;

  return {
    success: true,
    message: successMessage,
    data: leaveRequest,
    actions:
      status === "approved"
        ? ["View Leave History", "Calendar Integration"]
        : ["Check Status", "Contact Manager"],
  };
}

function handlePolicyQuery(query) {
  const relevantPolicies = searchPolicies(query);

  if (relevantPolicies.length === 0) {
    return {
      success: true,
      message: `🔍 I couldn't find specific policies for "${query}".

📋 **Available Policy Categories:**
- **Leave Policies** - Annual, sick, maternity leave
- **Work Arrangements** - Work from home, flexible hours  
- **Asset Management** - Equipment requests, returns
- **General HR** - Code of conduct, benefits

Try asking:
- "What's the annual leave policy?"
- "Tell me about work from home rules"
- "What's the maternity leave policy?"`,
      data: { availableCategories: policies.map((p) => p.category) },
      actions: ["Annual Leave Policy", "WFH Policy", "Maternity Policy"],
    };
  }

  const mainPolicy = relevantPolicies[0];

  return {
    success: true,
    message: `📋 **${mainPolicy.title}**

${mainPolicy.content}

${
  relevantPolicies.length > 1
    ? `\n📚 **Related Policies:** ${relevantPolicies
        .slice(1)
        .map((p) => p.title)
        .join(", ")}`
    : ""
}

Need clarification on anything specific?`,
    data: {
      policy: mainPolicy,
      relatedPolicies: relevantPolicies.slice(1),
    },
    actions: ["Ask Follow-up Question", "Apply for Leave", "Contact HR"],
  };
}

function handleAssetRequest(employee, assetType) {
  // Check if employee already has this asset type
  const hasAsset = employee.assets.some((asset) =>
    asset.toLowerCase().includes(assetType.toLowerCase())
  );

  if (hasAsset) {
    return {
      success: true,
      message: `💻 **Current Asset Status**

You already have these assets assigned:
${employee.assets.map((asset) => `• ${asset}`).join("\n")}

**Need a replacement or additional equipment?**
- Report hardware issues
- Request upgrades
- Add peripherals (monitor, keyboard, mouse)

What specific help do you need?`,
      data: { existingAssets: employee.assets },
      actions: ["Report Issue", "Request Upgrade", "Contact IT"],
    };
  }

  // Create asset request (auto-approve for demo)
  const assetRequest = addAssetRequest({
    employeeId: employee.email,
    assetType,
    model: assetType === "laptop" ? "MacBook Pro M3" : `Standard ${assetType}`,
    status: "approved",
    requestDate: new Date().toISOString(),
    expectedDelivery: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
  });

  // Update employee assets
  employee.assets.push(`${assetType.toUpperCase()}-${assetRequest.id}`);

  return {
    success: true,
    message: `✅ **Asset Request Approved!** 🎉

📦 **Request Details:**
- Request ID: **${assetRequest.id}**
- Asset Type: **${assetRequest.model}**
- Status: **APPROVED** ✅
- Expected Delivery: **${new Date(
      assetRequest.expectedDelivery
    ).toLocaleDateString()}**

📍 **Next Steps:**
1. You'll receive a delivery confirmation email
2. Collect from **IT Department, 2nd Floor**
3. Sign the asset acknowledgment form
4. Set up will be assisted by IT team

Questions? Contact IT at ext. 2234 📞`,
    data: assetRequest,
    actions: ["Track Delivery", "Contact IT", "Asset Policy"],
  };
}

function handleStatusCheck(employee) {
  const userLeaveRequests = leaveRequests.filter(
    (lr) => lr.employeeId === employee.email
  );
  const userAssetRequests = assetRequests.filter(
    (ar) => ar.employeeId === employee.email
  );

  const pendingLeave = userLeaveRequests.filter(
    (lr) => lr.status === "pending"
  );
  const pendingAssets = userAssetRequests.filter(
    (ar) => ar.status === "pending"
  );

  return {
    success: true,
    message: `📊 **Your Request Status Dashboard**

🏖️ **LEAVE REQUESTS:**
${
  userLeaveRequests.length > 0
    ? userLeaveRequests
        .map(
          (lr) =>
            `• ${lr.id}: **${lr.status.toUpperCase()}** (${lr.startDate} to ${
              lr.endDate
            }) - ${lr.days} days`
        )
        .join("\n")
    : "• No leave requests found"
}

💻 **ASSET REQUESTS:**
${
  userAssetRequests.length > 0
    ? userAssetRequests
        .map(
          (ar) =>
            `• ${ar.id}: **${ar.status.toUpperCase()}** - ${ar.assetType} (${
              ar.model
            })`
        )
        .join("\n")
    : "• No asset requests found"
}

📈 **Summary:**
- Pending Leave: **${pendingLeave.length}**
- Pending Assets: **${pendingAssets.length}**
- Total Requests: **${userLeaveRequests.length + userAssetRequests.length}**`,
    data: {
      leaveRequests: userLeaveRequests,
      assetRequests: userAssetRequests,
      pendingCount: pendingLeave.length + pendingAssets.length,
    },
    actions: ["Apply for Leave", "Request Asset", "Contact Manager"],
  };
}
