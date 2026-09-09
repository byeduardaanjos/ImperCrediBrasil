"use client";
import {useEffect,useState} from "react";
import {ArrowRight,BriefcaseBusiness,Building2,Check,ChevronDown,Landmark,MapPin,Menu,MessageCircle,ShieldCheck,Sparkles,UserRound,X} from "lucide-react";

const SUPABASE_URL="https://slrsyysqiftujhpxokdm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_kjlZu6_e0Md4HV4MtnRdPg_UeXejXL1";
function parseCurrency(value:string){return Number(value.replace(/[^\d,.-]/g,"").replace(/\./g,"").replace(",","."))}
function formatPhone(value:string){const digits=value.replace(/\D/g,"").slice(0,11);if(digits.length<=2)return digits;if(digits.length<=6)return `(${digits.slice(0,2)}) ${digits.slice(2)}`;if(digits.length<=10)return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`}
function formatCurrency(value:string){const digits=value.replace(/\D/g,"").slice(0,12);if(!digits)return "";return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(digits)/100)}
function cleanName(value:string){return value.replace(/[^\p{L}\s'-]/gu,"").replace(/\s{2,}/g," ").slice(0,120)}
const solutions=[[UserRound,"Crédito pessoal","Para planos, projetos e imprevistos."],[Landmark,"Com garantia","Mais prazo e condições diferenciadas."],[BriefcaseBusiness,"Para empresas","Crédito para apoiar o seu negócio."]] as const;
function Brand(){return <span className="brand"><img src="/imper-logo-transparent.png" alt="Imper Credi Brasil"/></span>}

export default function Home(){
 const[menu,setMenu]=useState(false),[sent,setSent]=useState(false),[sending,setSending]=useState(false),[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");
  const form=new FormData(e.currentTarget);
  const fullName=String(form.get("nome")||"").trim();
  const whatsapp=String(form.get("whatsapp")||"").trim();
  const address=String(form.get("endereco")||"").trim();
  const neighborhood=String(form.get("bairro")||"").trim();
  const city=String(form.get("cidade")||"").trim();
  const desiredAmount=parseCurrency(String(form.get("valor")||""));
  const monthlyIncome=parseCurrency(String(form.get("renda")||""));
  if(fullName.split(/\s+/).length<2){setError("Digite seu nome e sobrenome.");return}
  if(!/^\d{10,11}$/.test(whatsapp.replace(/\D/g,""))){setError("Digite um WhatsApp válido com DDD.");return}
  if(address.length<5||neighborhood.length<2||city.length<2){setError("Confira o endereço, bairro e cidade.");return}
  if(!Number.isFinite(desiredAmount)||desiredAmount<=0||!Number.isFinite(monthlyIncome)||monthlyIncome<=0){setError("Digite valores válidos para crédito e renda.");return}
  setSending(true);
  const lead={full_name:fullName,whatsapp,address,neighborhood,city,desired_amount:desiredAmount,monthly_income:monthlyIncome,consent_at:new Date().toISOString(),source:"site"};
  try{
   const response=await fetch(`${SUPABASE_URL}/rest/v1/leads`,{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(lead)});
   if(!response.ok)throw new Error();
   if(document.activeElement instanceof HTMLElement)document.activeElement.blur();
   setSent(true);
  }catch{setError("Não conseguimos enviar agora. Tente novamente em instantes.")}
  finally{setSending(false)}
 }
 useEffect(()=>{
  if(window.matchMedia("(max-width: 700px)").matches)return;
  const elements=document.querySelectorAll(".trust,.section,.contact,footer,.cards article");
  elements.forEach(element=>element.classList.add("reveal"));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
  elements.forEach(element=>observer.observe(element));
  return()=>observer.disconnect();
 },[]);
 return <main>
  <header><a href="#inicio" aria-label="Imper Credi Brasil — início"><Brand/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Fechar menu":"Abrir menu"}>{menu?<X/>:<Menu/>}</button><nav className={menu?"open":""}><a href="#solucoes" onClick={()=>setMenu(false)}>Soluções</a><a href="#simulacao" onClick={()=>setMenu(false)}>Simulação</a><a href="#contato" onClick={()=>setMenu(false)}>Contato</a></nav><a className="header-button" href="#simulacao">Simular crédito <ArrowRight size={15}/></a></header>

  <section className="hero" id="inicio"><div className="hero-content"><p className="tag"><span/> IMPER CREDI BRASIL</p><h1>Crédito que<br/><span>move planos.</span></h1><p>Condições pensadas para o seu momento, com análise responsável e atendimento próximo.</p><div className="hero-actions"><a className="button red" href="#simulacao">Fazer simulação <ArrowRight size={18}/></a><a className="text-link" href="#solucoes">Conhecer soluções <ChevronDown size={16}/></a></div></div><aside className="hero-note"><Sparkles/><small>ATENDIMENTO PERSONALIZADO</small><strong>Uma conversa clara.<br/>Uma proposta sob medida.</strong><span>Imper Credi Brasil</span></aside><div className="hero-index" aria-hidden="true">01 <i/> 03</div></section>

  <section className="trust"><span><ShieldCheck/><em>01</em> Análise responsável</span><span><MessageCircle/><em>02</em> Atendimento humano</span><span><Check/><em>03</em> Processo transparente</span></section>

  <section className="section solutions" id="solucoes"><div className="heading"><p className="tag">SOLUÇÕES</p><h2>Crédito para cada<br/><span>próximo passo.</span></h2></div><div className="cards">{solutions.map(([Icon,title,text],i)=><article key={title}><div className="card-top"><small>0{i+1}</small><Icon/></div><div><h3>{title}</h3><p>{text}</p></div><a href="#simulacao">Quero simular <ArrowRight size={15}/></a></article>)}</div></section>

  <section className="section simulation" id="simulacao"><div className="simulation-copy"><p className="tag">SIMULAÇÃO</p><h2>Seu próximo passo começa aqui.</h2><p>Preencha os dados com tranquilidade. Um especialista dará continuidade pelo WhatsApp.</p><div className="secure-note"><ShieldCheck/><span><strong>Ambiente seguro</strong><small>Seus dados são usados somente para o atendimento.</small></span></div></div><form onSubmit={submit}><div className="form-head"><span>SIMULAÇÃO DE CRÉDITO</span><small>Leva menos de 2 minutos</small></div>{sent?<div className="success"><span><Check/></span><h3>Simulação recebida.</h3><p>Em breve, nossa equipe entrará em contato.</p><button type="button" onClick={()=>setSent(false)}>Fazer outra</button></div>:<><label>Nome completo<input name="nome" required minLength={3} maxLength={120} autoComplete="name" placeholder="Ex.: João da Silva" onInput={e=>{e.currentTarget.value=cleanName(e.currentTarget.value)}}/></label><label>WhatsApp<input name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" maxLength={15} onInput={e=>{e.currentTarget.value=formatPhone(e.currentTarget.value)}}/></label><label>Endereço<input name="endereco" required minLength={5} maxLength={180} autoComplete="street-address" placeholder="Ex.: Rua Central, 123"/></label><div className="row"><label>Bairro<input name="bairro" required minLength={2} maxLength={100} autoComplete="address-level3" placeholder="Ex.: Centro"/></label><label>Cidade<input name="cidade" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Ex.: Florianópolis"/></label></div><div className="row"><label>Valor desejado<input name="valor" required inputMode="numeric" placeholder="R$ 10.000,00" onInput={e=>{e.currentTarget.value=formatCurrency(e.currentTarget.value)}}/></label><label>Renda aproximada<input name="renda" required inputMode="numeric" placeholder="R$ 4.000,00" onInput={e=>{e.currentTarget.value=formatCurrency(e.currentTarget.value)}}/></label></div><label className="consent"><input type="checkbox" required/><span>Autorizo o contato para continuar esta solicitação.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button dark" disabled={sending}>{sending?"Enviando...":"Solicitar atendimento"} {!sending&&<ArrowRight size={18}/>}</button></>}</form></section>

  <section className="contact" id="contato"><div><p className="tag">CONTATO</p><h2>Fale com a Imper Credi.</h2></div><a href="#simulacao"><MessageCircle/><span><small>ATENDIMENTO</small><strong>WhatsApp</strong></span><ArrowRight/></a><a href="https://www.instagram.com/impercredibrasil" target="_blank" rel="noreferrer"><Building2/><span><small>NOVIDADES</small><strong>Instagram</strong></span><ArrowRight/></a><a href="https://www.google.com/maps/search/?api=1&query=Av.+Central,+500,+Centro,+Florian%C3%B3polis,+SC" target="_blank" rel="noreferrer"><MapPin/><span><small>ENDEREÇO</small><strong>Localização</strong></span><ArrowRight/></a></section>

  <footer><Brand/><p>Crédito com clareza e confiança.</p><small>© 2026 Imper Credi Brasil</small></footer>
 </main>
}
