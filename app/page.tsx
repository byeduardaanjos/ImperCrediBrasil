"use client";
import {useEffect,useState} from "react";
import {ArrowRight,BadgeCheck,BriefcaseBusiness,Building2,Check,FileText,Headphones,Landmark,LockKeyhole,MapPin,Menu,MessageCircle,ShieldCheck,UserRound,X} from "lucide-react";

const solutions=[[UserRound,"Crédito pessoal","Condições pensadas para seus planos e necessidades."],[Landmark,"Crédito com garantia","Mais prazo e possibilidades para sua negociação."],[BriefcaseBusiness,"Crédito empresarial","Recursos para movimentar e fortalecer seu negócio."]] as const;
const steps=[[FileText,"Preencha seus dados","Faça a simulação de forma simples e segura."],[Headphones,"Fale com a equipe","Um especialista entra em contato para entender seu perfil."],[BadgeCheck,"Receba sua proposta","Analisamos as opções e apresentamos a melhor condição."]] as const;
const SUPABASE_URL="https://slrsyysqiftujhpxokdm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_kjlZu6_e0Md4HV4MtnRdPg_UeXejXL1";

function parseCurrency(value:string){
 const normalized=value.replace(/[^\d,.-]/g,"").replace(/\./g,"").replace(",",".");
 return Number(normalized);
}

function Brand(){return <span className="brand"><img src="/imper-logo-transparent.png" alt="Imper Credi Brasil"/></span>}
function LeadForm(){
 const[sent,setSent]=useState(false);const[sending,setSending]=useState(false);const[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setSending(true);
  const form=new FormData(e.currentTarget);
  if(form.get("website")){setSending(false);return}
  const desiredAmount=parseCurrency(String(form.get("valor")||""));
  const monthlyIncome=parseCurrency(String(form.get("renda")||""));
  if(!Number.isFinite(desiredAmount)||desiredAmount<=0||!Number.isFinite(monthlyIncome)||monthlyIncome<=0){setError("Confira os valores informados.");setSending(false);return}
  const lead={full_name:String(form.get("nome")||"").trim(),whatsapp:String(form.get("whatsapp")||"").trim(),address:String(form.get("endereco")||"").trim(),neighborhood:String(form.get("bairro")||"").trim(),city:String(form.get("cidade")||"").trim(),desired_amount:desiredAmount,monthly_income:monthlyIncome,consent_at:new Date().toISOString(),source:"site"};
  try{
   const response=await fetch(`${SUPABASE_URL}/rest/v1/leads`,{method:"POST",headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(lead)});
   if(!response.ok)throw new Error("Não foi possível enviar");
   setSent(true);
  }catch{setError("Não conseguimos enviar agora. Tente novamente em instantes.")}
  finally{setSending(false)}
 }
 return <form className="lead-form" id="simulacao" onSubmit={submit}>{sent?<div className="success"><Check/><h2>Simulação recebida.</h2><p>Nossa equipe recebeu seus dados e entrará em contato pelo WhatsApp.</p><button type="button" onClick={()=>setSent(false)}>Fazer outra simulação</button></div>:<><div className="form-heading"><span>SIMULE AGORA</span><h2>Solicite uma análise</h2><p>Preencha os dados para nossa equipe entrar em contato.</p></div><label>Nome completo<input name="nome" required minLength={3} maxLength={120} autoComplete="name" placeholder="Digite seu nome"/></label><label>WhatsApp<input name="whatsapp" required minLength={10} maxLength={25} inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000"/></label><label>Endereço<input name="endereco" required minLength={5} maxLength={180} autoComplete="street-address" placeholder="Rua, avenida e número"/></label><div className="form-row"><label>Bairro<input name="bairro" required minLength={2} maxLength={100} autoComplete="address-level3" placeholder="Seu bairro"/></label><label>Cidade<input name="cidade" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Sua cidade"/></label></div><div className="form-row"><label>Valor desejado<input name="valor" required inputMode="decimal" placeholder="R$ 10.000,00"/></label><label>Renda aproximada<input name="renda" required inputMode="decimal" placeholder="R$ 4.000,00"/></label></div><input className="form-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/><label className="consent"><input name="consentimento" type="checkbox" required/><span>Autorizo o contato para continuar esta solicitação.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="submit-button" disabled={sending}>{sending?"Enviando...":"Solicitar atendimento"} {!sending&&<ArrowRight size={18}/>}</button><small className="security"><LockKeyhole size={14}/> Seus dados estão protegidos.</small></>}</form>
}

export default function Home(){const[menu,setMenu]=useState(false);useEffect(()=>{const els=document.querySelectorAll("[data-reveal]");const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.1});els.forEach(el=>observer.observe(el));return()=>observer.disconnect()},[]);return <main>
 <header><a href="#inicio" aria-label="Ir para o início"><Brand/></a><nav className={menu?"open":""}><a href="#inicio" onClick={()=>setMenu(false)}>Início</a><a href="#como-funciona" onClick={()=>setMenu(false)}>Como funciona</a><a href="#solucoes" onClick={()=>setMenu(false)}>Soluções</a><a href="#contato" onClick={()=>setMenu(false)}>Contato</a></nav><a className="header-cta" href="#simulacao">Simular crédito</a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Fechar menu":"Abrir menu"}>{menu?<X/>:<Menu/>}</button></header>
 <section className="hero" id="inicio"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">IMPER CREDI BRASIL</p><h1>Crédito que<br/><span>confia em você.</span></h1><div className="red-line"/><p className="hero-text">Faça sua simulação e receba um atendimento personalizado da nossa equipe.</p><a className="primary-button" href="#simulacao">Simular crédito <ArrowRight size={19}/></a></div><LeadForm/></div></section>
 <section className="trust"><span><ShieldCheck/>Análise responsável</span><span><MessageCircle/>Atendimento humano</span><span><Check/>Processo transparente</span></section>
 <section className="section solutions" id="solucoes" data-reveal><div className="section-heading"><p className="eyebrow">SOLUÇÕES</p><h2>Crédito para diferentes momentos.</h2></div><div className="cards">{solutions.map(([Icon,title,text],i)=><article key={title}><div className="card-top"><span>0{i+1}</span><Icon/></div><h3>{title}</h3><p>{text}</p><a href="#simulacao">Fazer simulação <ArrowRight size={16}/></a></article>)}</div></section>
 <section className="section process" id="como-funciona" data-reveal><div className="section-heading centered"><p className="eyebrow">SIMPLES E TRANSPARENTE</p><h2>Como funciona</h2></div><div className="steps">{steps.map(([Icon,title,text],i)=><article key={title}><span className="step-number">{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="contact" id="contato" data-reveal><div><p className="eyebrow">ATENDIMENTO</p><h2>Fale com a Imper Credi.</h2></div><a href="#simulacao"><MessageCircle/><span><small>CONTINUE PELO</small><strong>WhatsApp</strong></span><ArrowRight/></a><a href="https://www.instagram.com/impercredibrasil" target="_blank" rel="noreferrer"><Building2/><span><small>ACOMPANHE NO</small><strong>Instagram</strong></span><ArrowRight/></a><a href="https://www.google.com/maps/search/?api=1&query=Av.+Central,+500,+Centro,+Florian%C3%B3polis,+SC" target="_blank" rel="noreferrer"><MapPin/><span><small>ENCONTRE-NOS</small><strong>Localização</strong></span><ArrowRight/></a></section>
 <footer><Brand/><p>Crédito com clareza e confiança.</p><small>© 2026 Imper Credi Brasil</small></footer>
 </main>}
