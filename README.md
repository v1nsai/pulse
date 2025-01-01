# Pulse: Social Media for Humans
Pulse is a social media platform focused on humans talking to humans (though bots are also welcome). Pulse uses your phone's existing biometric authentication (through Apple on iPhone or Google on Android) to verify that every post is made by a human.

The Pulse app is based on [Bluesky](https://github.com/bluesky-social/social-app) and federates with the [AT Protocol](https://github.com/bluesky-social/atproto).

## Why?
Bots on social media are a good thing. They can automatically create posts on breaking news or the latest memes from other sources, and do other cool things. The problem is that social media is flooded with bots PRETENDING TO BE PEOPLE in order to influence, annoy, divide and enrage us.  We're quickly moving toward a [Dead Internet](https://en.wikipedia.org/wiki/Dead_Internet_theory).  

We need a way to know when we're talking to actual humans and when we are talking to bots.  Biometric authentication performs authentication using our bodies, such as a face or fingerprint.  Providing this authentication can also be used to prove that you are human.

Luckily, smartphones already provide biometric authentication that is strong enough to be trusted by banks.  By leveraging existing authentication methods that we already use every day with our phones, a social media network could provide a reasonable guarantee that a poster is human.  At the very least this makes running botnets of fake humans more difficult.

## Am I sharing my biometric information with you?
No. You are sharing your biometric information with Apple or Google. If you are already using biometric authentication to unlock your phone or use any other app on your phone, you're already set up! You are only giving Pulse permission to use that existing authentication.

## Am I sharing my real identity with you?
No. The Pulse app only sees THAT you are a human, not WHICH human you are when you authenticate to post. You may have shared that information with Apple or Google, but the app isn't requesting it and they aren't sharing it.

## Can I post as a human from a device other than an iPhone or Android smartphone?
No. Web browsers can't provide the attestation necessary to ensure that local biometric authentication is actually happening.  Without Apple App Attestation or Google SafetyNet, anyone could make a Pulse client and skip performing local biometric auth to post as a human.  The only way the server can verify that this didn't happen is by verifying the client app the request is coming from with Apple or Google.  The web browser simply can't do this.

## Compared to Bluesky, what additional information am I sharing with Pulse?
Pulse only needs to know whether to use Apple or Google for post verification.  No other details are needed or requested.

## Can I post as a bot on my human account if I want to use a web browser and not verify?
Maybe that's something that could be supported, but not for now.

## How do you deal with bot farms that will have a human sitting in front of 50 phones making posts?
You can't really, but this is still significantly more difficult than running bot farms on Reddit or Twitter or Bluesky or any of the others.

## Implementation Outline
### Pulse PDS
* Additional db schema fields
	* Profile
		* isHuman - boolean
	* Post
		* isBioAuthenticated - boolean (allow human profile to post without bioauth?  Would allow posting from web browser since auth is strictly iOS/Android for now)
* Additional pre-post logic
	* Check Apple App Attestation/Google SafetyNet token included in request before posting to ensure malicious client can't skip local bio authentication

### Pulse UI
* Additional post fields
    * isBioAuthenticated = true if post verification succeeds
* Additional pre-post logic
	* Perform local auth using "expo-local-authentication" lib, if successful, get Attestation/Safetynet token and send with request