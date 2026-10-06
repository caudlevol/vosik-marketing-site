/* Developer configuration. Empty values keep unconnected services honest. */
window.VOSIK_CONFIG = {
  quoteEndpoint: '/api/leads', // Same-origin path proxied to app.vosik.io via Render static-site rewrite rule.
  bookingUrl: 'https://api.leadconnectorhq.com/widget/bookings/vosik',
  // Demo videos ship statically from assets/videos/ (embedded in demo.html and index.html).
  salesEmail: 'sales@vosik.io',
  salesPhone: '865.235.3534'
};
