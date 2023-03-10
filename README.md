# Ön Hazırlık
Ön hazırlık olarak bu extension pack'i indirmenizi tavsiye edebilirim. Node.js yazarken büyük kolaylık sağlıyor.

[İlgili Paket](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack

# Node.js Nedir
Node.js bir Javascript çalıştırma ortamıdır. Bu ne demek?

Javascript Node.js gibi runtimelardan  önce çalışma ortamı tarayıcılar ile kısıtlıydı. Yani Javascript'i sadece bir HTML dökümanı aracılığı ile, web browserların derlemesi sonucunda kullanabiliyordunuz. Node.js, Bun, Deno gibi çalıştırma ortamları Javascipt için yeni bir çalışma ortamı sundular. 

Bu bilgiler ışığında artık Node.js resmi sitesinde yazan Node.js tanıtım yazısı bizim için daha anlaml hale geldi:
Node.js® is an open-source, cross-platform **JavaScript runtime environment.**

*runtime environment: çalışma ortamı*

Aslında en basite indirgediğimizde ise Node.js bir javascript compiler görevi görüyor diyebiliriz. Çünkü sadece browserların anlayabildiği dili, makinelerin de anlayabildiği bir dile çeviriyor. Böylece biz Node.js sayesinde ön yüzde kullandığımız Javascript dilini, server tarafında da kullanabiliyoruz.

**!Önemli Not:** *Node.js komutlarını browserda çalıştıramazsınız; ``require, module.exports vs.``*

Javascript'in iki adet temel çalışma modeli vardır.
- Event Driven Architecture
- None Blocking Architecture

## Event Driven Architecture

## None Blocking Architecture
