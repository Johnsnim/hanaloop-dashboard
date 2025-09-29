'use client'
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Post } from "@/lib/types"
import { createOrUpdatePost, fetchPosts } from "@/lib/api"
import { useDashboardStore } from "@/store/useDashboardStore"
export function PostsPanel(){
const { selectedCompanyId,selectedMonth }=useDashboardStore()
const [posts,setPosts]=useState<Post[]|null>(null)
const [error,setError]=useState<string|null>(null)
const [loading,setLoading]=useState(false)
const [title,setTitle]=useState("")
const [content,setContent]=useState("")
const [saving,setSaving]=useState(false)
const [saveError,setSaveError]=useState<string|null>(null)
useEffect(()=>{setLoading(true);setError(null);fetchPosts().then(setPosts).catch(e=>setError(e.message??"Failed to load posts")).finally(()=>setLoading(false))},[])
const filtered=useMemo(()=>{if(!posts)return[];return posts.filter(p=>{const mc=selectedCompanyId?p.resourceUid===selectedCompanyId:true;const mm=selectedMonth?p.dateTime===selectedMonth:true;return mc&&mm})},[posts,selectedCompanyId,selectedMonth])
async function onSave(){
if(!selectedCompanyId||!selectedMonth){setSaveError("회사와 월을 먼저 선택하세요.");return}
const draft={id:undefined,title,content,resourceUid:selectedCompanyId,dateTime:selectedMonth}
setSaveError(null);setSaving(true)
const prev=posts??[]
const optimistic:Post={...(draft as any),id:"temp-"+Math.random().toString(36).slice(2)}
setPosts([optimistic,...prev])
try{const saved=await createOrUpdatePost(draft);setPosts(cur=>(cur??[]).map(p=>p.id===optimistic.id?saved:p));setTitle("");setContent("")}catch(e:any){setPosts(prev);setSaveError(e?.message??"저장 실패")}finally{setSaving(false)}
}
return <Card><CardHeader><CardTitle>Posts</CardTitle></CardHeader><CardContent className="space-y-4">
<div className="grid sm:grid-cols-2 gap-3">
<Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
<Input readOnly value={selectedCompanyId??""} placeholder="Company (auto)" />
<Input readOnly value={selectedMonth??""} placeholder="Month (auto)" />
<Textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} className="sm:col-span-2" />
<div className="sm:col-span-2 flex items-center gap-2"><Button onClick={onSave} disabled={saving} className="min-w-28">{saving?"Saving...":"Save Post"}</Button>{saveError&&<span className="text-sm text-red-600">{saveError}</span>}</div>
</div>
{loading&&<div className="h-10 skeleton w-full" />}{error&&<div className="text-sm text-red-600">{error}</div>}
<div className="space-y-3">{filtered.map(p=><div key={p.id} className="rounded-lg border p-3"><div className="text-sm text-[rgb(var(--muted))]">{p.dateTime} · {p.resourceUid}</div><div className="font-medium">{p.title}</div><div className="text-sm whitespace-pre-line">{p.content}</div></div>)}{!loading&&filtered.length===0&&<div className="text-sm text-[rgb(var(--muted))]">해당 조건의 게시글이 없습니다.</div>}</div>
</CardContent></Card>
}
