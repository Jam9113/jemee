// api/order.js (Vercel API route)
const { createClient } = require('@supabase/supabase-js');

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for backend operations
  );

  if (req.method === 'POST') {
    const { customerName, items, total, deliveryOption, address, paymentMethod, gcashNumber } = req.body;

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_name: customerName,
          items: JSON.stringify(items),
          total: total,
          delivery_option: deliveryOption,
          address: address,
          payment_method: paymentMethod,
          gcash_number: gcashNumber || null
        }]);

      if (error) throw error;

      return res.status(200).json({ message: 'Order placed successfully!' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
