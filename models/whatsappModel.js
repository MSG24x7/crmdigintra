const mongoose = require('mongoose');

// Define the schema for media (images, videos, etc.)
const MediaSchema = new mongoose.Schema({
  caption:{type:String, required: false},
  mime_type: { type: String, required: false },
  sha256: { type: String, required: false },
  id: { type: String, required: false },
  animated : {type:Boolean, required:false},
  url: { type: String, required: false } // Optional for direct media links
});

// Define the schema for messages
const MessageSchema = new mongoose.Schema({
  from: { type: String, required: false }, // Sender's ID
  to: { type: String, required: false }, // Receiver's ID
  id: { type: String, required: false }, // Unique message ID
  timestamp: { type: Date, required: false }, // Timestamp of the message
  type: { type: String, required: false }, // Type of message (text, image, etc.)
  identity:{
   acknowledged: {type:Boolean, required:false},
   created_timestamp : {type:String, required:false},
   hash:{type:String, required:false}
  },
  reaction:{
   emoji: {type:String, required:false},
   message_id: {type: String, required: false}
  },
  order:{
   catalog_id : {type:String, required:false},
   product_items : [
    {
    product_retailer_id : {type:String, required:false},
    quantity : {type:String, required:false},
    item_price : {type: String, required:false},
    currency: {type:String, required:false}
    }
   ],
   text: {type:String, required:false}
   },
  text: {
    body: { type: String, required: false } // Body of the text message
  },
  image: MediaSchema, // Optional for image messages
  video: MediaSchema, // Optional for video messages
  document: MediaSchema, // Optional for document messages
  sticker: MediaSchema,
  location:{
   latitude: {type:String, required:false},
   longtitue: {type:String, required:false},
   name:{type:String, required:false},
   address:{type:String, required:false}
  },
  button: {
  text: {type:String, required:false},
  payload: {type:String, required:false}
  },
  recipient_id : {type:String, required:false},
  errors: [{
  code: {type:String, required:false},
  details: {type:String, required:false},
  title: {type:String, required:false}
  }],
  context: {
    from: { type: String, required: false }, // Original message sender if it's a reply
    id: { type: String, required: false }, // ID of the original message
    referred_product: {
    catalog_id : {type:String, required:false},
    product_retailer_id : {type:String, required:false}
    }
  }
});


// Define the schema for statuses
const StatusSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique status ID
   from :{type:String, required:false},
   type: {type:String, required:false},
   payment:{
   reference_id: {type:String, required:false}
   },
  status: { type: String, required: false }, // Status (e.g., sent, delivered, failed)
  timestamp: { type: Date, required: false }, // Timestamp of the status
  recipient_id: { type: String, required: false }, // ID of the recipient
  conversation: {
    id: { type: String, required: false }, // Conversation ID
    expiration_timestamp: { type: Date, required: false }, // Conversation expiration timestamp
    origin: {
      type: { type: String, required: false } // Type of origin (e.g., service)
    }
  },
  pricing: {
    billable: { type: Boolean, required: false }, // Whether it's billable
    pricing_model: { type: String, required: false }, // Pricing model
    category: { type: String, required: false } // Pricing category
  },
  errors: [{
    code: { type: Number, required: false }, // Error code
    title: { type: String, required: false }, // Title of the error
    message: { type: String, required: false }, // Error message
    error_data: {
      details: { type: String, required: false } // Additional error details
    }
  }]
});

// Define the schema for contacts
const ContactSchema = new mongoose.Schema({
  profile: {
    name: { type: String, required: true }
  },
  wa_id: { type: String, required: true } // WhatsApp ID
});

// Define the main schema for the WhatsApp Business API response
const WhatsAppMessageSchema = new mongoose.Schema({
  object: { type: String, required: false },
  entry: [
    {
      id: { type: String, required: true },
      changes: [
        {
          value: {
            messaging_product: { type: String, required: true }, // Required field
            metadata: {
              display_phone_number: { type: String, required: true },
              phone_number_id: { type: String, required: true }
            },
            contacts: [ContactSchema],
            messages: [MessageSchema], // Optional messages
            statuses: [StatusSchema] // Updated to capture status updates
          },
          field: { type: String, required: true }
        }
      ]
    }
  ]
});

// Create the model
const WhatsAppModel = mongoose.model('WhatsAppMessage', WhatsAppMessageSchema);

module.exports = WhatsAppModel;