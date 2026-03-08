function a(n){let t=n;const s=new Set;return{get:()=>t,set:e=>{t=e,s.forEach(r=>r(e))},subscribe:e=>(e(t),s.add(e),()=>s.delete(e))}}const i=a(!1);export{i};
