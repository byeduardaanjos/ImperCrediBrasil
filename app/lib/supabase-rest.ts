export const SUPABASE_URL="https://slrsyysqiftujhpxokdm.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY="sb_publishable_kjlZu6_e0Md4HV4MtnRdPg_UeXejXL1";

export type AuthSession={
 access_token:string;
 refresh_token:string;
 expires_in:number;
 expires_at?:number;
 user:{id:string;email?:string};
};

const SESSION_KEY="impercredi_admin_session";

export function saveSession(session:AuthSession){
 const value={...session,expires_at:session.expires_at??Math.floor(Date.now()/1000)+session.expires_in};
 localStorage.setItem(SESSION_KEY,JSON.stringify(value));
 return value;
}

export function readSession():AuthSession|null{
 try{return JSON.parse(localStorage.getItem(SESSION_KEY)||"null") as AuthSession|null}catch{return null}
}

export function clearSession(){localStorage.removeItem(SESSION_KEY)}

export async function signIn(email:string,password:string){
 const response=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{
  method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json"},body:JSON.stringify({email,password})
 });
 if(!response.ok)throw new Error("E-mail ou senha inválidos.");
 return saveSession(await response.json() as AuthSession);
}

export async function activeSession(){
 const current=readSession();
 if(!current)return null;
 if((current.expires_at??0)>Math.floor(Date.now()/1000)+60)return current;
 const response=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,{
  method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json"},body:JSON.stringify({refresh_token:current.refresh_token})
 });
 if(!response.ok){clearSession();return null}
 return saveSession(await response.json() as AuthSession);
}

export async function signOut(){
 const session=readSession();
 if(session)await fetch(`${SUPABASE_URL}/auth/v1/logout`,{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${session.access_token}`}}).catch(()=>undefined);
 clearSession();
}

export async function supabaseRequest(path:string,init:RequestInit={}){
 const session=await activeSession();
 if(!session)throw new Error("SESSION_EXPIRED");
 return fetch(`${SUPABASE_URL}/rest/v1/${path}`,{...init,headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${session.access_token}`,"Content-Type":"application/json",...(init.headers||{})}});
}
