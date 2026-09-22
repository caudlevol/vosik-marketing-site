/* Developer configuration. Empty values keep unconnected services honest. */
window.VOSIK_CONFIG = {
  quoteEndpoint: '', // HTTPS endpoint accepting JSON. Add server-side validation and abuse protection.
  bookingUrl: '',    // BOOKING URL TBD: approved meeting-scheduling URL for vosik.io. Empty keeps [data-booking] links on quote.html.
  videoUrl: '',      // Approved MP4/WebM URL; see README for embedding a hosted player instead.
  videoCaptions: '', // Local VTT path for the approved video.
  salesEmail: '',
  salesPhone: ''
};
