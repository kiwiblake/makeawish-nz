import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required' });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

  if (!apiKey || !listId) {
    console.error('Missing Campaign Monitor configuration');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.createsend.com/api/v3.3/subscribers/${listId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(apiKey + ':').toString('base64'),
        },
        body: JSON.stringify({
          EmailAddress: email,
          Name: name,
          Resubscribe: true,
          RestartSubscriptionBasedAutoresponders: true,
          ConsentToTrack: 'yes',
        }),
      }
    );

    if (response.ok) {
      return res.status(200).json({ message: 'Successfully subscribed!' });
    }

    const errorData = await response.json().catch(() => ({}));

    // Code 203 means already subscribed
    if (errorData.Code === 203) {
      return res.status(200).json({ message: 'You are already subscribed.' });
    }

    console.error('Campaign Monitor error:', response.status, errorData);
    return res.status(400).json({
      message: errorData.Message || 'Failed to subscribe. Please try again.'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
}
