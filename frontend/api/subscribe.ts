export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { email, name } = await request.json();

  if (!email || !name) {
    return new Response(JSON.stringify({ message: 'Email and name are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

  if (!apiKey || !listId) {
    console.error('Missing Campaign Monitor configuration');
    return new Response(JSON.stringify({ message: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(
      `https://api.createsend.com/api/v3.3/subscribers/${listId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(apiKey + ':'),
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
      return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const errorData = await response.json().catch(() => ({}));

    // Code 203 means already subscribed
    if (errorData.Code === 203) {
      return new Response(JSON.stringify({ message: 'You are already subscribed.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.error('Campaign Monitor error:', response.status, errorData);
    return new Response(JSON.stringify({
      message: errorData.Message || 'Failed to subscribe. Please try again.'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ message: 'An error occurred. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
