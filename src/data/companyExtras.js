const extras = {
  netflix: ['open-connect-control', 'Open Connect control', 'service', 'Decides which Netflix edge should hold which title before viewers ask.', 'origin', 'place popular titles'],
  youtube: ['content-id', 'Content ID', 'service', 'Checks uploads against known copyrighted audio and video.', 'encoder', 'fingerprint upload'],
  spotify: ['playlist-sync', 'Playlist sync', 'service', 'Keeps playlist edits ordered across phones, desktop, and offline devices.', 'workers', 'sync libraries'],
  twitch: ['live-ingest', 'Live ingest', 'service', 'Accepts one broadcaster feed and fans it into many quality levels.', 'encoder', 'package live feed'],
  tiktok: ['moderation', 'Safety moderation', 'service', 'Scores new clips before and after they enter recommendations.', 'encoder', 'moderate clip'],

  uber: ['safety', 'Trip safety', 'service', 'Watches unusual routes and exposes emergency workflows during a live trip.', 'queue', 'watch live trip'],
  airbnb: ['availability', 'Availability calendar', 'service', 'Prevents two guests from booking the same nights.', 'queue', 'lock dates'],
  amazon: ['inventory', 'Inventory reservation', 'service', 'Temporarily holds the last item while checkout finishes.', 'queue', 'reserve stock'],
  doordash: ['kitchen', 'Restaurant prep state', 'service', 'Tracks accepted, cooking, ready, and picked-up separately from courier location.', 'queue', 'update kitchen'],
  'uber-eats': ['kitchen', 'Restaurant prep state', 'service', 'Coordinates food readiness with courier arrival so neither waits too long.', 'queue', 'coordinate pickup'],
  shopify: ['sale-guard', 'Flash-sale guard', 'service', 'Protects inventory and checkout from overselling during a sudden spike.', 'queue', 'serialize scarce stock'],

  instagram: ['stories', 'Stories expiry', 'workers', 'Removes stories from active views after their short lifetime.', 'workers', 'expire story'],
  facebook: ['groups', 'Groups distribution', 'service', 'Applies membership and privacy before a group post reaches feeds.', 'workers', 'fan out to group'],
  x: ['celebrity-fanout', 'Celebrity fan-out', 'service', 'Treats giant accounts differently so one post does not overload follower inboxes.', 'workers', 'hybrid fan-out'],
  reddit: ['votes', 'Vote aggregation', 'service', 'Combines votes with age and confidence to rank a thread.', 'workers', 'recompute score'],
  linkedin: ['jobs-graph', 'Jobs graph', 'service', 'Connects skills, companies, recruiters, and candidates for ranking.', 'workers', 'update recommendations'],
  pinterest: ['visual-index', 'Visual similarity index', 'service', 'Finds pins that look alike, not only pins with matching words.', 'workers', 'index image'],
  snapchat: ['expiry', 'Snap expiry', 'workers', 'Tracks delivery and removes short-lived content under product rules.', 'workers', 'expire snap'],

  whatsapp: ['receipts', 'Delivery receipts', 'service', 'Tracks sent, delivered, and read without blocking message storage.', 'push', 'return receipt'],
  telegram: ['channels', 'Channel broadcast', 'service', 'Delivers one publisher message to very large subscriber groups.', 'push', 'broadcast channel'],
  slack: ['workspace-search', 'Workspace search', 'service', 'Indexes permitted messages and files while respecting workspace access.', 'push', 'update search'],
  discord: ['voice-relay', 'Voice relay', 'service', 'Routes live voice packets through a nearby region rather than chat storage.', 'push', 'relay voice'],
  zoom: ['media-router', 'Media router', 'service', 'Forwards live audio and video selectively so every participant does not send to everyone.', 'push', 'route conference'],

  stripe: ['webhook-delivery', 'Webhook delivery', 'workers', 'Retries merchant notifications safely because the merchant may be offline.', 'workers', 'retry webhook'],
  paypal: ['balance', 'Wallet balance', 'service', 'Projects spendable balance from ledger entries and pending transfers.', 'workers', 'update balance'],

  dropbox: ['conflicts', 'Conflict resolver', 'service', 'Handles two offline devices editing the same file before they reconnect.', 'workers', 'merge versions'],
  'google-drive': ['collaboration', 'Live collaboration', 'service', 'Orders concurrent edits so everyone sees one shared document.', 'workers', 'merge edits'],
  github: ['git-refs', 'Git refs service', 'service', 'Maps branches and tags to immutable Git objects.', 'workers', 'update refs'],
  notion: ['block-graph', 'Block graph', 'service', 'Builds pages from reusable blocks and resolves nested references.', 'workers', 'index blocks'],

  'google-search': ['knowledge-graph', 'Knowledge graph', 'service', 'Connects entities so a result can understand that “Jaguar” may be a car or animal.', 'indexw', 'link entities'],
  gmail: ['spam', 'Spam classifier', 'service', 'Scores incoming mail before it reaches the inbox or search index.', 'indexw', 'classify mail'],
  'google-maps': ['route-graph', 'Road graph', 'service', 'Combines roads, restrictions, and live traffic to choose a route.', 'indexw', 'refresh routes'],
}

export function companyExtra(company) {
  const value = extras[company.id]
  if (!value) return null
  const [id, title, kind, blurb, from, label] = value
  return {
    node: { id, title, kind, blurb, depth: 6 },
    edge: { from, to: id, label },
  }
}
