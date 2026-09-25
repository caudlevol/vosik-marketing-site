/* Developer configuration. Empty values keep unconnected services honest. */
window.VOSIK_CONFIG = {
  quoteEndpoint: '/api/leads', // Same-origin path proxied to app.vosik.io via Render static-site rewrite rule.
  bookingUrl: 'https://calendly.com/vosik/30min',
  videoUrl: '',      // Approved MP4/WebM URL; see README for embedding a hosted player instead.
  videoCaptions: '', // Local VTT path for the approved video.
  salesEmail: 'hunter@vosik.io',
  salesPhone: '865.235.3534'
};
