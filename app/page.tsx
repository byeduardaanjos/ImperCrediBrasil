"use client";
import {useState} from "react";
import {ArrowRight,BriefcaseBusiness,Building2,Check,Landmark,Menu,MessageCircle,ShieldCheck,UserRound,X} from "lucide-react";

const solutions=[[UserRound,"Crédito pessoal","Para planos, projetos e imprevistos."],[Landmark,"Com garantia","Mais prazo e condições diferenciadas."],[BriefcaseBusiness,"Para empresas","Crédito para apoiar o seu negócio."]] as const;
function Brand(){return <span className="brand"><img src="/imper-logo-transparent.png" alt="Imper Credi Brasil"/></span>}

export default function Home(){
 const[menu,setMenu]=useState(false),[sent,setSent]=useState(false);
 return <main>
  <header><a href="#inicio"><Brand/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Fechar menu":"Abrir menu"}>{menu?<X/>:<Menu/>}</button><nav className={menu?"open":""}><a href="#solucoes" onClick={()=>setMenu(false)}>Soluções</a><a href="#simulacao" onClick={()=>setMenu(false)}>Simulação</a><a href="#contato" onClick={()=>setMenu(false)}>Contato</a></nav><a className="header-button" href="#simulacao">Simular crédito</a></header>

  <section className="hero" id="inicio"><p className="tag">IMPER CREDI BRASIL</p><h1>Crédito direto.<br/><span>Atendimento de verdade.</span></h1><p>Soluções financeiras com clareza, segurança e acompanhamento.</p><a className="button red" href="#simulacao">Fazer simulação <ArrowRight size={18}/></a></section>

  <section className="trust"><span><ShieldCheck/>Análise responsável</span><span><MessageCircle/>Atendimento humano</span><span><Check/>Processo transparente</span></section>

  <section className="section solutions" id="solucoes"><div className="heading"><p className="tag">SOLUÇÕES</p><h2>Encontre a melhor opção.</h2></div><div className="cards">{solutions.map(([Icon,title,text],i)=><article key={title}><small>0{i+1}</small><Icon/><h3>{title}</h3><p>{text}</p><a href="#simulacao">Simular <ArrowRight size={15}/></a></article>)}</div></section>

  <section className="section simulation" id="simulacao"><div className="simulation-copy"><p className="tag">SIMULAÇÃO</p><h2>Vamos começar?</h2><p>Envie seus dados. Nossa equipe continua o atendimento pelo WhatsApp.</p></div><form onSubmit={e=>{e.preventDefault();setSent(true)}}>{sent?<div className="success"><Check/><h3>Simulação recebida.</h3><p>Em breve, nossa equipe entrará em contato.</p><button type="button" onClick={()=>setSent(false)}>Fazer outra</button></div>:<><label>Nome<input required placeholder="Seu nome completo"/></label><label>WhatsApp<input required inputMode="tel" placeholder="(00) 00000-0000"/></label><div className="row"><label>Valor desejado<input required placeholder="R$ 10.000,00"/></label><label>Renda aproximada<input required placeholder="R$ 4.000,00"/></label></div><label className="consent"><input type="checkbox" required/><span>Autorizo o contato para continuar esta solicitação.</span></label><button className="button dark">Solicitar atendimento <ArrowRight size={18}/></button></>}</form></section>

  <section className="contact" id="contato"><div><p className="tag">CONTATO</p><h2>Fale com a Imper Credi.</h2></div><a href="#simulacao"><MessageCircle/><span><small>ATENDIMENTO</small><strong>WhatsApp</strong></span><ArrowRight/></a><a href="https://www.instagram.com/impercredibrasil" target="_blank" rel="noreferrer"><Building2/><span><small>NOVIDADES</small><strong>Instagram</strong></span><ArrowRight/></a></section>

  <footer><Brand/><p>Crédito com clareza e confiança.</p><small>© 2026 Imper Credi Brasil</small></footer>
 </main>
}
