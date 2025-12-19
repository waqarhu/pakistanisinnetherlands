# Setup Instructions for Website Features

## 1. Google Analytics Setup

1. Go to https://analytics.google.com/
2. Create a new property for "Pakistanis in Netherlands"
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Replace `G-XXXXXXXXXX` in all HTML files with your actual ID:
   ```bash
   # In each HTML file, find and replace:
   G-XXXXXXXXXX → your actual Measurement ID
   ```

## 2. Contact Form Setup (Formspree)

1. Go to https://formspree.io/ and sign up (free tier is fine)
2. Create a new form
3. Copy your form endpoint (format: https://formspree.io/f/YOUR_FORM_ID)
4. Replace in contact.html:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   With your actual form ID

## 3. Newsletter Setup

Same as contact form:
1. Create another form in Formspree for newsletter
2. Replace in index.html newsletter section:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

## 4. WhatsApp Contact Button

Replace the phone number in assets/js/custom.js:
```javascript
whatsappBtn.href = 'https://wa.me/31612345678'; // Replace with actual number
```

Format: Country code + number (no spaces, no +)
Example: Netherlands +31 6 1234 5678 → https://wa.me/31612345678

## 5. Social Media Links

Update in all HTML files (index.html, about.html, etc.):
```html
<a href="#" class="twitter"> → <a href="https://twitter.com/yourhandle">
<a href="#" class="facebook"> → <a href="https://facebook.com/yourpage">
<a href="#" class="instagram"> → <a href="https://instagram.com/yourprofile">
<a href="#" class="linkedin"> → <a href="https://linkedin.com/company/yourcompany">
```

## 6. Email Address Updates

Replace placeholder emails:
- In footer: info@pakistanisinnetherlands.com (already set)
- In contact.php: Update if you want different email
- In contact page: info@example.com → your actual email

## 7. Enable HTTPS (GitHub Pages)

1. Go to: https://github.com/waqarhu/pakistanisinnetherlands/settings/pages
2. Wait for DNS check to complete (green checkmark)
3. Check "Enforce HTTPS"
4. Save

## 8. Submit to Search Engines

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: pakistanisinnederlands.nl
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: https://www.pakistanisinnederlands.nl/sitemap.xml

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site
3. Import from Google Search Console (easier)
4. Or verify separately

## 9. Performance Testing

Test your site at:
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

Target scores:
- PageSpeed: 90+ (mobile and desktop)
- GTmetrix: Grade A
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 10. Security Checklist

- ✅ HTTPS enabled
- ✅ Security headers in .htaccess
- ✅ Form validation (client + server side)
- ✅ No sensitive data in repository
- ✅ Contact form spam protection (Formspree handles this)

## Quick Setup Commands

Run these after getting your IDs:

```bash
# Replace Google Analytics ID
find . -name "*.html" -type f -exec sed -i 's/G-XXXXXXXXXX/G-YOUR-ACTUAL-ID/g' {} +

# Replace Formspree IDs (do separately for each)
find . -name "*.html" -type f -exec sed -i 's/YOUR_FORM_ID/YOUR-ACTUAL-FORM-ID/g' {} +

# Commit changes
git add .
git commit -m "Configure Google Analytics, Formspree, and social links"
git push origin main
```

## Testing Checklist

- [ ] Test contact form submission
- [ ] Test newsletter signup
- [ ] Test WhatsApp button on mobile
- [ ] Test search functionality
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test keyboard navigation (Tab key)
- [ ] Test with screen reader
- [ ] Check Google Analytics tracking
- [ ] Verify HTTPS is working

## Support Resources

- Formspree docs: https://help.formspree.io/
- Google Analytics docs: https://support.google.com/analytics
- GitHub Pages docs: https://docs.github.com/en/pages
- Web.dev guides: https://web.dev/

## Need Help?

Check the IMPROVEMENTS.md file for detailed implementation guides and troubleshooting tips.
