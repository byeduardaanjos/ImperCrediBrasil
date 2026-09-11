"use client";
import {useEffect,useState} from "react";
import {ArrowRight,BriefcaseBusiness,Building2,Check,Landmark,MapPin,Menu,MessageCircle,ShieldCheck,UserRound,X} from "lucide-react";

const SUPABASE_URL="https://slrsyysqiftujhpxokdm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_kjlZu6_e0Md4HV4MtnRdPg_UeXejXL1";
function parseCurrency(value:string){return Number(value.replace(/[^\d,.-]/g,"").replace(/\./g,"").replace(",","."))}
function formatPhone(value:string){const digits=value.replace(/\D/g,"").slice(0,11);if(digits.length<=2)return digits;if(digits.length<=6)return `(${digits.slice(0,2)}) ${digits.slice(2)}`;if(digits.length<=10)return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`}
function formatCurrency(value:string){const digits=value.replace(/\D/g,"").slice(0,12);if(!digits)return "";return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(digits)/100)}
function cleanName(value:string){return value.replace(/[^\p{L}\s'-]/gu,"").replace(/\s{2,}/g," ").slice(0,120)}
function formatCpf(value:string){const digits=value.replace(/\D/g,"").slice(0,11);return digits.replace(/^(\d{3})(\d)/,"$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3").replace(/\.(\d{3})(\d)/,".$1-$2")}
function formatCep(value:string){const digits=value.replace(/\D/g,"").slice(0,8);return digits.replace(/^(\d{5})(\d)/,"$1-$2")}
function validCpf(value:string){const cpf=value.replace(/\D/g,"");if(cpf.length!==11||/^(\d)\1{10}$/.test(cpf))return false;const digit=(length:number)=>{let sum=0;for(let i=0;i<length;i++)sum+=Number(cpf[i])*(length+1-i);const rest=(sum*10)%11;return rest===10?0:rest};return digit(9)===Number(cpf[9])&&digit(10)===Number(cpf[10])}
const solutions=[[UserRound,"Crédito pessoal","Para planos, projetos e imprevistos."],[Landmark,"Com garantia","Mais prazo e condições diferenciadas."],[BriefcaseBusiness,"Para empresas","Crédito para apoiar o seu negócio."]] as const;
function Brand(){return <span className="brand"><img src="/imper-logo-transparent.png" alt="Imper Credi Brasil"/></span>}

export default function Home(){
 const[menu,setMenu]=useState(false),[sent,setSent]=useState(false),[sending,setSending]=useState(false),[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");
  const form=new FormData(e.currentTarget);
  const fullName=String(form.get("nome")||"").trim();
  const whatsapp=String(form.get("whatsapp")||"").trim();
  const email=String(form.get("email")||"").trim().toLowerCase();
  const cpf=String(form.get("cpf")||"").replace(/\D/g,"");
  const postalCode=String(form.get("cep")||"").replace(/\D/g,"");
  const address=String(form.get("endereco")||"").trim();
  const addressNumber=String(form.get("numero")||"").trim();
  const neighborhood=String(form.get("bairro")||"").trim();
  const complement=String(form.get("complemento")||"").trim();
  const city=String(form.get("cidade")||"").trim();
  const state=String(form.get("uf")||"").trim().toUpperCase();
  const desiredAmount=parseCurrency(String(form.get("valor")||""));
  const monthlyIncome=parseCurrency(String(form.get("renda")||""));
  if(fullName.split(/\s+/).length<2){setError("Digite seu nome e sobrenome.");return}
  if(!/^\d{10,11}$/.test(whatsapp.replace(/\D/g,""))){setError("Digite um WhatsApp válido com DDD.");return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError("Digite um e-mail válido.");return}
  if(!validCpf(cpf)){setError("Digite um CPF válido.");return}
  if(postalCode.length!==8){setError("Digite um CEP válido com 8 números.");return}
  if(address.length<5||!addressNumber||neighborhood.length<2||city.length<2||!/^[A-Z]{2}$/.test(state)){setError("Confira rua, número, bairro, cidade e UF.");return}
  if(!Number.isFinite(desiredAmount)||desiredAmount<=0||!Number.isFinite(monthlyIncome)||monthlyIncome<=0){setError("Digite valores válidos para crédito e renda.");return}
  setSending(true);
  const lead={full_name:fullName,whatsapp,email,cpf,postal_code:postalCode,address,address_number:addressNumber,neighborhood,complement:complement||null,city,state,desired_amount:desiredAmount,monthly_income:monthlyIncome,consent_at:new Date().toISOString(),source:"site"};
  try{
   const response=await fetch(`${SUPABASE_URL}/rest/v1/leads`,{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(lead)});
   if(!response.ok)throw new Error();
   if(document.activeElement instanceof HTMLElement)document.activeElement.blur();
   setSent(true);
  }catch{setError("Não conseguimos enviar agora. Tente novamente em instantes.")}
  finally{setSending(false)}
 }
 useEffect(()=>{
  const elements=document.querySelectorAll(".trust,.section,.contact,footer,.cards article");
  elements.forEach(element=>element.classList.add("reveal"));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
  elements.forEach(element=>observer.observe(element));
  return()=>observer.disconnect();
 },[]);
 return <main>
  <header><a href="#inicio"><Brand/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Fechar menu":"Abrir menu"}>{menu?<X/>:<Menu/>}</button><nav className={menu?"open":""}><a href="#solucoes" onClick={()=>setMenu(false)}>Soluções</a><a href="#simulacao" onClick={()=>setMenu(false)}>Simulação</a><a href="#contato" onClick={()=>setMenu(false)}>Contato</a></nav><a className="header-button" href="#simulacao">Simular crédito</a></header>
  <section className="hero" id="inicio"><p className="tag">IMPER CREDI BRASIL</p><h1>Crédito direto.<br/><span>Atendimento de verdade.</span></h1><p>Soluções financeiras com clareza, segurança e acompanhamento.</p><a className="button red" href="#simulacao">Fazer simulação <ArrowRight size={18}/></a></section>
  <section className="trust"><span><ShieldCheck/>Análise responsável</span><span><MessageCircle/>Atendimento humano</span><span><Check/>Processo transparente</span></section>
  <section className="section solutions" id="solucoes"><div className="heading"><p className="tag">SOLUÇÕES</p><h2>Encontre a melhor opção.</h2></div><div className="cards">{solutions.map(([Icon,title,text],i)=><article key={title}><small>0{i+1}</small><Icon/><h3>{title}</h3><p>{text}</p><a href="#simulacao">Simular <ArrowRight size={15}/></a></article>)}</div></section>
  <section className="section simulation" id="simulacao"><div className="simulation-copy"><p className="tag">SIMULAÇÃO</p><h2>Vamos começar?</h2><p>Envie seus dados. Nossa equipe continua o atendimento pelo WhatsApp.</p></div><form onSubmit={submit}>{sent?<div className="success"><Check/><h3>Simulação recebida.</h3><p>Em breve, nossa equipe entrará em contato.</p><button type="button" onClick={()=>setSent(false)}>Fazer outra</button></div>:<><label>Nome completo *<input name="nome" required minLength={3} maxLength={120} autoComplete="name" placeholder="Ex.: João da Silva" onInput={e=>{e.currentTarget.value=cleanName(e.currentTarget.value)}}/></label><label>Telefone (com DDD) *<div className="phone-field"><span>+55</span><input name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" maxLength={15} onInput={e=>{e.currentTarget.value=formatPhone(e.currentTarget.value)}}/></div></label><label>E-mail *<input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="Ex.: nome@email.com"/></label><div className="row"><label>CPF *<input name="cpf" required inputMode="numeric" placeholder="000.000.000-00" maxLength={14} onInput={e=>{e.currentTarget.value=formatCpf(e.currentTarget.value)}}/></label><label>CEP *<input name="cep" required inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" maxLength={9} onInput={e=>{e.currentTarget.value=formatCep(e.currentTarget.value)}}/></label></div><div className="row address-row"><label>Rua *<input name="endereco" required minLength={3} maxLength={180} autoComplete="address-line1" placeholder="Ex.: Rua Central"/></label><label>Número *<input name="numero" required maxLength={20} inputMode="text" placeholder="Ex.: 123"/></label></div><div className="row"><label>Bairro *<input name="bairro" required minLength={2} maxLength={100} autoComplete="address-level3" placeholder="Ex.: Centro"/></label><label>Complemento<input name="complemento" maxLength={120} autoComplete="address-line2" placeholder="Ex.: Apto. 12"/></label></div><div className="row city-row"><label>Cidade *<input name="cidade" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Ex.: Florianópolis"/></label><label>UF *<input name="uf" required minLength={2} maxLength={2} autoComplete="address-level1" placeholder="SC" onInput={e=>{e.currentTarget.value=e.currentTarget.value.replace(/[^a-zA-Z]/g,"").toUpperCase().slice(0,2)}}/></label></div><div className="row"><label>Valor desejado *<input name="valor" required inputMode="numeric" placeholder="R$ 10.000,00" onInput={e=>{e.currentTarget.value=formatCurrency(e.currentTarget.value)}}/></label><label>Renda aproximada *<input name="renda" required inputMode="numeric" placeholder="R$ 4.000,00" onInput={e=>{e.currentTarget.value=formatCurrency(e.currentTarget.value)}}/></label></div><label className="consent"><input type="checkbox" required/><span>Autorizo o uso dos dados informados para análise da solicitação e contato da equipe.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button dark" disabled={sending}>{sending?"Enviando...":"Solicitar atendimento"} {!sending&&<ArrowRight size={18}/>}</button></>}</form></section>
  <section className="contact" id="contato"><div><p className="tag">CONTATO</p><h2>Fale com a Imper Credi.</h2></div><a href="https://wa.me/554825000264" target="_blank" rel="noreferrer"><MessageCircle/><span><small>ATENDIMENTO</small><strong>WhatsApp</strong></span><ArrowRight/></a><a href="https://www.instagram.com/impercredibrasil" target="_blank" rel="noreferrer"><Building2/><span><small>NOVIDADES</small><strong>Instagram</strong></span><ArrowRight/></a><a href="https://www.google.com/maps/search/?api=1&query=Av.+Central,+500,+Centro,+Florian%C3%B3polis,+SC" target="_blank" rel="noreferrer"><MapPin/><span><small>ENDEREÇO</small><strong>Localização</strong></span><ArrowRight/></a></section>
  <footer><Brand/><p>Crédito com clareza e confiança.</p><small>© 2026 Imper Credi Brasil</small></footer>
 </main>
}
