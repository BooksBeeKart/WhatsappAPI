const axios = require('axios').default;
const express = require('express');
const app = express();

app.post('/webhooks/orders/create', async (req, res) => {
const body = await getRawBody(req);

const order = JSON.parse(body.toString());

console.log("Yes, We got an order!", order.customer.phone);
  
const data = {
        "messaging_product": "whatsapp", 
         "to": `${order.customer.phone}`, 
        "type": "template", 
         "template": { 
        "name": "order_confirmation", 
        "language": { "code": "en_GB" },
        "components": [
        {
          "type": "body",
          "parameters": [
          {
            "type": "text",
            "text": `${order.customer.first_name}`
          },
          {
            "type": "text",
            "text": `${order.id}`
          }
        ]
      }
    ] 
  } 
} ;

 const config = {
 headers: { Authorization: `Bearer EAAQFnkM8sE0BO8lJLvhGNp0acYheQaAA7OYsrmviRNEg2N6x9Y9aWb6Wga9ZCr3arlkhTKDz8tKu97c50HDIsw3qZBwJu2E9CnNb2NAHxZAmjjxtgfMY6BvD7rLDuZAl3sJcRzPXI8fWS55lTJifBAQSZA0PZC4VkuJZCHAIIEVmjlLZBl3NewbKKFKM5p2qiOeCLfNRY85bcVbPXAXJsC8ZD`, 'Content-Type':   'application/json'}
};


  if (order.customer.phone) {
   return res.sendStatus(403);
  } else {
  axios
  .post(
    "https://graph.facebook.com/v19.0/1132077197865037/messages",
  data,
  config
  )
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

  return res.sendStatus(200);
}
});

 