// middlerware to check userid and has premium plan
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();
    const hasPremiumPlan = await has({ plan: "premium" });

    const user = await clerkClient.users.getUser(userId);
    const free_usage = user.privateMetadata?.free_usage ?? 0;

    req.free_usage = hasPremiumPlan ? 0 : free_usage;
    req.plan = hasPremiumPlan ? "premium" : "free";

    if (!hasPremiumPlan && user.privateMetadata?.free_usage === undefined) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
