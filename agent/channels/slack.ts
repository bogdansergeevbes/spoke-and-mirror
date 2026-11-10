import { connectSlackCredentials } from "@vercel/connect/eve";
import { defaultSlackAuth, slackChannel } from "eve/channels/slack";

export default slackChannel({
  // The connector uid lives in SLACK_CONNECTOR (set it on the project, or leave
  // it unset). The fallback matches a connector named after the spoke-and-mirror
  // project, which is what `eve add channel/slack` usually creates.
  credentials: connectSlackCredentials(
    process.env.SLACK_CONNECTOR ?? "slack/spoke-and-mirror",
  ),

  // Answer @mentions from people; ignore other bots. defaultSlackAuth stamps
  // Slack identity, but does not invent a shop membership tier.
  onAppMention: (ctx, message) =>
    message.author?.isBot ? null : { auth: defaultSlackAuth(message, ctx) },

  // No delivery code needed: eve's default renderer posts the final reply to
  // the thread and shows tool-call narration as the thread status instead.
});
