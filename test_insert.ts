import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data: users, error: errUser } = await supabase.from('users').select('id').limit(1);
  if (errUser || !users || users.length === 0) {
    console.error("User fetch error:", errUser);
    return;
  }
  const userId = users[0].id;

  const { error } = await supabase.from('diario').insert({
    user_id: userId,
    data: new Date().toISOString().split('T')[0],
    observacao: 'TESTE-SCRIPT'
  });

  if (error) {
    console.error("INSERT ERROR:", error);
  } else {
    console.log("INSERT SUCCESS");
  }
}

testInsert();
