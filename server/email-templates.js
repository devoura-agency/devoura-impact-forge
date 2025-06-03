export function websiteInquiryEmail({ name, email, org, mobile, template, design, pkg, maintenance }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      <!-- Your existing email template HTML -->
    </div>
  `;
}

export function callRequestEmail({ number, time, language, name }, isAdmin = false) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #f8fffe 0%, #f0f9f7 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(74, 103, 65, 0.1);">
      <!-- Your existing email template HTML -->
    </div>
  `;
} 