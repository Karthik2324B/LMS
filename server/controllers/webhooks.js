import User from "../models/user.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  console.log('hi');
  
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log('Webhook received:', type, data);

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        console.log('Creating user:', userData);
        await User.create(userData);
        res.json({ success: true });
        console.log('User created successfully');
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        console.log('Updating user:', data.id, userData);
        await User.findByIdAndUpdate(data.id, userData);
        res.json({ success: true });
        break;
      }

      case 'user.deleted': {
        console.log('Deleting user:', data.id);
        await User.findByIdAndDelete(data.id);
        res.json({ success: true });
        break;
      } 

      default: 
        console.log('Unhandled webhook type:', type);
        res.json({ success: true });
        break;
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};