import {createClient} from "@/lib/client";
import {SignUpData, UserProfile} from "@/types";
import {LoginRequest} from "@/types/Auth";

const supabase = createClient();

async function signUp(form: SignUpData) {
    const {data: user, error} = await supabase.auth.signUp(form);
    if (error) throw error;

    const { data: userProfile, error: updateError } = await supabase
        .from("user_profile")
        .update({
            display_name: form.display_name,
            username: form.username,
        })
        .eq("user_id", user.user?.id)
        .select("*") // This ensures the updated row is returned
        .single();

    return userProfile;

}

async function login(form: LoginRequest) {
    const {data: user, error} = await supabase.auth.signInWithPassword(form);
    if (error) throw error;

    const {data: userProfile, error:err} = await supabase
        .from('user_profile')
        .select('*')
        .eq('user_id',user.user?.id);

    return userProfile;
}

export {signUp, login};