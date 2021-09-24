# Razorpay Payment Gateway API

## creating an order

```JavaScript
const express = require('express');
const Razorpay = require('Razorpay'); 
  
// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: rzp_test_fiIwmRET6CApc2,
  
    // Replace with your key_secret
    key_secret: YAEUthsup8SijNs3iveeVlL1
});
  
const app = express();
const PORT = process.env.PORT || '5000';
  
// Here we will create two routes 
// /createOrder Route
app.post('/createOrder', (req, res)=>{ 
  
    // STEP 1:
    const {amount,currency,receipt, notes}  = req.body;      
          
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          
          //STEP 3 & 4: 
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
}); 


  
app.listen(PORT, ()=>{
    console.log("Server is Listening on Port ", PORT);
});

```

## Sending Request from frontend to backend

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
   var options = {
       "key": "rzp_test_fiIwmRET6CApc2", 
       "amount": "49900", 
       "currency": "INR",
       "name": "Dummy Academy",
       "description": "Pay & Checkout this Course, Upgrade your DSA Skill",
        "image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
       "order_id": "order_HdPuQW0s9hY9AU",  
       "handler": function (response){
           console.log(response)
           alert("This step of Payment Succeeded");
       },
       "prefill": {
          //Here we are prefilling random contact
         "contact":"9876543210", 
           //name and email id, so while checkout
         "name": "Twinkle Sharma",  
         "email": "smtwinkle@gmail.com"  . 
       },
      "notes" : {
         "description":"Best Course for SDE placements",
         "language":"Available in 4 major Languages JAVA", 
                     C/C++, Python, Javascript",
         "access":"This course have Lifetime Access"
       }, 
       "theme": {
           "color": "#2300a3"
       }
   };
   var razorpayObject = new Razorpay(options);
   console.log(razorpayObject);
   razorpayObject.on('payment.failed', function (response){
         console.log(respone);
         alert("This step of Payment Failed");
   });
     
   document.getElementById('pay-button').onclick = function(e){
       razorpayObject.open();
       e.preventDefault();
   }
</script>
```

## Verifying Payment

````JavaScript
//Inside app.js
app.post('/verifyOrder',  (req, res)=>{ 
      
    // STEP 7: Receive Payment Data
    const {order_id, payment_id} = req.body;     
    const razorpay_signature =  req.headers['x-razorpay-signature'];
  
    // Pass yours key_secret here
    const key_secret = YAEUthsup8SijNs3iveeVlL1;     
  
    // STEP 8: Verification & Send Response to User
      
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 
  
    // Passing the data to be hashed
    hmac.update(order_id + "|" + payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
      
    if(razorpay_signature===generated_signature){
        res.json({success:true, message:"Payment has been verifed"})
    }
    else
    res.json({success:false, message:"Payment verification failed"})
});
```




