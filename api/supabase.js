import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ilajfnmvoswcwfzkofrs.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_0553b2c9f96f875efdf5ec53587df8cbcec76e2d';

export const supabase = createClient(supabaseUrl, supabaseKey);
