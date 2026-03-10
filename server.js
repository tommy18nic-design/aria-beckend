const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const PERPLEXITY_KEY = process.env.PERPLEXITY_API_KEY || "";
const CLAUDE_KEY = process.env.CLAUDE_API_KEY || "";
app.use(cors());
app.use(express.json({limit:"1mb"}));
app.get("/",function(req,res){res.json({status:"ARIA backend online"});});
app.post("/api/claude",async function(req,res){
if(!CLAUDE_KEY)return res.status(400).json({error:"CLAUDE_API_KEY non configurata"});
try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":CLAUDE_KEY,"anthropic-version":"2023-06-01"},body:JSON.stringify(req.body)});const d=await r.json();if(d.error)return res.status(400).json({error:d.error.message});const t=d.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"";res.json({text:t});}catch(e){res.status(500).json({error:e.message});}
});
app.post("/api/gemini",async function(req,res){
if(!GEMINI_KEY)return res.status(400).json({error:"GEMINI_API_KEY non configurata"});
try{const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+GEMINI_KEY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:req.body.contents})});const d=await r.json();if(d.error)return res.status(400).json({error:d.error.message});const t=d.candidates?.[0]?.content?.parts?.[0]?.text||"";res.json({text:t});}catch(e){res.status(500).json({error:e.message});}
});
app.post("/api/perplexity",async function(req,res){
if(!PERPLEXITY_KEY)return res.status(400).json({error:"PERPLEXITY_API_KEY non configurata"});
try{const r=await fetch("https://api.perplexity.ai/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+PERPLEXITY_KEY},body:JSON.stringify({model:"sonar",messages:req.body.messages})});const d=await r.json();if(d.error)return res.status(400).json({error:d.error.message});const t=d.choices?.[0]?.message?.content||"";res.json({text:t});}catch(e){res.status(500).json({error:e.message});}
});
app.listen(PORT,function(){console.log("ARIA backend on port "+PORT);});
